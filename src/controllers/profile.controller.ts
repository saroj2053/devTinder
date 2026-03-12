import { NextFunction, Request, Response } from 'express';
import chalk from "chalk";
import { validateEditProfileData } from '../utils/validation';
import { AppError } from '../utils/appError';

/*
* @desc    Get user profile
* @route   GET /api/v1/profile
* @access  Private 
*/
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.user;
        res.status(200).json({ message: 'Profile retrieved successfully', data: user });
    } catch (error) {
        console.log(chalk.italic.red('Error in getProfile controller'));
        next(error);
    }
};

/*
* @desc    Update user profile
* @route   PATCH /api/v1/profile/:userId
* @access  Private
*/
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!validateEditProfileData(req)) {
            throw new AppError("Invalid profile data. Please check the input fields.", 400);
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        const updatedUser = await loggedInUser.save();

        res
            .status(200)
            .json({ message: `${updatedUser.firstName}'s profile updated successfully`, data: updatedUser });

    } catch (error) {
        console.log(chalk.italic.red('Error in updateProfile controller'));
        next(error);
    }
};