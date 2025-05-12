"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function LineConnectPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  const handleLineConnect = () => {
    // LINE連携のURLを生成
    const lineConnectUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/line/connect?userId=${user?.id}`;
    window.location.href = lineConnectUrl;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            LINEと連携
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            LINEと連携することで、以下の機能が利用できるようになります：
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>お仕事の通知を受け取る</li>
            <li>メッセージのやり取り</li>
            <li>予定の管理</li>
          </ul>
          <div className="pt-4">
            <Button onClick={handleLineConnect} className="w-full">
              LINEと連携する
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
