import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit,} = useForm();

    const login = async (data) => {
        setError("");
        console.log("Login function initiated with data:", data); // <-- ADD THIS
        try {
            console.log("Attempting authService.login..."); // <-- ADD THIS
            const session = await authService.login(data);
            console.log("authService.login response:", session); // <-- ADD THIS

            if (session) {
                console.log("Session obtained, getting user data..."); // <-- ADD THIS
                const userData = await authService.getCurrentUser();
                console.log("User data after login:", userData); // <-- ADD THIS

                if (userData) {
                    dispatch(authLogin({userData}));
                    console.log("User data dispatched to Redux."); // <-- ADD THIS
                }
                navigate("/");
                console.log("Navigating to home page..."); // <-- ADD THIS
            }
        } catch (e) {
            console.error("Login process caught an error:", e); // <-- Change to console.error
            setError(e.message);
        }
    }
    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >Sign Up</Link>
                </p>
                {error &&
                    <p className="text-red-700 mt-8 text-center">{error}</p>
                }

                <form onSubmit={handleSubmit(login)} // This is correctly set up with react-hook-form
                    className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Please enter a valid email address"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => value.length >= 6 || "Password must be at least 6 characters long"
                                }
                            })}
                        />
                        <Button
                            type="submit" // Correct for submitting the form
                            className="w-full"
                        >Sign in</Button>
                        

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;