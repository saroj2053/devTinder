import { NextFunction, Request, Response } from 'express';

interface AppError extends Error {
    statusCode?: number;
    status?: string;
    code?: number;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let status = err.status || 'error';
    let message = err.message;

    if (err.name === 'ValidationError') {
        statusCode = 400;
        status = 'fail';
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        status = 'fail';
        message = 'Invalid ID format';
    }

    if (err.code === 11000) {
        statusCode = 409;
        status = 'fail';
        message = 'Duplicate field value';
    }

    res.status(statusCode).json({
        status,
        message
    });
};