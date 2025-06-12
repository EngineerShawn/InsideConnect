/* eslint-disable prettier/prettier */
// insideconnect-app/components/ForgotPasswordModal.tsx
"use client";

import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@heroui/react";

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setMessage("");

        await fetch("http://localhost:3001/api/auth/request-password-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        // For security reasons, we show the same message whether the email exists or not.
        setIsSubmitted(true);
        setMessage(
            "If an account with that email exists, a password reset link has been sent.",
        );
        setIsLoading(false);
    };

    const handleClose = () => {
        // Reset modal state when closing
        setIsSubmitted(false);
        setEmail("");
        setMessage("");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} placement="center" onOpenChange={handleClose}>
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Reset Your Password
                        </ModalHeader>
                        <ModalBody>
                            {isSubmitted ? (
                                // State 2: After user clicks send
                                <p>{message}</p>
                            ) : (
                                // State 1: Initial state
                                <p>
                                    Enter the email address associated with your account, and
                                    we&apos;ll send you a link to reset your password.
                                </p>
                            )}
                            {!isSubmitted && (
                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    value={email}
                                    variant="bordered"
                                    onValueChange={setEmail}
                                />
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleClose}>
                                {isSubmitted ? "Close" : "Cancel"}
                            </Button>
                            {!isSubmitted && (
                                <Button
                                    color="primary"
                                    isLoading={isLoading}
                                    onPress={handleSubmit}
                                >
                                    Send Reset Link
                                </Button>
                            )}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
