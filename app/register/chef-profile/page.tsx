"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useGetRestaurantCuisines } from "@/hooks/api/all/restaurantCuisines/useGetRestaurantCuisines";
import { format } from "date-fns";
import { CERTIFICATIONS } from "@/lib/const/chef-profile";
import { useForm } from "react-hook-form";
import { FirstStep } from "./components/FirstStep";
import { ProfilePartialUpdatePayload } from "@/api/__generated__/base/data-contracts";
import { SecondStep } from "./components/SecondStep";
import { ThirdStep } from "./components/ThirdStep";
import { FourthStep } from "./components/FourthStep";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type UpdateProfileForm = Omit<ProfilePartialUpdatePayload, "dateofbirth"> & {
  dateofbirth: Date;
  otherCertificate: string;
};

export default function ChefProfilePage() {
  const STEPS = [
    { id: 1, title: "基本情報", shortTitle: "基本" },
    { id: 2, title: "住所情報", shortTitle: "住所" },
    { id: 3, title: "スキル・経験", shortTitle: "スキル" },
    { id: 4, title: "ジャンル・自己紹介", shortTitle: "自己紹介" },
  ];

  const router = useRouter();
  const { user, loading: isUserLoading, createProfile } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);

  const { data: cuisinesData } = useGetRestaurantCuisines();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileForm>({
    defaultValues: {
      skills: [],
      certifications: [],
      otherCertificate: "",
      bio: "",
      experience_level: "3-5",
      photo: null,
      last_name: "",
      given_name: "",
      dateofbirth: new Date(1990, 0, 1), // デフォルト値を設定
      last_name_kana: "",
      given_name_kana: "",
      phone: "",
      postal_code: "",
      prefecture: "",
      city: "",
      town: "",
      street: "",
      address2: "",
      address: "",
    },
  });

  const submit = async (data: UpdateProfileForm) => {
    setError(null);

    if (!user?.id) {
      toast({
        title: "エラーが発生しました",
        description: "ユーザー情報が見つかりません。",
        variant: "destructive",
      });

      // ログインページにリダイレクト
      router.push("/login");
      return;
    }

    try {
      // 資格 - 「その他」を除外し、その他入力欄の値を配列に追加
      const certifications = data.certifications || [];
      const validCertifications = certifications.filter(
        (cert) =>
          CERTIFICATIONS.some((c) => c.label === cert) && cert !== "その他"
      );

      if (data.otherCertificate) {
        validCertifications.push(data.otherCertificate);
      }

      // 生年月日をフォーマット
      const dateofbirth = data.dateofbirth ? format(data.dateofbirth, "yyyy-MM-dd") : '';
      
      const newData = {
        last_name: data.last_name,
        given_name: data.given_name,
        last_name_kana: data.last_name_kana,
        given_name_kana: data.given_name_kana,
        phone: data.phone,
        postal_code: data.postal_code,
        prefecture: data.prefecture,
        city: data.city,
        town: data.town,
        street: data.street,
        address2: data.address2,
        bio: data.bio,
        experience_level: data.experience_level,
        photo: data.photo || null,
        skills: data.skills || [],
        email: user.email,
        dateofbirth,
        certifications: validCertifications,
        address: '',
        categories: data.categories || [],
        position_level: "1" as const,
      }

      const res = await createProfile(newData);
      if (res.error) {
        setError(res.error);
        return;
      }

      toast({
        title: "プロフィールを更新しました",
        description: "シェフプロフィールの更新が完了しました。",
      });

      router.push("/chef/onboard");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast({
        title: "エラーが発生しました",
        description:
          "プロフィールの更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isUserLoading) return;

    // 初回レンダリング時のみチェック
    if (checking) {
      if (!user) {
        // ユーザーがnullの場合（未ログイン）、ログインページにリダイレクト
        router.replace("/login");
        return;
      }

      if (user.profile_completed) {
        // プロフィールが既に完了している場合は、ダッシュボードにリダイレクト
        router.replace("/chef/dashboard");
        return;
      }
    }

    setChecking(false);
  }, [user, router]);

  useEffect(() => {
    // ステップ３の「次へ」を押すとステップ４の更新ボタンもクリックされてしまう時があるため、
    // ステップ４になるときに少し間を置いてから更新ボタンを活性化する
    if (currentStep === 4) {
      const timer = setTimeout(() => {
        setDisableUpdateButton(false);
      }, 100); // 100msの遅延を設定

      return () => clearTimeout(timer);
    } else {
      setDisableUpdateButton(true);
    }
  }, [currentStep, setDisableUpdateButton]);

  const handleNext = async () => {
    if (currentStep < STEPS.length) {
      // 現在のステップのバリデーションを実行
      const isValid = await trigger();
      if (!isValid) {
        // バリデーションエラーがある場合は次のステップに進まない
        return;
      }

      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FirstStep register={register} errors={errors} />
        )
      case 2:
        return (
          <SecondStep
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            trigger={trigger}
            watch={watch}
          />
        )
      case 3:
        return (
          <ThirdStep
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            watch={watch}
          />
        )
      case 4:
        return (
          <FourthStep
            register={register}
            errors={errors}
            cuisinesData={cuisinesData}
            control={control}
            setValue={setValue}
            watch={watch}
          />
        )
      default:
        return null;
    }
  };

  if (checking) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b bg-white shadow-sm">
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
        <Card className="max-w-3xl mx-auto shadow-lg border-0">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-gray-900">
              シェフプロフィール登録
            </CardTitle>
            <CardDescription className="text-gray-600">
              あなたのスキルや経験を登録して、最適な仕事とマッチングしましょう
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* プログレスバー */}
            <div className="mb-8">
              <div className="flex justify-between mb-2 px-2">
                {STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center flex-1 ${
                      step.id === currentStep
                        ? "text-[#DB3F1C]"
                        : step.id < currentStep
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}>
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mb-1 md:mb-2 text-sm md:text-base ${
                        step.id === currentStep
                          ? "bg-[#DB3F1C] text-white"
                          : step.id < currentStep
                          ? "bg-gray-200 text-gray-600"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                      {step.id}
                    </div>
                    <span className="text-xs md:text-sm text-center">
                      <span className="hidden md:inline">{step.title}</span>
                      <span className="md:hidden">{step.shortTitle}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative h-1.5 md:h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-full bg-[#DB3F1C] rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit(submit)} className="space-y-6 md:space-y-8">
              {renderStepContent()}

              <div className="mt-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>エラー</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex justify-between pt-4 md:pt-6">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 text-sm md:text-base">
                    <ChevronLeft className="w-4 h-4 mr-1 md:mr-2" />
                    前へ
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    type="button"
                    asChild
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 text-sm md:text-base">
                    <Link href="/register">戻る</Link>
                  </Button>
                )}
                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#DB3F1C] hover:bg-[#DB3F1C]/90 text-white text-sm md:text-base">
                    次へ
                    <ChevronRight className="w-4 h-4 ml-1 md:ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#DB3F1C] hover:bg-[#DB3F1C]/90 text-white text-sm md:text-base"
                    disabled={isSubmitting || disableUpdateButton}>
                    {isSubmitting ? "更新中..." : "プロフィールを更新"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
