"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { CompanyAuthProvider } from "@/lib/contexts/CompanyAuthContext";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <AuthProvider>
        <CompanyAuthProvider>
          {children}
          <Toaster />
        </CompanyAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
