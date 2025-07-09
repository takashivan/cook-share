import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import StoreProvider from "./StoreProvider";
import AuthProviders from "./AuthProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHEFDOM - CHEFのための、スキルシェア",
  description: "CHEFDOMは、CHEFのための、スキルシェアプラットフォームです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // next-themesはhtml要素を直接更新するため、Reactのhydrationエラーが出る。
    // それを避けるためにsuppressHydrationWarningを使用（下層には影響しない）
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <AuthProviders>
            <Providers>
              {children}
            </Providers>
          </AuthProviders>
        </StoreProvider>
      </body>
    </html>
  );
}
