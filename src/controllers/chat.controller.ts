import { Request, Response } from "express";
import Chat from "../models/chat";

const getChat = async (req: Request, res: Response) => {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    try {
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] }
        }).populate({
            path: "messages.senderId", select: "firstName lastName"
        });

        if (!chat) {
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
            });
            await chat.save();
        }

        res.status(200).json({ chat });
    } catch (error) {
        console.error("Error in getChat controller:", error);
        res.status(500).json({ message: "Failed to fetch chat" });
    }
};

export default getChat;