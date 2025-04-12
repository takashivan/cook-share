import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store, Upload, X } from "lucide-react";
import { Restaurant } from "@/lib/api/restaurant";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { getCuisines } from "@/lib/api/cuisines";

interface EditRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  restaurant: Restaurant;
}

export const EditRestaurantModal = ({
  isOpen,
  onClose,
  onSubmit,
  restaurant,
}: EditRestaurantModalProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    restaurant.photo || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cuisines, setCuisines] = useState<{ id: string; category: string }[]>(
    []
  );
  const [selectedCuisines, setSelectedCuisines] = useState<number[]>([]);

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const data = await getCuisines();
        setCuisines(data);
        // レストランの既存のジャンルを選択状態にする
        if (restaurant.restaurant_cuisine_id) {
          const cuisineIds = Array.isArray(restaurant.restaurant_cuisine_id)
            ? restaurant.restaurant_cuisine_id
            : [restaurant.restaurant_cuisine_id];
          setSelectedCuisines(cuisineIds);
        }
      } catch (error) {
        console.error("Failed to fetch cuisines:", error);
        toast({
          title: "エラーが発生しました",
          description: "ジャンルの取得に失敗しました。",
          variant: "destructive",
        });
      }
    };

    fetchCuisines();
  }, [restaurant.restaurant_cuisine_id]);

  const handleCuisineChange = (value: string) => {
    const id = parseInt(value);
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
  } = useForm({
    defaultValues: {
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone || "",
      description: restaurant.description || "",
      is_active: restaurant.is_active,
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
      const formData = new FormData();

      // 必須フィールドを追加
      formData.append("id", restaurant.id.toString());
      formData.append("companies_id", restaurant.companies_id.toString());
      formData.append("name", data.name);
      formData.append("address", data.address);
      // 配列として送信
      selectedCuisines.forEach((id) => {
        formData.append("restaurant_cuisine_id[]", id.toString());
      });
      formData.append("is_active", String(data.is_active));

      // オプショナルフィールドを追加（値が存在する場合のみ）
      if (data.phone) formData.append("phone", data.phone);
      if (data.description) formData.append("description", data.description);

      // 画像を追加（新しい画像が選択された場合のみ）
      if (selectedFile) {
        formData.append("photo", selectedFile);
      }

      await onSubmit(formData);
      onClose();
      toast({
        title: "店舗情報を更新しました",
        description: "店舗情報の更新が完了しました。",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "エラーが発生しました",
        description: "店舗情報の更新に失敗しました。もう一度お試しください。",
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
                  店舗情報を編集
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
                        {cuisines.map((cuisine) => (
                          <Button
                            key={cuisine.id}
                            type="button"
                            variant={
                              selectedCuisines.includes(parseInt(cuisine.id))
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
                      <Label htmlFor="phone">電話番号</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
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
                      {isSubmitting ? "更新中..." : "変更を保存"}
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
