import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "./ThemeProvider";

const font = Open_Sans({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Get It Done",
  description: "Get It Done",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen" suppressHydrationWarning>
      <body className={font.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
