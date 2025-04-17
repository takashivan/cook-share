"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { getRestaurant, updateRestaurant } from "@/lib/api/restaurant";
import { useToast } from "@/hooks/use-toast";
import { Restaurant } from "@/lib/api/restaurant";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RestaurantEditPage({ params }: PageProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { id } = use(params);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [formDataState, setFormDataState] = useState({
    name: "",
    email: "",
    contact_info: "",
    address: "",
    is_active: false,
    description: "",
    cuisine_type: "",
    restaurant_cuisine_id: [] as (number | undefined)[],
    photo: null as File | null,
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await getRestaurant(id);
        setRestaurant(data);
        setFormDataState({
          name: data.name,
          email: data.email,
          contact_info: data.contact_info || "",
          address: data.address,
          is_active: data.is_active,
          description: data.description || "",
          cuisine_type: data.cuisine_type || "",
          restaurant_cuisine_id: Array.isArray(data.restaurant_cuisine_id)
            ? data.restaurant_cuisine_id
            : [data.restaurant_cuisine_id].filter(
                (id): id is number => id !== undefined
              ),
          photo: null,
        });
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        toast({
          title: "エラー",
          description: "レストラン情報の取得に失敗しました",
          variant: "destructive",
        });
      }
    };

    fetchRestaurant();
  }, [id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // 基本情報を追加
      formData.append("name", formDataState.name);
      formData.append("email", formDataState.email);
      formData.append("contact_info", formDataState.contact_info);
      formData.append("address", formDataState.address);
      formData.append("is_active", formDataState.is_active.toString());
      formData.append("description", formDataState.description);
      formData.append("cuisine_type", formDataState.cuisine_type);

      // restaurant_cuisine_idを配列として送信
      formDataState.restaurant_cuisine_id.forEach((id) => {
        if (id !== undefined) {
          formData.append("restaurant_cuisine_id[]", id.toString());
        }
      });

      // 画像を追加（Fileオブジェクトとして）
      if (formDataState.photo instanceof File) {
        formData.append("photo", formDataState.photo);
      }

      await updateRestaurant(id, formData);
      toast({
        title: "更新成功",
        description: "レストラン情報が更新されました",
      });
    } catch (error) {
      console.error("更新エラー:", error);
      toast({
        title: "更新エラー",
        description: "レストラン情報の更新に失敗しました",
        variant: "destructive",
      });
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">レストラン情報編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            店舗名
          </label>
          <input
            type="text"
            value={formDataState.name}
            onChange={(e) =>
              setFormDataState({ ...formDataState, name: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            メールアドレス
          </label>
          <input
            type="email"
            value={formDataState.email}
            onChange={(e) =>
              setFormDataState({ ...formDataState, email: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            電話番号
          </label>
          <input
            type="tel"
            value={formDataState.contact_info}
            onChange={(e) =>
              setFormDataState({
                ...formDataState,
                contact_info: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            住所
          </label>
          <input
            type="text"
            value={formDataState.address}
            onChange={(e) =>
              setFormDataState({ ...formDataState, address: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            説明
          </label>
          <textarea
            value={formDataState.description}
            onChange={(e) =>
              setFormDataState({
                ...formDataState,
                description: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            料理タイプ
          </label>
          <input
            type="text"
            value={formDataState.cuisine_type}
            onChange={(e) =>
              setFormDataState({
                ...formDataState,
                cuisine_type: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            料理カテゴリ
          </label>
          <input
            type="text"
            value={formDataState.restaurant_cuisine_id.join(",")}
            onChange={(e) =>
              setFormDataState({
                ...formDataState,
                restaurant_cuisine_id: e.target.value.split(",").map(Number),
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            画像
          </label>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFormDataState({
                  ...formDataState,
                  photo: e.target.files[0],
                });
              }
            }}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ステータス
          </label>
          <select
            value={formDataState.is_active ? "true" : "false"}
            onChange={(e) =>
              setFormDataState({
                ...formDataState,
                is_active: e.target.value === "true",
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="true">有効</option>
            <option value="false">無効</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            更新
          </button>
        </div>
      </form>
    </div>
  );
}
