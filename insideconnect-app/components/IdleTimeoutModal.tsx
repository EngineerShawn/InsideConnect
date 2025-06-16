/* eslint-disable prettier/prettier */
// insideconnect-app/components/IdleTimeoutModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";

interface IdleTimeoutModalProps {
    isOpen: boolean;
    onStay: () => void;
    onLogout: () => void;
    countdownSeconds?: number;
}

export const IdleTimeoutModal: React.FC<IdleTimeoutModalProps> = ({
    isOpen,
    onStay,
    onLogout,
    countdownSeconds = 60, // Default to a 60-second countdown
}) => {
    const [countdown, setCountdown] = useState(countdownSeconds);

    useEffect(() => {
        if (isOpen) {
            setCountdown(countdownSeconds); // Reset countdown when modal opens
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        onLogout(); // Logout when countdown reaches zero

                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval on close
        }
    }, [isOpen, onLogout, countdownSeconds]);

    return (
        <Modal
            hideCloseButton
            isDismissable={false}
            isOpen={isOpen}
            placement="center"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Session Timeout Warning
                </ModalHeader>
                <ModalBody>
                    <p>You have been inactive for a while.</p>
                    <p>
                        For your security, you will be automatically logged out in{" "}
                        <span className="font-bold text-lg">{countdown}</span> seconds.
                    </p>
                    <p>Please click &quot;Stay Logged In&quot; to continue your session.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onLogout}>
                        Log Out Now
                    </Button>
                    <Button color="primary" onPress={onStay}>
                        Stay Logged In
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
