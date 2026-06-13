import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { protect } from "../middleware/auth.middleware";
import { registerUser, 
        verifyEmail,
        resendVerificationCode, 
        loginUser,
        forgotPassword,
        resetPassword, 
        logoutUser } from "../controllers/auth.controller";
import { authLimiter, resendCodeLimiter } from "../middleware/ratelimit.middlware";


const router = Router();

router.post(
    "/register",
    authLimiter, 
    asyncHandler(registerUser));
router.post(
    "/verify-email", 
    asyncHandler(verifyEmail));
router.post(
    "/resend-verification-code",
    resendCodeLimiter,
    asyncHandler(resendVerificationCode));
router.post(
    "/login",
    authLimiter, 
    asyncHandler(loginUser));
router.post(
    "/forgot-password",
    authLimiter,
    asyncHandler(forgotPassword));
router.post(
    "/reset-password",
    asyncHandler(resetPassword));
router.post(
    "/logout",
    asyncHandler(logoutUser));

router.get("/me", protect, (req, res) => {
    res.json({ user: req.user, });
});

export default router;