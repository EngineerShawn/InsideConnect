/* eslint-disable prettier/prettier */
// Filename: ./app/components/InmateSearchPage.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockInmates, states } from "../app/lib/mockData";


// Icons
const SearchIcon = ({ className = "" }) => <span className={className}>🔍</span>;
const ChevronDownIcon = ({ className = "" }) => <span className={className}>⬇️</span>;

type Inmate = {
    id: string;
    name: string;
    docId: string;
    facility: string;
    state: string;
    photoUrl: string;
    offense: string;
    sentence: string;
    lastUpdate: string;
    race?: string;
    sex?: string;
    age?: number;
};

const InmateSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [state, setState] = useState("");
    const [system, setSystem] = useState("");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [race, setRace] = useState("");
    const [ageRange, setAgeRange] = useState("");
    const [sex, setSex] = useState("");

    const [results, setResults] = useState<Inmate[]>([]);
    const [loading, setLoading] = useState(false);

    interface HandleSearchEvent extends React.FormEvent<HTMLFormElement> {}

    interface MockInmate extends Inmate {}

    const handleSearch = (e: HandleSearchEvent): void => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            let filtered: MockInmate[] = mockInmates.map((inmate) => ({
                ...inmate,
                id: String(inmate.id),
            }));

            if (searchTerm) {
                filtered = filtered.filter(
                    (inmate: MockInmate) =>
                        inmate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        inmate.docId.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            if (state) {
                filtered = filtered.filter((inmate: MockInmate) => inmate.state === state);
            }
            if (system && system !== "All") {
                filtered = filtered.filter((inmate: MockInmate) => {
                    const f = inmate.facility.toLowerCase();

                    if (system === "Federal") return f.includes("federal");
                    if (system === "State") return f.includes("state") || f.includes("correctional");
                    if (system === "County") return f.includes("jail");

                    return true;
                });
            }

            if (showAdvanced) {
                if (race && race !== "All") filtered = filtered.filter((inmate: MockInmate) => inmate.race === race);
                if (sex && sex !== "All") filtered = filtered.filter((inmate: MockInmate) => inmate.sex === sex);
                if (ageRange) {
                    const [min, max] = ageRange.split("-").map(Number);
                    filtered = filtered.filter((inmate: MockInmate) => inmate.age !== undefined && inmate.age >= min && inmate.age <= max);
                }
            }

            setResults(filtered);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Inmate Search Engine</h1>
                    <p className="mt-4 text-lg text-gray-600">Find individuals across all U.S. jurisdictions.</p>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                    <form onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="search">
                                    Name or ID Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <SearchIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        id="search"
                                        placeholder="e.g., John Samuelson or A789-456123"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">
                                    State
                                </label>
                                <select
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                                    id="state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">All States</option>
                                    {states.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="system">
                                    System
                                </label>
                                <select
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                                    id="system"
                                    value={system}
                                    onChange={(e) => setSystem(e.target.value)}
                                >
                                    <option value="All">All Systems</option>
                                    <option value="Federal">Federal</option>
                                    <option value="State">State</option>
                                    <option value="County">County</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    className="w-full inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                            >
                                {showAdvanced ? "Hide" : "Show"} Advanced Filters{" "}
                                <ChevronDownIcon
                                    className={`ml-1 transform transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                                />
                            </button>
                        </div>

                        {showAdvanced && (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6 border-gray-200">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="race">
                                        Race
                                    </label>
                                    <select
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                                        id="race"
                                        value={race}
                                        onChange={(e) => setRace(e.target.value)}
                                    >
                                        <option value="All">All</option>
                                        <option>White</option>
                                        <option>African American</option>
                                        <option>Hispanic</option>
                                        <option>Asian</option>
                                        <option>Native American</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="age">
                                        Age Range
                                    </label>
                                    <select
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                                        id="age"
                                        value={ageRange}
                                        onChange={(e) => setAgeRange(e.target.value)}
                                    >
                                        <option value="">Any</option>
                                        <option value="18-25">18-25</option>
                                        <option value="26-35">26-35</option>
                                        <option value="36-50">36-50</option>
                                        <option value="51-99">51+</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="sex">
                                        Sex
                                    </label>
                                    <select
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                                        id="sex"
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                    >
                                        <option value="All">All</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </form>
                        <div className="space-y-6">
                            {results.length > 0 ? (
                                results.map((inmate) => (
                                    <div
                                        key={inmate.id}
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="md:flex">
                                            <div className="md:flex-shrink-0 p-4 flex items-center justify-center">
                                                <img
                                                    alt={`Photo of ${inmate.name}`}
                                                    className="h-24 w-24 object-cover rounded-full"
                                                    src={inmate.photoUrl}
                                                />
                                            </div>
                                            <div className="p-6 flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <Link
                                                            className="block mt-1 text-2xl leading-tight font-bold text-gray-900 hover:text-blue-600"
                                                            href={`/profile/${inmate.id}`}
                                                        >
                                                            {inmate.name}
                                                        </Link>
                                                        <p className="mt-1 text-gray-500">DOC ID: {inmate.docId}</p>
                                                    </div>
                                                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700">
                                                        Follow
                                                    </button>
                                                </div>
                                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-500 font-semibold">Location</p>
                                                        <p className="text-gray-800">
                                                            {inmate.facility}, {inmate.state}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 font-semibold">Offense</p>
                                                        <p className="text-gray-800">{inmate.offense}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 font-semibold">Sentence</p>
                                                        <p className="text-gray-800">{inmate.sentence}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 font-semibold">Last Update</p>
                                                        <p className="text-gray-800">{inmate.lastUpdate}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                                    <p className="text-gray-600">No results found. Try adjusting your search criteria.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InmateSearchPage;
