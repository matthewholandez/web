import localFont from "next/font/local";

// Neue Montreal — the single typeface for the whole site. Registered with three
// weight-mapped cuts so `font-weight` selects between them: 400 for body, 600 for
// emphasis (project names, eyebrows), 800 for the giant hero.
export const neue = localFont({
  src: [
    { path: "./fonts/PPNeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/PPNeueMontreal-Semibold.otf", weight: "600", style: "normal" },
    { path: "./fonts/PPNeueMontreal-Extrabold.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-neue",
  display: "swap",
});
