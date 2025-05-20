"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail } from "lucide-react";
import Link from "next/link";
import { contactApi } from "@/lib/api/contact";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isThanksModalOpen, setIsThanksModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactApi.createContact({
        ...formData,
        title: formData.subject,
        type: "general",
      });

      setIsThanksModalOpen(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description:
          "お問い合わせの送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto mt-16">
        <h1 className="text-3xl font-bold mb-8 text-center">お問い合わせ</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">お問い合わせフォーム</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">お名前</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="山田 太郎"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="subject">件名</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="お問い合わせの件名"
                required
              />
            </div>

            <div>
              <Label htmlFor="message">お問い合わせ内容</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="お問い合わせ内容を入力してください"
                className="min-h-[150px]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "送信中..." : "送信する"}
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">その他のお問い合わせ方法</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">メールでのお問い合わせ</h3>
                <p className="text-sm">info@chefdom.jp</p>
                <p className="text-xs text-gray-500">
                  24時間受付・平日3営業日以内に返信
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
          <Link href="/faq">
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10">
              よくある質問を確認する
            </Button>
          </Link>
        </div>
      </div>

      <Dialog open={isThanksModalOpen} onOpenChange={setIsThanksModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">
              お問い合わせありがとうございます
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center space-y-4">
            <p className="text-gray-600">
              お問い合わせいただき、ありがとうございます。
              <br />
              内容を確認の上、ご連絡させていただきます。
            </p>
            <Button
              onClick={() => setIsThanksModalOpen(false)}
              className="w-full bg-primary hover:bg-primary/90">
              閉じる
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
