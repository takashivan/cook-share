"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
} from "lucide-react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function MessageDetail({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex items-center mb-6">
        <Link href="/chef/schedule" className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">お仕事詳細</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="inline-block border rounded-md">
            <div className="flex items-center">
              <div className="px-4 py-2 border-r">
                <span className="font-medium">03/31 (月)</span>
              </div>
              <div className="px-4 py-2">
                <span>09:00 〜 22:00</span>
              </div>
            </div>
          </div>
          <Link href="/chef/messages/1">
            <div className="relative">
              <MessageSquare className="h-6 w-6 text-gray-700" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </div>
            </div>
          </Link>
        </div>

        <h2 className="text-lg font-bold mb-4">洋食 黒船亭</h2>

        <Image
          src="/placeholder.svg?height=200&width=400"
          alt="Job Image"
          width={400}
          height={200}
          className="w-full h-auto rounded-md mb-4"
        />

        <h3 className="text-lg font-bold mb-2">
          【明治創業】上野駅徒歩5分、老舗洋食店での勤務
        </h3>
        <p className="text-sm text-gray-700 mb-6">
          下町で愛される洋食店は、デミグラスソースは自家製。昔ながらに愛されてきた洋食屋。日本に馴染みのいい洋食を一週間以上かけて作られます。
          このソースがハヤシライスやシチューの、深い味わいが生まれるのです。明治に創業の老舗のレストランで手作りの技を感じながら働いています。
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium">勤務日</h4>
              <p className="text-sm">2024年3月31日（月）</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium">勤務時間</h4>
              <p className="text-sm">09:00 〜 22:00（休憩あり）</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium">勤務場所</h4>
              <p className="text-sm">東京都台東区上野</p>
              <p className="text-sm">JR上野駅 徒歩5分</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">報酬</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <span>時給</span>
            <span className="font-bold">¥1,500</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span>勤務時間</span>
            <span>13時間</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span>交通費</span>
            <span>¥1,000</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>合計</span>
            <span>¥20,500</span>
          </div>
        </div>
      </div>
    </div>
  );
}
