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

interface ChefProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  user: UserProfile;
}

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
    address: user.address || "",
    skills: user.skills || [],
    experience: user.experience || "",
    certifications: user.certifications || [],
    bio: user.bio || "",
    profile_image: user.profile_image || "",
    dateofbirth: user.dateofbirth || "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
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
      newCertification &&
      !formData.certifications.includes(newCertification)
    ) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification],
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
              <Label htmlFor="address">住所</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

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
              <Label htmlFor="experience">経験</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>スキル</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="新しいスキルを追加"
                />
                <Button type="button" onClick={handleAddSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>資格</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="新しい資格を追加"
                />
                <Button type="button" onClick={handleAddCertification}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline">
                    {cert}
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(cert)}
                      className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
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
