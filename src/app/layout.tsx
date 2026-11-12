import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import { isPreviewDeploy, siteUrl } from "@/lib/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const title = "Saif Khan | I build things I'm curious about.";
const description =
  "Web tools, interactive experiences, little experiments, and sometimes entire game worlds.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Saif Khan",
  },
  description,
  alternates: { canonical: siteUrl },
  keywords: [
    "Saif Khan",
    "Personal Projects",
    "Interactive Experiences",
    "Learning to Build",
    "Next.js Portfolio",
    "Tailwind CSS Portfolio",
    "CSS Frosting",
    "Open Study Deck",
  ],
  authors: [{ name: "Saif Khan", url: siteUrl }],
  creator: "Saif Khan",
  robots: {
    index: !isPreviewDeploy,
    follow: !isPreviewDeploy,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Saif Khan",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans relative">
        {/* Skip link for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Glowing Background Orbs */}
        <BackgroundOrbs />

        {/* Global Navigation Bar */}
        <div className="w-full pt-4">
          <Navbar />
        </div>

        {/* Page Content */}
        <main
          id="main-content"
          className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col justify-start"
        >
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
