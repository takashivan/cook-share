"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactApi } from "@/lib/api/contact";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    email: "",
    name: "",
  });
  const [isThanksModalOpen, setIsThanksModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactApi.createContact({
        ...formData,
        type: "general",
      });

      setIsThanksModalOpen(true);
      // Reset form
      setFormData({
        title: "",
        message: "",
        email: "",
        name: "",
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
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">お問い合わせ</h1>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">お問い合わせフォーム</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    お名前
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12"
                    placeholder="山田 太郎"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    メールアドレス
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12"
                    placeholder="example@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">
                  件名
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="h-12"
                  placeholder="お問い合わせの件名を入力してください"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-base">
                  メッセージ
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[200px] resize-none"
                  placeholder="お問い合わせ内容を詳しくご記入ください"
                />
              </div>
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-lg"
                  disabled={isSubmitting}>
                  {isSubmitting ? "送信中..." : "送信する"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
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
              className="w-full h-12 text-lg">
              閉じる
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
