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

interface ChefProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  profileData: {
    name: string;
    gender?: string;
    phone?: string;
    email: string;
    address?: string;
    skills: string[];
    experience?: string;
    certifications: string[];
    bio: string;
    profileImage: string;
  };
}

export function ChefProfileEditModal({
  isOpen,
  onClose,
  onSave,
  profileData,
}: ChefProfileEditModalProps) {
  const [formData, setFormData] = useState(profileData);
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleAddCertification = () => {
    if (
      newCertification.trim() !== "" &&
      !formData.certifications.includes(newCertification.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()],
      }));
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c !== cert),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>プロフィール編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* プロフィール画像 */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Image
                src={
                  formData.profileImage ||
                  "/placeholder.svg?height=100&width=100&text=山"
                }
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white">
                <Upload className="h-4 w-4" />
                <span className="sr-only">画像をアップロード</span>
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              クリックして画像をアップロード
            </p>
          </div>

          {/* 基本情報 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">基本情報</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">性別</Label>
              <select
                id="gender"
                name="gender"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.gender}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, gender: e.target.value }))
                }>
                <option value="男性">男性</option>
                <option value="女性">女性</option>
                <option value="その他">その他</option>
                <option value="回答しない">回答しない</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">住所</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* スキル・経験 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">スキル・経験</h3>

            <div className="space-y-2">
              <Label htmlFor="skills">スキル</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-gray-500 hover:text-gray-700">
                      <X className="h-3 w-3" />
                      <span className="sr-only">削除</span>
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="newSkill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="新しいスキルを追加"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddSkill}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">追加</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">経験年数</Label>
              <select
                id="experience"
                name="experience"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.experience}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }>
                <option value="1年未満">1年未満</option>
                <option value="1-3年">1-3年</option>
                <option value="3-5年">3-5年</option>
                <option value="5-10年">5-10年</option>
                <option value="10年以上">10年以上</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certifications">保有資格</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.certifications.map((cert, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-1">
                    {cert}
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(cert)}
                      className="text-gray-500 hover:text-gray-700">
                      <X className="h-3 w-3" />
                      <span className="sr-only">削除</span>
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="newCertification"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="新しい資格を追加"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddCertification}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">追加</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">自己紹介</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit">保存する</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
