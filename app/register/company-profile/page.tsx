"use client";

import type React from "react";
import { useState } from "react";
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
import { Upload, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { createCompany } from "@/lib/api/company";
import { updateCompanyUser } from "@/lib/api/companyUser";
import { getAuthToken } from "@/lib/api/config";
import { toast } from "@/hooks/use-toast";

export default function CompanyProfilePage() {
  const router = useRouter();
  const { user, login } = useCompanyAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      const formData = new FormData(e.currentTarget);
      const companyData = {
        name: (formData.get("name") as string) || user.name,
        description: formData.get("description") as string,
        address: formData.get("address") as string,
        phone: formData.get("phone") as string,
        website: formData.get("website") as string,
        logo_url: profileImage || "",
        created_by: user.id,
        status: "approved",
        business_registration_number:
          (formData.get("business_registration_number") as string) || "",
      };
      console.log("Creating company with data:", companyData);

      // 会社を作成
      const createdCompany = await createCompany(companyData);
      console.log("Created company:", createdCompany);

      // ユーザーのcompanies_idを更新
      const updatedUser = await updateCompanyUser(user.id, {
        companies_id: createdCompany.id,
      });
      console.log("Updated user:", updatedUser);

      // ユーザー情報を更新して再ログイン
      const token = getAuthToken("company");
      if (!token) {
        throw new Error("認証トークンが見つかりません");
      }
      await login(token, updatedUser);

      toast({
        title: "会社情報を登録しました",
        description: "会社プロフィールの登録が完了しました。",
      });

      router.push("/");
    } catch (error) {
      console.error("Company creation failed:", error);
      toast({
        title: "エラーが発生しました",
        description: "会社情報の登録に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=30&width=30"
              alt="CookChef Logo"
              width={30}
              height={30}
              className="text-orange-500"
            />
            <span className="font-bold">CookChef</span>
            <span className="text-xs text-gray-500">(仮)</span>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 会社概要 */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-base">
                  会社概要
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="会社の概要や特徴を入力してください"
                  className="min-h-[120px]"
                  required
                />
              </div>

              {/* 所在地 */}
              <div className="space-y-3">
                <Label htmlFor="address" className="text-base">
                  所在地
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="東京都渋谷区..."
                  required
                />
              </div>

              {/* 電話番号 */}
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-base">
                  電話番号
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="03-xxxx-xxxx"
                  required
                />
              </div>

              {/* ウェブサイト */}
              <div className="space-y-3">
                <Label htmlFor="website" className="text-base">
                  ウェブサイト
                </Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://..."
                />
              </div>

              {/* 会社ロゴ */}
              <div className="space-y-3">
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
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/register/company">戻る</Link>
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}>
                  {isSubmitting ? "登録中..." : "会社情報を登録"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© cookchef Co.,Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
