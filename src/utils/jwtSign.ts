import { Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { AppError } from "./appError";

const jwtSign = (userId: string, res: Response) => {
    const secretKey = process.env.JWT_SECRET_KEY as string;

    if (!secretKey) {
        throw new AppError("JWT secret key is not defined", 400);
    }

    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN) as jwt.SignOptions["expiresIn"]
    };

    const token = jwt.sign(
        { _id: userId },
        secretKey,
        options
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
};

export default jwtSign;