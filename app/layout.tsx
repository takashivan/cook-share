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
    <html lang="en">
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
