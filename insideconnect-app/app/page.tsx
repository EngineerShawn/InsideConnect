"use client";

import React from "react";

import HomePage from "../components/HomePage";

// --- Main App Component ---
export const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HomePage />
      </main>
    </div>
  );
};

export default Page;
