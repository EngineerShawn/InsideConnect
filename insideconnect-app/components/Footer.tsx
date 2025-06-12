/* eslint-disable prettier/prettier */
// Filename: ./app/components/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-4">
                        <Link
                            className="text-2xl font-bold text-gray-800 hover:text-blue-600"
                            href="/"
                        >
                            Inside<span className="text-blue-600">Connect</span>
                        </Link>
                        <p className="text-gray-500 text-base">
                            A centralized hub for connecting with incarcerated loved ones.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                                    Solutions
                                </h3>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <Link
                                            className="text-base text-gray-600 hover:text-blue-600"
                                            href="/inmate-search"
                                        >
                                            Inmate Search
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="text-base text-gray-600 hover:text-blue-600"
                                            href="/facility-directory"
                                        >
                                            Facility Directory
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="text-base text-gray-600 hover:text-blue-600"
                                            href="/signup"
                                        >
                                            Support Circles
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                                    Legal
                                </h3>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <Link
                                            className="text-base text-gray-600 hover:text-blue-600"
                                            href="/privacy"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="text-base text-gray-600 hover:text-blue-600"
                                            href="/terms"
                                        >
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                                    Company
                                </h3>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <Link
                                            className="text-base text-gray-600 hover:text-blue-600"
                                            href="/about"
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="text-base text-gray-600 hover:text-blue-600"
                                            href="/contact"
                                        >
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-500 xl:text-center">
                        Copyright &copy; 2025 InsideConnect. All rights reserved. | Developed by EngineerShawn
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
