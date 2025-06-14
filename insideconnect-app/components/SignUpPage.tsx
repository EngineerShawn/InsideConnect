/* eslint-disable prettier/prettier */
// insideconnect-app/components/SignUpPage.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";

import { states } from "../app/lib/mockData";

import { VerificationModal } from "./VerificationModal";
import { EyeFilledIcon, EyeSlashFilledIcon, ChevronDownIcon } from "./icons";

const SignUpPage = () => {

    // Form field states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [selectedState, setSelectedState] = useState(new Set<string>());
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // UI states
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");
    const [formError, setFormError] = useState("");

    // Validation states
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

    const selectedStateValue = useMemo(
        () => Array.from(selectedState).join(", ").replaceAll("_", " "),
        [selectedState]
    );

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const validatePassword = (value: string) => {
        const errors: string[] = [];

        if (value.length < 8) errors.push("Be at least 8 characters long.");
        if (!/[A-Z]/.test(value)) errors.push("Contain at least one uppercase letter.");
        if (!/[a-z]/.test(value)) errors.push("Contain at least one lowercase letter.");
        if (!/\d/.test(value)) errors.push("Contain at least one number.");
        if (!/[@$!%*?&]/.test(value)) errors.push("Contain at least one special character (@$!%*?&).");
        setPasswordErrors(errors);

        return errors.length === 0;
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        validatePassword(value);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(""); // Clear previous form submission errors

        const isPasswordValid = validatePassword(password);

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");

            return;
        } else {
            setConfirmPasswordError("");
        }

        if (!isPasswordValid) {
            // console.log("Validation failed. Please correct the errors.");
            setFormError("Password is not valid");

            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName, lastName, email, password, streetAddress, city,
                    state: selectedStateValue,
                    zipCode, phoneNumber,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setFormError(data.message || "An unexpected error occurred.");
            } else {
                setRegisteredEmail(data.email);
                setVerificationModalOpen(true);
            }
        } catch {
            setFormError("An unexpected error occurred. Could not connect to the backend server.");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                        Create Your InsideConnect Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link className="font-medium text-blue-600 hover:text-blue-500" href="/login">
                            Sign In
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                    <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10">
                        <form className="space-y-6" onSubmit={handleSignUp}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input isRequired label="First Name" placeholder="Enter your first name" type="text" value={firstName} variant="bordered" onValueChange={setFirstName} />
                                <Input isRequired label="Last Name" placeholder="Enter your last name" type="text" value={lastName} variant="bordered" onValueChange={setLastName} />
                            </div>

                            <Input isRequired label="Email" placeholder="Enter your email" type="email" value={email} variant="bordered" onValueChange={setEmail} />

                            <Input
                                isRequired
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                                        {isPasswordVisible ? <EyeSlashFilledIcon className="text-2xl text-default-400" /> : <EyeFilledIcon className="text-2xl text-default-400" />}
                                    </button>
                                }
                                errorMessage={
                                    password.length > 0 && passwordErrors.length > 0 && (
                                        <ul className="list-disc pl-5">
                                            {passwordErrors.map((error, i) => <li key={i}>{error}</li>)}
                                        </ul>
                                    )
                                }
                                isInvalid={password.length > 0 && passwordErrors.length > 0}
                                label="Password"
                                placeholder="Create a password"
                                type={isPasswordVisible ? "text" : "password"}
                                value={password}
                                variant="bordered"
                                onValueChange={handlePasswordChange}
                            />
                            <Input
                                isRequired
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility}>
                                        {isConfirmPasswordVisible ? <EyeSlashFilledIcon className="text-2xl text-default-400" /> : <EyeFilledIcon className="text-2xl text-default-400" />}
                                    </button>
                                }
                                errorMessage={confirmPasswordError}
                                isInvalid={!!confirmPasswordError}
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                type={isConfirmPasswordVisible ? "text" : "password"}
                                value={confirmPassword}
                                variant="bordered"
                                onValueChange={setConfirmPassword}
                            />

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
                                <Input isRequired label="Street Address" placeholder="123 Main St" type="text" value={streetAddress} variant="bordered" onValueChange={setStreetAddress} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input isRequired label="City" placeholder="Anytown" type="text" value={city} variant="bordered" onValueChange={setCity} />
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button className="w-full justify-between capitalize" endContent={<ChevronDownIcon className="text-default-500" />} variant="bordered">
                                                {selectedStateValue || "Select State"}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            aria-label="State selection"
                                            className="max-h-60 overflow-y-auto"
                                            selectedKeys={selectedState}
                                            selectionMode="single"
                                            variant="flat"
                                            onSelectionChange={(keys: any) => setSelectedState(keys as Set<string>)}
                                        >
                                            {states.map((s) => <DropdownItem key={s}>{s}</DropdownItem>)}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input isRequired label="Zip Code" placeholder="12345" type="text" value={zipCode} variant="bordered" onValueChange={setZipCode} />
                                    <Input isRequired label="Phone Number" placeholder="(555) 555-5555" type="tel" value={phoneNumber} variant="bordered" onValueChange={setPhoneNumber} />
                                </div>
                            </div>

                            {formError && <p className="text-sm text-red-500 text-center">{formError}</p>}

                            <div>
                                <Button className="w-full" color="primary" type="submit">
                                    Create Account
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <VerificationModal
                isOpen={isVerificationModalOpen}
                userEmail={registeredEmail}
                onClose={() => setVerificationModalOpen(false)}
            />
        </>
    );
};

export default SignUpPage;