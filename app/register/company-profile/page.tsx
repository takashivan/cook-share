"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { getAuthToken } from "@/lib/api/config";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useCreateCompany } from "@/hooks/api/companyuser/companies/useCreateCompany";
import { InitialCreatePayload } from "@/api/__generated__/company/data-contracts";

export default function CompanyProfilePage() {
  const router = useRouter();
  const { user, reloadUser, isLoading } = useCompanyAuth();
  // const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);

  const {
    trigger: initializeCompanyTrigger,
  } = useCreateCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialCreatePayload>();

  const onSubmit = async (data: InitialCreatePayload) => {
    if (!user?.id) {
      toast({
        title: "エラーが発生しました",
        description: "ユーザー情報が見つかりません。",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await initializeCompanyTrigger({
        ...data,
        companyUser_id: user.id,
      })

      const token = getAuthToken("company");
      if (!token) throw new Error("認証トークンが見つかりません");

      await reloadUser();

      toast({
        title: "会社情報を登録しました",
        description: "会社プロフィールの登録が完了しました。",
      });

      router.push("/");
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "会社情報の登録に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setProfileImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    // ユーザー情報ロード中は何もしない
    if (isLoading) return;

    // 初回レンダリング時のみチェック
    if (checking) {
      // ユーザーがnullの場合（未ログイン）、ログインページにリダイレクト
      if (!user) {
        router.replace("/login/company");
        return;
      }

      // プロフィールが既に完了している場合は、ダッシュボードにリダイレクト
      if (user.companies_id != null) {
        router.replace("/admin");
        return;
      }
    }

    setChecking(false);
  }, [user, router, isLoading, checking]);

  if (checking) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/chef_illust/chef_logo.png?height=200&width=400"
              alt="CHEFDOM Logo"
              width={120}
              height={30}
              className="text-orange-500"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              会社プロフィール登録
            </CardTitle>
            <CardDescription>
              会社の詳細情報を登録して、シェフとマッチングしましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* 社名 */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-base">社名 *</Label>
                <Input
                  id="name"
                  placeholder="株式会社CHEFDOM"
                  {...register("name", {
                    required: "社名は必須です",
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* 会社概要 */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-base">会社概要 *</Label>
                <Textarea
                  id="description"
                  placeholder="会社の概要や特徴を入力してください"
                  className="min-h-[120px]"
                  {...register("description", {
                    required: "会社概要は必須です", 
                  })}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* 所在地 */}
              <div className="space-y-3">
                <Label htmlFor="address" className="text-base">所在地 *</Label>
                <Input
                  id="address"
                  placeholder="東京都渋谷区..."
                  {...register("address", {
                    required: "所在地は必須です", 
                  })}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* 電話番号 */}
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-base">電話番号 *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="03-xxxx-xxxx"
                  {...register("phone", {
                    required: "電話番号は必須です", 
                  })}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* ウェブサイト */}
              <div className="space-y-3">
                <Label htmlFor="website" className="text-base">ウェブサイト</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://..."
                  {...register("website")}
                />
              </div>

              {/* 会社ロゴ */}
              {/* <div className="space-y-3">
                <Label className="text-base">会社ロゴ（任意）</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Company logo preview"
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <Building2 className="h-12 w-12 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="company-logo"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                      <Upload className="h-4 w-4" />
                      ロゴをアップロード
                    </Label>
                    <Input
                      id="company-logo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      会社ロゴは任意です。JPG、PNG形式、5MB以下の画像をアップロードできます
                    </p>
                  </div>
                </div>
              </div> */}

              <div className="flex justify-between pt-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/register/company">戻る</Link>
                </Button>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "登録中..." : "会社情報を登録"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
