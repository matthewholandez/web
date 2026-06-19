import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const title = "Matthew Holandez";
const description = "Matthew Holandez — Systems Design Engineering @ UWaterloo";

export const metadata: Metadata = {
  metadataBase: new URL("https://mholandez.com"),
  title,
  description,
  keywords: [
    "Matthew Holandez",
    "Systems Design Engineering",
    "University of Waterloo",
    "software engineer",
  ],
  authors: [{ name: "Matthew Holandez" }],
  creator: "Matthew Holandez",
  publisher: "Matthew Holandez",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Matthew Holandez",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matthew Holandez",
  description: "Systems Design Engineering @ UWaterloo",
  url: "https://mholandez.com",
  email: "mailto:mholandez@uwaterloo.ca",
  sameAs: [
    "https://github.com/matthewholandez",
    "https://linkedin.com/in/mholandez",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable} style={{ colorScheme: "light" }}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
