"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { verifyEmail } from "@/lib/api/companyUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";

export default function VerifyEmailPage() {
  const { reloadUser } = useCompanyAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const user_id = searchParams.get("user_id");
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const verifyingEmail = async () => {
      if (!token || !user_id) {
        setStatus("error");
        setErrorMessage("無効な認証情報です");
        return;
      }

      try {
        const response = await verifyEmail(token, user_id);
        if (response) {
          setStatus("success");
          // 成功時に少し待ってからリダイレクト
          setTimeout(async () => {
            const user = await reloadUser();
            if (user?.companies_id == null) {
              router.push("/register/company-profile");
            } else {
              router.push("/");
            }
          }, 2000);
        } else {
          throw new Error("認証に失敗しました");
        }
      } catch (error: any) {
        console.error("Email verification failed:", error);
        setStatus("error");
        setErrorMessage(
          error.message || "メール認証に失敗しました。もう一度お試しください。"
        );
      }
    };

    verifyingEmail();
  }, [token, user_id, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-chefdom-orange/5 to-white">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8">
          <Image
            src="/chef_illust/chef_logo.png"
            alt="Chef Logo"
            width={200}
            height={200}
            priority
            className="drop-shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="shadow-xl border-chefdom-orange/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}>
                <CardTitle className="text-2xl font-bold text-center text-gray-800 mb-2">
                  掲載企業の皆様
                </CardTitle>
                <CardTitle className="text-xl font-semibold text-center text-gray-600">
                  メールアドレス認証
                </CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              {status === "verifying" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-4 py-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}>
                    <Loader2 className="h-12 w-12 text-chefdom-orange" />
                  </motion.div>
                  <p className="text-gray-600 font-medium">認証中...</p>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-6 py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}>
                    <div className="p-4 rounded-full bg-green-100">
                      <CheckCircle2 className="h-12 w-12 text-green-600" />
                    </div>
                  </motion.div>
                  <p className="text-green-600 font-medium text-center">
                    メールアドレスの認証が完了しました
                  </p>
                  <p className="text-gray-500 text-sm text-center">
                    企業登録ページへ移動します...
                  </p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-6 py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}>
                    <div className="p-4 rounded-full bg-red-100">
                      <AlertCircle className="h-12 w-12 text-red-600" />
                    </div>
                  </motion.div>
                  <p className="text-red-600 font-medium text-center">
                    {errorMessage}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full">
                    <Button
                      onClick={() => router.push("/login/company")}
                      className="w-full bg-chefdom-orange hover:bg-chefdom-orange-dark text-white shadow-md">
                      ログインページへ
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
