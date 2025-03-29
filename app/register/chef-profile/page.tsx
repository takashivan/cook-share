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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Upload, User } from "lucide-react";

export default function ChefProfilePage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>(
    []
  );
  const [otherCertificate, setOtherCertificate] = useState("");
  const [showOtherCertificate, setShowOtherCertificate] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでフォームデータを処理し、APIに送信する
    console.log({
      skills: selectedSkills,
      certificates: selectedCertificates,
      otherCertificate,
      profileImage,
      // フォームの他のフィールドもここで取得
    });
    // 登録完了後、ダッシュボードなどにリダイレクト
    // router.push('/dashboard')
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
              シェフプロフィール登録
            </CardTitle>
            <CardDescription>
              あなたのスキルや経験を登録して、最適な仕事とマッチングしましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* スキル選択 */}
              <div className="space-y-3">
                <Label className="text-base">スキル（複数選択可）</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill.id}
                        checked={selectedSkills.includes(skill.id)}
                        onCheckedChange={() => handleSkillChange(skill.id)}
                      />
                      <Label htmlFor={skill.id} className="text-sm font-normal">
                        {skill.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 経験年数 */}
              <div className="space-y-3">
                <Label className="text-base">調理経験年数</Label>
                <RadioGroup defaultValue="3-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10+" id="exp-10" />
                      <Label htmlFor="exp-10" className="text-sm font-normal">
                        10年以上
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5-10" id="exp-5-10" />
                      <Label htmlFor="exp-5-10" className="text-sm font-normal">
                        5年以上10年未満
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3-5" id="exp-3-5" />
                      <Label htmlFor="exp-3-5" className="text-sm font-normal">
                        3年以上5年未満
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-3" id="exp-1-3" />
                      <Label htmlFor="exp-1-3" className="text-sm font-normal">
                        1年以上3年未満
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* 資格 */}
              <div className="space-y-3">
                <Label className="text-base">保有資格（複数選択可）</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={cert.id}
                        checked={selectedCertificates.includes(cert.id)}
                        onCheckedChange={() => handleCertificateChange(cert.id)}
                      />
                      <Label htmlFor={cert.id} className="text-sm font-normal">
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
                    />
                  </div>
                )}
              </div>

              {/* 自己紹介 */}
              <div className="space-y-3">
                <Label htmlFor="bio" className="text-base">
                  自己紹介
                </Label>
                <Textarea
                  id="bio"
                  placeholder="あなたの経験やスキル、得意な料理などをアピールしてください"
                  className="min-h-[120px]"
                />
              </div>

              {/* プロフィール写真 */}
              <div className="space-y-3">
                <Label className="text-base">プロフィール写真</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 border rounded-full overflow-hidden flex items-center justify-center bg-gray-50">
                    {profileImage ? (
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="profile-image"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                      <Upload className="h-4 w-4" />
                      写真をアップロード
                    </Label>
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG、PNG形式、5MB以下の画像をアップロードしてください
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/register">戻る</Link>
                </Button>
                <Button type="submit">登録を完了する</Button>
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
