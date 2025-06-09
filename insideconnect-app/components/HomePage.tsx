/* eslint-disable prettier/prettier */
// Filename: ./app/components/HomePage.tsx
"use client";

import React from "react";
import Link from "next/link";

import { SearchIcon, BuildingIcon, UsersIcon, ShieldCheckIcon, MailIcon, CalendarIcon } from "../components/icons";



// // Dummy icons for placeholder (replace with actual icons or imports)
// const SearchIcon = () => <span>🔍</span>;
// const BuildingIcon = () => <span>🏢</span>;
// const UsersIcon = () => <span>👥</span>;
// const ShieldCheckIcon = () => <span>🛡️</span>;
// const MailIcon = () => <span>✉️</span>;
// const CalendarIcon = () => <span>📅</span>;

export const HomePage = () => {
    const features = [
        {
            icon: <SearchIcon />,
            title: "Unified Inmate Search",
            description:
                "Locate any inmate in any federal, state, or county facility with one simple search.",
        },
        {
            icon: <BuildingIcon />,
            title: "Complete Facility Directory",
            description:
                "Access detailed rules, schedules, and contact information for facilities nationwide.",
        },
        {
            icon: <UsersIcon />,
            title: "Private Support Circles",
            description:
                "Create secure groups to share updates and coordinate with family and friends.",
        },
        {
            icon: <ShieldCheckIcon />,
            title: "Secure Document Vault",
            description:
                "Keep track of important legal files, letters, and photos in one private space.",
        },
        {
            icon: <MailIcon />,
            title: "Simplified Mail & Messaging",
            description:
                "Use our AI-assisted templates to write and send letters that meet facility guidelines.",
        },
        {
            icon: <CalendarIcon />,
            title: "Visitation Planner",
            description:
                "Easily schedule visits and get reminders so you never miss a chance to connect.",
        },
    ];

    const testimonials = [
        {
            quote:
                "InsideConnect lifted a huge weight off my shoulders. Finding my brother was impossible until I used their search. Now we talk every week.",
            name: "Sarah J.",
            relation: "Sister of an Incarcerated Individual",
        },
        {
            quote:
                "The facility directory is a lifesaver. I finally understood the mail rules and my letters stopped getting rejected. Thank you.",
            name: "Michael R.",
            relation: "Friend of an Incarcerated Individual",
        },
        {
            quote:
                "Coordinating with my family was a nightmare of group texts and missed calls. Our private support circle has changed everything.",
            name: "Linda H.",
            relation: "Mother of an Incarcerated Individual",
        },
    ];

    return (
        <div className="bg-white w-screen">
            {/* Hero Section */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                    The First True <span className="text-blue-600">Prison Communication</span> & Locator Hub
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
                    Millions of Americans have a loved one incarcerated. InsideConnect brings transparency,
                    technology, and dignity to the process of staying connected.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                    <Link
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md"
                        href="/inmate-search"
                    >
                        Find Your Loved One
                    </Link>
                    <Link
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50"
                        href="/signup"
                    >
                        Create an Account
                    </Link>
                </div>
            </main>

            {/* Features Section */}
            <section className="bg-gray-50 py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Everything You Need in One Place</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            We centralize countless scattered systems into one simple, powerful platform.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                    {feature.icon}
                                </div>
                                <h3 className="mt-5 text-lg font-medium text-gray-900">{feature.title}</h3>
                                <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-white py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Built for Families, by People Who Understand</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            Hear from others who have found connection and peace of mind.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 lg:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
                                <p className="text-gray-700 text-lg">&quot;{testimonial.quote}&quot;</p>
                                <div className="mt-4">
                                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                                    <div className="text-gray-600">{testimonial.relation}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600">
                <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-white">Ready to reconnect?</h2>
                    <p className="mt-4 text-lg text-blue-100">
                        Create your free account today and take the first step towards bridging the distance.
                    </p>
                    <Link
                        className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50"
                        href="/signup"
                    >
                        Get Started for Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

