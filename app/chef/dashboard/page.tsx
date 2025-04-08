"use client";

import Link from "next/link";
import { MessageSquare, Star, Edit } from "lucide-react";

export default function ChefDashboard() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-8">ダッシュボード</h1>

      {/* 次のお仕事 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">次のお仕事</h2>
        <Link href="/chef/job/1" className="block">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">03 / 31 (月)</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-500">09:00 〜 22:00</span>
              </div>
            </div>
            <div className="text-gray-500 mb-1">洋食 黒船亭</div>
            <div className="font-medium">
              【明治創業】上野駅徒歩5分、老舗洋食店での勤務
            </div>
          </div>
        </Link>
      </section>

      {/* やること */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">やること</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-gray-700" />
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                店舗レビュー
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">03 / 28 (金)</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-500">09:00 〜 22:00</span>
              </div>
            </div>
            <div className="font-medium">COOKBIZ CAFE 八丁堀本店</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Edit className="h-5 w-5 text-gray-700" />
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                完了報告
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">03 / 29 (土)</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-500">15:00 〜 23:30</span>
              </div>
            </div>
            <div className="font-medium">くっくぴざすし</div>
          </div>
        </div>
      </section>

      {/* 未読メッセージ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">未読メッセージ</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="h-5 w-5 text-gray-700" />
              <div className="font-medium">洋食 黒船亭</div>
            </div>
            <p className="text-gray-600 truncate">
              はじめまして。この度はご応募いただきありがとう...
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="h-5 w-5 text-gray-700" />
              <div className="font-medium">くっくぴざすし</div>
            </div>
            <p className="text-gray-600 truncate">
              はじめまして。この度はご応募いただきありがとう...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
