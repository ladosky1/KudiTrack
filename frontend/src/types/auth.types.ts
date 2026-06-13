export interface User {
    id: string;

    name: string;

    email: string;
}

export interface AuthResponse{
    message: string;

    user?: User;
}