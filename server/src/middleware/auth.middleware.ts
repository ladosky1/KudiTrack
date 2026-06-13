import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import User from "../models/User.model";

import { AppError } from "../utils/AppError";

interface JwtPayload {
    userId: string;
}

export async function protect(
    req: Request,
    _: Response,
    next: NextFunction
){
    const token = req.cookies.token;

    if(!token){
        return next(
            new AppError("Unauthorized", 401)
        );
    }

    try {
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET as string
        ) as JwtPayload;

        const user = await User.findById(
            decoded.userId
        ).select("-password");

        if(!user){
            return next(
                new AppError("User not found", 404)
            );
        }

        req.user = user;

        next();
    } catch {
        next(new AppError(
            "Invalid token", 401
        ));
    }
}