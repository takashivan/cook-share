"use client";

import { CreditCard, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { createStripeAccountLink } from "@/lib/api/user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { UnlinkLineId } from "@/lib/api/line";

export function ConnectSettings() {
  const { user, reloadUser } = useAuth();
  const router = useRouter();
  const [isLineUnlinkModalOpen, setIsLineUnlinkModalOpen] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);

  const memoizedReloadUser = useCallback(reloadUser, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await memoizedReloadUser();
      } catch (error) {
        console.error("Error fetching user:", error);
        toast({
          title: "エラー",
          description: "ユーザー情報の取得に失敗しました。",
          variant: "destructive",
        });
      }
    };
    fetchUser();
  }, [memoizedReloadUser]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-md">
        <p className="text-center text-red-500">ユーザーが見つかりません</p>
      </div>
    );
  }

  const handleStripeAccountLink = async () => {
    if (user.id) {
      // クリック直後に空ウィンドウを開く（Safari対策）
      const win = window.open("about:blank");
      try {
        const res = await createStripeAccountLink(user.id);
        if (res.response.result.url && win) {
          win.location.href = res.response.result.url;
        } else if (res.response.result.url) {
          // window.openが失敗した場合は従来通り
          window.location.href = res.response.result.url;
        }
      } catch (error) {
        if (win) win.close();
        console.error("Error creating Stripe account link:", error);
      }
    }
  };

  const handleUnlinkLine = async () => {
    setIsUnlinking(true);
    try {
      await UnlinkLineId(user.id);
      await reloadUser();
      toast({
        title: "LINE連携を解除しました",
        description: "LINE連携が正常に解除されました。",
      });
      setIsLineUnlinkModalOpen(false);
    } catch (error) {
      toast({
        title: "エラー",
        description: "LINE連携の解除に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsUnlinking(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>連携設定</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stripe連携カード */}
        <motion.div
          whileHover={{
            y: -4,
            boxShadow: "0 8px 32px rgba(80,80,200,0.10)",
          }}
          className="flex items-center bg-white rounded-lg shadow p-4 mb-2 transition">
          <div className="flex-shrink-0 mr-4">
            <Image
              src="/logos/Stripe.png"
              alt="Stripe"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-1">Stripe連携</div>
            <div className="text-gray-500 text-sm mb-2">
              {user.stripe_verified
                ? "Stripeアカウントが登録されています。"
                : "報酬受取にはStripe連携が必須です。"}
            </div>
            <Button
              variant="outline"
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
              onClick={handleStripeAccountLink}>
              <CreditCard className="w-4 h-4 mr-2" />
              {user.stripe_verified ? "連携済み" : "連携する"}
            </Button>
          </div>
        </motion.div>
        {/* LINE連携カード */}
        <motion.div
          whileHover={{
            y: -4,
            boxShadow: "0 8px 32px rgba(0,200,100,0.10)",
          }}
          className="flex items-center bg-white rounded-lg shadow p-4 mb-2 transition">
          <div className="flex-shrink-0 mr-4">
            <Image src="/logos/LINE.png" alt="LINE" width={40} height={40} />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-1">LINE連携</div>
            <div className="text-gray-500 text-sm mb-2">
              {user.line_user_id
                ? "LINEと連携済みです。"
                : "LINE連携でお仕事の通知が届きます。"}
            </div>
            {user.line_user_id ? (
              <Button
                variant="outline"
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                onClick={() => setIsLineUnlinkModalOpen(true)}
                disabled={isUnlinking}>
                連携を解除する
              </Button>
            ) : (
              <Button
                variant="outline"
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
                onClick={() => router.push("/chef/line-connect/liff")}>
                <MessageCircle className="w-4 h-4 mr-2" />
                連携する
              </Button>
            )}
          </div>
        </motion.div>
        {/* LINE連携解除モーダル */}
        {isLineUnlinkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <div className="mb-4 font-semibold text-lg text-gray-900">
                LINE連携を解除しますか？
              </div>
              <div className="mb-6 text-gray-600 text-sm">
                連携を解除すると、LINEでの通知が届かなくなります。本当によろしいですか？
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsLineUnlinkModalOpen(false)}
                  disabled={isUnlinking}>
                  キャンセル
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleUnlinkLine}
                  disabled={isUnlinking}>
                  解除する
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
