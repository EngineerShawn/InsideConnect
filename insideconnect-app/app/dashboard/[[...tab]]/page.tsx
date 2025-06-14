/* eslint-disable prettier/prettier */
// insideconnect-app/app/dashboard/[[...tab]]/page.tsx
"use client";

import DashboardPageComponent from "../../../components/DashboardPage";

// This single page now handles all dashboard routes
export default function UniversalDashboardPage() {
    // The DashboardPageComponent already uses the usePathname() hook
    // to determine what content to show, so no props are needed here.
    return <DashboardPageComponent />;
}
