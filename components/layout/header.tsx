"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PanelsTopLeft } from "lucide-react";

export function Header() {
  const { user: chefUser, logout: chefLogout } = useAuth();
  const { user: companyUser, logout: companyLogout } = useCompanyAuth();

  const isAuthenticated = !!chefUser || !!companyUser;
  const user = chefUser || companyUser;
  const logout = chefUser ? chefLogout : companyLogout;
  const userType = chefUser ? "chef" : "company";

  console.log("Auth state:", { chefUser, companyUser, isAuthenticated });

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/chef_illust/chef_logo.png?height=40&width=40"
            alt="CHEFDOM Logo"
            width={120}
            height={30}
            className="text-orange-500"
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              {userType === "company" && (
                <Link href="/admin">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <PanelsTopLeft className="h-6 w-6" />
                    <span className="text-sm text-muted-foreground hidden sm:block">ダッシュボード</span>
                  </Button>
                </Link>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            (chefUser && (chefUser as any).profile_image) || ""
                          }
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        userType === "company"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                      {userType === "company"
                        ? "企業アカウント"
                        : "シェフアカウント"}
                      {userType === "chef" &&
                        (user as any).is_approved === false &&
                        " 審査中"}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem className="font-semibold hover:bg-white focus:bg-white">
                    {user.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm text-muted-foreground hover:bg-white hover:text-muted-foreground focus:bg-white focus:text-muted-foreground">
                    {user.email}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-sm text-muted-foreground cursor-pointer"
                    asChild>
                    <Link
                      href={
                        userType === "company" ? "/admin" : "/chef/dashboard"
                      }>
                      {userType === "company" ? "ダッシュボード" : "マイページ"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 hover:text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={logout}>
                    ログアウト
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button asChild>
                <Link href="/register/chef">新規登録</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
