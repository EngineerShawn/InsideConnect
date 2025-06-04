// frontend/src/app/providers.jsx
"use client"; // This directive is important for client components in App Router

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
}