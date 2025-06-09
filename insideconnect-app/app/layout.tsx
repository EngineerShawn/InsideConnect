/* eslint-disable prettier/prettier */
"use client";

import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import clsx from "clsx";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true") {
      setLoggedIn(true);
    }
  }, []);

    const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
    }
    setLoggedIn(false);
    // Navigation to "/" is handled in Header's handleLogoutClick
  };

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Header loggedIn={loggedIn} onLogout={handleLogout} />
            <main className="container max-w-full flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
