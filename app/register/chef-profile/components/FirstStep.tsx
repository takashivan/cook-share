"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UpdateProfileForm } from "../page";

interface FirstStepProps {
  register: UseFormRegister<UpdateProfileForm>;
  errors: FieldErrors<UpdateProfileForm>;
}

export function FirstStep({
  register,
  errors,
}: FirstStepProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lastName" className="text-gray-700">
            姓 *
          </Label>
          <Input
            id="lastName"
            {...register("last_name", {
              required: "姓は必須です",
              pattern: {
                value: /^[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FFa-zA-Z.-]+$/,
                message: "漢字、ひらがな、カタカナ、ラテン文字、ドット、ダッシュのみ使用できます。",
              },
            })}
            className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
          />
          {errors.last_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="firstName" className="text-gray-700">
            名 *
          </Label>
          <Input
            id="firstName"
            {...register("given_name", {
              required: "名は必須です",
              pattern: {
                value: /^[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FFa-zA-Z.-]+$/,
                message: "漢字、ひらがな、カタカナ、ラテン文字、ドット、ダッシュのみ使用できます。",
              },
            })}
            className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
          />
          {errors.given_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.given_name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastNameKana" className="text-gray-700">
            セイ（カタカナ） *
          </Label>
          <Input
            id="lastNameKana"
            {...register("last_name_kana", {
              required: "セイ（カタカナ）は必須です",
              pattern: {
                value: /^[ァ-ヶー]+$/,
                message: "カタカナで入力してください",
              },
            })}
            className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
          />
          {errors.last_name_kana && (
            <p className="text-red-500 text-xs mt-1">
              {errors.last_name_kana.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="firstNameKana" className="text-gray-700">
            メイ（カタカナ） *
          </Label>
          <Input
            id="firstNameKana"
            {...register("given_name_kana", {
              required: "メイ（カタカナ）は必須です",
              pattern: {
                value: /^[ァ-ヶー]+$/,
                message: "カタカナで入力してください",
              },
            })}
            className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
          />
          {errors.given_name_kana && (
            <p className="text-red-500 text-xs mt-1">
              {errors.given_name_kana.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="phone" className="text-gray-700">
          電話番号 *
        </Label>
        <Input
          id="phone"
          {...register("phone", {
            required: "電話番号は必須です",
            // pattern: {
            //   value: /^0\d{1,3}-\d{1,4}-\d{4}$/,
            //   message: "正しい電話番号の形式で入力してください（例: 03-1234-5678）",
            // },
          })}
          className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>
    </div>
  );
};
