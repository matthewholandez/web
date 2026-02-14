import type { Metadata } from "next";
import { M_PLUS_1p } from "next/font/google";
import "./globals.css";

const mPlus1p = M_PLUS_1p({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-m-plus-1p",
});

export const metadata: Metadata = {
  title: "Matthew Holandez",
  description: "Engineering at the University of Waterloo",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mPlus1p.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
