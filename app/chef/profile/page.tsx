"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Award,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ChefProfileEditModal } from "@/components/modals/ChefProfileEditModal";

export default function ChefProfile() {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-md">
        <p className="text-center text-red-500">ユーザーが見つかりません</p>
      </div>
    );
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = (data: any) => {
    console.log(data);
  };

  const demoProfileData = {
    name: user.name,
    email: user.email,
    gender: user.gender || "未設定",
    phone: user.phone || "未設定",
    address: user.address || "未設定",
    skills: ["和食", "洋食", "中華"],
    experience: user.experience_level || "未設定",
    certifications: ["調理師免許", "食品衛生責任者"],
    bio: user.bio || "自己紹介が未設定です",
    profileImage: user.profile_image || "",
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-8">プロフィール</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Image
              src={
                user.profile_image ||
                `/placeholder.svg?height=80&width=80&text=${user.name.charAt(
                  0
                )}`
              }
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <button className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-1">
              <Edit className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500">
              {user.age}歳・{user.gender}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-500">電話番号</h3>
              <p>{user.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-500">メールアドレス</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-500">住所</h3>
              <p>{user.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-500">登録日</h3>
              <p>
                {user.created_at
                  ? format(user.created_at, "yyyy年MM月dd日", {
                      locale: ja,
                    })
                  : "未設定"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">スキル・経験</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsEditModalOpen(true);
            }}>
            <Edit className="h-4 w-4 mr-2" />
            編集
          </Button>
        </div>

        <ChefProfileEditModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          onSave={handleSave}
          profileData={demoProfileData}
        />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500 mb-2">スキル</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills?.map((skill: string, index: number) => (
                <Badge
                  key={index}
                  className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">経験年数</h3>
            <p>{user.experience_level}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">保有資格</h3>
            {user.certifications?.map((cert: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span>{cert}</span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">自己紹介</h3>
            <p className="text-sm">{user.bio}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Link
          href="/chef/account-settings"
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <span>アカウント設定</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link
          href="/chef/notification-settings"
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <span>通知設定</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link
          href="/chef/payment-settings"
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <span>支払い設定</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Button variant="outline" className="w-full mt-6" asChild>
          <Link href="/logout">ログアウト</Link>
        </Button>
      </div>
    </div>
  );
}
