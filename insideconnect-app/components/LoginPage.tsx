/* eslint-disable prettier/prettier */
// insideconnect-app/components/LoginPage.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button } from "@heroui/react";

import { useAuth } from "../app/context/AuthContext";

import { ForgotPasswordModal } from "./ForgotPasswordModal";

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

const LoginPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // --- NEW: State to control the forgot password modal ---
    const [isForgotModalOpen, setForgotModalOpen] = useState(false);

    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
            } else {
                login(data.token);
                router.push("/dashboard");
            }
        } catch (err) {
            setError("Failed to connect to the server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Or{" "}
                        <Link className="font-medium text-blue-600 hover:text-blue-500" href="/signup">
                            create a new account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <Input isRequired label="Email" placeholder="Enter your email" type="email" value={email} variant="bordered" onValueChange={setEmail} />
                            <Input
                                isRequired
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isPasswordVisible ? <EyeSlashFilledIcon className="text-2xl text-default-400" /> : <EyeFilledIcon className="text-2xl text-default-400" />}
                                    </button>
                                }
                                label="Password"
                                placeholder="Enter your password"
                                type={isPasswordVisible ? "text" : "password"}
                                value={password}
                                variant="bordered"
                                onValueChange={setPassword}
                            />

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <button
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                        type="button"
                                        onClick={() => setForgotModalOpen(true)}
                                    >
                                        Forgot your password?
                                    </button>
                                </div>
                            </div>

                            <div>
                                <Button className="w-full" color="primary" isLoading={isLoading} type="submit">
                                    Sign in
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* --- ADD THIS AT THE END --- */}
            <ForgotPasswordModal
                isOpen={isForgotModalOpen}
                onClose={() => setForgotModalOpen(false)}
            />
        </>
    );
};

export default LoginPage;