"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useState } from "react";

interface ProvidersProps {
  children: React.ReactNode;
  defaultTheme?: string; // Optional, default theme can be passed dynamically
}

const Providers = ({
  children,
  defaultTheme = "light", // Default to light if not provided
}: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesThemeProvider
        defaultTheme={defaultTheme}
        enableSystem
        attribute="class"
      >
        <NextUIProvider>{children}</NextUIProvider>
      </NextThemesThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
