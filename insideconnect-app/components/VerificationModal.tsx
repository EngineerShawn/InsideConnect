/* eslint-disable prettier/prettier */
// insideconnect-app/components/VerificationModal.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@heroui/react";

import { ShieldCheckIcon } from "./icons"; // Assuming you have a success icon

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    userEmail: string;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, userEmail }) => {
    const router = useRouter();
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // NEW: State to track if verification was successful
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:3001/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, token: code }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "An error occurred.");
            } else {
                // 1. Set verification to true to change the modal content
                setIsVerified(true);

                // 2. Wait 2 seconds, then close the modal and redirect
                setTimeout(() => {
                    onClose();
                    router.push('/login');
                }, 2000);
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Failed to connect to the server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isDismissable={false} isOpen={isOpen} placement="center" onOpenChange={onClose}>
            <ModalContent>
                {(close) => (
                    <>
                        {/* Conditionally render content based on verification status */}
                        {!isVerified ? (
                            // -- STATE 1: Verification Form --
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Verify Your Account
                                </ModalHeader>
                                <ModalBody>
                                    <p>
                                        A 6-digit verification code has been sent to <strong>{userEmail}</strong>.
                                        Please enter the code below to activate your account.
                                    </p>
                                    <Input
                                        errorMessage={error}
                                        isInvalid={!!error}
                                        label="Verification Code"
                                        placeholder="Enter your 6-digit code"
                                        value={code}
                                        variant="bordered"
                                        onValueChange={setCode}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={close}>
                                        Close
                                    </Button>
                                    <Button color="primary" isLoading={isLoading} onPress={handleVerify}>
                                        Verify Account
                                    </Button>
                                </ModalFooter>
                            </>
                        ) : (
                            // -- STATE 2: Success Message --
                            <>
                                <ModalBody>
                                    <div className="flex flex-col items-center justify-center text-center py-8">
                                        <ShieldCheckIcon className="text-green-500 w-16 h-16 mb-4" />
                                        <h2 className="text-2xl font-bold">Verification Successful!</h2>
                                        <p className="text-default-500 mt-2">
                                            Your account has been activated. Redirecting you to the login page...
                                        </p>
                                    </div>
                                </ModalBody>
                            </>
                        )}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};