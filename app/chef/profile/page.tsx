"use client";

import { useState, useEffect } from "react";
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
  CreditCard,
} from "lucide-react";
import { updateUserProfile } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ChefProfileEditModal } from "@/components/modals/ChefProfileEditModal";
import {
  changeEmail,
  confirmEmail,
  getUserProfile,
  UserProfile,
} from "@/lib/api/user";
import { createStripeAccountLink } from "@/lib/api/user";

export default function ChefProfile() {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(authUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authUser?.id) {
        try {
          const fullProfile = await getUserProfile(authUser.id);
          setUser(fullProfile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [authUser?.id]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

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

  const handleSave = async (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
  };

  const handleStripeAccountLink = async () => {
    if (user.id) {
      const res = await createStripeAccountLink(user.id);
      if (res.response.result.url) {
        const stripeWindow = window.open(res.response.result.url, "_blank");
        if (!stripeWindow) {
          throw new Error(
            "ポップアップがブロックされました。ブラウザの設定を確認してください。"
          );
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">プロフィール</h1>
        <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
          <Edit className="w-4 h-4 mr-2" />
          編集
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4">
            {user.profile_image ? (
              <Image
                src={user.profile_image}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xl">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          {user.bio && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                自己紹介
              </h3>
              <p className="text-gray-800">{user.bio}</p>
            </div>
          )}

          {user.skills && user.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">スキル</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {user.experience && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">経験</h3>
              <p className="text-gray-800">{user.experience}</p>
            </div>
          )}

          {user.certifications && user.certifications.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">資格</h3>
              <div className="flex flex-wrap gap-2">
                {user.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">連絡先情報</h3>
        <div className="space-y-4">
          {user.phone && (
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-800">{user.phone}</span>
            </div>
          )}
          {user.email && (
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-800">{user.email}</span>
            </div>
          )}
          {user.address && (
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-800">{user.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* 支払い情報 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">支払い情報</h3>
        <Button variant="outline" onClick={() => handleStripeAccountLink()}>
          Stripeアカウントを設定
        </Button>

        <div className="space-y-4">
          {user.stripe_verified && (
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-800">
                Stripeアカウントが登録されています。
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          ログアウト
        </Button>
      </div>

      <ChefProfileEditModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSave={handleSave}
        user={user}
      />
    </div>
  );
}
