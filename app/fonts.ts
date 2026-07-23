import localFont from "next/font/local";

// Neue Montreal — single typeface for the whole site. Two cuts: Regular for
// everything on the homepage, Semibold for the /time countdown.
export const neue = localFont({
  src: [
    { path: "./fonts/PPNeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/PPNeueMontreal-Semibold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-neue",
  display: "swap",
});
