/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
// insideconnect-app/app/context/AuthContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // We'll need to install this library

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

    useEffect(() => {
        // Check for a token in localStorage on initial load
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const decodedUser: AuthUser = jwtDecode(token);

                setUser(decodedUser);
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem('authToken');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        try {
            const decodedUser: AuthUser = jwtDecode(token);

            localStorage.setItem('authToken', token);
            setUser(decodedUser);
        } catch (error) {
            console.error("Failed to decode token on login:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};