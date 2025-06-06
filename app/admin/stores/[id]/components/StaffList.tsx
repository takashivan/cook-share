"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetCompanyUsersByRestaurantId } from "@/hooks/api/companyuser/companyUsers/useGetCompanyUsersByRestaurantId";
import { useState } from "react";
import { DeleteRestaurantStaffModal } from "@/components/modals/DeleteRestaurantStaffModal";
import { useDeleteCompanyUserByRestaurantId } from "@/hooks/api/companyuser/companyUsers/useDeleteCompanyUserByRestaurantId";
import { toast } from "@/hooks/use-toast";
import { AddRestaurantStaffModal } from "@/components/modals/AddRestaurantStaff";
import { CompanyusersCreateInput } from "@/api/__generated__/base/data-contracts";
import { useCreateCompanyUserByRestaurantId } from "@/hooks/api/companyuser/companyUsers/useCreateCompanyUserByRestaurantId";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorPage } from "@/components/layout/ErrorPage";

interface StaffListProps {
  restaurantId?: number;
  restaurantName?: string;
  companyId?: string;
}

export function StaffList({
  restaurantId,
  restaurantName,
  companyId,
}: StaffListProps) {
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTargetStaff, setDeleteTargetStaff] = useState<{
    id: string;
    companyuser: { name: string; email: string };
  } | null>(null);

  const {
    data: staffData,
    isLoading: isStaffLoading,
    error: staffError,
  } = useGetCompanyUsersByRestaurantId({
    restaurantId,
  });

  const sortedStaff = staffData?.admin.sort((a, b) => {
    // ソート１：名前の50音昇順
    // ソート２：スタッフの登録日時昇順
    return a.name.localeCompare(b.name) || new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  }) || [];
  const adminStaff = sortedStaff.filter((staff) => staff.is_admin) || [];
  const generalStaff = sortedStaff.filter((staff) => !staff.is_admin) || [];

  // スタッフの招待
  const { trigger: createCompanyUserTrigger } =
    useCreateCompanyUserByRestaurantId({
      restaurantId,
      companyId,
    });

  const handleAddStaff = async (
    email: string,
    permissions: { canEdit: boolean; canManageJobs: boolean }
  ) => {
    if (!restaurantId) {
      toast({
        title: "エラーが発生しました",
        description: "店舗情報が見つかりません。",
        variant: "destructive",
      });
      return;
    }

    try {
      const data: CompanyusersCreateInput = {
        companies_id: companyId ?? "",
        email,
        can_edit: permissions.canEdit,
        can_manage_jobs: permissions.canManageJobs,
        restaurant_name: restaurantName ?? "",
      };
      await createCompanyUserTrigger(data);
      toast({
        title: "招待を送信しました",
        description: `${email}に招待メールを送信しました。`,
      });
    } catch (error) {
      console.error("Failed to invite staff:", error);
      toast({
        title: "エラーが発生しました",
        description: "招待の送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  // スタッフの削除
  const { trigger: deleteRestaurantStaffTrigger } =
    useDeleteCompanyUserByRestaurantId({
      restaurantId,
      companyId,
      companyUserId: deleteTargetStaff?.id,
      handleSuccess: () => {
        toast({
          title: "スタッフを削除しました",
          description: `${
            deleteTargetStaff?.companyuser.name ||
            deleteTargetStaff?.companyuser.email
          }をスタッフから削除しました。`,
        });
      },
      handleError: (error) => {
        console.error("Failed to delete staff:", error);
        toast({
          title: "エラーが発生しました",
          description: "スタッフの削除に失敗しました。",
          variant: "destructive",
        });
      },
      hadnleFinally: () => {
        setIsDeleting(false);
        setDeleteTargetStaff(null);
      },
    });

  const handleDeleteStaff = async () => {
    if (!deleteTargetStaff) return;

    setIsDeleting(true);
    deleteRestaurantStaffTrigger();
  };

  if (staffError) {
    return (
      <ErrorPage />
    );
  }

  if (isStaffLoading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium"></h3>
        <Button size="sm" onClick={() => setIsAddStaffModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          スタッフを追加
        </Button>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={3}>一般スタッフ</TableHead>
              </TableRow>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {generalStaff.length > 0 ?
                generalStaff.map((staff) => (
                  <TableRow key={`staff-${staff.id}`}>
                    <TableCell className="font-medium">
                      {staff.name}
                    </TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() =>
                              setDeleteTargetStaff({
                                id: staff.id,
                                companyuser: {
                                  name: staff.name,
                                  email: staff.email,
                                },
                              })
                            }>
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
                : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      一般スタッフは登録されていません
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>

        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={3}>管理者</TableHead>
              </TableRow>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminStaff.length > 0 ?
                adminStaff.map((staff) => (
                  <TableRow key={`staff-${staff.id}`}>
                    <TableCell className="font-medium">
                      {staff.name}
                    </TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))
                : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      管理者は登録されていません
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddRestaurantStaffModal
        isOpen={isAddStaffModalOpen}
        onClose={() => setIsAddStaffModalOpen(false)}
        onSubmit={handleAddStaff}
        restaurantName={restaurantName ?? ""}
      />

      <DeleteRestaurantStaffModal
        isOpen={!!deleteTargetStaff}
        onClose={() => setDeleteTargetStaff(null)}
        onConfirm={handleDeleteStaff}
        staffName={
          deleteTargetStaff?.companyuser.name ||
          deleteTargetStaff?.companyuser.email ||
          ""
        }
        isLoading={isDeleting}
      />
    </>
  )
};
