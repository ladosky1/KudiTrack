import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,

    message: {
        message: "Too many attempts. Please try again later"
    },

    standardHeaders: true,
    legacyHeaders: false,
});

export const resendCodeLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,

    message: {
        message: "Too many code requests"
    },

    standardHeaders: true,
    legacyHeaders: false,
})