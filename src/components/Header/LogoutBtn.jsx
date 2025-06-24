import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
        .then(()=>{
            dispatch(logout());
        })
    }
    return (
        <div className="inline-block w-full px-6 py-2 duration-200 text-red-700 hover:bg-red-200 rounded-lg " onClick={logoutHandler}>Logout</div>
    );
}

export default LogoutBtn;