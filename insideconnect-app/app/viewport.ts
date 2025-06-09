/* eslint-disable prettier/prettier */
// c:/Users/Owner/Desktop/Shawn/InsideConnect - HeroUI/insideconnect-app/app/viewport.ts

import { Viewport } from "next";

// This file is a Server Module by default (no "use client")
// Special exports like `viewport` are read on the server.

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};