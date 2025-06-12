/* eslint-disable prettier/prettier */
// insideconnect-app/components/InmateSearchPage.tsx
"use client";

import React, { useState } from "react";
import {
    Input,
    Button,
    Select,
    SelectItem,
    Card,
    CardBody,
    Spinner,
    Tabs,
    Tab,
    User,
    Link,
    Divider,
} from "@heroui/react";

// Define the structure of an inmate object based on the API response
interface Inmate {
    nameLast: string;
    nameFirst: string;
    nameMiddle: string;
    sex: string;
    race: string;
    age: string;
    inmateNum: string;
    faclCode: string; // Facility Code for building the link
    faclName: string;
    faclType: string;
    projRelDate: string;
}

// ... (Your form data interfaces remain the same) ...
interface NameSearchData {
    nameFirst: string;
    nameMiddle: string;
    nameLast: string;
    age: string;
    race: string;
    sex: string;
}

interface NumberSearchData {
    numberType: string;
    numberValue: string;
}


export const InmateSearchPage = () => {
    const [selectedTab, setSelectedTab] = useState<string | number>("byName");
    const [nameFormData, setNameFormData] = useState<NameSearchData>({
        nameFirst: "",
        nameMiddle: "",
        nameLast: "",
        age: "",
        race: "",
        sex: "",
    });
    const [numberFormData, setNumberFormData] = useState<NumberSearchData>({
        numberType: "BOP",
        numberValue: "",
    });
    const [results, setResults] = useState<Inmate[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    // ... (All of your handleInputChange, handleSelectChange, and handleSearch functions remain exactly the same) ...
    const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNameFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleNameSelectChange = (name: string) => (keys: any) => {
        setNameFormData((prev) => ({ ...prev, [name]: Array.from(keys)[0] as string }));
    };
    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumberFormData((prev) => ({ ...prev, numberValue: e.target.value }));
    };
    const handleNumberTypeChange = (keys: any) => {
        setNumberFormData((prev) => ({ ...prev, numberType: Array.from(keys)[0] as string }));
    };
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setResults([]);
        setHasSearched(true);
        let searchPayload = {};

        if (selectedTab === 'byName') {
            searchPayload = nameFormData;
        } else {
            searchPayload = { inmateNum: numberFormData.numberValue };
        }
        try {
            const response = await fetch('http://localhost:3001/api/search/inmate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchPayload),
            });
            const data = await response.json();

            if (!response.ok || data.Messages?.errors) {
                
                throw new Error(data.Messages?.errors[0] || "An error occurred during the search.");
            }
            setResults(data.InmateLocator || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    const numberTypes = [
        { key: "BOP", label: "BOP Register Number" },
        { key: "DCDC", label: "DCDC Number" },
        { key: "FBI", label: "FBI Number" },
        { key: "INS", label: "INS Number" },
    ];


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ... (Your header and search form JSX remain exactly the same) ... */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    Federal Inmate Locator
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    Search for federally incarcerated individuals by name or number.
                </p>
            </header>
            <Card className="p-2 sm:p-6 bg-white dark:bg-gray-800 shadow-lg">
                <form onSubmit={handleSearch}>
                    <Tabs
                        fullWidth
                        aria-label="Search Options"
                        selectedKey={selectedTab}
                        size="lg"
                        onSelectionChange={setSelectedTab}
                    >
                        <Tab key="byName" title="Search by Name">
                            <Card className="p-4 sm:p-6 bg-transparent dark:bg-transparent shadow-none">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Input label="First Name" name="nameFirst" value={nameFormData.nameFirst} variant="bordered" onChange={handleNameInputChange} />
                                        <Input label="Middle Name" name="nameMiddle" value={nameFormData.nameMiddle} variant="bordered" onChange={handleNameInputChange} />
                                        <Input label="Last Name" name="nameLast" value={nameFormData.nameLast} variant="bordered" onChange={handleNameInputChange} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Input label="Age" name="age" type="number" value={nameFormData.age} variant="bordered" onChange={handleNameInputChange} />
                                        <Select label="Race" name="race" selectedKeys={nameFormData.race ? [nameFormData.race] : []} variant="bordered" onSelectionChange={handleNameSelectChange('race')}>
                                            {['White', 'Black', 'American Indian', 'Asian', 'Other'].map(r => <SelectItem key={r}>{r}</SelectItem>)}
                                        </Select>
                                        <Select label="Sex" name="sex" selectedKeys={nameFormData.sex ? [nameFormData.sex] : []} variant="bordered" onSelectionChange={handleNameSelectChange('sex')}>
                                            {['Male', 'Female'].map(s => <SelectItem key={s}>{s}</SelectItem>)}
                                        </Select>
                                    </div>
                                </div>
                            </Card>
                        </Tab>
                        <Tab key="byNumber" title="Search by Number">
                            <Card className="p-4 sm:p-6 bg-transparent dark:bg-transparent shadow-none">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select defaultSelectedKeys={["BOP"]} label="Type of Number" name="numberType" variant="bordered" onSelectionChange={handleNumberTypeChange}>
                                        {numberTypes.map((type) => (<SelectItem key={type.key}>{type.label}</SelectItem>))}
                                    </Select>
                                    <Input isRequired label="Number" name="numberValue" value={numberFormData.numberValue} variant="bordered" onChange={handleNumberInputChange} />
                                </div>
                            </Card>
                        </Tab>
                    </Tabs>
                    <div className="flex justify-end mt-4 px-4 sm:px-6">
                        <Button color="primary" isLoading={isLoading} size="lg" type="submit">
                            Search Inmates
                        </Button>
                    </div>
                </form>
            </Card>

            {/* --- NEW: Redesigned Results Section --- */}
            <div className="mt-12">
                {isLoading ? (
                    <div className="flex justify-center p-8"><Spinner color="primary" label="Searching..." size="lg" /></div>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : hasSearched && results.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">No results found for your search criteria.</p>
                ) : (
                    <div className="space-y-6">
                        {results.map((inmate) => (
                            <Card key={inmate.inmateNum} className="bg-white dark:bg-gray-800 shadow-md">
                                <CardBody>
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                                        {/* Mugshot Column */}
                                        <div className="sm:col-span-2 flex justify-center items-center">
                                            <User
                                                avatarProps={{
                                                    size: "lg",
                                                    src: `https://www.bop.gov/inmateloc/Photos/${inmate.inmateNum}.jpg`
                                                }}
                                                description={`BOP Register No: ${inmate.inmateNum}`}
                                                name={`${inmate.nameFirst} ${inmate.nameLast}`}
                                            />
                                        </div>

                                        {/* Details Column */}
                                        <div className="sm:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
                                            {/* Personal Details */}
                                            <div className="space-y-1">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Personal Details</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Age:</strong> {inmate.age}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Race:</strong> {inmate.race}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Sex:</strong> {inmate.sex}</p>
                                            </div>
                                            {/* Location Details */}
                                            <div className="space-y-1">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Location</h4>
                                                <Link isExternal color="primary" href={`/facility/${inmate.faclCode}`}>
                                                    {inmate.faclType} {inmate.faclName}
                                                </Link>
                                            </div>
                                            {/* Release Details */}
                                            <div className="space-y-1">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Release Information</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <strong>Projected Release:</strong> {inmate.projRelDate || 'Not Available'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InmateSearchPage;