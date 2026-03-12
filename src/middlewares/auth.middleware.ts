import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import User from "../models/user";
import chalk from "chalk";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new AppError("Unauthorized: Please login...", 401);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;

        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            throw new AppError("User not found", 404);
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(chalk.italic.red("Error in userAuth middleware " + error));
        next(error);
    }
};

export default userAuth;