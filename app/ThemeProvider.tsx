"use client";
import { ThemeProvider as NextThemesThemeProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesThemeProvider
      defaultTheme="light"
      enableSystem
      attribute="class"
    >
      {children}
    </NextThemesThemeProvider>
  );
};

export default ThemeProvider;
