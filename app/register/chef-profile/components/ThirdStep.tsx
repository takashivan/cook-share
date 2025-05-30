"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CERTIFICATIONS, EXPERIENCE_LEVELS, POSITION_LEVEL, SKILLS } from "@/lib/const/chef-profile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { UpdateProfileForm } from "../page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ThirdStepProps {
  register: UseFormRegister<UpdateProfileForm>;
  errors: FieldErrors<UpdateProfileForm>;
  control: Control<UpdateProfileForm, any, UpdateProfileForm>;
  setValue: UseFormSetValue<UpdateProfileForm>;
  watch: UseFormWatch<UpdateProfileForm>;
}

export function ThirdStep({
  register,
  errors,
  control,
  setValue,
  watch,
}: ThirdStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-700">
          スキル（複数選択可） *
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
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
        {errors.skills && (
          <p className="text-red-500 text-xs mt-1">
            {errors.skills.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-700">
          調理経験年数 *
        </Label>
        <Controller
          name="experience_level"
          control={control}
          rules={{
            required: "経験年数を選択してください",
          }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
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
        {errors.experience_level && (
          <p className="text-red-500 text-xs mt-1">
            {errors.experience_level.message}
          </p>
        )}
      </div>
      
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-700">
          経験ポジション *
        </Label>
        <Controller
          name="position_level"
          control={control}
          rules={{
            required: "経験ポジションを選択してください",
          }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="ポジションを選択" />
              </SelectTrigger>
              <SelectContent>
                {POSITION_LEVEL.map((position) => (
                  <SelectItem
                    key={position.id}
                    value={position.value}
                    className="text-sm text-gray-600"
                  >
                    {position.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.position_level && (
          <p className="text-red-500 text-xs mt-1">
            {errors.position_level.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-700">
          保有資格（複数選択可）
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
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
                            setValue("otherCertificate", "");
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
        {errors.certifications && (
          <p className="text-red-500 text-xs mt-1">
            {errors.certifications.message}
          </p>
        )}
        {watch("certifications")?.includes("その他") && (
          <>
            <div className="pt-2">
              <Input
                {...register("otherCertificate")}
                placeholder="その他の資格を入力"
                className="border-gray-200 focus:border-[#DB3F1C] focus:ring-[#DB3F1C]/20"
              />
            </div>
            {errors.otherCertificate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.otherCertificate.message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}