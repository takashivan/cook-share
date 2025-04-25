import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Job } from "@/types";
import { format } from "date-fns";
import { JobsDetailData, JobsPartialUpdatePayload } from "@/api/__generated__/base/data-contracts";

interface UpdateJob extends Omit<JobsPartialUpdatePayload, 'start_time' | 'end_time' | 'expiry_date'> {
  start_time: string;
  end_time: string;
  expiry_date: string;
}

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JobsPartialUpdatePayload) => Promise<void>;
  job: JobsDetailData['job'];
}

export const EditJobModal = ({
  isOpen,
  onClose,
  onSubmit,
  job,
}: EditJobModalProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    job?.image || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 日付と時間のフォーマット
  const formatDate = (dateString: string | number) => {
    if (!dateString) return "";
    try {
      const date =
        typeof dateString === "string"
          ? new Date(dateString)
          : new Date(dateString);
      return format(date, "yyyy-MM-dd");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const formatTime = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return format(date, "HH:mm");
    } catch (error) {
      console.error("Error formatting time:", error);
      return "";
    }
  };

  const formatExpiryDateTime = (timestamp: number) => {
    try {
      // タイムスタンプをミリ秒に変換
      const date = new Date(timestamp);
      // datetime-localの形式に変換 (YYYY-MM-DDThh:mm)
      return format(date, "yyyy-MM-dd'T'HH:mm");
    } catch (error) {
      console.error("Error formatting expiry date:", error);
      return "";
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateJob>({
    defaultValues: {
      title: job?.title || "",
      description: job?.description || "",
      work_date: job?.work_date ? formatDate(job.work_date) : "",
      hourly_rate: job?.hourly_rate || 12000,
      start_time: job?.start_time ? formatTime(job.start_time) : "",
      end_time: job?.end_time ? formatTime(job.end_time) : "",
      task: job?.task || "",
      skill: job?.skill || "",
      whattotake: job?.whattotake || "",
      transportation: job?.transportation || "",
      note: job?.note || "",
      point: job?.point || "",
      status: job?.status || "",
      required_skills: job?.required_skills || [],
      fee: job?.fee || 12000,
      number_of_spots: job?.number_of_spots || 1,
      expiry_date: job?.expiry_date
        ? formatExpiryDateTime(job.expiry_date)
        : "",
    },
  });

  // jobが変更されたときにフォームをリセット
  useEffect(() => {
    if (job) {
      console.log("Resetting form with job data:", job);
      reset({
        title: job.title || "",
        description: job.description || "",
        work_date: formatDate(job.work_date),
        hourly_rate: job.hourly_rate || 12000,
        start_time: formatTime(job.start_time),
        end_time: formatTime(job.end_time),
        task: job.task || "",
        skill: job.skill || "",
        whattotake: job.whattotake || "",
        transportation: job.transportation || "",
        note: job.note || "",
        point: job.point || "",
        status: job.status || "",
        required_skills: job.required_skills || [],
        fee: job.fee || 12000,
        number_of_spots: job.number_of_spots || 1,
        expiry_date: job.expiry_date
          ? formatExpiryDateTime(job.expiry_date)
          : "",
      });
      setPreviewImage(job.image || null);
    }
  }, [job, reset]);

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

  const removeImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmitHandler = handleSubmit(async (data) => {
    try {
      // const formData = new FormData();

      // 日付文字列を作成（YYYY-MM-DDThh:mm:ss）
      const startDateTimeStr = `${data.work_date}T${data.start_time}:00`;
      const endDateTimeStr = `${data.work_date}T${data.end_time}:00`;
      const expiryTimestamp =`${data.expiry_date}:00`;

      // Unix タイムスタンプを計算（ミリ秒単位）
      const startTimestamp = Date.parse(startDateTimeStr);
      const endTimestamp = Date.parse(endDateTimeStr);
      const expiryDateTimestamp = Date.parse(expiryTimestamp);

      // FormDataにデータを追加
      // Object.entries(data).forEach(([key, value]) => {
      //   if (key === "start_time") {
      //     formData.append(key, startTimestamp.toString());
      //   } else if (key === "end_time") {
      //     formData.append(key, endTimestamp.toString());
      //   } else if (Array.isArray(value)) {
      //     value.forEach((item) => formData.append(key + "[]", item.toString()));
      //   } else {
      //     formData.append(key, value.toString());
      //   }
      // });

      // 既存のステータスを維持
      // if (job?.status) {
      //   formData.append("status", job.status);
      // }

      // if (selectedFile) {
      //   formData.append("image", selectedFile);
      // }

      const newData: JobsPartialUpdatePayload = {
        ...data,
        start_time: startTimestamp,
        end_time: endTimestamp,
        expiry_date: expiryDateTimestamp,
        // 既存のステータスを維持
        status: job.status,
      }

      console.log('確認', data, newData)

      await onSubmit(newData);
      reset();
      setPreviewImage(null);
      setSelectedFile(null);
      onClose();
      toast({
        title: "求人を更新しました",
        description: "求人の情報が更新されました。",
      });
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "求人の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  });

  const handlePublish = handleSubmit(async (data) => {
    if (!job) {
      toast({
        title: "エラーが発生しました",
        description: "求人情報が見つかりません。",
        variant: "destructive",
      });
      return;
    }

    try {
      // const formData = new FormData();

      // 日付文字列を作成（YYYY-MM-DDThh:mm:ss）
      const startDateTimeStr = `${data.work_date}T${data.start_time}:00`;
      const endDateTimeStr = `${data.work_date}T${data.end_time}:00`;
      const expiryTimestamp =`${data.expiry_date}T00:00:00`;

      // Unix タイムスタンプを計算（ミリ秒単位）
      const startTimestamp = Date.parse(startDateTimeStr);
      const endTimestamp = Date.parse(endDateTimeStr);
      const expiryDateTimestamp = Date.parse(expiryTimestamp);

      // FormDataにデータを追加
      // Object.entries(data).forEach(([key, value]) => {
      //   if (key === "start_time") {
      //     formData.append(key, startTimestamp.toString());
      //   } else if (key === "end_time") {
      //     formData.append(key, endTimestamp.toString());
      //   } else if (Array.isArray(value)) {
      //     value.forEach((item) => formData.append(key + "[]", item.toString()));
      //   } else {
      //     formData.append(key, value.toString());
      //   }
      // });

      // ステータスをPUBLISHEDに設定
      // formData.append("status", "PUBLISHED");

      // if (selectedFile) {
      //   formData.append("image", selectedFile);
      // }

      const newData: JobsPartialUpdatePayload = {
        ...data,
        start_time: startTimestamp,
        end_time: endTimestamp,
        expiry_date: expiryDateTimestamp,
        // ステータスをPUBLISHEDに設定
        status: "PUBLISHED",
      }

      await onSubmit(newData);
      reset();
      setPreviewImage(null);
      setSelectedFile(null);
      onClose();
      toast({
        title: "求人を公開しました",
        description: "求人が公開されました。",
      });
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "求人の公開に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                  求人を編集
                </Dialog.Title>

                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">求人タイトル *</Label>
                      <Input
                        id="title"
                        {...register("title", {
                          required: "タイトルは必須です",
                        })}
                        className="mt-1"
                        placeholder="例：【週2日～】ホールスタッフ募集！"
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
                          })}
                          className="mt-1"
                        />
                        {errors.work_date && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.work_date.message}
                          </p>
                        )}
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

                              if (hourlyRate < 1500) {
                                return `時給ベースで1500円を下回らないように設定してください（現在: ${Math.floor(hourlyRate)}円）`;
                              }
                              return true;
                            },
                          })}
                          defaultValue={12000}
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
                        <Label htmlFor="number_of_spots">募集人数 *</Label>
                        <Input
                          id="number_of_spots"
                          type="number"
                          {...register("number_of_spots", {
                            required: "募集人数は必須です",
                            min: {
                              value: 1,
                              message: "募集人数は1人以上で設定してください",
                            },
                          })}
                          className="mt-1"
                          placeholder="例：1"
                        />
                        {errors.number_of_spots && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.number_of_spots.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_time">開始時間 *</Label>
                        <Input
                          id="start_time"
                          type="time"
                          {...register("start_time", {
                            required: "開始時間は必須です",
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
                        placeholder="例：接客経験、調理師免許"
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
                      <Label htmlFor="transportation">交通費</Label>
                      <Input
                        id="transportation"
                        {...register("transportation")}
                        className="mt-1"
                        placeholder="例：全額支給、上限1000円"
                      />
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
                        placeholder="例：未経験者歓迎、研修制度あり"
                      />
                    </div>

                    <div>
                      <Label htmlFor="expiry_date">締め切り</Label>
                      <Input
                        id="expiry_date"
                        type="datetime-local"
                        {...register("expiry_date", {
                          required: "締め切りは必須です",
                          min: {
                            value: new Date().toISOString().split("T")[0],
                            message:
                              "締め切りは今日以降の日付で設定してください",
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

                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      disabled={isSubmitting}>
                      キャンセル
                    </Button>
                    <Button
                      type="button"
                      onClick={onSubmitHandler}
                      disabled={isSubmitting}>
                      {isSubmitting ? "更新中..." : "更新する"}
                    </Button>
                    {job?.status === "DRAFT" && (
                      <Button
                        type="button"
                        variant="default"
                        onClick={handlePublish}
                        disabled={isSubmitting}>
                        {isSubmitting ? "公開中..." : "公開する"}
                      </Button>
                    )}
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
