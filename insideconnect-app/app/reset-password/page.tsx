/* eslint-disable prettier/prettier */
// insideconnect-app/app/reset-password/page.tsx
"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button } from "@heroui/react";

import { EyeFilledIcon, EyeSlashFilledIcon, ShieldCheckIcon, CheckIcon, XCircleIcon } from "../../components/icons";

// We wrap the main component in a Suspense boundary because useSearchParams() requires it.
const ResetPasswordPage = () => {
    return (
        <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
};

const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // --- NEW: State for real-time validation ---
    const hasLength = useMemo(() => password.length >= 8, [password]);
    const hasUppercase = useMemo(() => /[A-Z]/.test(password), [password]);
    const hasLowercase = useMemo(() => /[a-z]/.test(password), [password]);
    const hasNumber = useMemo(() => /\d/.test(password), [password]);
    const hasSpecialChar = useMemo(() => /[@$!%*?&]/.test(password), [password]);
    const passwordsMatch = useMemo(() => password.length > 0 && password === confirmPassword, [password, confirmPassword]);

    useEffect(() => {
        if (!token) {
            setError("No reset token found or it is invalid. Please request a new password reset link.");
        }
    }, [token]);

    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Final check on submit
        if (!hasLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar || !passwordsMatch) {
            setError("Please ensure all password requirements are met.");

            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
            } else {
                setSuccess(data.message);
                // The form will be disabled, and a redirect will happen after a delay
                setTimeout(() => {
                    router.push('/login');
                }, 2500);
            }
        } catch (err) {
            setError("Failed to connect to the server.");
        } finally {
            setIsLoading(false);
        }
    };

    const Requirement = ({ met, label }: { met: boolean; label: string }) => (
        <li className={`flex items-center text-sm ${met ? 'text-green-600' : 'text-red-500'}`}>
            {met ? <CheckIcon className="w-4 h-4 mr-2" /> : <XCircleIcon className="w-4 h-4 mr-2" />}
            {label}
        </li>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                    Set Your New Password
                </h2>
                <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10">
                    {!token ? (
                        <p className="text-center text-red-500">{error || "Invalid Link."}</p>
                    ) : success ? (
                        <div className="text-center">
                            <ShieldCheckIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
                            <p className="text-green-600 font-semibold">{success}</p>
                            <p className="text-sm text-default-500 mt-2">Redirecting you to the login page...</p>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleReset}>
                            <div>
                                <Input
                                    isRequired
                                    endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility}>{isPasswordVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}</button>}
                                    label="New Password"
                                    placeholder="Enter your new password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password}
                                    variant="bordered"
                                    onValueChange={setPassword}
                                />
                                <ul className="mt-2 space-y-1">
                                    <Requirement label="At least 8 characters long" met={hasLength} />
                                    <Requirement label="At least one uppercase letter" met={hasUppercase} />
                                    <Requirement label="At least one lowercase letter" met={hasLowercase} />
                                    <Requirement label="At least one number" met={hasNumber} />
                                    <Requirement label="At least one special character (@$!%*?&)" met={hasSpecialChar} />
                                </ul>
                            </div>
                            <div>
                                <Input
                                    isRequired
                                    label="Confirm New Password"
                                    placeholder="Confirm your new password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={confirmPassword}
                                    variant="bordered"
                                    onValueChange={setConfirmPassword}
                                />
                                {confirmPassword && <div className="mt-2"><Requirement label="Passwords must match" met={passwordsMatch} /></div>}
                            </div>

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <div>
                                <Button className="w-full" color="primary" isLoading={isLoading} type="submit">
                                    Reset Password
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;