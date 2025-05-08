"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { X, Upload, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UserProfile, updateUserProfile } from "@/lib/api/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface ChefProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  user: UserProfile;
}

// スキルと経験年数の選択肢
const SKILLS = [
  "和食",
  "洋食",
  "中華",
  "イタリアン",
  "フレンチ",
  "エスニック",
  "デザート",
  "パン",
  "その他",
] as const;

const EXPERIENCE_LEVELS = [
  { value: "未経験", label: "未経験" },
  { value: "1年未満", label: "1年未満" },
  { value: "1-3年", label: "1-3年" },
  { value: "3-5年", label: "3-5年" },
  { value: "5-10年", label: "5-10年" },
  { value: "10年以上", label: "10年以上" },
] as const;

const CERTIFICATIONS = [
  { id: "fugu", label: "ふぐ調理師免許" },
  { id: "sushi", label: "寿司職人" },
  { id: "ramen", label: "ラーメン職人" },
  { id: "pastry", label: "製菓衛生師" },
  { id: "wine", label: "ソムリエ" },
  { id: "other", label: "その他" },
] as const;

export function ChefProfileEditModal({
  isOpen,
  onClose,
  onSave,
  user,
}: ChefProfileEditModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender || "",
    phone: user.phone || "",
    email: user.email,
    postal_code: user.postal_code || "",
    address: user.address || "",
    skills: user.skills || [],
    experience: user.experience_level || "",
    certifications: user.certifications || [],
    bio: user.bio || "",
    profile_image: user.profile_image || "",
    dateofbirth: user.dateofbirth || "",
  });
  const [otherCertificate, setOtherCertificate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    user.dateofbirth ? new Date(user.dateofbirth) : undefined
  );
  const [showAddressFields, setShowAddressFields] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handlePostalCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const postalCode = e.target.value.replace(/-/g, "");
    setFormData((prev) => ({
      ...prev,
      postal_code: postalCode,
    }));

    if (postalCode.length === 7) {
      try {
        const response = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
        );
        const data = await response.json();

        if (data.results) {
          const address = data.results[0];
          setFormData((prev) => ({
            ...prev,
            address: `${address.address1}${address.address2}${address.address3}`,
          }));
          setShowAddressFields(true);
        }
      } catch (error) {
        console.error("郵便番号検索エラー:", error);
      }
    }
  };

  const handleExperienceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: value,
    }));
  };

  const handleCertificateChange = (certId: string) => {
    const cert = CERTIFICATIONS.find((c) => c.id === certId);
    if (!cert) return;

    setFormData((prev) => {
      const newCertifications = prev.certifications.includes(cert.label)
        ? prev.certifications.filter((c) => c !== cert.label)
        : [...prev.certifications, cert.label];

      // その他が選択された場合、他の資格をクリア
      if (certId === "other") {
        return {
          ...prev,
          certifications: newCertifications,
        };
      }

      // その他以外が選択された場合、その他の資格をクリア
      if (prev.certifications.includes("その他")) {
        return {
          ...prev,
          certifications: newCertifications.filter((c) => c !== "その他"),
        };
      }

      return {
        ...prev,
        certifications: newCertifications,
      };
    });

    if (certId === "other") {
      setOtherCertificate("");
    }
  };

  const handleOtherCertificateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setOtherCertificate(value);
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes("その他")
        ? [...prev.certifications.filter((c) => c !== "その他"), value]
        : prev.certifications,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    setFormData((prev) => ({
      ...prev,
      profile_image: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              formDataToSend.append(`${key}[]`, item);
            });
          } else {
            formDataToSend.append(key, value);
          }
        }
      });
      if (selectedFile) {
        formDataToSend.append("photo", selectedFile);
      } else if (formData.profile_image) {
        formDataToSend.append("profile_image", formData.profile_image);
      }
      const updatedProfile = await updateUserProfile(user.id, formDataToSend);
      onSave(updatedProfile);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>プロフィール編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>プロフィール画像</Label>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  {previewImage || formData.profile_image ? (
                    <Image
                      src={previewImage || formData.profile_image}
                      alt="プロフィール画像"
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
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="relative"
                    onClick={() =>
                      document.getElementById("profile-image")?.click()
                    }>
                    <Upload className="h-4 w-4 mr-2" />
                    画像を選択
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </Button>
                  {(previewImage || formData.profile_image) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleRemoveImage}>
                      <X className="h-4 w-4 mr-2" />
                      削除
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="postal_code">郵便番号</Label>
              <Input
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handlePostalCodeChange}
                placeholder="例: 1234567"
                maxLength={7}
              />
            </div>

            {showAddressFields && (
              <div>
                <Label htmlFor="address">住所</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <Label htmlFor="dateofbirth">生年月日</Label>
              <Input
                id="dateofbirth"
                name="dateofbirth"
                type="date"
                value={formData.dateofbirth}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="bio">自己紹介</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="experience">経験年数</Label>
              <Select
                value={formData.experience}
                onValueChange={handleExperienceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="経験年数を選択" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>スキル</Label>
              <div className="grid grid-cols-2 gap-2">
                {SKILLS.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`skill-${skill}`}
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor={`skill-${skill}`}>{skill}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>資格</Label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`cert-${cert.id}`}
                      checked={formData.certifications.includes(cert.label)}
                      onChange={() => handleCertificateChange(cert.id)}
                      className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor={`cert-${cert.id}`}>{cert.label}</label>
                  </div>
                ))}
              </div>
              {formData.certifications.includes("その他") && (
                <div className="mt-2">
                  <Input
                    value={otherCertificate}
                    onChange={handleOtherCertificateChange}
                    placeholder="その他の資格を入力"
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "保存中..." : "保存"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
