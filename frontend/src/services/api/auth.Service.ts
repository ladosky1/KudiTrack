import { apiClient } from "./client";

import type { AuthResponse } from "@/types/auth.types";

export interface RegisterPayload {
    name: string;

    email: string;

    password: string;
}

export interface verifyEmailPayload {
    email: string;

    code: string;
}

export interface loginPayload {
    email: string;

    password: string;
}

export async function registerUser(
    payload: RegisterPayload
) {
    const response = 
        await apiClient.post<AuthResponse>("/auth/register", payload);

    return response.data;
}

export async function verifyEmail(
    payload: verifyEmailPayload
){
    const response = 
        await apiClient.post<AuthResponse>("/auth/verify-email", payload);

    return response.data;
};

export async function resendVerificationCode(email: string){
    const response = 
        await apiClient.post("/auth/resend-verification-code", {email});

    return response.data;
}

export async function loginUser(
    payload: loginPayload
){
    const response = 
        await apiClient.post<AuthResponse>("/auth/login", payload);

    return response.data;
}

export async function logoutUser(){
    const response = 
        await apiClient.post<AuthResponse>("/auth/logout");

    return response.data;
};

export async function getCurrentUser(){
    const response = await apiClient.get<{
        user: AuthResponse["user"]}>("/auth/me");

    return response.data;
};

export async function forgotPassword(email: string){
    const response = await apiClient.post<AuthResponse>(
        "/auth/forgot-password", { email }
    );

    return response.data;
};

export async function resetPassword(
    data: {
        email: string;
        code: string;
        newPassword: string;
    }
){
    const response = await apiClient.post<AuthResponse>(
        "/auth/reset-password", data
    );

    return response.data;
}