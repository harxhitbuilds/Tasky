import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";

import ThemeProvider from "@/providers/theme-provider";

import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tasky : Share your goals completion with others.",
  description:
    "Tasky is an task management platform in which you can manage your tasks without creating account. Also can share you day to day tasks completion with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={`${grotesk.variable} bg-background text-foreground antialiased`}
        >
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
