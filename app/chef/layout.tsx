"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Menu } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function ChefLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // 初期ロード時は何もしない
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    // 初期ロード後、未認証の場合のみリダイレクト
    if (!isAuthenticated && pathname.startsWith("/chef")) {
      router.replace("/login");
    }
  }, [isAuthenticated, router, pathname, isInitialLoad]);

  // 初期ロード時は表示を維持
  if (isInitialLoad) {
    return null;
  }

  // 初期ロード後、未認証の場合は何も表示しない
  if (!isAuthenticated && pathname.startsWith("/chef")) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/chef/dashboard" className="flex items-center gap-2">
            <Image
              src="/chef_illust/chef_logo.png?height=200&width=400"
              alt="CookChef Logo"
              width={120}
              height={30}
              className="text-white"
            />
          </Link>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2" aria-label="メニュー">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-full max-w-xs">
              <div className="flex flex-col h-full">
                <div className="p-6 space-y-6 mt-10">
                  <Link
                    href="/chef/dashboard"
                    className="flex items-center justify-between py-4 border-b"
                    onClick={() => setIsMenuOpen(false)}>
                    <span className="text-xl font-bold">ダッシュボード</span>
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                  <Link
                    href="/chef/schedule"
                    className="flex items-center justify-between py-4 border-b"
                    onClick={() => setIsMenuOpen(false)}>
                    <span className="text-xl font-bold">
                      お仕事スケジュール
                    </span>
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                  <Link
                    href="/chef/salary"
                    className="flex items-center justify-between py-4 border-b"
                    onClick={() => setIsMenuOpen(false)}>
                    <span className="text-xl font-bold">給料詳細</span>
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                  <Link
                    href="/chef/profile"
                    className="flex items-center justify-between py-4 border-b"
                    onClick={() => setIsMenuOpen(false)}>
                    <span className="text-xl font-bold">プロフィール</span>
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                </div>

                <div className="mt-auto p-6 space-y-4">
                  <Link
                    href="/chef/applications"
                    className="flex items-center justify-center py-4 px-6 rounded-full border border-gray-300 w-full"
                    onClick={() => setIsMenuOpen(false)}>
                    <span className="text-gray-500">応募履歴</span>
                  </Link>
                  <Link
                    href="/chef/guide"
                    className="flex items-center justify-center py-4 px-6 rounded-full border border-gray-300 w-full"
                    onClick={() => setIsMenuOpen(false)}>
                    <span className="text-gray-500">ご利用の流れ</span>
                  </Link>
                  <Link
                    href="/chef/faq"
                    className="flex items-center justify-center py-4 px-6 rounded-full border border-gray-300 w-full"
                    onClick={() => setIsMenuOpen(false)}>
                    <span className="text-gray-500">よくある質問</span>
                  </Link>
                  <Link
                    href="/chef/contact"
                    className="flex items-center justify-center py-4 px-6 rounded-full border border-gray-300 w-full"
                    onClick={() => setIsMenuOpen(false)}>
                    <span className="text-gray-500">お問い合わせ</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8">
            <Image
              src="/chef_illust/chef_logo.png?height=200&width=400"
              alt="CookChef Logo"
              width={120}
              height={30}
              className="text-white"
            />
          </div>

          <div className="flex flex-col items-center gap-6 mb-6">
            <Link href="#" className="text-white hover:underline">
              運営会社
            </Link>
            <Link href="#" className="text-white hover:underline">
              シェフ向け利用規約
            </Link>
            <Link href="#" className="text-white hover:underline">
              飲食業社向け利用規約
            </Link>
            <Link href="#" className="text-white hover:underline">
              プライバシーポリシー
            </Link>
            <Link href="#" className="text-white hover:underline">
              お問い合わせ
            </Link>
          </div>

          <div className="text-center text-xs text-gray-400">
            © cookbiz Co.,Ltd.
          </div>
        </div>
      </footer>
    </div>
  );
}
