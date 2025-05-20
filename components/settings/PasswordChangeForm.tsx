"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/AuthContext";

interface ChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeFormProps {
  userType: "company" | "chef";
}

export function PasswordChangeForm({
  userType,
}: PasswordChangeFormProps) {
  const { user: companyUser, login: companyLogin, changePassword: companyChangePassword } = useCompanyAuth();
  const { user: chefUser, login: chefLogin, changePassword: chefChangePassword } = useAuth();
  const user = userType === "company" ? companyUser : chefUser;
  const login = userType === "company" ? companyLogin : chefLogin;
  const changePassword = userType === "company" ? companyChangePassword : chefChangePassword;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ChangeForm>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const submit = async (data: ChangeForm) => {
    if (!user?.email) {
      toast({
        title: "エラー",
        description: "ユーザー情報が見つかりません",
        variant: "destructive",
      });
      return;
    }

    try {
      await login(user.email, data.currentPassword);
    } catch (error) {
      toast({
        title: "エラー",
        description: "現在のパスワードが間違っています",
        variant: "destructive",
      });
      return;
    }

    try {
      await changePassword(data.newPassword);
      toast({
        title: "成功",
        description: "パスワードが変更されました",
      });
      reset();
    } catch (error) {
      toast({
        title: "エラー",
        description: "パスワードの変更に失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>パスワード</CardTitle>
        <CardDescription>
          アカウントのパスワードを変更します
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(submit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">現在のパスワード</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="現在のパスワードを入力"
              {...register("currentPassword", { required: "現在のパスワードは必須です" })}
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">新しいパスワード</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="新しいパスワードを入力"
              {...register("newPassword", {
                required: "新しいパスワードは必須です",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上で入力してください",
                },
                validate: (value) =>
                  value !== watch("currentPassword") || "現在のパスワードと同じです",
              })}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="新しいパスワードを再入力"
              {...register("confirmPassword", {
                required: "パスワードの確認は必須です",
                validate: (value) =>
                  value === watch("newPassword") || "パスワードが一致しません",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "変更中..." : "変更を保存"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
