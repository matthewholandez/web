import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthew Holandez",
  description: "Matthew Holandez — Systems Design Engineering @ UWaterloo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable} style={{ colorScheme: "light" }}>
      <body>{children}</body>
    </html>
  );
}
