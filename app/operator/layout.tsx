"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useOperatorAuth } from "@/lib/contexts/OperatorAuthContext";
import { OperatorAuthProvider } from "@/lib/contexts/OperatorAuthContext";
import StoreProvider from "../StoreProvider";
import {
  LayoutDashboard,
  Building2,
  ChefHat,
  Briefcase,
  CreditCard,
  Users,
  LogOut,
  Utensils,
  Award,
  UserRoundCheck,
  CookingPot,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

function OperatorLayout({ children }: { children: React.ReactNode }) {
  const { operator, loading, logout } = useOperatorAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !operator && pathname !== "/operator/login") {
      router.push("/operator/login");
    }
  }, [loading, operator, router, pathname]);

  // ログインページの場合はレイアウトを適用しない
  if (pathname === "/operator/login") {
    return <>{children}</>;
  }

  // 認証確認中は何も表示しない（一瞬で終わるのでローディングは表示しない）
  if (loading) {
    return null;
  }

  // 未認証の場合は何も表示しない（ログインページへのリダイレクトを待つ）
  if (!operator && pathname !== "/operator/login") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r fixed h-screen overflow-y-auto">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">運営管理画面</h1>
        </div>
        <Separator className="mb-4" />
        <nav className="px-4 space-y-1">
          <Link
            href="/operator/dashboard"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/operator/dashboard"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <LayoutDashboard className="w-5 h-5 mr-3" />
            ダッシュボード
          </Link>
          <Link
            href="/operator/companies"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/operator/companies"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <Building2 className="w-5 h-5 mr-3" />
            会社管理
          </Link>
          <Link
            href="/operator/restaurants"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname.includes("restaurants")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <CookingPot className="w-5 h-5 mr-3" />
            店舗管理
          </Link>
          <Link
            href="/operator/chefs"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/operator/chefs"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <ChefHat className="w-5 h-5 mr-3" />
            シェフ管理
          </Link>
          <Link
            href="/operator/reviews"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/operator/reviews"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <UserRoundCheck className="w-5 h-5 mr-3" />
            レビュー管理
          </Link>
          <Link
            href="/operator/jobs"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/operator/jobs"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <Briefcase className="w-5 h-5 mr-3" />
            求人管理
          </Link>
          <Link
            href="/operator/billing"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/operator/billing"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <CreditCard className="w-5 h-5 mr-3" />
            請求管理
          </Link>
          <Link
            href="/operator/staff"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/operator/staff"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <Users className="w-5 h-5 mr-3" />
            スタッフ管理
          </Link>
          <Link
            href="/operator/categories"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/operator/categories"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <Utensils className="w-5 h-5 mr-3" />
            カテゴリ管理
          </Link>
          <Link
            href="/operator/skills"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/operator/skills"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            )}>
            <Award className="w-5 h-5 mr-3" />
            スキル管理
          </Link>
        </nav>
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <Button
            variant="ghost"
            className="w-full text-gray-600 hover:text-orange-600 hover:bg-orange-50"
            onClick={logout}>
            <LogOut className="w-5 h-5 mr-2" />
            ログアウト
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 pl-64">
        <div className="container mx-auto p-8">{children}</div>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <OperatorAuthProvider>
      <StoreProvider>
        <OperatorLayout>{children}</OperatorLayout>
      </StoreProvider>
    </OperatorAuthProvider>
  );
}
