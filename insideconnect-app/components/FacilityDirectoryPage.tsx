/* eslint-disable prettier/prettier */
// Filename: ./app/FacilityDirectoryPage/page.tsx
"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { mockFacilities, states } from "../app/lib/mockData";


type Facility = {
    id: string;
    name: string;
    state: string;
    security: string;
    type: string;
    mailRules: string;
    visitation: string;
    population: string;
};


const FacilityDirectoryPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const stateFilter = searchParams.get("state") || "";
    const securityFilter = searchParams.get("security") || "";
    const typeFilter = searchParams.get("type") || "";

    const handleChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/directory?${params.toString()}`);
    };

    const filteredFacilities = mockFacilities.filter((f) => {
        return (
            (!stateFilter || f.state === stateFilter) &&
            (!securityFilter || f.security === securityFilter) &&
            (!typeFilter || f.type === typeFilter)
        );
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Facility Directory
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Browse nationwide facilities and their specific rules.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                            className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                            value={stateFilter}
                            onChange={(e) => handleChange("state", e.target.value)}
                        >
                            <option value="">Filter by State...</option>
                            {states.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>

                        <select
                            className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                            value={securityFilter}
                            onChange={(e) => handleChange("security", e.target.value)}
                        >
                            <option value="">Filter by Security Level...</option>
                            <option>Maximum</option>
                            <option>Medium</option>
                            <option>Minimum</option>
                            <option>Varies</option>
                        </select>

                        <select
                            className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                            value={typeFilter}
                            onChange={(e) => handleChange("type", e.target.value)}
                        >
                            <option value="">Filter by Facility Type...</option>
                            <option>Prison</option>
                            <option>Jail</option>
                            <option>Detention Center</option>
                            <option>County Jail</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredFacilities.map((facility: Facility) => (
                        <div
                            key={facility.id}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                        >
                            <h3 className="text-xl font-bold text-gray-900">
                                {facility.name}
                            </h3>
                            <p className="text-gray-600">{facility.state}</p>
                            <div className="mt-4 flex-grow space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Mail Rules</h4>
                                    <p className="text-sm text-gray-600">{facility.mailRules}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">
                                        Visitation Policy
                                    </h4>
                                    <p className="text-sm text-gray-600">{facility.visitation}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <span
                                    className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-${facility.security === "Maximum" ? "red" : "blue"
                                        }-100 text-${facility.security === "Maximum" ? "red" : "blue"
                                        }-800`}
                                >
                                    {facility.security} Security
                                </span>
                                <span className="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                    {facility.population}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FacilityDirectoryPage;
