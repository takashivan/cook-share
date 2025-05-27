"use client";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useGetPayoutLogsByUserId } from "@/hooks/api/user/payout-logs/useGetPayoutLogsByUserId";
import { useGetWorksessionHistoryCurrentMonth } from "@/hooks/api/user/worksessions/useGetWorksessionHistoryCurrentMonth";
import { useGetWorksessionsByUserId } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserId";
import { SessionHistoryCurrentListResult } from "@/api/__generated__/base/data-contracts";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorPage } from "@/components/layout/ErrorPage";

export default function ChefSalary() {
  const { user } = useAuth();
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const {
    data: payoutLogs,
    isLoading: payoutLogsLoading,
    error: payoutLogsError,
  } = useGetPayoutLogsByUserId({ userId: user?.id });

  const {
    data: worksessionHistory,
    isLoading: worksessionHistoryLoading,
    error: worksessionHistoryError,
  } = useGetWorksessionHistoryCurrentMonth({
    userId: user?.id,
  });

  const {
    data: worksessions,
    isLoading: worksessionLoading,
    error: worksessionError,
  } = useGetWorksessionsByUserId({
    userId: user?.id,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  console.log("userId:", user?.id);
  console.log("isLoading:", worksessionHistoryLoading);
  console.log("worksessionHistory type:", typeof worksessionHistory);
  console.log("worksessionHistory:", worksessionHistory);
  console.log(
    "worksessionHistory is array?",
    Array.isArray(worksessionHistory)
  );

  const total =
    worksessionHistory?.reduce(
      (sum: number, session: SessionHistoryCurrentListResult[number]) => {
        return sum + (session.paid_amount ?? 0);
      },
      0
    ) ?? 0;

  const workSessionCount = worksessionHistory?.length ?? 0;

  const months =
    payoutLogs?.map((log) => ({
      id: log.id,
      month: format(new Date(log.created_at), "yyyy年M月", { locale: ja }),
      amount: formatCurrency(log.total_amount),
      status: log.status === "PAID" ? "支払い済み" : "処理中",
    })) ?? [];

  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );

  // 過去12ヶ月の選択肢を生成
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      value: format(date, "yyyy-MM"),
      label: format(date, "yyyy年M月", { locale: ja }),
    };
  });

  // 選択された月の勤務履歴をフィルタリング
  const filteredJobs =
    worksessions
      ?.filter((session) => {
        const sessionMonth = format(new Date(session.created_at), "yyyy-MM");
        return sessionMonth === selectedMonth;
      })
      .map((session) => ({
        id: session.id,
        date: format(new Date(session.created_at), "yyyy/MM/dd", {
          locale: ja,
        }),
        store: session.job?.restaurant?.name ?? "未設定",
        title: session.job?.title ?? "未設定",
        amount: formatCurrency(session.paid_amount),
      })) ?? [];

  // useEffect(() => {
  //   const fetchMonthlyIncome = async () => {
  //     try {
  //       if (!user?.id) return;
  //       const sessions = await getWorksessionHistories(user.id);

  //       // 合計金額を計算
  //       const total = sessions.reduce(
  //         (sum: number, session: WorksessionDetailResult) => {
  //           return sum + (session.paid_amount || 0);
  //         },
  //         0
  //       );

  //       setMonthlyIncome(total);
  //     } catch (error) {
  //       console.error("Failed to fetch monthly income:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchMonthlyIncome();
  // }, [user?.id]);

  if (worksessionHistoryError || worksessionError || payoutLogsError) {
    return (
      <div className="flex px-4">
        <ErrorPage />
      </div>
    );
  }

  if (worksessionLoading || payoutLogsLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="給料情報を読み込んでいます..."
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">収入管理</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">今月の見込み</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <span className="text-gray-500 block">
              {format(new Date(), "M月", { locale: ja })}の合計
            </span>
            <span className="text-sm text-gray-500">
              {workSessionCount}回の勤務
            </span>
          </div>
          {worksessionHistoryLoading || !worksessionHistory ? (
            <div className="flex items-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.1,
              }}
              className="text-right">
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-primary block">
                {formatCurrency(total)}
              </motion.span>
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-green-600 font-medium">
                確認済み
              </motion.span>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">月別収入</h2>
        </div>

        <div className="space-y-4">
          {months.length > 0 ? 
            months.map((month) => (
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
            ))
          : (
            <div className="text-center py-4 text-gray-500">
              収入履歴はありません
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">過去の勤務履歴</h2>
          <div className="flex items-center gap-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm bg-white">
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              明細書
            </Button> */}
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">{job.date}</span>
                  <span className="font-bold">{job.amount}</span>
                </div>
                <p className="text-sm text-gray-500">{job.store}</p>
                <p className="text-sm font-medium truncate">{job.title}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              選択された月の勤務履歴はありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
