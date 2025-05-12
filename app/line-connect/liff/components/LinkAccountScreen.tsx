"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

interface LinkAccountScreenProps {
  lineUserId: string;
  name: string;
  picture: string;
}

export function LinkAccountScreen({
  lineUserId,
  name,
  picture,
}: LinkAccountScreenProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6">
          <Card className="w-full max-w-md border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={picture}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                <p className="text-center text-gray-600">
                  CookShareのアカウントと連携して、シェフとしての活動を始めましょう。
                </p>
                <div className="w-full space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => router.push("/chef/signup")}>
                    新規アカウントを作成
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/login")}>
                    既存アカウントと連携
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
