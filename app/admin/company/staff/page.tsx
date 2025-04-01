"use client";

import { useEffect, useState } from "react";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import {
  getCompanyUserByCompanyId,
  type CompanyUser,
} from "@/lib/api/companyUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, ExternalLink, MoreHorizontal, Plus, Users } from "lucide-react";
import Link from "next/link";

export default function StaffPage() {
  const { user } = useCompanyAuth();
  const [companyUsers, setCompanyUsers] = useState<CompanyUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !user?.companies_id) return;

    let isMounted = true;
    const fetchStaff = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getCompanyUserByCompanyId(user.companies_id);
        if (isMounted) {
          const validUsers = Array.isArray(response)
            ? response.filter(
                (user): user is CompanyUser =>
                  user !== null && typeof user === "object"
              )
            : [];
          setCompanyUsers(validUsers);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch staff:", error);
          setError(
            error instanceof Error
              ? error.message
              : "スタッフ情報の取得に失敗しました"
          );
          setCompanyUsers([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStaff();
    return () => {
      isMounted = false;
    };
  }, [user?.companies_id, hasMounted]);

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">スタッフ管理</h2>
          <p className="text-muted-foreground">
            スタッフの追加、編集、権限管理を行えます
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          スタッフを追加
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総スタッフ数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyUsers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">管理者数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {companyUsers.filter((user) => user.is_admin).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop View */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>役割</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyUsers.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {staff.name ? staff.name.charAt(0) : "?"}
                        </span>
                      </div>
                      {staff.name || "名前なし"}
                    </div>
                  </TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.is_admin ? "管理者" : "一般"}</TableCell>
                  <TableCell>
                    <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      アクティブ
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">メニューを開く</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          編集
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {companyUsers.map((staff) => (
          <Card key={staff.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {staff.name ? staff.name.charAt(0) : "?"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{staff.name || "名前なし"}</p>
                    <p className="text-sm text-muted-foreground">
                      {staff.email}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">メニューを開く</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      編集
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">役割</p>
                  <p>{staff.is_admin ? "管理者" : "一般"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ステータス</p>
                  <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                    アクティブ
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
