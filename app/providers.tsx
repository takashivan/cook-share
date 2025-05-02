"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { CompanyAuthProvider } from "@/lib/contexts/CompanyAuthContext";
import { Toaster } from "@/components/ui/toaster";
import { SWRConfig } from "swr";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <SWRConfig
        value={{
          // この期間内での同じキーのリクエストを重複として排除する
          dedupingInterval: 60 * 1000,
          // ウィンドウがフォーカスされたときに自動的に再検証するか否か
          revalidateOnFocus: false,
          // ブラウザがネットワーク接続を回復すると自動的に再検証するか否か
          revalidateOnReconnect: false,
        }}>
        <AuthProvider>
          <CompanyAuthProvider>
            {children}
            <Toaster />
          </CompanyAuthProvider>
        </AuthProvider>
      </SWRConfig>
    </ThemeProvider>
  );
}
