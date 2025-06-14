/* eslint-disable prettier/prettier */
// insideconnect-app/app/facility/[code]/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardBody, CardHeader, Divider, Spinner, Image, Tabs, Tab, Link as UILink } from '@heroui/react';

// import { MailIcon, PhoneIcon } from '@/components/icons';

interface FacilityDetails {
    code: string;
    name: string;
    description: string;
    imageUrl: string;
    address: string;
    email: string;
    phone: string;
    fax: string;
    inmateSex: string;
    population: number;
    county: string;
    region: string;
}

const FacilityDetailPageContent = () => {
    const params = useParams();
    const code = params.code as string;

    const [facility, setFacility] = useState<FacilityDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (code) {
            const fetchFacilityDetails = async () => {
                setIsLoading(true);
                setError("");
                try {
                    const response = await fetch(`http://localhost:3001/api/search/facility/${code}`);

                    if (!response.ok) {
                        const data = await response.json();

                        throw new Error(data.message || 'Facility not found or an error occurred.');
                    }
                    const data = await response.json();

                    setFacility(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchFacilityDetails();
        }
    }, [code]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {isLoading ? (
                <div className="flex justify-center items-center py-24">
                    <Spinner label="Loading Facility Details..." size="lg" />
                </div>
            ) : error ? (
                <Card className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <CardBody>
                        <div className="text-center py-10 text-red-600 dark:text-red-400">
                            <h2 className="text-2xl font-bold mb-2">Error</h2>
                            <p>{error}</p>
                        </div>
                    </CardBody>
                </Card>
            ) : facility && (
                <>
                    {/* Hero Section with Image */}
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-lg">
                        <Image removeWrapper alt={`Image of ${facility.name}`} className="z-0 w-full h-full object-cover" src={facility.imageUrl} />
                        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">{facility.name}</h1>
                            <p className="text-lg text-gray-200 mt-2">{facility.description}</p>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="bg-white dark:bg-gray-800 p-4 shadow-md">
                                <CardHeader><h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Facility Information</h2></CardHeader>
                                <Divider className="my-4 bg-gray-200 dark:bg-gray-700" />
                                <CardBody className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Address</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{facility.address}</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Phone Number</h3>
                                            <UILink isExternal className="text-blue-500 flex items-center gap-1" href={`tel:${facility.phone}`}>{facility.phone}</UILink>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Fax Number</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{facility.fax}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Contact Email</h3>
                                        <UILink isExternal className="text-blue-500 text-sm flex items-center gap-1" href={`mailto:${facility.email}`}>{facility.email}</UILink>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card className="bg-white dark:bg-gray-800 shadow-md">
                                <CardBody>
                                    <Tabs aria-label="Facility Detail Options" color="primary" variant="underlined">
                                        <Tab key="visiting" title="Visiting Information">
                                            <div className="p-4"><p className="text-gray-600 dark:text-gray-400">Detailed visiting hours, rules, and scheduling information will be available here.</p></div>
                                        </Tab>
                                        <Tab key="mail" title="How to Send Things">
                                            <div className="p-4"><p className="text-gray-600 dark:text-gray-400">Specific mail rules, approved vendors, and package instructions will be available here.</p></div>
                                        </Tab>
                                        <Tab key="commissary" title="Commissary">
                                            <div className="p-4"><p className="text-gray-600 dark:text-gray-400">Commissary deposit instructions and spending limits will be available here.</p></div>
                                        </Tab>
                                    </Tabs>
                                </CardBody>
                            </Card>
                        </div>

                        <aside className="lg:col-span-1">
                            <Card className="bg-white dark:bg-gray-800 p-4 sticky top-24 shadow-md">
                                <CardHeader><h3 className="text-xl font-semibold text-gray-900 dark:text-white">Key Stats</h3></CardHeader>
                                <Divider className="my-2 bg-gray-200 dark:bg-gray-700" />
                                <CardBody className="space-y-3">
                                    <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">Facility Code:</span><span className="text-gray-600 dark:text-gray-400">{facility.code}</span></div>
                                    <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">Inmate Gender:</span><span className="text-gray-600 dark:text-gray-400 capitalize">{facility.inmateSex}</span></div>
                                    <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">Total Population:</span><span className="text-gray-600 dark:text-gray-400">{facility.population}</span></div>
                                    <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">County:</span><span className="text-gray-600 dark:text-gray-400">{facility.county}</span></div>
                                    <div className="flex justify-between"><span className="font-semibold text-gray-700 dark:text-gray-300">BOP Region:</span><span className="text-gray-600 dark:text-gray-400">{facility.region}</span></div>
                                </CardBody>
                            </Card>
                        </aside>
                    </div>
                </>
            )}
        </div>
    );
};

export default function FacilityDetailPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-center items-center py-24">
                    <Spinner label="Loading Facility..." size="lg" />
                </div>
            </div>
        }>
            <FacilityDetailPageContent />
        </Suspense>
    );
}