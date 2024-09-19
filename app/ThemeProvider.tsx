"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesThemeProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string; // Optional, default theme can be passed dynamically
}

const ThemeProvider = ({
  children,
  defaultTheme = "light", // Default to light if not provided
}: ThemeProviderProps) => {
  return (
    <NextThemesThemeProvider
      defaultTheme={defaultTheme}
      enableSystem
      attribute="class"
    >
      <NextUIProvider>{children}</NextUIProvider>
    </NextThemesThemeProvider>
  );
};

export default ThemeProvider;
