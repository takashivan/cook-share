"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  resendVerificationEmail,
  updateEmail,
  getCurrentUser,
  getUserProfile,
} from "@/lib/api/user";
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user, loading, setUser } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <RefreshCw className="h-8 w-8 text-chefdom-orange" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    router.push("/register/chef");
    return null;
  }

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      setError(null);
      if (!user?.id) {
        throw new Error("User not found");
      }
      await resendVerificationEmail(user.id);
      setShowSuccess(true);
      toast({
        title: "確認メールを再送信しました",
        description: "メールボックスを確認してください。",
      });
    } catch (error) {
      console.error("Error resending verification email:", error);
      setError("確認メールの再送信に失敗しました");
    } finally {
      setIsResending(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      setError(null);
      if (!user?.id) {
        throw new Error("User not found");
      }
      await updateEmail(user.id, newEmail);
      const userData = await getCurrentUser();
      if (userData) {
        const fullProfile = await getUserProfile(userData.id);
        setUser(fullProfile);
      }
      setShowSuccess(true);
      toast({
        title: "メールアドレスを更新しました",
        description: "新しいメールアドレスに確認メールを送信しました。",
      });
      setShowEmailForm(false);
      setNewEmail("");
    } catch (error) {
      console.error("Error updating email:", error);
      setError("メールアドレスの更新に失敗しました");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-chefdom-orange/5 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/chef_illust/chef_logo.png?height=200&width=400"
              alt="CHEFDOM Logo"
              width={120}
              height={30}
              className="text-chefdom-orange"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Card className="max-w-md mx-auto shadow-lg border-chefdom-orange/20">
            <CardHeader>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-chefdom-orange/10">
                  <Mail className="h-10 w-10 text-chefdom-orange" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}>
                <CardTitle className="text-2xl font-bold text-center text-gray-800">
                  メールアドレスの確認
                </CardTitle>
                <CardDescription className="text-center mt-2 text-gray-600">
                  {user.email} に確認メールを送信しました。
                  <br />
                  メールに記載されたリンクをクリックして、メールアドレスを認証してください。
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                  {error}
                </motion.div>
              )}

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>操作が完了しました</span>
                </motion.div>
              )}

              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-chefdom-orange/20 hover:bg-chefdom-orange/5 hover:text-chefdom-orange transition-colors"
                    onClick={handleResendEmail}
                    disabled={isResending}>
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        isResending ? "animate-spin" : ""
                      }`}
                    />
                    {isResending ? "送信中..." : "確認メールを再送信"}
                  </Button>
                </motion.div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="text-sm text-chefdom-orange hover:text-chefdom-orange-dark transition-colors flex items-center justify-center gap-1 mx-auto">
                    <span>メールアドレスが間違っている場合はこちら</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {showEmailForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleUpdateEmail}
                    className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newEmail" className="text-gray-700">
                        新しいメールアドレス
                      </Label>
                      <Input
                        id="newEmail"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                        placeholder="example@example.com"
                        className="border-chefdom-orange/20 focus:border-chefdom-orange focus:ring-chefdom-orange/20"
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full bg-chefdom-orange hover:bg-chefdom-orange-dark text-white"
                        disabled={isUpdating}>
                        {isUpdating ? "更新中..." : "メールアドレスを更新"}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
