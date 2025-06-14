/* eslint-disable prettier/prettier */
// Filename: ./components/HomePage.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

import { SearchIcon, BuildingIcon, UsersIcon, ShieldCheckIcon, MailIcon, CalendarIcon } from "./icons";

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
        <div className="bg-white dark:bg-gray-900 w-screen">
            {/* Hero Section */}
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        The First True <span className="text-blue-600 dark:text-blue-500">Prison Communication</span>
                        <br />
                        Platform & Locator Hub
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
                        Millions of Americans have a loved one incarcerated. InsideConnect brings transparency,
                        technology, and dignity to the process of staying connected.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link href="/inmate-search">
                            <Button className="font-semibold" color="primary" size="lg">
                                Find a Loved One
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button className="font-semibold dark:border-gray-600 dark:text-gray-300" size="lg" variant="bordered">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </main>

            {/* Features Section */}
            <section className="bg-gray-50 dark:bg-gray-950 py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Everything You Need in One Place</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                            We centralize countless scattered systems into one simple, powerful platform.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                                    {feature.icon}
                                </div>
                                <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-white dark:bg-gray-900 py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Built for Families, by People Who Understand</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                            Hear from others who have found connection and peace of mind.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 lg:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800/60 p-8 rounded-lg shadow-md">
                                <p className="text-gray-700 dark:text-gray-300 text-lg">&quot;{testimonial.quote}&quot;</p>
                                <div className="mt-4">
                                    <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                                    <div className="text-gray-600 dark:text-gray-400">{testimonial.relation}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Ready to Reconnect?
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Create your free account today and take the first step towards bridging
                        the distance.
                    </p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button className="font-semibold" color="primary" size="lg">
                                Sign Up for Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
