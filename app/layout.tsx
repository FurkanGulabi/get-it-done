import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";
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
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className="h-screen" suppressHydrationWarning>
        <body className={font.variable}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
