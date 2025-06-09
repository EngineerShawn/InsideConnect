/* eslint-disable prettier/prettier */
"use client";

import DashboardPageComponent from "../../components/DashboardPage";

// This page will handle the base /dashboard route
export default function DashboardBasePage() {
    // DashboardPageComponent uses usePathname(), which will correctly identify /dashboard
    return <DashboardPageComponent />;
}