import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import DashboardPage from "@/pages/DashboardPage";
import TransactionPage from "@/pages/TransactionPage";
import SettingsPage from "@/pages/SettingsPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import ProtectedRoute from "@/components/Protectedroute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "verify-email",
                element: <VerifyEmailPage/>
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage/>
            },
            {
                path: "reset-password",
                element: <ResetPasswordPage/>
            },
            {
                element: <ProtectedRoute/>,

                children: [
                    {
                        index: true,
                        element: <DashboardPage />
                    },
                    {
                        path: "transactions",
                        element: <TransactionPage />
                    },
                    {
                        path: "settings",
                        element: <SettingsPage />
                    }
                ]
            }
        ]
    }
])