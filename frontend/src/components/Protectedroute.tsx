import { Navigate, Outlet } from "react-router-dom";

import AppLoader from "./shared/AppLoader";

import { useAuth } from "@/features/auth/context/auth.context";

export default function ProtectedRoute(){
    const {isAuthenticated, isLoading} = useAuth();
    if(isLoading){
        return <AppLoader />;
    }
    if(!isAuthenticated){
        return(
            <Navigate to="/login" replace/>
        )
    }
    return <Outlet />
}