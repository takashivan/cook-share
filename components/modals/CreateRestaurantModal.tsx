import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store, Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { RestaurantsCreatePayload } from "@/api/__generated__/base/data-contracts";
import { useGetRestaurantCuisines } from "@/hooks/api/all/restaurantCuisines/useGetRestaurantCuisines";

interface CreateRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RestaurantsCreatePayload) => Promise<void>;
  companyId: string;
}

export const CreateRestaurantModal = ({
  isOpen,
  onClose,
  onSubmit,
  companyId,
}: CreateRestaurantModalProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCuisines, setSelectedCuisines] = useState<number[]>([]);

  const { data: cuisines, error: errorGetCuisines } = useGetRestaurantCuisines();

  useEffect(() => {
    if (errorGetCuisines) {
      console.error("Failed to fetch cuisines:", errorGetCuisines);
      toast({
        title: "エラーが発生しました",
        description: "ジャンルの取得に失敗しました。",
        variant: "destructive",
      });
    }
  }, [errorGetCuisines]);

  const handleCuisineChange = (id: number) => {
    setSelectedCuisines((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RestaurantsCreatePayload>({
    defaultValues: {
      companies_id: companyId.toString(),
      is_active: false,
      name: "",
      address: "",
      cuisine_type: "",
      business_hours: "",
      station: "",
      access: "",
    },
  });

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
      const newData: RestaurantsCreatePayload = {
        ...data,
        restaurant_cuisine_id: selectedCuisines,
        photo: selectedFile,
      }

      await onSubmit(newData);

      reset();
      setPreviewImage(null);
      setSelectedFile(null);
      setSelectedCuisines([]);
      onClose();
      toast({
        title: "店舗を追加しました",
        description: "新しい店舗の登録が完了しました。",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "エラーが発生しました",
        description: "店舗の追加に失敗しました。もう一度お試しください。",
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
                  className="text-xl font-semibold leading-6 text-gray-900 flex items-center gap-2 mb-6">
                  <Store className="h-6 w-6" />
                  新しい店舗を追加
                </Dialog.Title>

                <form onSubmit={onSubmitHandler} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">店舗名 *</Label>
                      <Input
                        id="name"
                        {...register("name", { required: "店舗名は必須です" })}
                        className="mt-1"
                        placeholder="例：洋食 黒船亭 上野店"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="address">住所 *</Label>
                      <Input
                        id="address"
                        {...register("address", { required: "住所は必須です" })}
                        className="mt-1"
                        placeholder="例：東京都台東区上野1-1-1"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>ジャンル *</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {cuisines?.map((cuisine) => (
                          <Button
                            key={cuisine.id}
                            type="button"
                            variant={
                              selectedCuisines.includes(cuisine.id)
                                ? "default"
                                : "outline"
                            }
                            onClick={() => handleCuisineChange(cuisine.id)}
                            className="rounded-full">
                            {cuisine.category}
                          </Button>
                        ))}
                      </div>
                      {selectedCuisines.length === 0 && (
                        <p className="mt-1 text-sm text-red-600">
                          少なくとも1つのジャンルを選択してください
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="contact_info">電話番号</Label>
                      <Input
                        id="contact_info"
                        {...register("contact_info")}
                        className="mt-1"
                        placeholder="例：03-1234-5678"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">店舗説明</Label>
                      <Textarea
                        id="description"
                        {...register("description")}
                        className="mt-1"
                        placeholder="店舗の説明を入力してください"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="business_hours">営業時間</Label>
                      <Input
                        id="business_hours"
                        {...register("business_hours")}
                        className="mt-1"
                        placeholder="例：10:00-20:00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="station">最寄り駅</Label>
                      <Input
                        id="station"
                        {...register("station")}
                        className="mt-1"
                        placeholder="例：東京駅"
                      />
                    </div>

                    <div>
                      <Label htmlFor="access">アクセス</Label>
                      <Input
                        id="access"
                        {...register("access")}
                        className="mt-1"
                        placeholder="例：地下鉄千代田線 都庁前駅 徒歩2分"
                      />
                    </div>

                    <div className="col-span-full">
                      <Label htmlFor="photo">店舗画像</Label>
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
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "登録中..." : "店舗を登録"}
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
