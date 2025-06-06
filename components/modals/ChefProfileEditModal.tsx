"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CERTIFICATIONS, EXPERIENCE_LEVELS, POSITION_LEVEL, SKILLS } from "@/lib/const/chef-profile";
import { Controller, useForm } from "react-hook-form";
import { RestaurantCuisinesListData, UsersPartialUpdatePayload } from "@/api/__generated__/base/data-contracts";
import { Checkbox } from "../ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/contexts/AuthContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoginCreateData } from "@/api/__generated__/authentication/data-contracts";

interface ChefProfileEditModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  user: LoginCreateData["user"];
  cuisinesData?: RestaurantCuisinesListData;
}

export function ChefProfileEditModal({
  isOpen,
  onCloseAction,
  user,
  cuisinesData,
}: ChefProfileEditModalProps) {
  const { update } = useAuth();

  const [otherCertificate, setOtherCertificate] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAddressFields, setShowAddressFields] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
    watch,
    reset,
    trigger,
  } = useForm<Partial<UsersPartialUpdatePayload>>({
    defaultValues: {
      skills: user.skills || [],
      experience_level: user.experience_level || "",
      position_level: user.position_level || "",
      bio: user.bio || "",
      certifications: user.certifications || [],
      categories: user.categories || [],
      dateofbirth: user.dateofbirth || "",
      profile_image: user.profile_image || "",
      phone: user.phone || "",
      last_name: user.last_name || "",
      given_name: user.given_name || "",
      last_name_kana: user.last_name_kana || "",
      given_name_kana: user.given_name_kana || "",
      postal_code: user.postal_code || "",
      prefecture: user.prefecture || "",
      address2: user.address2 || "",
      city: user.city || "",
      town: user.town || "",
      street: user.street || "",
    },
    values: {
      skills: user.skills || [],
      experience_level: user.experience_level || "",
      position_level: user.position_level || "",
      bio: user.bio || "",
      certifications: user.certifications || [],
      categories: user.categories || [],
      dateofbirth: user.dateofbirth || "",
      profile_image: user.profile_image || "",
      phone: user.phone || "",
      last_name: user.last_name || "",
      given_name: user.given_name || "",
      last_name_kana: user.last_name_kana || "",
      given_name_kana: user.given_name_kana || "",
      postal_code: user.postal_code || "",
      prefecture: user.prefecture || "",
      address2: user.address2 || "",
      city: user.city || "",
      town: user.town || "",
      street: user.street || "",
    },
  })

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.replace(/[^0-9]/g, "");
    setValue("phone", phone);
    trigger("phone");
  }

  const handlePostalCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const postalCode = e.target.value.replace(/-/g, "");
    setValue("postal_code", postalCode);
    const isValid = await trigger("postal_code");

    if (isValid && postalCode.length === 7) {
      try {
        const response = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
        );
        const data = await response.json();

        if (data.status === 200 && data.results) {
          const address = data.results[0];
          setValue("prefecture", address.address1);
          setValue("city", address.address2);
          setValue("town", address.address3);
          setShowAddressFields(true);
        } else {
          toast({
            title: "エラー",
            description: "住所が見つかりませんでした",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("郵便番号検索エラー:", error);
        toast({
          title: "エラー",
          description: "住所の取得に失敗しました",
          variant: "destructive",
        });
      }
    }
  };

  const handleOtherCertificateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setOtherCertificate(value);
  };

  useEffect(() => {
    if (isOpen && user) {
      // 保有資格のうち、CERTIFICATIONSに含まれないものがあればテキストボックスに表示し、「その他」を選択状態にする
      const otherCertification = user.certifications?.find(
        (cert) => !CERTIFICATIONS.some((c) => c.label === cert)
      );
      if (otherCertification != null) {
        setOtherCertificate(otherCertification);
        setValue("certifications", [
          ...user.certifications ?? [],
          "その他",
        ]);
      }
    }
  }, [isOpen, user, setValue])

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
    setValue("profile_image", "");
  };

  const submit = async (data: Partial<UsersPartialUpdatePayload>) => {
    try {
      const certifications = data.certifications || [];
      const validCertifications = certifications.filter(
        (cert) =>
          CERTIFICATIONS.some((c) => c.label === cert) && cert !== "その他"
      );

      if (otherCertificate) {
        validCertifications.push(otherCertificate);
      }

      data.certifications = validCertifications;

      if (selectedFile) {
        data.photo = selectedFile;
      }

      await update(data);

      toast({
        title: "成功",
        description: "プロフィールが更新されました",
      });
      handleClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "エラー",
        description: "プロフィールの更新に失敗しました",
        variant: "destructive",
      });
    }
  };


  const handleClose = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    setOtherCertificate("");
    setShowAddressFields(true);
    reset();
    onCloseAction();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>プロフィール編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>プロフィール画像</Label>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  {previewImage || watch("profile_image") ? (
                    <Image
                      src={previewImage || watch("profile_image") || ""}
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
                  {(previewImage || watch("profile_image")) && (
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastName">姓 *</Label>
                <Input
                  id="lastName"
                  {...register("last_name", {
                    required: "姓は必須です",
                    pattern: {
                      value: /^[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FFa-zA-Z.-]+$/,
                      message: "漢字、ひらがな、カタカナ、ラテン文字、ドット、ダッシュのみ使用できます。",
                    },
                  })}
                />
              </div>
              <div>
                <Label htmlFor="firstName">名 *</Label>
                <Input
                  id="firstName"
                  {...register("given_name", {
                    required: "名は必須です",
                    pattern: {
                      value: /^[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FFa-zA-Z.-]+$/,
                      message: "漢字、ひらがな、カタカナ、ラテン文字、ドット、ダッシュのみ使用できます。",
                    },
                  })}
                />
              </div>
            </div>

            {errors.last_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.last_name.message}
              </p>
            )}
            {errors.given_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.given_name.message}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastName">セイ（カタカナ） *</Label>
                <Input
                  id="lastNameKana"
                  {...register("last_name_kana", {
                    required: "セイ（カタカナ）は必須です",
                    pattern: {
                      value: /^[ァ-ヶー]+$/,
                      message: "カタカナで入力してください",
                    },
                  })}
                />
              </div>
              <div>
                <Label htmlFor="firstNameKana">メイ（カタカナ） *</Label>
                <Input
                  id="firstNameKana"
                  {...register("given_name_kana", {
                    required: "メイ（カタカナ）は必須です",
                    pattern: {
                      value: /^[ァ-ヶー]+$/,
                      message: "カタカナで入力してください",
                    },
                  })}
                />
              </div>
            </div>

            {errors.last_name_kana && (
              <p className="mt-1 text-sm text-red-600">
                {errors.last_name_kana.message}
              </p>
            )}
            {errors.given_name_kana && (
              <p className="mt-1 text-sm text-red-600">
                {errors.given_name_kana.message}
              </p>
            )}

            <div>
              <Label htmlFor="phone">電話番号 *</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "電話番号は必須です",
                })}
                onChange={handlePhoneChange}
              />
            </div>

            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}

            <div>
              <Label htmlFor="dateofbirth">生年月日 *</Label>
              <Input
                id="dateofbirth"
                type="date"
                {...register("dateofbirth", {
                  required: "生年月日は必須です",
                })}
              />
            </div>

            {errors.dateofbirth && (
              <p className="mt-1 text-sm text-red-600">
                {errors.dateofbirth.message}
              </p>
            )}

            <div>
              <Label htmlFor="postal_code">郵便番号 *</Label>
              <Input
                id="postal_code"
                placeholder="例: 1234567"
                maxLength={7}
                {...register("postal_code", {
                  required: "郵便番号は必須です",
                })}
                onChange={handlePostalCodeChange}
              />
            </div>

            {errors.postal_code && (
              <p className="mt-1 text-sm text-red-600">
                {errors.postal_code.message}
              </p>
            )}

            {showAddressFields && (
              <>
                <div>
                  <Label htmlFor="prefecture">都道府県 *</Label>
                  <Input
                    id="prefecture"
                    {...register("prefecture", { required: "都道府県は必須です。郵便番号が正しいか確認してください" })}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="city">市区町村 *</Label>
                  <Input
                    id="city"
                    {...register("city", { required: "市区町村は必須です。郵便番号が正しいか確認してください" })}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="town">町名 *</Label>
                  <Input
                    id="town"
                    {...register("town", { required: "町名は必須です。郵便番号が正しいか確認してください" })}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="street">丁目・番地・号 *</Label>
                  <Input
                    id="street"
                    placeholder="例: 1-2-3"
                    {...register("street", {
                      required: "丁目・番地・号は必須です",
                    })}
                  />
                </div>

                {errors.street && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.street.message}
                  </p>
                )}

                <div>
                  <Label htmlFor="address2">建物名・部屋番号</Label>
                  <Input
                    id="address2"
                    placeholder="例: 〇〇マンション101"
                    {...register("address2")}
                  />
                </div>

                {errors.address2 && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address2.message}
                  </p>
                )}
              </>
            )}

            <div>
              <Label>スキル（複数選択可） *</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {SKILLS.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Controller
                      name="skills"
                      control={control}
                      rules={{
                        validate: (value) => value && value.length > 0 || "スキルを1つ以上選択してください",
                      }}
                      render={({ field }) => {
                        const isChecked = field.value?.includes(skill.label);

                        return (
                          <>
                            <Checkbox
                              id={`skill-${skill.id}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...(field.value ?? []), skill.label]
                                  : field.value?.filter((v: string) => v !== skill.label);
                                field.onChange(newValue);
                              }}
                              className="border-gray-300 data-[state=checked]:bg-[#DB3F1C] data-[state=checked]:border-[#DB3F1C]"
                            />
                            <Label
                              htmlFor={`skill-${skill.id}`}
                              className="text-sm font-normal text-gray-600">
                              {skill.label}
                            </Label>
                          </>
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>


            <div>
              <Label htmlFor="experience">調理経験年数 *</Label>
              <Controller
                name="experience_level"
                control={control}
                rules={{
                  required: "経験年数は必須です",
                }}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-2 gap-2 mt-1">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={level.value}
                          id={level.id}
                          className="border-gray-300 text-[#DB3F1C]"
                        />
                        <Label
                          htmlFor={level.id}
                          className="text-sm font-normal text-gray-600">
                          {level.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {errors.experience_level && (
              <p className="mt-1 text-sm text-red-600">
                {errors.experience_level.message}
              </p>
            )}

            <div>
              <Label htmlFor="position">経験ポジション *</Label>
              <Controller
                name="position_level"
                control={control}
                rules={{
                  required: "経験ポジションは必須です",
                }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="ポジションを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITION_LEVEL.map((position) => (
                        <SelectItem
                          key={position.id}
                          value={position.value}
                          className="text-sm text-gray-600">
                          {position.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {errors.position_level && (
              <p className="mt-1 text-sm text-red-600">
                {errors.position_level.message}
              </p>
            )}

            <div>
              <Label>保有資格（複数選択可）</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 mt-1">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id} className="flex items-center space-x-2">
                    <Controller
                      name="certifications"
                      control={control}
                      render={({ field }) => {
                        const isChecked = field.value?.includes(cert.label);

                        return (
                          <>
                            <Checkbox
                              id={`certification-${cert.id}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const newCertifications = checked
                                  ? [...(field.value ?? []), cert.label]
                                  : field.value?.filter((v: string) => v !== cert.label);
                                field.onChange(newCertifications);

                                // その他が選択された場合、その他入力欄を初期化
                                if (cert.id === "other") {
                                  setOtherCertificate("");
                                }
                              }}
                              className="border-gray-300 data-[state=checked]:bg-[#DB3F1C] data-[state=checked]:border-[#DB3F1C]"
                            />
                            <Label
                              htmlFor={`certification-${cert.id}`}
                              className="text-sm font-normal text-gray-600">
                              {cert.label}
                            </Label>
                          </>
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
              {watch("certifications")?.includes("その他") && (
                <div className="mt-2">
                  <Input
                    value={otherCertificate}
                    onChange={handleOtherCertificateChange}
                    placeholder="その他の資格を入力"
                  />
                </div>
              )}
            </div>

            {errors.certifications && (
              <p className="mt-1 text-sm text-red-600">
                {errors.certifications.message}
              </p>
            )}

            <div>
              <Label htmlFor="cuisines">ジャンル（複数選択可）</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 mt-1">
                {cuisinesData?.map((cuisine) => (
                  <div
                    key={cuisine.id}
                    className="flex items-center space-x-2">
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
                              className="text-sm font-normal text-gray-600">
                              {cuisine.category}
                            </Label>
                          </>
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="bio">自己紹介 *</Label>
              <Textarea
                id="bio"
                rows={4}
                {...register("bio", {
                  required: "自己紹介は必須です",
                })}
                placeholder="あなたの経験やスキル、得意な料理などをアピールしてください"
              />
            </div>

            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} className="mt-2 sm:mt-0">
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
