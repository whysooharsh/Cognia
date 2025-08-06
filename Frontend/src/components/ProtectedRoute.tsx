import { Navigate } from "react-router-dom";
import type { JSX } from 'react'

interface ProtectedRouteProps {
    children : JSX.Element
}

export function ProtectedRoute({children} : ProtectedRouteProps){
    const token = (() => {
        try {
            return localStorage.getItem("token");
        } catch (error) {
            return null;
        }
    })();
    if(!token){
        return <Navigate to="/signin" replace />
    }
    return children;
}