import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-8">お問い合わせ</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">お問い合わせフォーム</h2>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">お名前</Label>
            <Input id="name" placeholder="山田 太郎" required />
          </div>

          <div>
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@cookchef.jp"
              required
            />
          </div>

          <div>
            <Label htmlFor="subject">件名</Label>
            <Input id="subject" placeholder="お問い合わせの件名" required />
          </div>

          <div>
            <Label htmlFor="message">お問い合わせ内容</Label>
            <Textarea
              id="message"
              placeholder="お問い合わせ内容を入力してください"
              className="min-h-[150px]"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: "#DB3F1C", color: "white" }}>
            <Send className="mr-2 h-4 w-4" />
            送信する
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">その他のお問い合わせ方法</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5" style={{ color: "#DB3F1C" }} />
            <div>
              <h3 className="font-medium">お電話でのお問い合わせ</h3>
              <p className="text-sm">03-1234-5678</p>
              <p className="text-xs text-gray-500">
                受付時間: 平日 9:00〜18:00
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5" style={{ color: "#DB3F1C" }} />
            <div>
              <h3 className="font-medium">メールでのお問い合わせ</h3>
              <p className="text-sm">support@cookchef.jp</p>
              <p className="text-xs text-gray-500">
                24時間受付・平日3営業日以内に返信
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5" style={{ color: "#DB3F1C" }} />
            <div>
              <h3 className="font-medium">オフィス所在地</h3>
              <p className="text-sm">〒100-0001</p>
              <p className="text-sm">東京都千代田区千代田1-1-1</p>
              <p className="text-xs text-gray-500">
                ※お問い合わせの対応は行っておりません
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">よくあるご質問</h2>
        <p className="text-sm mb-4">
          お問い合わせの前に、よくある質問をご確認ください。
          解決しない場合は、お問い合わせフォームよりご連絡ください。
        </p>
        <Link href="/chef/faq">
          <Button
            variant="outline"
            className="w-full"
            style={{ borderColor: "#DB3F1C", color: "#DB3F1C" }}>
            よくある質問を確認する
          </Button>
        </Link>
      </div>
    </div>
  );
}
