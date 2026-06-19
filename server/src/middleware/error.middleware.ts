import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

import { AppError } from "../utils/AppError";

export function errorMiddleware(
    error: unknown, _: Request, res: Response, __: NextFunction
) {
    if (error instanceof ZodError){
        
        const primaryMessage = error.errors[0]?.message || "Validation failed";

        return res.status(400).json({
            message: primaryMessage,
            errors: error.errors,
        });
    }
    if (error instanceof AppError){
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }
    
    console.error("Backend unhandled error", error);

    return res.status(500).json({
        message: "Internal server error",
    })
}