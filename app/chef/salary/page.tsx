"use client";
import Link from "next/link";
import { ChevronRight, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getWorksessionHistories } from "@/lib/api/user";
import { WorksessionDetailResult } from "@/api/__generated__/chef-connect/data-contracts";

export default function ChefSalary() {
  const { user } = useAuth();
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const months = [
    { id: 1, month: "2024年3月", amount: "¥120,500", status: "支払い済み" },
    { id: 2, month: "2024年2月", amount: "¥98,000", status: "支払い済み" },
    { id: 3, month: "2024年1月", amount: "¥105,500", status: "支払い済み" },
    { id: 4, month: "2023年12月", amount: "¥87,000", status: "支払い済み" },
  ];

  const jobs = [
    {
      id: 1,
      date: "2024/03/31",
      store: "洋食 黒船亭",
      title: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
      amount: "¥20,500",
    },
    {
      id: 2,
      date: "2024/03/28",
      store: "COOKBIZ CAFE",
      title: "八丁堀駅直結、カフェでのホールスタッフ",
      amount: "¥15,000",
    },
    {
      id: 3,
      date: "2024/03/25",
      store: "和食 さくら",
      title: "【週末限定】新宿の和食店での調理補助",
      amount: "¥18,000",
    },
    {
      id: 4,
      date: "2024/03/20",
      store: "イタリアン ベラ",
      title: "渋谷のイタリアンレストランでのディナー勤務",
      amount: "¥22,000",
    },
  ];

  useEffect(() => {
    const fetchMonthlyIncome = async () => {
      try {
        if (!user?.id) return;
        const sessions = await getWorksessionHistories(user.id);

        // 合計金額を計算
        const total = sessions.reduce(
          (sum: number, session: WorksessionDetailResult) => {
            return sum + (session.paid_amount || 0);
          },
          0
        );

        setMonthlyIncome(total);
      } catch (error) {
        console.error("Failed to fetch monthly income:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthlyIncome();
  }, [user?.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">収入管理</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">今月の収入</h2>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">
            {format(new Date(), "M月", { locale: ja })}の合計
          </span>
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="text-3xl font-bold text-primary">
              {formatCurrency(monthlyIncome)}
            </motion.span>
          )}
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">支払い状況</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-green-600 font-medium">
            確認済み
          </motion.span>
        </div>
      </motion.div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">月別収入</h2>
        </div>

        <div className="space-y-4">
          {months.map((month) => (
            <Link key={month.id} href={`/chef/salary/${month.id}`}>
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium">{month.month}</p>
                  <p className="text-sm text-gray-500">{month.status}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">{month.amount}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">3月の勤務履歴</h2>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            明細書
          </Button>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">{job.date}</span>
                <span className="font-bold">{job.amount}</span>
              </div>
              <p className="text-sm text-gray-500">{job.store}</p>
              <p className="text-sm font-medium truncate">{job.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
