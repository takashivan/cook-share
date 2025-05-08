import { useAuth } from "@/lib/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface LinkAccountScreenProps {
  lineUserId: string;
  name: string;
  picture?: string;
}

export const LinkAccountScreen = ({
  lineUserId,
  name,
  picture,
}: LinkAccountScreenProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isApproved, setIsApproved] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsApproved(user.is_approved ?? false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              {picture && (
                <img
                  src={picture}
                  alt={name}
                  className="w-24 h-24 rounded-full"
                />
              )}
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-center text-gray-600">
                アカウントをリンクして、サービスを利用しましょう
              </p>
              <div className="flex flex-col space-y-2 w-full">
                <Button
                  onClick={() => router.push("/chef/signup")}
                  className="w-full">
                  新規アカウント作成
                </Button>
                <Button
                  onClick={() => router.push("/chef/login")}
                  variant="outline"
                  className="w-full">
                  既存アカウントとリンク
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!isApproved) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold">承認待ち</h2>
              <p className="text-center text-gray-600">
                アカウントの承認が完了するまでお待ちください
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return null;
};
