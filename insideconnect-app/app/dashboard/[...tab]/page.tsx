/* eslint-disable prettier/prettier */
// insideconnect-app/app/dashboard/[...tab]/page.tsx
"use client";

import DashboardPageComponent from "../../../components/DashboardPage";

// 1. Define a clear, explicit type for the page's props
type DynamicDashboardPageProps = {
  params: {
    tab: string[];
  };
};

// 2. Rename the function to be more specific and use the new prop type
export default function DynamicDashboardPage({ params }: DynamicDashboardPageProps) {
  // The component's logic remains the same: it renders the main dashboard component.
  return <DashboardPageComponent />;
}