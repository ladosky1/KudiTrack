import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2),

    email: z.string().email(),

    password: z.string()
        .min(6)
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
});

export const verifyEmailSchema = z.object({
    email: z.string().email(),

    code: z.string().length(6),
});

export const loginSchema = z.object({
    email: z.string().email(),

    password: z.string()
        .min(6)
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export const resetPasswordSchema = z.object({
    email: z.string().email(),

    code: z.string().length(6),

    newPassword: z
        .string()
        .min(6)
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
})

