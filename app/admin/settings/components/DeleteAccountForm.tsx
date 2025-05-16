"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteAccountForm {
  password: string;
}

export function DeleteAccountForm() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const router = useRouter();
  const { deleteAccount } = useCompanyAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: DeleteAccountForm) => {
    try {
      await deleteAccount(data.password);
      toast({
        title: "成功",
        description: "アカウントが削除されました",
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "アカウントの削除に失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">アカウント削除</CardTitle>
          <CardDescription>
            アカウントを完全に削除します。この操作は元に戻せません。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsAlertOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            アカウントを削除
          </Button>
        </CardContent>
      </Card>
      <AlertDialog
        open={isAlertOpen}
        onOpenChange={(open) => {
          setIsAlertOpen(open);
          if (!open) {
            reset();
          }
        }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>アカウントを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              アカウントを削除すると、このアカウントのすべてのデータが完全に削除されます。<br />
              この操作は元に戻せません。<br />
              本当に削除する場合、アカウントのパスワードを入力してください。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                type="password"
                id="password"
                {...register("password", {
                  required: "パスワードは必須です",
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel
                type="button"
                onClick={() => {
                  setIsAlertOpen(false);
                  reset();
                }}
              >
                キャンセル
              </AlertDialogCancel>
              <Button
                variant="destructive"
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="bg-red-600 hover:bg-red-700">
                削除する
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
