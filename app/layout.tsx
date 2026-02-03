import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

import ThemeProvider from "@/providers/theme-provider";

import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tasky : Share your goals completion with others.",
  description:
    "Tasky is an local storage based task management platform in which you can manage your tasks without creating account. Also can share you day to day tasks completion with others.",
  openGraph: {
    title: "Tasky - Share your goals completion with others.",
    description:
      "Tasky is an task management platform in which you can manage your tasks without creating account. Also can share you day to day tasks completion with others.",
    url: "https://tasky.harshitparmar.in",
    siteName: "Tasky",
    images: [
      {
        url: "https://tasky.harshitparmar.in/og/og.png",
        width: 1200,
        height: 630,
        alt: "Tasky",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasky - Share your goals completion with others.",
    description:
      "Tasky is an task management platform in which you can manage your tasks without creating account. Also can share you day to day tasks completion with others.",
    images: ["https://tasky.harshitparmar.in/og/og.png"],
    creator: "@harxhitbuilds",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${grotesk.variable} ${inter.variable} bg-background text-foreground antialiased`}
      >
        {" "}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>{children}</main>
        </ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1000,
            style: {
              background: "var(--toast-bg)",
              color: "var(--toast-text)",
              border: "1px solid var(--toast-border)",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              padding: "12px 16px",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
