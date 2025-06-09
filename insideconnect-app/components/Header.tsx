/* eslint-disable prettier/prettier */
"use client";
// ./app/components/Header.tsx

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MenuIcon, XIcon } from "./icons"; // Import icons
import { ThemeSwitch } from "./theme-switch"; // Import ThemeSwitch



interface HeaderProps {
    loggedIn: boolean;
    onLogout: () => void;
}

// Header Component
export const Header = ({ loggedIn, onLogout }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogoutClick = () => {
        // onLogout will update the state in RootLayout and clear localStorage
        onLogout();
        // Navigate to home page
        router.push("/");
        // Ensure the mobile menu is closed if it was open
        setIsMenuOpen(false);
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Inmate Search", href: "/inmate-search" },
        { name: "Facility Directory", href: "/facility-directory" },
    ];

    return (
        <>
            <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link className="flex-shrink-0" href="/">
                            {/* Logo */}
                            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                Inside<span className="text-blue-600 dark:text-blue-500">Connect</span>
                            </span>
                        </Link>
                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 font-medium transition-colors whitespace-nowrap"
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        {/* Right side: Desktop Auth and Mobile Controls Wrapper */}
                        <div className="flex items-center">
                            {/* Desktop Auth Buttons */}
                            <div className="hidden lg:flex items-center space-x-3"> {/* Increased space-x for ThemeSwitch */}
                                {loggedIn ? (
                                    <>
                                        <Link
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            href="/dashboard"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 whitespace-nowrap"
                                            onClick={handleLogoutClick}
                                        >
                                            Log Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
                                            href="/login"
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 rounded-lg shadow-sm whitespace-nowrap"
                                            href="/signup"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                                <ThemeSwitch /> {/* Desktop Theme Switch is here */}
                            </div>
                            {/* Mobile Controls: Always show hamburger. Show Login button if not logged in. */}
                            <div className="lg:hidden flex items-center ml-2"> {/* ml-2 for a bit of space */}
                                {!loggedIn && (
                                    <Link
                                        className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-transparent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-1"
                                        href="/login"
                                    >
                                        Log In
                                    </Link>
                                )}
                                <button
                                    aria-label="Toggle menu"
                                    className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    {isMenuOpen ? <XIcon /> : <MenuIcon />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Dropdown - Show if isMenuOpen is true */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-gray-800 shadow-lg pb-4 absolute top-16 left-0 right-0 z-40">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-2 pt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 font-medium transition-colors px-3 py-2 rounded-md text-base block"
                                href={link.href}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 flex flex-col space-y-2">

                            {loggedIn ? (
                                <>
                                    <Link
                                        className="w-full text-left px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
                                        href="/dashboard"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                        onClick={handleLogoutClick} // handleLogoutClick already closes menu
                                    >
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <Link
                                    className="w-full text-left px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
                                    href="/signup"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Sign Up
                                </Link>
                            )}
                            {/* Theme switch for mobile menu */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 flex items-center justify-between px-3">
                                <span className="text-gray-600 dark:text-gray-300 text-sm">Theme</span>
                                <ThemeSwitch />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;