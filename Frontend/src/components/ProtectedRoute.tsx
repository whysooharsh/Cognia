import { Navigate } from "react-router-dom";;
import type { JSX } from 'react';

interface ProtectedRouteProps {
    children : JSX.Element
}

export function ProtectedRoute({children} : ProtectedRouteProps){
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to="/signin" replace />
    }
    return children;
}