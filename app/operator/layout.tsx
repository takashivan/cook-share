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
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
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
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">運営管理画面</h1>
        </div>
        <nav className="mt-4">
          <Link
            href="/operator/dashboard"
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800",
              pathname === "/operator/dashboard" && "bg-gray-800"
            )}>
            <LayoutDashboard className="w-5 h-5 mr-2" />
            ダッシュボード
          </Link>
          <Link
            href="/operator/companies"
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800",
              pathname === "/operator/companies" && "bg-gray-800"
            )}>
            <Building2 className="w-5 h-5 mr-2" />
            会社管理
          </Link>
          <Link
            href="/operator/restaurants"
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800",
              pathname === "/operator/restaurants" && "bg-gray-800"
            )}>
            <ChefHat className="w-5 h-5 mr-2" />
            店舗管理
          </Link>
          <Link
            href="/operator/chefs"
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800",
              pathname === "/operator/chefs" && "bg-gray-800"
            )}>
            <ChefHat className="w-5 h-5 mr-2" />
            シェフ管理
          </Link>
          <Link
            href="/operator/jobs"
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800",
              pathname === "/operator/jobs" && "bg-gray-800"
            )}>
            <Briefcase className="w-5 h-5 mr-2" />
            求人管理
          </Link>
          <Link
            href="/operator/billing"
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800",
              pathname === "/operator/billing" && "bg-gray-800"
            )}>
            <CreditCard className="w-5 h-5 mr-2" />
            請求管理
          </Link>
          <Link
            href="/operator/staff"
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800",
              pathname === "/operator/staff" && "bg-gray-800"
            )}>
            <Users className="w-5 h-5 mr-2" />
            スタッフ管理
          </Link>
          <Link
            href="/operator/categories"
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800",
              pathname === "/operator/categories" && "bg-gray-800"
            )}>
            <Utensils className="w-5 h-5 mr-2" />
            カテゴリ管理
          </Link>
          <Link
            href="/operator/skills"
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800",
              pathname === "/operator/skills" && "bg-gray-800"
            )}>
            <Award className="w-5 h-5 mr-2" />
            スキル管理
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button
            variant="ghost"
            className="w-full text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={logout}>
            <LogOut className="w-5 h-5 mr-2" />
            ログアウト
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="p-8">{children}</div>
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
