import React from 'react'
import { useLocation } from "react-router";
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

function ProtectRoutes() {
    const auth = useSelector((state) => state.user).authenticated;
    const location = useLocation();
    return(
        auth ? <Outlet/> : <Navigate to="/login" replace state={{ from: location }} />
    )
}

export default ProtectRoutes



