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
import { CompanyuserPartialUpdatePayload } from "@/api/__generated__/base/data-contracts";
import { toast } from "@/hooks/use-toast";

export default function ProfileForm() {
  const { user, update } = useCompanyAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Partial<CompanyuserPartialUpdatePayload>>({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
    },
  });

  const handleProfileSubmit = async (data: Partial<CompanyuserPartialUpdatePayload>) => {
    try {
      await update(data);
      toast({
        title: "更新成功",
        description: "プロフィール情報が正常に更新されました。",
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "プロフィール情報の更新に失敗しました。",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    {/* <div className="grid gap-6 md:grid-cols-[250px_1fr]">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-background border-2 border-muted h-8 w-8">
                <Camera className="h-4 w-4" />
                <span className="sr-only">プロフィール画像を変更</span>
              </Button>
            </div>
            <h2 className="text-lg font-medium">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {user.department} - {user.position}
            </p>
          </div>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>プロフィール情報</CardTitle>
          <CardDescription>
            アカウントの基本情報を管理します
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleProfileSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">氏名 *</Label>
              <Input
                id="name"
                {...register("name", {
                  required: "氏名は必須です",
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "保存中..." : "変更を保存"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
