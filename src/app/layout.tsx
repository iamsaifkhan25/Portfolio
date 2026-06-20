import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundOrbs from "@/components/BackgroundOrbs";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Saif Khan | AI-Driven Full-Stack Developer & Product Builder",
  description:
    "Leveraging advanced agentic AI workflows to engineer, prototype, and deploy live full-stack applications.",
  keywords: [
    "Saif Khan",
    "Full-Stack Developer",
    "Agentic AI",
    "Product Builder",
    "Next.js Portfolio",
    "Tailwind CSS Portfolio",
    "casfrosting.com",
    "openstudydeck.com",
  ],
  authors: [{ name: "Saif Khan", url: "https://iamsaifkhan.com" }],
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
      <body className="min-h-full flex flex-col font-sans text-slate-100 bg-[#030712] relative">
        {/* Glowing Background Orbs */}
        <BackgroundOrbs />

        {/* Global Navigation Bar */}
        <div className="w-full pt-4">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col justify-start">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
