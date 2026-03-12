import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import ConnectionRequest from "../models/connectionRequest";
import User from "../models/user";

const USER_SAFE_DATA = "firstName lastName profileAvatarUrl age gender about skills";

/*
* @desc    Get user connections
* @route   GET /api/v1/user/connections
* @access  Private
*/
export const getUserConnections = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connections.map(conn => {
            if (conn.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return conn.toUserId
            }
            return conn.fromUserId
        });

        res
            .status(200)
            .json({ message: "Connections retrieved successfully...", data })

    } catch (error) {
        console.log(chalk.italic.red("Error in getUserConnections controller " + error));
        next(error);
    }
};

/*
* @desc    Get user connection requests
* @route   GET /api/v1/user/requests
* @access  Private 
*/
export const getUserConnectionRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({ toUserId: loggedInUser._id, status: "interested" }).populate("fromUserId", USER_SAFE_DATA);
        console.log(chalk.italic.blue(connectionRequests));
        res
            .status(200)
            .send({ message: "Connection requests retrieved successfully", data: connectionRequests });
    } catch (error) {
        console.log(chalk.italic.red("Error in getUserConnectionRequests controller " + error));
        next(error);
    }
};

/*
* @desc    Get user feed
* @route   GET /api/v1/user/feed
* @access  Private
*/
export const getUserFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        const hiddenUsersFromFeed = new Set();
        connectionRequests.forEach((conn) => {
            hiddenUsersFromFeed.add(conn.fromUserId.toString());
            hiddenUsersFromFeed.add(conn.toUserId.toString());
        });

        console.log(hiddenUsersFromFeed);

        const users = await User.find({
            $and: [
                { _id: { $ne: loggedInUser._id } },
                { _id: { $nin: Array.from(hiddenUsersFromFeed) as any } }
            ]
        }).select(USER_SAFE_DATA);

        res.send({ users });

    } catch (error) {
        console.log(chalk.italic.red("Error in getUserFeed controller " + error));
        next(error);
    }
};