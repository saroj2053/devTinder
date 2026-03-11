import { NextFunction, Request, Response } from "express";
import chalk from "chalk";
import User from "../models/user";
import { AppError } from "../utils/appError";
import { validateSignupData } from "../utils/validation";
import bcrypt from "bcrypt";
import jwtSign from "../utils/jwtSign";

/*
* @desc    User signup
* @route   POST /api/v1/auth/signup
* @access  Public
*/
export const signup = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { firstName, lastName, emailId, password } = req.body;

        validateSignupData(req);

        const isExistingUser = await User.findOne({ emailId });

        if (isExistingUser) {
            throw new AppError("Email is already registered", 409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({ firstName, lastName, emailId, password: passwordHash });

        const savedUser = await newUser.save();

        jwtSign(savedUser._id.toString(), res);

        const { password: _, ...restUserProps } = savedUser.toObject();
        const userDto = restUserProps;

        if (savedUser) {
            res.status(201).json({ message: "User added successfully", data: userDto });
        } else {
            throw new AppError("Failed to add user", 400);
        }
    } catch (error: any) {
        console.log(chalk.italic.red("Error in signup controller:"));
        next(error);
    }
};