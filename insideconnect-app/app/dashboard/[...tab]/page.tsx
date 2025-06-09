/* eslint-disable prettier/prettier */
"use client";

import DashboardPageComponent from "../../../components/DashboardPage";

// This page will handle routes like /dashboard/followed, /dashboard/circles, etc.
// The `params.tab` will be an array of the segments after /dashboard/
// e.g., for /dashboard/followed, params.tab would be ['followed']
export default function DashboardPage({ params }: { params: { tab: string[] } }) {
  // You can pass params.tab to DashboardPageComponent if it needs to know the specific sub-route
  // For now, DashboardPageComponent uses usePathname(), which should still work.
  return <DashboardPageComponent />;
}