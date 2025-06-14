/* eslint-disable prettier/prettier */
// insideconnect-app/app/settings/page.tsx
"use client";

import React from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";

import { useAuth } from "../blog/context/AuthContext";

const SettingsPage = () => {
    const { user } = useAuth();

    // A simple guard to prevent rendering if the user data isn't loaded yet
    if (!user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Manage your profile, security, and notification preferences.
                </p>
            </header>

            <div className="flex flex-col">
                <Tabs aria-label="Settings Options" color="primary" variant="underlined">
                    <Tab key="profile" title="Profile Information">
                        <Card className="bg-white dark:bg-gray-800 shadow-md">
                            <CardBody className="p-6">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Form to edit user profile details (name, address, etc.) will go here.
                                </p>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="security" title="Account Security">
                        <Card className="bg-white dark:bg-gray-800 shadow-md">
                            <CardBody className="p-6">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Form to change password will go here.
                                </p>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="notifications" title="Notifications">
                        <Card className="bg-white dark:bg-gray-800 shadow-md">
                            <CardBody className="p-6">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Options to manage email and push notifications will go here.
                                </p>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default SettingsPage;