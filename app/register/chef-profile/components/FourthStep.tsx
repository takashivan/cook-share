"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Upload, User, X } from "lucide-react";
import { RestaurantCuisinesListData } from "@/api/__generated__/base/data-contracts";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { UpdateProfileForm } from "../page";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface FourthStepProps {
  register: UseFormRegister<UpdateProfileForm>;
  errors: FieldErrors<UpdateProfileForm>;
  cuisinesData?: RestaurantCuisinesListData;
  control: Control<UpdateProfileForm, any, UpdateProfileForm>;
  setValue: UseFormSetValue<UpdateProfileForm>;
  watch: UseFormWatch<UpdateProfileForm>;
}

export function FourthStep({
  register,
  errors,
  cuisinesData,
  control,
  setValue,
  watch,
}: FourthStepProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue("photo", file);
        setPreviewImage(reader.result as string);
        // setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("photo", null);
  };

  useEffect(() => {
    const photo = watch("photo");
    if (photo) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      }
      reader.readAsDataURL(photo);
    } else {
      setPreviewImage(null);
    }
  }, [watch("photo")]);
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-700">
          ジャンル（複数選択可）
        </Label>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {cuisinesData?.map((cuisine) => (
            <div
              key={cuisine.id}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
              <Controller
                name="categories"
                control={control}
                render={({ field }) => {
                  const isChecked = field.value?.includes(cuisine.id);

                  return (
                    <>
                      <Checkbox
                        id={`genre-${cuisine.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value ?? []), cuisine.id]
                            : field.value?.filter((v: number) => v !== cuisine.id);
                          field.onChange(newValue);
                        }}
                        className="border-gray-300 data-[state=checked]:bg-[#DB3F1C] data-[state=checked]:border-[#DB3F1C]"
                      />
                      <Label
                        htmlFor={`genre-${cuisine.id}`}
                        className="text-sm text-gray-700">
                        {cuisine.category}
                      </Label>
                    </>
                  )
                }}
              />
            </div>
          ))}
        </div>
        {errors.categories && (
          <p className="text-red-500 text-xs mt-1">
            {errors.categories.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Label
          htmlFor="bio"
          className="text-base font-semibold text-gray-700">
          自己紹介 *
        </Label>
        <Textarea
          id="bio"
          {...register("bio", {
            required: "自己紹介は必須です",
          })}
          placeholder="あなたの経験やスキル、得意な料理などをアピールしてください"
          className="min-h-[120px] border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
        />
        {errors.bio && (
          <p className="text-red-500 text-xs mt-1">
            {errors.bio.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-700">
          プロフィール画像
        </Label>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative w-24 h-24 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
            {previewImage ? (
              <Image
                src={previewImage || ""}
                alt="プロフィール画像"
                fill
                className="object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex gap-2">
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
              {previewImage && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveImage}>
                  <X className="h-4 w-4 mr-2" />
                  削除
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              プロフィール画像は任意です。JPG、PNG形式、5MB以下の画像をアップロードできます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
