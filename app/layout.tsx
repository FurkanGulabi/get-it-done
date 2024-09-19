// RootLayout (Server Component)
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";

const font = Open_Sans({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Get It Done",
  description: "Get It Done",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth(); // This remains server-side

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("min-h-screen antialiased", font.variable)}>
          <ThemeProvider>
            <Header /> {/* Header will now correctly get session data */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
