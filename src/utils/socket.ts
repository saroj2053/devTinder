import { Server } from "socket.io";
import http from "node:http";
import crypto from "crypto";

import ConnectionRequest from "../models/connectionRequest";
import { AppError } from "./appError";
import Chat from "../models/chat";

const getSecretRoomId = ({ userId1, userId2 }: { userId1: string, userId2: string }) => {
    return crypto
        .createHash("sha256")
        .update([userId1, userId2]
            .sort()
            .join("_"))
        .digest("hex");
};

const initializeSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    const onlineUsers = new Map<string, string>();
    const emitOnlineUsers = () => {
        const userIds = Array.from(onlineUsers.keys());
        io.emit("getUsers", userIds);
    };

    io.on("connection", (socket) => {

        socket.on("addNewUser", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log("Connected Users: ", onlineUsers);
            emitOnlineUsers();
        });
        socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
            const roomId = getSecretRoomId({ userId1: userId, userId2: targetUserId });
            socket.join(roomId);
            console.log(`${firstName} joined Room: ${roomId}`);
        })
        socket.on("sendMessage", async ({ firstName, lastName, userId, targetUserId, text }) => {
            try {
                const roomId = getSecretRoomId({ userId1: userId, userId2: targetUserId });
                console.log(`${firstName} ${lastName} sent a message to Room: ${text}`);

                if (!text || text.trim() === "") {
                    throw new AppError("Message text cannot be empty.", 400);
                }

                // TODO: Check if userId & targetUserId are friends before allowing them to chat
                const connections = await ConnectionRequest.findOne({
                    $or: [
                        { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
                        { fromUserId: targetUserId, toUserId: userId, status: "accepted" }
                    ]
                });

                if (!connections) {
                    throw new AppError("Users are not connected. Message will not be sent.", 400);
                }

                let chat = await Chat.findOne({ participants: { $all: [userId, targetUserId] } });

                if (!chat) {
                    chat = new Chat({
                        participants: [userId, targetUserId],
                        messages: [],
                    });
                }

                chat.messages.push({
                    senderId: userId,
                    text
                });
                await chat.save();

                socket.to(roomId).emit("receiveMessage", { firstName, lastName, text });
            } catch (error) {
                console.error("Error in sendMessage event:", error);
                throw new AppError("Something went wrong while sending the message.", 500);
            }
        });

        socket.on("typing", ({ userId, targetUserId }) => {
            const roomId = getSecretRoomId({ userId1: userId, userId2: targetUserId });
            socket.to(roomId).emit("typing", { userId });
        });

        socket.on("stopTyping", ({ userId, targetUserId }) => {
            const roomId = getSecretRoomId({ userId1: userId, userId2: targetUserId });
            socket.to(roomId).emit("stopTyping", { userId });
        });

        socket.on("disconnect", () => {
            let disconnectedUserId: string | null = null;
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    disconnectedUserId = userId;
                    onlineUsers.delete(userId);
                    break;
                }
            }
            if (disconnectedUserId) {
                console.log("Disconnected User: ", disconnectedUserId);
                console.log("Connected Users: ", onlineUsers);
                emitOnlineUsers();
            }
        });
    });
};

export default initializeSocket;