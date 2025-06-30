"use client";

import { ThemeProvider } from "next-themes";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { Toaster } from "@/components/ui/toaster";
import { SWRConfig } from "swr";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const { logout: userLogout } = useAuth();
  const { logout: companyLogout } = useCompanyAuth();
  const router = useRouter();

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
          onError: async (error) => {
            console.error("SWR Error:", error);
            
            if (error.status === 401) {
              // 401エラーが発生した場合、トーストにエラーメッセージを表示し、強制ログアウト→ログイン画面にリダイレクトする
              console.error("Unauthorized access detected, redirecting to login.");
              if (error.config?.headers['X-User-Type'] === "company") {
                await companyLogout();
                router.push("/login/company");
              } else {
                await userLogout();
                router.push("/login");
              }
              toast({
                title: "ログインが必要です",
                description: "再度ログインしてください。",
                variant: "destructive",
              });
              return;
            }

            if (error.config?.method !== "get") {
              console.error("Non-GET request error:", error.config?.method);
              // GET以外のリクエストでエラーが発生した場合、エラーをスロー
              // GETはSWRのerrorでエラーハンドリングする。
              // GET以外は通常のエラーハンドリングを行う。
              throw error;
            }
          }
        }}>
        {children}
        <Toaster />
      </SWRConfig>
    </ThemeProvider>
  );
}
