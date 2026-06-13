import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { User } from "@/types/auth.types";

import {notifications} from "@mantine/notifications";

import { 
    getCurrentUser,
    logoutUser 
} from "@/services/api/auth.Service";

interface AuthContextValue {
    user: User | null;

    isAuthenticated: boolean;

    isLoading: boolean;

    logout: () => Promise<void>;

    setUser: (
        user: User | null
    ) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}){
    const [ user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUser(){
            try {
                setIsLoading(true);
                const data = await getCurrentUser();

                setUser(data.user || null);
            } catch(error){
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, []);

    async function logout(){
        
        const data = await logoutUser();

        setUser(null);

        notifications.show({
            color: "green",
            message: data.message,
        });
    }

    return(
        <AuthContext.Provider value={{
            user,

            isAuthenticated: !!user,

            isLoading,

            logout,

            setUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
}