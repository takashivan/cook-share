import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChefSalary() {
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

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-8">給料詳細</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">今月の収入</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500">3月の合計</span>
          <span className="text-2xl font-bold">¥120,500</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>支払い状況</span>
          <span className="text-green-600">支払い済み</span>
        </div>
      </div>

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
