"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  LoadingScreen,
  ChefLoadingScreen,
  AdminLoadingScreen,
  RestaurantLoadingScreen,
} from "@/components/LoadingScreen";

export default function LoadingPreviewPage() {
  const [showLoading, setShowLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<
    "default" | "chef" | "admin" | "restaurant"
  >("default");
  const [fullScreen, setFullScreen] = useState(true);
  const [customMessage, setCustomMessage] = useState("");
  const [autoHide, setAutoHide] = useState(true);

  const handleShowLoading = (type: typeof loadingType) => {
    setLoadingType(type);
    setShowLoading(true);

    if (autoHide) {
      setTimeout(() => {
        setShowLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">ローディング画面プレビュー</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">設定</h2>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="fullscreen-mode">フルスクリーンモード</Label>
              <Switch
                id="fullscreen-mode"
                checked={fullScreen}
                onCheckedChange={setFullScreen}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-hide">3秒後に自動的に閉じる</Label>
              <Switch
                id="auto-hide"
                checked={autoHide}
                onCheckedChange={setAutoHide}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-message">カスタムメッセージ</Label>
            <Input
              id="custom-message"
              placeholder="カスタムメッセージを入力（空白の場合はデフォルト）"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
            />
          </div>

          <div className="pt-4 space-y-4">
            <h3 className="text-lg font-medium">ローディング画面を表示</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => handleShowLoading("default")}>
                汎用ローディング
              </Button>
              <Button onClick={() => handleShowLoading("chef")}>
                シェフ用ローディング
              </Button>
              <Button onClick={() => handleShowLoading("admin")}>
                管理者用ローディング
              </Button>
              <Button onClick={() => handleShowLoading("restaurant")}>
                レストラン用ローディング
              </Button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-medium">プレビュー（非フルスクリーン時）</h2>
          </div>
          <div className="relative h-[400px]">
            {!fullScreen && showLoading && (
              <>
                {loadingType === "default" && (
                  <LoadingScreen
                    fullScreen={false}
                    message={customMessage || "読み込み中..."}
                  />
                )}
                {loadingType === "chef" && (
                  <ChefLoadingScreen fullScreen={false} />
                )}
                {loadingType === "admin" && (
                  <AdminLoadingScreen fullScreen={false} />
                )}
                {loadingType === "restaurant" && (
                  <RestaurantLoadingScreen fullScreen={false} />
                )}
              </>
            )}

            {!showLoading && (
              <div className="flex items-center justify-center h-full text-gray-400">
                ローディング画面がここに表示されます
              </div>
            )}
          </div>
        </div>
      </div>

      {fullScreen && showLoading && (
        <>
          {loadingType === "default" && (
            <LoadingScreen message={customMessage || "読み込み中..."} />
          )}
          {loadingType === "chef" && <ChefLoadingScreen />}
          {loadingType === "admin" && <AdminLoadingScreen />}
          {loadingType === "restaurant" && <RestaurantLoadingScreen />}
        </>
      )}
    </div>
  );
}
