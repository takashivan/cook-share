"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface ChangeForm {
  newEmail: string;
  confirmEmail: string;
  password: string;
}

interface EmailChangeFormProps {
  userType: "company" | "chef";
}

export function EmailChangeForm({
  userType,
}: EmailChangeFormProps) {
  const router = useRouter();
  const { user: companyUser, login: companyLogin, changeEmail: companyChangeEmail } = useCompanyAuth();
  const { user: chefUser, login: chefLogin, changeEmail: chefChangeEmail } = useAuth();
  const user = userType === "company" ? companyUser : chefUser;
  const login = userType === "company" ? companyLogin : chefLogin;
  const changeEmail = userType === "company" ? companyChangeEmail : chefChangeEmail;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ChangeForm>({
    defaultValues: {
      newEmail: "",
      confirmEmail: "",
      password: "",
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
      await login(user.email, data.password);
    } catch (error) {
      toast({
        title: "エラー",
        description: "パスワードが間違っています",
        variant: "destructive",
      });
      return;
    }

    try {
      await changeEmail(data.newEmail);
      toast({
        title: "成功",
        description: "メールアドレスの変更を受け付けました",
      });
      reset();

      router.push(
        userType === "company" ? "/email-changed/company/verify-email" : "/email-changed/chef/verify-email"
      );
    } catch (error) {
      toast({
        title: "エラー",
        description: "メールアドレスの変更に失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>メールアドレス</CardTitle>
        <CardDescription>
          アカウントのメールアドレスを変更します
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(submit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-email">現在のメールアドレス</Label>
            <Input
              id="current-email"
              type="email"
              value={user?.email}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email">新しいメールアドレス</Label>
            <Input
              id="new-email"
              type="email"
              placeholder="新しいメールアドレスを入力"
              {...register("newEmail", {
                required: "新しいメールアドレスは必須です",
                validate: (value) =>
                  value !== user?.email || "現在のメールアドレスと同じです",
              })}
            />
            {errors.newEmail && (
              <p className="mt-1 text-sm text-red-600">
                {errors.newEmail.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-email">新しいメールアドレス（確認）</Label>
            <Input
              id="confirm-email"
              type="email"
              placeholder="新しいメールアドレスを再入力"
              {...register("confirmEmail", {
                required: "確認のため再入力してください",
                validate: (value) =>
                  value === watch("newEmail") || "メールアドレスが一致しません",
              })}
            />
            {errors.confirmEmail && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmEmail.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード（確認）</Label>
            <Input
              id="password"
              type="password"
              placeholder="現在のパスワードを入力"
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
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "変更中..." : "変更を保存"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
};