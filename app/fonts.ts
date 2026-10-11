import localFont from "next/font/local";

// Libron — serif typeface for the whole site.
export const libron = localFont({
  src: [
    { path: "./fonts/Libron-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Libron-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Libron-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Libron-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-libron",
  display: "swap",
});
