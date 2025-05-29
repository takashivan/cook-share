"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form";
import { UpdateProfileForm } from "../page";
import { toast } from "@/hooks/use-toast";

interface SecondStepProps {
  register: UseFormRegister<UpdateProfileForm>;
  errors: FieldErrors<UpdateProfileForm>;
  control: Control<UpdateProfileForm, any, UpdateProfileForm>;
  trigger: UseFormTrigger<UpdateProfileForm>;
  setValue: UseFormSetValue<UpdateProfileForm>;
  watch: UseFormWatch<UpdateProfileForm>;
}

export function SecondStep({
  register,
  errors,
  control,
  trigger,
  setValue,
  watch,
}: SecondStepProps) {
  // 年の配列を生成（1900年から現在の年まで）
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleResetAddress = () => {
    setValue("prefecture", "");
    setValue("city", "");
    setValue("town", "");
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
        } else {
          toast({
            title: "エラー",
            description: "住所が見つかりませんでした",
            variant: "destructive",
          });

          handleResetAddress();
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        toast({
            title: "エラー",
            description: "住所の取得に失敗しました",
            variant: "destructive",
          });

        handleResetAddress();
      }
    } else {
      handleResetAddress();
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date_of_birth">生年月日 *</Label>
          <Controller
            name="dateofbirth"
            control={control}
            rules={{
              required: "生年月日を選択してください",
            }}
            render={({ field, fieldState }) => {
              const date = field.value;

              const handleDateChange = (
                type: "year" | "month" | "day",
                value: string
              ) => {
                let newDate: Date;

                if (!date) {
                  newDate = new Date(1990, 0, 1);
                } else {
                  newDate = new Date(date);
                }

                if (type === "year") {
                  newDate.setFullYear(parseInt(value));
                } else if (type === "month") {
                  newDate.setMonth(parseInt(value) - 1);
                } else if (type === "day") {
                  newDate.setDate(parseInt(value));
                }

                field.onChange(newDate);
              };

              return (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    {/* 年 */}
                    <Select
                      value={date ? date.getFullYear().toString() : ""}
                      onValueChange={(value) => handleDateChange("year", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="年" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}年
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* 月 */}
                    <Select
                      value={
                        date ? (date.getMonth() + 1).toString().padStart(2, "0") : ""
                      }
                      onValueChange={(value) => handleDateChange("month", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="月" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem
                            key={month}
                            value={month.toString().padStart(2, "0")}
                          >
                            {month}月
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* 日 */}
                    <Select
                      value={
                        date ? date.getDate().toString().padStart(2, "0") : ""
                      }
                      onValueChange={(value) => handleDateChange("day", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="日" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem
                            key={day}
                            value={day.toString().padStart(2, "0")}
                          >
                            {day}日
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {fieldState.error && (
                    <p className="text-sm text-red-600 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              );
            }}
          />
        </div>

        {/* 郵便番号 */}
        <div className="space-y-2">
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
          {errors.postal_code && (
            <p className="text-red-500 text-xs mt-1">
              {errors.postal_code.message}
            </p>
          )}
        </div>

        {watch("prefecture") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="prefecture">都道府県 *</Label>
              <Input
                id="prefecture"
                {...register("prefecture", { required: "都道府県は必須です。郵便番号が正しいか確認してください" })}
                readOnly
                className="bg-gray-50"
              />
              {errors.prefecture && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.prefecture.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">市区町村 *</Label>
              <Input
                id="city"
                {...register("city", { required: "市区町村は必須です。郵便番号が正しいか確認してください" })}
                readOnly
                className="bg-gray-50"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="town">町名 *</Label>
              <Input
                id="town"
                {...register("town", { required: "町名は必須です" })}
                readOnly
                className="bg-gray-50"
              />
              {errors.town && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.town.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">丁目・番地・号 *</Label>
              <Input
                id="street"
                {...register("street", { required: "丁目・番地・号は必須です" })}
                placeholder="例: 1-2-3"
              />
              {errors.street && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2">建物名・部屋番号</Label>
              <Input
                id="address2"
                {...register("address2")}
                placeholder="例: サンハイツ101"
              />
              {errors.address2 && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address2.message}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
