/* eslint-disable prettier/prettier */
// Filename: ./app/dashboard/page.tsx OR ./app/dashboard/[tab]/page.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// example data (replace with your real imports)
const mockInmates = [
    { id: 1, name: "John D. Samuelson", facility: "Florida DOC", photoUrl: "/john.jpg" },
    { id: 2, name: "Robert Smith", facility: "California DOC", photoUrl: "/rob.jpg" },
    { id: 3, name: "Michael Thomas", facility: "Texas DOC", photoUrl: "/mike.jpg" },
];

const DashboardPage = () => {
    const pathname = usePathname();
    const activeTab = pathname.split("/").pop(); // get 'followed', 'circles', etc.

    const followedInmates = [mockInmates[0], mockInmates[2]];
    const supportCircles = [
        { id: 1, name: "Samuelson Family Support", inmateName: "John D. Samuelson", members: 5 },
        { id: 2, name: "Team Rob", inmateName: "Robert Smith", members: 8 },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "followed":
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">My Followed Inmates</h3>
                        {followedInmates.map((inmate) => (
                            <div
                                key={inmate.id}
                                className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={inmate.photoUrl}
                                        alt={inmate.name}
                                        className="h-12 w-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900">{inmate.name}</p>
                                        <p className="text-sm text-gray-500">{inmate.facility}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
                                    View Profile
                                </button>
                            </div>
                        ))}
                    </div>
                );
            case "circles":
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">My Support Circles</h3>
                        {supportCircles.map((circle) => (
                            <div
                                key={circle.id}
                                className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-bold text-gray-900">{circle.name}</p>
                                    <p className="text-sm text-gray-500">
                                        For {circle.inmateName} • {circle.members} members
                                    </p>
                                </div>
                                <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
                                    Enter Circle
                                </button>
                            </div>
                        ))}
                    </div>
                );
            case "documents":
                return (
                    <div className="text-center py-10 bg-white rounded-lg shadow">
                        <p className="text-gray-500">Legal Document Vault coming soon.</p>
                    </div>
                );
            case "settings":
                return (
                    <div className="text-center py-10 bg-white rounded-lg shadow">
                        <p className="text-gray-500">Account settings will be available here.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const tabLink = (tab: string, label: string) => (
        <Link
            href={`/dashboard/${tab}`}
            className={`block px-3 py-2 font-medium text-sm rounded-md ${activeTab === tab
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
        >
            {label}
        </Link>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Dashboard</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-1/4">
                        <nav className="space-y-1 bg-white p-4 rounded-lg shadow">
                            {tabLink("followed", "Followed Inmates")}
                            {tabLink("circles", "Support Circles")}
                            {tabLink("documents", "My Documents")}
                            {tabLink("settings", "Settings")}
                        </nav>
                    </aside>
                    <main className="flex-1">{renderContent()}</main>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
