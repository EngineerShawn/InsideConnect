/* eslint-disable prettier/prettier */
// insideconnect-app/components/DashboardPage.tsx
"use client";

import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
} from "@heroui/react";

import { useAuth } from "../app/blog/context/AuthContext";
import { trackedInmates } from "../app/lib/mockData";

import { MailIcon, CalendarIcon, DollarSignIcon, MoreVerticalIcon } from "./icons";


export const DashboardPage = () => {
    const { user } = useAuth();

    const renderCell = (item: (typeof trackedInmates)[0], columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof typeof item];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: item.photoUrl }}
                        description={`ID: ${item.docId}`}
                        name={cellValue}
                    >
                        {item.name}
                    </User>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={cellValue === "Stable" ? "success" : "warning"}
                        size="sm"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Button isIconOnly size="sm" variant="light">
                            <MoreVerticalIcon className="text-default-600" />
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-transparent">
            {/* Welcome Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {user?.firstName || "User"}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Here&apos;s a summary of your connections and upcoming events.
                </p>
            </header>

            {/* At-a-Glance Stat Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="bg-white dark:bg-gray-800 p-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold text-gray-500 dark:text-gray-400">Tracked Individuals</p>
                        <h4 className="font-bold text-large text-gray-900 dark:text-white">3</h4>
                    </CardHeader>
                </Card>
                <Card className="bg-white dark:bg-gray-800 p-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold text-gray-500 dark:text-gray-400">Upcoming Visits</p>
                        <h4 className="font-bold text-large text-gray-900 dark:text-white">1</h4>
                    </CardHeader>
                </Card>
                <Card className="bg-white dark:bg-gray-800 p-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold text-gray-500 dark:text-gray-400">Unread Messages</p>
                        <h4 className="font-bold text-large text-gray-900 dark:text-white">5</h4>
                    </CardHeader>
                </Card>
                <Card className="bg-white dark:bg-gray-800 p-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold text-gray-500 dark:text-gray-400">Commissary Balance</p>
                        <h4 className="font-bold text-large text-gray-900 dark:text-white">$45.50</h4>
                    </CardHeader>
                </Card>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Tracked Inmates Table */}
                <div className="lg:col-span-2">
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Tracked Individuals
                            </h2>
                        </CardHeader>
                        <Divider className="bg-gray-200 dark:bg-gray-700" />
                        <CardBody>
                            <Table aria-label="Table of tracked inmates">
                                <TableHeader>
                                    <TableColumn key="name">NAME</TableColumn>
                                    <TableColumn key="location">LOCATION</TableColumn>
                                    <TableColumn key="status">STATUS</TableColumn>
                                    <TableColumn key="actions">ACTIONS</TableColumn>
                                </TableHeader>
                                <TableBody items={trackedInmates}>
                                    {(item) => (
                                        <TableRow key={item.id}>
                                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>

                {/* Right Column: Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Quick Actions Card */}
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                        </CardHeader>
                        <Divider className="bg-gray-200 dark:bg-gray-700" />
                        <CardBody>
                            <div className="space-y-3">
                                <Button fullWidth color="primary" startContent={<MailIcon />}>Write a New Letter</Button>
                                <Button fullWidth className="dark:border-gray-600 dark:text-gray-300" startContent={<CalendarIcon />} variant="ghost">Schedule a Visit</Button>
                                <Button fullWidth className="dark:border-gray-600 dark:text-gray-300" startContent={<DollarSignIcon />} variant="ghost">Send Funds</Button>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Upcoming Events Card */}
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
                        </CardHeader>
                        <Divider className="bg-gray-200 dark:bg-gray-700" />
                        <CardBody>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">Visit with John Doe</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">June 15, 2025 - 2:00 PM</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">Parole Hearing for Jane Smith</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">July 22, 2025 - 10:00 AM</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;