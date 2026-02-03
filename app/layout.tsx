import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${grotesk.variable} bg-background text-foreground antialiased`}
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
      </body>
    </html>
  );
}
