/* eslint-disable prettier/prettier */
"use client";

import "@/styles/globals.css";
import clsx from "clsx";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import { Providers } from "./providers";
import { AuthProvider } from "./blog/context/AuthContext";

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
          {/* AuthProvider wraps everything that needs auth info */}
          <AuthProvider>
          <div className="relative flex flex-col h-screen">
            <Header />
            <main className="container max-w-full flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
