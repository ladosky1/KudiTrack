import { Request, Response } from "express";

import User from "../models/User.model";

import { 
    registerSchema,
    loginSchema,
    verifyEmailSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} from "../validators/auth.validator";

import { hashPassword } from "../utils/hashPassword";

import { generateVerificationCode } from "../utils/generateVerificationCode";

import { sendVerificationEmail } from "../services/email.service";

import { AppError } from "../utils/AppError";

import { generateToken } from "../utils/generateToken";

import { setAuthCookie } from "../utils/setAuthCookie";

import { comparePassword } from "../utils/comparePassword";



export async function registerUser(req: Request, res: Response){
    
    const validatedData = registerSchema.parse(req.body);

    const existingUser = await User.findOne({
        email: validatedData.email,
    });

    const verificationCode = generateVerificationCode();

    const verificationCodeExpiresAt = new Date(
        Date.now() + 10 * 60 * 1000
    );

    const hashedPassword = await hashPassword(
        validatedData.password
    );

    if(existingUser){
        if(existingUser.isVerified){
            throw new AppError(
                "Email already exists",
                409
            );
        }

        existingUser.name = validatedData.name;
        existingUser.password = hashedPassword;
        existingUser.verificationCode = verificationCode;
        existingUser.verificationCodeExpiresAt = verificationCodeExpiresAt;

        await existingUser.save();

        await sendVerificationEmail({
            email: existingUser.email,
            code: verificationCode,
        });

        return res.status(200).json({
            message: "new verification code sent"
        })
    }

    const user = await User.create({
        name: validatedData.name,

        email: validatedData.email,

        password: hashedPassword,

        verificationCode,

        verificationCodeExpiresAt,

        isVerified: false,
    });

    await sendVerificationEmail({
        email: user.email,
        code: verificationCode,
    });

    res.status(201).json({
        message: "verification code sent",
    })
}

export async function verifyEmail(req: Request, res: Response){
    
    const validateData = verifyEmailSchema.parse(req.body);

    const user = await User.findOne({
        email: validateData.email,
    });

    if(!user){
        throw new AppError("User not found", 404);
    }

        if(!user.verificationCodeExpiresAt || 
        user.verificationCodeExpiresAt < new Date()){
        throw new AppError("Verification code expired", 400);
    }

    if(user.verificationCode !== validateData.code){
        throw new AppError("Invalid Verification code", 400);
    }

    user.isVerified = true;

    user.verificationCode = undefined;

    user.verificationCodeExpiresAt = undefined;

    await user.save();

    const token = generateToken(user._id.toString());

    setAuthCookie(res, token);

    res.json({
        message: "Email verified successfully",
    });
}

export async function resendVerificationCode(req: Request, res: Response){
    const {email} = req.body;

    const user = await User.findOne({
        email,
    });

    if(!user){
        throw new AppError(
            "User Not found", 404
        );
    }

    if(user.isVerified){
        throw new AppError(
            "Email already verified", 400
        )
    }

    const verificationCode = generateVerificationCode();

    user.verificationCode = verificationCode;

    user.verificationCodeExpiresAt = new Date(
        Date.now() + 10 * 60 * 1000
    );

    await user.save();

    await sendVerificationEmail({
        email: user.email,
        code: verificationCode
    });

    res.json({
        message: "New Verification code sent"
    });
}

export async function loginUser(req: Request, res: Response){

    const validatedData = loginSchema.parse(req.body);

    const user = await User.findOne({
        email: validatedData.email,
    });

    if(!user){
        throw new AppError("Invalid Credentials", 401);
    }

    const passwordMatch = await comparePassword(
        validatedData.password, user.password
    );

    if(!passwordMatch){
        throw new AppError("Invalid Credentials", 401);
    }

    if(!user.isVerified){
        throw new AppError("Please verify your email first", 403);
    }

    const token = generateToken(user._id.toString());

    setAuthCookie(res, token);

    res.json({
        message: "Logged In Successfully",

        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    })
};

export async function forgotPassword(req: Request, res: Response){
    const validatedData = forgotPasswordSchema.parse(req.body);

    const user = await User.findOne({
        email: validatedData.email,
    });

    if(!user){
        throw new AppError("User not found", 404);
    };

    const resetCode = generateVerificationCode();

    user.resetPasswordCode = resetCode;

    user.resetPasswordCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendVerificationEmail({
        email: user.email,
        code: resetCode,
    });

    res.json({
        message: "Password reset code sent to email",
    })
};

export async function resetPassword(req: Request, res: Response){
    const validatedData = resetPasswordSchema.parse(req.body);

    const user = await User.findOne({
        email: validatedData.email,
    });

    if(!user){
        throw new AppError("User not found", 404);
    };

    if(user.resetPasswordCode !== validatedData.code){
        throw new AppError("Invalid reset code", 400);
    };

    if(!user.resetPasswordCodeExpiresAt || 
        user.resetPasswordCodeExpiresAt < new Date()){
        throw new AppError("Reset code expired", 400);
    };

    user.password = await hashPassword(validatedData.newPassword);

    user.resetPasswordCode = undefined;

    user.resetPasswordCodeExpiresAt = undefined;

    await user.save();

    res.json({
        message: "Password reset successfully",
    })
}

export async function logoutUser(_: Request, res: Response){
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax"
    });

    res.json({
        message: "Logged Out"
    });
}