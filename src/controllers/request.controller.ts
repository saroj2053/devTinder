import chalk from "chalk";
import { Request, Response, NextFunction } from "express";
import ConnectionRequest from "../models/connectionRequest";
import { AppError } from "../utils/appError";
import User from "../models/user";

type ConnectionStatus = "interested" | "ignored";
type ReviewStatus = "accepted" | "rejected";

/*
* @desc    Send connection request
* @route   POST /api/v1/request/send/:status/:toUserId
* @access  Private
*/
export const sendConnectionRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fromUserId = req.user._id;
        const { toUserId, status } = req.params;

        const allowedStatus = ["interested", "ignored"];

        if (!allowedStatus.includes(status as string)) {
            throw new AppError("Invalid Status type!!!", 400);
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new AppError("User not found", 404);
        }

        // Checking if there is an existing connection request between two parties
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        console.log(existingConnectionRequest);

        if (existingConnectionRequest) {
            throw new AppError("Connection Request Already Exists...", 400);
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status: status as ConnectionStatus
        })

        const data = await connectionRequest.save();

        const message = (status === "interested") ? `You sent an interest to ${toUser.firstName}` : `You passed on ${toUser.firstName}`;

        res
            .status(201)
            .json({ message, data })
    } catch (error) {
        console.log(chalk.italic.red("Error in sendConnectionRequest controller " + error))
        next(error);
    }
};

/*
* @desc    Respond to connection request
* @route   PATCH /api/v1/request/review/:status/:requestId
* @access  Private
*/
export const respondToConnectionRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const loggedInUser = req.user;
        const { requestId, status } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status as string)) {
            throw new AppError("Invalid Status type!!!", 400);
        }

        // checking if such connection request exists with the given requestId and logged in user is the recipient of that connection request and the status of that connection request is "interested"
        const existingConnectionRequest = await ConnectionRequest.findOne({ _id: requestId, status: "interested", toUserId: loggedInUser._id });

        if (!existingConnectionRequest) {
            throw new AppError("Connection Request not found", 404);
        }

        console.log(existingConnectionRequest);

        existingConnectionRequest.status = status as ReviewStatus;

        const data = await existingConnectionRequest.save();

        const message = (status === "accepted") ? `Connection request accepted` : `Connection request rejected`;

        res
            .status(200)
            .json({ message, data });

    } catch (error) {
        console.log(chalk.italic.red("Error in respondToConnectionRequest controller " + error))
        next(error);
    }
};