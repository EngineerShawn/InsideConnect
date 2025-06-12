/* eslint-disable prettier/prettier */
// insideconnect-app/components/FacilityDirectoryPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Input, Card, CardBody, Spinner, Link } from "@heroui/react";

import { useDebounce } from "../app/hooks/useDebounce";

interface Facility {
    code: string;
    nameDisplay: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

export const FacilityDirectoryPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<Facility[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const debouncedSearchTerm = useDebounce(searchTerm, 300); // Shortened delay for better feel

    useEffect(() => {
        const searchFacilities = async () => {
            // Only search if the term is not empty
            if (debouncedSearchTerm) {
                setIsLoading(true);
                setError("");
                try {
                    const response = await fetch(`http://localhost:3001/api/search/facility?name=${debouncedSearchTerm}`);

                    if (!response.ok) {

                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();

                    setResults(data);
                } catch (err: any) {
                    setError(err.message);
                    setResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                // Clear results when the input is empty
                setResults([]);
                setError("");
            }
        };

        searchFacilities();
    }, [debouncedSearchTerm]);

    return (
        // --- DARK THEME FIX: Added dark mode classes to the main container ---
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        Facility Directory
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Search for federal facilities by name. Results will appear as you type.
                    </p>
                </header>

                {/* --- UI FIX: Wrapped input and results in a relative container for dropdown effect --- */}
                <div className="max-w-2xl mx-auto relative">
                    <Input
                        isClearable
                        className="w-full"
                        placeholder="Start typing a facility name (e.g., Coleman)..."
                        size="lg"
                        value={searchTerm}
                        variant="bordered"
                        onValueChange={setSearchTerm}
                    />

                    {isLoading && (
                        <div className="absolute top-full w-full mt-2">
                            <Card className="bg-white dark:bg-gray-800 shadow-lg">
                                <CardBody>
                                    <div className="flex justify-center items-center p-4">
                                        <Spinner color="primary" label="Searching..." />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    )}

                    {/* Results Dropdown List */}
                    {!isLoading && debouncedSearchTerm && (
                        <div className="absolute top-full w-full mt-2 z-10">
                            <Card className="bg-white dark:bg-gray-800 shadow-lg">
                                <CardBody>
                                    {error && <p className="p-4 text-center text-red-500">{error}</p>}
                                    {!error && results.length === 0 && (
                                        <p className="p-4 text-center text-gray-500 dark:text-gray-400">No facilities found.</p>
                                    )}
                                    {results.length > 0 && (
                                        <div className="max-h-96 overflow-y-auto">
                                            {results.map((facility) => (
                                                <Link key={facility.code} className="block w-full" href={`/facility/${facility.code}`}>
                                                    <div className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                                                        <p className="font-semibold text-gray-900 dark:text-white">{facility.nameDisplay}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{facility.city}, {facility.state}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FacilityDirectoryPage;
