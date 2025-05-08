"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Upload, User, ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { updateUserProfile } from "@/lib/api/user";
import { toast } from "@/hooks/use-toast";
import { useGetRestaurantCuisines } from "@/hooks/api/all/restaurantCuisines/useGetRestaurantCuisines";
import axios from "axios";

const STEPS = [
  { id: 1, title: "基本情報", shortTitle: "基本" },
  { id: 2, title: "住所情報", shortTitle: "住所" },
  { id: 3, title: "スキル・経験", shortTitle: "スキル" },
  { id: 4, title: "ジャンル・自己紹介", shortTitle: "自己紹介" },
];

export default function ChefProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { data: cuisinesData } = useGetRestaurantCuisines();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>(
    []
  );
  const [otherCertificate, setOtherCertificate] = useState("");
  const [showOtherCertificate, setShowOtherCertificate] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phone, setPhone] = useState("");
  const [genreError, setGenreError] = useState("");
  const [nameError, setNameError] = useState("");
  const [kanaError, setKanaError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");

  const skills = [
    { id: "fish-cutting", label: "魚が捌ける" },
    { id: "japanese-cuisine", label: "和食" },
    { id: "western-cuisine", label: "洋食" },
    { id: "chinese-cuisine", label: "中華" },
    { id: "italian-cuisine", label: "イタリアン" },
    { id: "french-cuisine", label: "フレンチ" },
    { id: "dessert", label: "デザート" },
    { id: "bread", label: "パン" },
  ];

  const certificates = [
    { id: "cooking-license", label: "調理師免許" },
    { id: "fugu-license", label: "ふぐ調理師免許" },
    { id: "other", label: "その他" },
  ];

  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleCertificateChange = (certificate: string) => {
    if (certificate === "other") {
      setShowOtherCertificate(!showOtherCertificate);
      if (showOtherCertificate) {
        setSelectedCertificates((prev) => prev.filter((c) => c !== "other"));
      } else {
        setSelectedCertificates((prev) => [...prev, "other"]);
      }
    } else {
      setSelectedCertificates((prev) =>
        prev.includes(certificate)
          ? prev.filter((c) => c !== certificate)
          : [...prev, certificate]
      );
    }
  };

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

  const handlePostalCodeBlur = async () => {
    if (postalCode.length === 7) {
      try {
        const res = await axios.get(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
        );
        if (res.data && res.data.results && res.data.results[0]) {
          const result = res.data.results[0];
          setAddress1(`${result.address1}${result.address2}${result.address3}`);
          setAddress2("");
        }
      } catch (e) {
        // 住所自動補完失敗時は何もしない
      }
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

    // バリデーション
    if (selectedSkills.length === 0) {
      toast({
        title: "スキルを選択してください",
        description: "少なくとも1つのスキルを選択する必要があります。",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const profileData = {
        name: user.name,
        email: user.email,
        skills: selectedSkills,
        certifications: selectedCertificates,
        bio: formData.get("bio") as string,
        experience_level: formData.get("experience_level") as string,
        photo: profileImage || null,
      };
      console.log("profileData", profileData);

      await updateUserProfile(user.id, profileData);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  // カタカナバリデーション関数
  const validateKana = (value: string) => {
    const kanaRegex = /^[ァ-ヶー]+$/;
    return kanaRegex.test(value);
  };

  // カタカナのバリデーションをリアルタイムで実行
  useEffect(() => {
    if (lastNameKana) {
      setKanaError(
        validateKana(lastNameKana) ? "" : "カタカナで入力してください"
      );
    }
  }, [lastNameKana]);

  useEffect(() => {
    if (firstNameKana) {
      setKanaError(
        validateKana(firstNameKana) ? "" : "カタカナで入力してください"
      );
    }
  }, [firstNameKana]);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
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
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastName" className="text-gray-700">
                  姓
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
                />
              </div>
              <div>
                <Label htmlFor="firstName" className="text-gray-700">
                  名
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
                />
              </div>
              <div>
                <Label htmlFor="lastNameKana" className="text-gray-700">
                  セイ（カタカナ）
                </Label>
                <Input
                  id="lastNameKana"
                  value={lastNameKana}
                  onChange={(e) => setLastNameKana(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
                />
                {kanaError && lastNameKana && (
                  <p className="text-red-500 text-xs mt-1">{kanaError}</p>
                )}
              </div>
              <div>
                <Label htmlFor="firstNameKana" className="text-gray-700">
                  メイ（カタカナ）
                </Label>
                <Input
                  id="firstNameKana"
                  value={firstNameKana}
                  onChange={(e) => setFirstNameKana(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
                />
                {kanaError && firstNameKana && (
                  <p className="text-red-500 text-xs mt-1">{kanaError}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-700">
                電話番号
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^0-9]/g, ""))
                }
                required
                className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="postalCode" className="text-gray-700">
                  郵便番号
                </Label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) =>
                    setPostalCode(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  maxLength={7}
                  onBlur={handlePostalCodeBlur}
                  required
                  className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address1" className="text-gray-700">
                  住所（都道府県・市区町村）
                </Label>
                <Input
                  id="address1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
                />
              </div>
              <div className="col-span-3">
                <Label htmlFor="address2" className="text-gray-700">
                  住所（それ以降の住所・番地・建物名など）
                </Label>
                <Input
                  id="address2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-base font-semibold text-gray-700">
                スキル（複数選択可）
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill.id}
                      checked={selectedSkills.includes(skill.id)}
                      onCheckedChange={() => handleSkillChange(skill.id)}
                      className="border-gray-300 data-[state=checked]:bg-[#DB3F1C] data-[state=checked]:border-[#DB3F1C]"
                    />
                    <Label
                      htmlFor={skill.id}
                      className="text-sm font-normal text-gray-600">
                      {skill.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold text-gray-700">
                調理経験年数
              </Label>
              <RadioGroup defaultValue="3-5" name="experience_level">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="10+"
                      id="exp-10"
                      className="border-gray-300 text-[#DB3F1C]"
                    />
                    <Label
                      htmlFor="exp-10"
                      className="text-sm font-normal text-gray-600">
                      10年以上
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="5-10"
                      id="exp-5-10"
                      className="border-gray-300 text-[#DB3F1C]"
                    />
                    <Label
                      htmlFor="exp-5-10"
                      className="text-sm font-normal text-gray-600">
                      5年以上10年未満
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="3-5"
                      id="exp-3-5"
                      className="border-gray-300 text-[#DB3F1C]"
                    />
                    <Label
                      htmlFor="exp-3-5"
                      className="text-sm font-normal text-gray-600">
                      3年以上5年未満
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="1-3"
                      id="exp-1-3"
                      className="border-gray-300 text-[#DB3F1C]"
                    />
                    <Label
                      htmlFor="exp-1-3"
                      className="text-sm font-normal text-gray-600">
                      1年以上3年未満
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold text-gray-700">
                保有資格（複数選択可）
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cert.id}
                      checked={selectedCertificates.includes(cert.id)}
                      onCheckedChange={() => handleCertificateChange(cert.id)}
                      className="border-gray-300 data-[state=checked]:bg-[#DB3F1C] data-[state=checked]:border-[#DB3F1C]"
                    />
                    <Label
                      htmlFor={cert.id}
                      className="text-sm font-normal text-gray-600">
                      {cert.label}
                    </Label>
                  </div>
                ))}
              </div>
              {showOtherCertificate && (
                <div className="pt-2">
                  <Input
                    placeholder="その他の資格を入力"
                    value={otherCertificate}
                    onChange={(e) => setOtherCertificate(e.target.value)}
                    className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-base font-semibold text-gray-700">
                ジャンル（複数選択可）
              </Label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {cuisinesData?.map((cuisine: any) => (
                  <div
                    key={cuisine.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                    <Checkbox
                      id={`genre-${cuisine.id}`}
                      checked={selectedGenres.includes(cuisine.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGenres([...selectedGenres, cuisine.id]);
                        } else {
                          setSelectedGenres(
                            selectedGenres.filter((id) => id !== cuisine.id)
                          );
                        }
                      }}
                      className="border-gray-300 data-[state=checked]:bg-[#DB3F1C] data-[state=checked]:border-[#DB3F1C]"
                    />
                    <Label
                      htmlFor={`genre-${cuisine.id}`}
                      className="text-sm text-gray-700">
                      {cuisine.category}
                    </Label>
                  </div>
                ))}
              </div>
              {genreError && (
                <p className="text-red-500 text-xs">{genreError}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label
                htmlFor="bio"
                className="text-base font-semibold text-gray-700">
                自己紹介
              </Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="あなたの経験やスキル、得意な料理などをアピールしてください"
                className="min-h-[120px] border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold text-gray-700">
                プロフィール画像（任意）
              </Label>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="relative w-24 h-24 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="profile-image"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700">
                    <Upload className="h-4 w-4" />
                    画像をアップロード
                  </Label>
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    プロフィール画像は任意です。JPG、PNG形式、5MB以下の画像をアップロードできます
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/chef_illust/chef_logo.png?height=200&width=400"
              alt="CookChef Logo"
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

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {renderStepContent()}

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
                    disabled={isSubmitting}>
                    {isSubmitting ? "更新中..." : "プロフィールを更新"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t bg-white py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© cookchef Co.,Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
