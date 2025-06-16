/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
// insideconnect-app/app/context/AuthContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

import { useIdleTimer } from '../hooks/useIdleTimer'; // Import our new hook

import { IdleTimeoutModal } from '@/components/IdleTimeoutModal'; // Import our new modal

// --- CONFIGURATION ---
// Set the user inactivity timeout here (in milliseconds)
// 15 minutes = 15 * 60 * 1000 = 900,000
// const IDLE_TIMEOUT = 900000;
const IDLE_TIMEOUT = 10000;

// Set the warning modal countdown here (in seconds)
const WARNING_COUNTDOWN = 60;

// ... AuthUser and AuthContextType interfaces remain the same ...
interface AuthUser {
    id: number;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
}
interface AuthContextType {
    user: AuthUser | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // --- NEW: State to control the warning modal ---
    const [isIdleWarningOpen, setIsIdleWarningOpen] = useState(false);

    const handleIdle = () => {
        // This function is called when the user has been idle for IDLE_TIMEOUT
        if (user) { // Only show the modal if a user is logged in
            console.log("User is idle. Showing warning modal.");
            setIsIdleWarningOpen(true);
        }
    };

    // Initialize the idle timer
    const { reset: resetIdleTimer } = useIdleTimer({ onIdle: handleIdle, idleTimeout: IDLE_TIMEOUT });

    const handleStayLoggedIn = () => {
        setIsIdleWarningOpen(false);
        resetIdleTimer();
    };

    const logout = () => {
        setIsIdleWarningOpen(false); // Ensure modal is closed on logout
        localStorage.removeItem('authToken');
        setUser(null);
        router.push('/login'); // Redirect to login on logout
    };

    const login = (token: string) => {
        try {
            const decodedUser: AuthUser = jwtDecode(token);

            localStorage.setItem('authToken', token);
            setUser(decodedUser);
            resetIdleTimer(); // Reset timer on login
        } catch {
            // Failed to decode token on login; handle error as needed
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const decodedUser: AuthUser = jwtDecode(token);

                setUser(decodedUser);
                resetIdleTimer(); // Start the timer on initial load if user is logged in
            } catch {
                logout(); // If token is invalid, log out
            }
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
            {/* Render the idle timeout modal globally */}
            <IdleTimeoutModal
                countdownSeconds={WARNING_COUNTDOWN}
                isOpen={isIdleWarningOpen}
                onLogout={logout}
                onStay={handleStayLoggedIn}
            />
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    // ... useAuth hook remains the same ...
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};