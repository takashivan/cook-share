import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { JobsCreatePayload } from "@/api/__generated__/base/data-contracts";
import { formatDateToLocalISOStringForDatetimeLocal } from "@/lib/functions";

type BaseCreateForm = Omit<
  JobsCreatePayload,
  "start_time" | "end_time" | "expiry_date"
>;
interface CreateJobForm extends BaseCreateForm {
  start_time: string;
  end_time: string;
  expiry_date: string;
}

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JobsCreatePayload) => Promise<void>;
  restaurantId: number;
  initialData?: Partial<JobsCreatePayload>;
}

export const CreateJobModal = ({
  isOpen,
  onClose,
  onSubmit,
  restaurantId,
  initialData,
}: CreateJobModalProps) => {
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control,
  } = useForm<CreateJobForm>({
    defaultValues: {
      restaurant_id: restaurantId,
      status: "DRAFT",
      required_skills: [],
      work_date: new Date().toISOString().split("T")[0],
      start_time: "10:00",
      end_time: "18:00",
      fee: 12000,
      transportation_type: "NONE",
      transportation_amount: undefined,
    },
  });

  // initialDataが変更されたときにフォームの値を更新
  useEffect(() => {
    if (initialData) {
      console.log("initialData:", initialData);
      Object.entries(initialData).forEach(([key, value]) => {
        if (key === "start_time" || key === "end_time") {
          // 時間のフォーマットを調整
          let timeValue = "";
          if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
            timeValue = new Date(value).toLocaleTimeString("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          }
          setValue(key, timeValue);
        } else if (key === "expiry_date") {
          // 日時のフォーマットを調整
          const dateValue = value
            ? formatDateToLocalISOStringForDatetimeLocal(
                new Date(value as string | number | Date)
              )
            : "";
          setValue(key, dateValue); 
        } else {
          setValue(key as keyof CreateJobForm, value as CreateJobForm[keyof CreateJobForm]);
        }
      });
    }
  }, [initialData, setValue]);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const removeImage = () => {
  //   setPreviewImage(null);
  //   setSelectedFile(null);
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  const handleClose = () => {
    reset();
    // setPreviewImage(null);
    // setSelectedFile(null);
    onClose();
  };

  const submit = handleSubmit(async (data) => {
    const status = data.status;

    try {
      // 日付文字列を作成（YYYY-MM-DDThh:mm:ss）
      const startDateTimeStr = `${data.work_date}T${data.start_time}:00`;
      const endDateTimeStr = `${data.work_date}T${data.end_time}:00`;
      const expiryTimestamp = `${data.expiry_date}:00`;

      // Unix タイムスタンプを計算（ミリ秒単位）
      const startTimestamp = Date.parse(startDateTimeStr);
      const endTimestamp = Date.parse(endDateTimeStr);
      const expiryDateTimestamp = Date.parse(expiryTimestamp);

      const newData: JobsCreatePayload = {
        ...data,
        restaurant_id: restaurantId,
        start_time: startTimestamp,
        end_time: endTimestamp,
        expiry_date: expiryDateTimestamp,
        transportation_type: data.transportation_type,
        transportation_amount:
          data.transportation_type === "NONE"
            ? 0
            : Number(data.transportation_amount),
      };
      // 不要なフィールドを除外
      delete (newData as any).transportation;

      await onSubmit(newData);
      handleClose();
      toast({
        title:
          status === "PUBLISHED"
            ? "求人を公開しました"
            : "下書きを保存しました",
        description:
          status === "PUBLISHED"
            ? "求人が公開されました。"
            : "求人の下書きが保存されました。",
      });
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description:
          status === "PUBLISHED"
            ? "求人の公開に失敗しました。もう一度お試しください。"
            : "下書きの保存に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  });

  const handleDraftClick = () => {
    setValue("status", "DRAFT");
    submit();
  };

  const handlePublishClick = () => {
    setValue("status", "PUBLISHED");
    submit();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900 mb-6">
                  新しい求人を追加
                </Dialog.Title>

                <form onSubmit={submit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">求人タイトル *</Label>
                      <Input
                        id="title"
                        {...register("title", {
                          required: "タイトルは必須です",
                        })}
                        className="mt-1"
                        placeholder="例：超人気店で仕込みのお手伝いをしてください！"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="description">求人詳細 *</Label>
                      <Textarea
                        id="description"
                        {...register("description", {
                          required: "詳細は必須です",
                        })}
                        className="mt-1"
                        rows={4}
                        placeholder="求人の詳細な説明を入力してください"
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="work_date">勤務日 *</Label>
                        <Input
                          id="work_date"
                          type="date"
                          {...register("work_date", {
                            required: "勤務日は必須です",
                            min: {
                              value: new Date().toISOString().split("T")[0],
                              message:
                                "勤務日は今日以降の日付で設定してください",
                            },
                            onChange: (e) => {
                              // 締め切り日を勤務日＋開始時間と同じにする
                              const selectedDate = e.target.value;
                              const startTime = watch("start_time");
                              if (startTime) {
                                const newExpiryDate = `${selectedDate}T${startTime}`;
                                setValue("expiry_date", newExpiryDate);
                              }
                              setValue("work_date", e.target.value);
                            },
                          })}
                          className="mt-1"
                        />
                        {errors.work_date && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.work_date.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start_time">開始時間 *</Label>
                          <Input
                            id="start_time"
                            type="time"
                            {...register("start_time", {
                              required: "開始時間は必須です",
                              onChange: (e) => {
                                // 締め切り日を勤務日＋開始時間と同じにする
                                const selectedTime = e.target.value;
                                const workDate = watch("work_date");
                                if (workDate) {
                                  const newExpiryDate = `${workDate}T${selectedTime}`;
                                  setValue("expiry_date", newExpiryDate);
                                }
                                setValue("start_time", e.target.value);
                              },
                            })}
                            className="mt-1"
                          />
                          {errors.start_time && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.start_time.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="end_time">終了時間 *</Label>
                          <Input
                            id="end_time"
                            type="time"
                            {...register("end_time", {
                              required: "終了時間は必須です",
                              validate: (value) => {
                                const formValues = watch();
                                const startTime = new Date(
                                  `${formValues.work_date}T${formValues.start_time}:00`
                                );
                                const endTime = new Date(
                                  `${formValues.work_date}T${value}:00`
                                );
                                if (endTime <= startTime) {
                                  return "終了時間は開始時間より後の時間で設定してください";
                                }
                                return true;
                              },
                            })}
                            className="mt-1"
                          />
                          {errors.end_time && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.end_time.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="fee">報酬額 *</Label>
                        <Input
                          id="fee"
                          type="number"
                          {...register("fee", {
                            required: "報酬額は必須です",
                            validate: (value) => {
                              const formValues = watch();
                              if (
                                !formValues.start_time ||
                                !formValues.end_time
                              )
                                return true;

                              const startTime = new Date(
                                `2000-01-01T${formValues.start_time}:00`
                              );
                              const endTime = new Date(
                                `2000-01-01T${formValues.end_time}:00`
                              );

                              // 終了時間が開始時間より前の場合は翌日の時間として計算
                              if (endTime < startTime) {
                                endTime.setDate(endTime.getDate() + 1);
                              }

                              const hours =
                                (endTime.getTime() - startTime.getTime()) /
                                (1000 * 60 * 60);
                              const hourlyRate = Number(value) / hours;

                              if (hourlyRate < 1850) {
                                return `時給ベースで1850円を下回らないように設定してください（現在: ${Math.floor(
                                  hourlyRate
                                )}円）`;
                              }
                              return true;
                            },
                          })}
                          className="mt-1"
                          placeholder="例：12000"
                        />
                        {errors.fee && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.fee.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="expiry_date">締め切り *</Label>
                        <Input
                          id="expiry_date"
                          type="datetime-local"
                          {...register("expiry_date", {
                            required: "締め切りは必須です",
                            min: {
                              value: formatDateToLocalISOStringForDatetimeLocal(
                                new Date()
                              ),
                              message:
                                "締め切りは今日以降の日付で設定してください",
                            },

                            validate: (value) => {
                              const formValues = watch();
                              if (
                                formValues.work_date &&
                                formValues.start_time &&
                                formValues.end_time &&
                                value != null
                              ) {
                                const expiryDate = new Date(`${value}:00`);
                                const startTime = new Date(
                                  `${formValues.work_date}T${formValues.start_time}:00`
                                );

                                if (expiryDate > startTime) {
                                  return "締め切りは勤務日より前の日付で設定してください";
                                }

                                return true;
                              }
                              return false;
                            },
                          })}
                          className="mt-1"
                        />
                        {errors.expiry_date && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.expiry_date.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="task">業務内容</Label>
                      <Textarea
                        id="task"
                        {...register("task")}
                        className="mt-1"
                        rows={3}
                        placeholder="具体的な業務内容を入力してください"
                      />
                    </div>

                    <div>
                      <Label htmlFor="skill">必要なスキル</Label>
                      <Input
                        id="skill"
                        {...register("skill")}
                        className="mt-1"
                        placeholder="例：調理師免許"
                      />
                    </div>

                    <div>
                      <Label htmlFor="whattotake">持ち物</Label>
                      <Input
                        id="whattotake"
                        {...register("whattotake")}
                        className="mt-1"
                        placeholder="例：エプロン、包丁"
                      />
                    </div>

                    <div>
                      <Label htmlFor="transportation_type">交通費</Label>
                      <Controller
                        name="transportation_type"
                        control={control}
                        defaultValue="NONE"
                        render={({ field: { onChange, value } }) => (
                          <RadioGroup
                            value={value}
                            onValueChange={onChange}
                            className="flex gap-4 mt-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="NONE" id="none" />
                              <Label htmlFor="none" className="cursor-pointer">
                                交通費なし
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="MAX" id="max" />
                              <Label htmlFor="max" className="cursor-pointer">
                                上限
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="FIXED" id="fixed" />
                              <Label htmlFor="fixed" className="cursor-pointer">
                                一律
                              </Label>
                            </div>
                          </RadioGroup>
                        )}
                      />
                      {(watch("transportation_type") === "MAX" ||
                        watch("transportation_type") === "FIXED") && (
                        <div className="mt-2 flex items-center gap-2">
                          <Input
                            id="transportation_amount"
                            type="number"
                            min={0}
                            {...register("transportation_amount", {
                              required:
                                watch("transportation_type") !== "NONE"
                                  ? "金額を入力してください"
                                  : false,
                              min: {
                                value: 0,
                                message: "0円以上で入力してください",
                              },
                              validate: (value) => {
                                if (
                                  (watch("transportation_type") === "MAX" ||
                                    watch("transportation_type") === "FIXED") &&
                                  (!value || value <= 0)
                                ) {
                                  return "金額を入力してください";
                                }
                                return true;
                              },
                            })}
                            className="w-32"
                            placeholder="金額"
                          />
                          <span>円</span>
                        </div>
                      )}
                      {errors.transportation_amount && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.transportation_amount.message as string}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="note">備考</Label>
                      <Textarea
                        id="note"
                        {...register("note")}
                        className="mt-1"
                        rows={2}
                        placeholder="その他の情報を入力してください"
                      />
                    </div>

                    <div>
                      <Label htmlFor="point">ポイント</Label>
                      <Input
                        id="point"
                        {...register("point")}
                        className="mt-1"
                        placeholder="例：美味しいまかないがあります！"
                      />
                    </div>

                    {/* <div className="col-span-full">
                      <Label htmlFor="photo">求人画像</Label>
                      <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        {previewImage ? (
                          <div className="relative">
                            <Image
                              src={previewImage}
                              alt="プレビュー画像"
                              width={200}
                              height={200}
                              className="rounded-lg object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-300" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500">
                                <span>画像をアップロード</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  ref={fileInputRef}
                                  onChange={handleImageChange}
                                />
                              </label>
                              <p className="pl-1">またはドラッグ＆ドロップ</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div> */}
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      disabled={isSubmitting}>
                      キャンセル
                    </Button>
                    <Button
                      type="button"
                      onClick={handleDraftClick}
                      variant="secondary"
                      disabled={isSubmitting}>
                      {isSubmitting && watch("status") === "DRAFT"
                        ? "保存中..."
                        : "下書きとして保存"}
                    </Button>
                    <Button
                      type="button"
                      onClick={handlePublishClick}
                      disabled={isSubmitting}>
                      {isSubmitting && watch("status") === "PUBLISHED"
                        ? "公開中..."
                        : "公開する"}
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
