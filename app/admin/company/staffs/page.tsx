"use client";

import { useState } from "react";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
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
import {
  MoreHorizontal,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { AddCompanyStaffModal } from "@/components/modals/AddCompanyStaff";
import { toast } from "@/hooks/use-toast";
import { useGetCompanyUsersByCompanyId } from "@/hooks/api/companyuser/companyUsers/useGetCompanyUsersByCompanyId";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCompanyUserByCompanyId } from "@/hooks/api/companyuser/companyUsers/useDeleteCompanyUserByCompanyId";
import { CompanyusersListData } from "@/api/__generated__/base/data-contracts";
import { useCreateCompanyUserByCompanyId } from "@/hooks/api/companyuser/companyUsers/useCreateCompanyUserByCompanyId";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useGetCompany } from "@/hooks/api/companyuser/companies/useGetCompany";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function StaffPage() {
  const { user } = useCompanyAuth();
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [deleteTargetStaff, setDeleteTargetStaff] =
    useState<CompanyusersListData[number] | null>(null);

  const { data: company, isLoading: companyLoading, error: companyError } = useGetCompany({
    companyId: user?.companies_id ?? undefined,
  });

  const {
    data: companyUsers,
    isLoading: companyUsersLoading,
    error: companyUsersError
  } = useGetCompanyUsersByCompanyId({ companyId: user?.companies_id ?? undefined });

  const adminUsers = companyUsers?.filter((staff) => staff.is_admin) || [];
  const nonAdminUsers = companyUsers?.filter((staff) => !staff.is_admin) || [];
  
  const { trigger: createCompanyUserByCompanyIdTrigger } = useCreateCompanyUserByCompanyId({
    companyId: user?.companies_id ?? undefined,
  })

  const {
    trigger: deleteCompanyUserByCompanyIdTrigger,
  } = useDeleteCompanyUserByCompanyId({
    companyId: user?.companies_id ?? undefined,
    companyUserId: deleteTargetStaff?.id,
  });

  const handleAddStaff = async (email: string) => {
    if (!user?.companies_id) {
      toast({
        title: "エラーが発生しました",
        description: "会社IDが取得できません。",
        variant: "destructive",
      });
      return;
    }

    try {
      await createCompanyUserByCompanyIdTrigger({
        email,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteStaff = async () => {
    if (!deleteTargetStaff) return;

    if (!user?.companies_id) {
      toast({
        title: "エラーが発生しました",
        description: "会社IDが取得できません。",
        variant: "destructive",
      });
      return;
    }

    try {
      await deleteCompanyUserByCompanyIdTrigger();
      toast({
        title: "スタッフを削除しました",
        description: `${deleteTargetStaff.name || deleteTargetStaff.email}を削除しました。`,
      });
    } catch (error) {
      if ((error as any).response?.data?.payload?.code === "cannot_delete_logged_user") {
        toast({
          title: "エラーが発生しました",
          description: "ログイン中のユーザーは削除できません。",
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "エラーが発生しました",
        description: "スタッフの削除に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setDeleteTargetStaff(null);
    }
  };

  if (companyError || companyUsersError) {
    return (
      <ErrorPage />
    );
  }

  if (companyLoading || !companyUsers || companyUsersLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="スタッフ情報を読み込んでいます..."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">スタッフ管理</h2>
          <p className="text-muted-foreground">
            スタッフの追加、編集、権限管理を行えます
          </p>
        </div>
        <Button onClick={() => setIsAddStaffModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          管理者を追加
        </Button>
      </div>

      <AddCompanyStaffModal
        isOpen={isAddStaffModalOpen}
        onClose={() => setIsAddStaffModalOpen(false)}
        onSubmit={handleAddStaff}
        companyName={company?.name || "会社名未設定"}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">
                総スタッフ数
              </CardTitle>
              <CardDescription className="text-xs mt-1"></CardDescription>
            </div>
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
              {adminUsers.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop View */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">管理者</h3>
          <Card className="hidden md:block">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名前</TableHead>
                    <TableHead>メールアドレス</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.length > 0 ?
                    adminUsers.map((staff) => (
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
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">メニューを開く</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div>
                                      <DropdownMenuItem
                                        className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                                        onClick={() => setDeleteTargetStaff(staff)}
                                        disabled={staff.id === user?.id}
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        削除
                                      </DropdownMenuItem>
                                    </div>
                                  </TooltipTrigger>
                                  {staff.id === user?.id ? (
                                    <TooltipContent>
                                      <p>
                                        ログイン中のユーザーは削除できません。
                                      </p>
                                    </TooltipContent>
                                  ) : null}
                                </Tooltip>
                              </TooltipProvider>
                              
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                    : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          <p className="text-sm text-muted-foreground">
                            管理者はいません
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">各店舗のスタッフ</h3>
          <CardDescription className="text-xs mt-1">
            ※各レストランのスタッフの管理は各店舗から行えます
          </CardDescription>
          <Card className="hidden md:block">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名前</TableHead>
                    <TableHead>メールアドレス</TableHead>
                    <TableHead>所属店舗数</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nonAdminUsers.length > 0 ?
                    nonAdminUsers.map((staff) => (
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
                        <TableCell>{staff.restaurantaccess_count}</TableCell>
                      </TableRow>
                    ))
                    : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          <p className="text-sm text-muted-foreground">
                            各店舗のスタッフはいません
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile View */}
      <div className="grid gap-6 md:hidden">
        <div>
          <h3 className="text-lg font-medium mb-4">管理者</h3>
          <div className="grid gap-4">
            {adminUsers.length > 0 ?
              adminUsers.map((staff) => (
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
                          <p className="font-medium">
                            {staff.name || "名前なし"}
                          </p>
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
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setDeleteTargetStaff(staff)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))
              : (
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      管理者はいません
                    </p>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">各店舗のスタッフ</h3>
          <div className="grid gap-4">
            {nonAdminUsers.length > 0 ?
              nonAdminUsers.map((staff) => (
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
                          <p className="font-medium">
                            {staff.name || "名前なし"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {staff.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div>
                        <p className="text-muted-foreground text-sm">
                          所属店舗数 {staff.restaurantaccess_count}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
              : (
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      各店舗のスタッフはいません
                    </p>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        open={!!deleteTargetStaff}
        onOpenChange={() => setDeleteTargetStaff(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>管理者を削除</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTargetStaff?.name || deleteTargetStaff?.email}
              を管理者から削除してもよろしいですか？
              <br />
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteStaff}
              className="bg-red-600 hover:bg-red-700">
              削除する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
