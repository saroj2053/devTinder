import { AppError } from "./appError";
import validator from "validator";

type SignupDataType = {
    body: {
        firstName: string;
        lastName: string;
        emailId: string;
        password: string;
    };
}

export const validateSignupData = (req: SignupDataType) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new AppError("Name is not valid", 400);
    } else if (firstName.length < 2 || firstName.length > 50) {
        throw new AppError("First name must be between 2 and 50 characters", 400);
    } else if (!validator.isEmail(emailId)) {
        throw new AppError("Invalid email address", 400);
    } else if (password.length < 8) {
        throw new AppError("Password must be at least 8 characters long", 400);
    } else if (!validator.isStrongPassword(password)) {
        throw new AppError("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol", 400);
    }
}

type EditProfileDataType = {
    body: {
        firstName?: string;
        lastName?: string;
        profileAvatarUrl?: string;
        about?: string;
        skills?: string[];
        age?: number;
        gender?: string;
    };
}

export const validateEditProfileData = (req: EditProfileDataType) => {
    const allowedEditFields = ["firstName", "lastName", "profileAvatarUrl", "about", "skills", "age", "gender"];

    const isEditAllowed = Object.keys(req.body).every((field) => {
        return allowedEditFields.includes(field);
    });

    return isEditAllowed;
}
