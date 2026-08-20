import localFont from "next/font/local";

// Neue Montreal — single typeface for the whole site (Regular).
export const neue = localFont({
  src: [
    { path: "./fonts/PPNeueMontreal-Regular.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-neue",
  display: "swap",
});
