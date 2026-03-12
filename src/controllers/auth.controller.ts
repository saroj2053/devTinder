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

/*
* @desc    User login
* @route   POST /api/v1/auth/login
* @access  Public
*/
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            throw new AppError("Email and password are required", 400);
        }

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new AppError("Invalid credentials", 401);
        }

        jwtSign(user._id.toString(), res);

        const { password: _, ...restUserProps } = user.toObject();
        const userDto = restUserProps;

        res.status(200).json({ message: "Logged in successfully", data: userDto });
    } catch (error: any) {
        console.log(chalk.italic.red("Error in login controller:"), error.message);
        next(error);
    }
};


/*
* @desc    User logout
* @route   POST /api/v1/auth/logout
* @access  Private
*/
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Clearing the token cookie by setting it to null and expiring it immediately
        // Chaining the cookie clearing with the response to ensure the cookie is cleared before sending the response
        res
            .cookie("token", null, {
                expires: new Date(Date.now()),
            })
            .status(200)
            .json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(chalk.italic.red("Error in logout controller:" + error));
        next(error);
    }
};