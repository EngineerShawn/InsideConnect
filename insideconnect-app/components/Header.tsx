/* eslint-disable prettier/prettier */
"use client";
// ./app/components/Header.tsx

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@heroui/react";

import { useAuth } from "../app/blog/context/AuthContext"; // Import our custom hook

import { MenuIcon, XIcon, SearchIcon, BuildingIcon } from "./icons"; // Import icons
import { ThemeSwitch } from "./theme-switch"; // Import ThemeSwitch


// Header Component
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout, isLoading } = useAuth(); // Use the context
    const router = useRouter();

    const handleLogoutClick = () => {
        // onLogout will update the state in RootLayout and clear localStorage
        logout();
        router.push('/login');
        setIsMenuOpen(false);
    };

    const handleMenuAction = (key: React.Key) => {
        switch (key) {
            case "dashboard":
                router.push('/dashboard');
                break;
            case "settings":
                router.push('/dashboard/settings'); // Assuming you have a /settings page
                break;
            case "inmate_search":
                router.push('/inmate-search');
                break;
            case "facility_directory":
                router.push('/facility-directory');
                break;
            case "help_and_feedback":
                router.push('/help-and-feedback');
                break;
            case "logout":
                handleLogoutClick();
                break;
            default:
                break;
        }
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Inmate Search", href: "/inmate-search" },
        { name: "Facility Directory", href: "/facility-directory" },
    ];

    if (isLoading) {
        return <header className="h-16" />// Render a placeholder during auth check
    }

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
                                {user ? (
                                    // --- NEW: USER AVATAR DROPDOWN ---
                                    <Dropdown showArrow classNames={{ base: "before:bg-default-200", content: "p-0 border-small border-divider bg-background" }} placement="bottom-end" radius="sm">
                                        <DropdownTrigger>
                                            <User
                                                as="button"
                                                avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }}
                                                className="transition-transform"
                                                description={user.email}
                                                name={`${user.firstName} ${user.lastName}`}
                                            />
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="User Actions" variant="flat" onAction={handleMenuAction}>
                                            <DropdownSection showDivider aria-label="Profile & Actions">
                                                <DropdownItem key="dashboard">Dashboard</DropdownItem>
                                                <DropdownItem key="settings">Settings</DropdownItem>
                                            </DropdownSection>
                                            <DropdownSection showDivider aria-label="App Navigation">
                                                <DropdownItem key="inmate_search" startContent={<SearchIcon className="text-default-500" />}>Inmate Search</DropdownItem>
                                                <DropdownItem key="facility_directory" startContent={<BuildingIcon className="text-default-500" />}>Facility Directory</DropdownItem>
                                            </DropdownSection>
                                            <DropdownSection aria-label="Preferences & Help">
                                                <DropdownItem key="theme" isReadOnly className="cursor-default" endContent={<ThemeSwitch />}>
                                                    Theme
                                                </DropdownItem>
                                                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                                <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
                                            </DropdownSection>
                                        </DropdownMenu>
                                    </Dropdown>
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
                            </div>
                            {/* Mobile Controls: Always show hamburger. Show Login button if not logged in. */}
                            <div className="lg:hidden flex items-center ml-2"> {/* ml-2 for a bit of space */}
                                {!user && (
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

                            {user ? (
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