"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Badge } from "@/components/ui/badge";
import { useGetJobs } from "@/hooks/api/jobs/useGetJobs";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleDateString("ja-JP", { month: "2-digit", day: "2-digit" })
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: jobsData, error, isLoading } = useGetJobs();

  // 次の7日分の日付を生成
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toLocaleDateString("ja-JP", {
        month: "2-digit",
        day: "2-digit",
      }),
      day: date.toLocaleDateString("ja-JP", { weekday: "short" }),
    };
  });

  // データ取得
  useEffect(() => {
    // セッションの存在をチェック
    const checkSession = () => {
      const hasSession = !!localStorage.getItem("auth_token");
      setIsLoggedIn(hasSession);
    };
    checkSession();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingScreen message="読み込み中" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="col-span-1 md:col-span-3 py-8">
                <h1 className="text-xl font-bold mb-2">
                  料理人が自由に輝き、
                  <br className="md:hidden" />
                  創造性あふれる食の世界を創る
                </h1>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="rounded-full">
                    求人から探す
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    店舗から探す
                  </Button>
                </div>
              </div>

              <div>
                <Image
                  src="/chef_illust/chef_illust.png?height=800&width=1200"
                  alt="Chef Illustrations"
                  width={1200}
                  height={1100}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="bg-gray-50 py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col md:flex-row gap-2">
                <div className="relative flex items-center border rounded-md bg-white px-3 py-2 flex-1">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">すべてのエリア</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                </div>

                <div className="relative flex items-center border rounded-md bg-white px-3 py-2 flex-1">
                  <span className="text-sm">すべてのジャンル</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                </div>

                <div className="relative flex items-center border rounded-md bg-white px-3 py-2 flex-1">
                  <Input
                    type="text"
                    placeholder="キーワードを入力"
                    className="border-0 p-0 h-auto focus-visible:ring-0 text-sm"
                  />
                  <Search className="h-4 w-4 text-gray-400 ml-auto" />
                </div>
              </div>

              <Button className="bg-black text-white hover:bg-black/90">
                検索
              </Button>
            </div>
          </div>
        </section>

        {/* 日付選択 */}
        <section className="bg-white py-4">
          <div className="container mx-auto px-4">
            <div className="mb-2 font-medium">日付で絞り込む</div>
            <div className="flex items-center">
              <div className="mr-4 text-sm">今日</div>
              <div className="flex items-center overflow-x-auto whitespace-nowrap">
                <button className="p-2">
                  <ChevronLeft size={20} />
                </button>

                {dates.map((item) => (
                  <button
                    key={item.date}
                    className={`flex flex-col items-center mx-2 ${
                      selectedDate === item.date ? "font-bold" : ""
                    }`}
                    onClick={() => setSelectedDate(item.date)}>
                    <div className="text-sm">{item.date}</div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mt-1 ${
                        selectedDate === item.date
                          ? "bg-black text-white"
                          : "text-black"
                      }`}>
                      {item.day}
                    </div>
                  </button>
                ))}

                <button className="p-2">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">新着求人</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobsData?.jobs.map((job) => (
                <Link key={job.id} href={`/job/${job.id}`} className="">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={job.image || "/images/default-job.jpg"}
                        alt={job.title ?? ''}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-2 rounded-lg text-sm font-bold shadow-md">
                        {new Date(job.work_date).toLocaleDateString("ja-JP", {
                          month: "2-digit",
                          day: "2-digit",
                          weekday: "short",
                        })}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">
                        {job.restaurant.name}
                      </div>
                      <h3 className="font-bold text-sm mb-2">{job.title}</h3>

                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(job.start_time).toLocaleTimeString(
                            "ja-JP",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                          {" 〜 "}
                          {new Date(job.end_time).toLocaleTimeString("ja-JP", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{job.restaurant.address}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <span>
                          {job.restaurant.restaurant_cuisine_id &&
                          job.restaurant.restaurant_cuisine_id.length > 0
                            ? job.restaurant.restaurant_cuisine_id
                                .map((cat) => cat)
                                .join(", ")
                            : "ジャンル未設定"}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <Badge
                          variant="secondary"
                          className={`${
                            job.number_of_spots > 0 &&
                            job.expiry_date != null &&
                            new Date(job.expiry_date) > new Date()
                              ? "bg-black text-white"
                              : "bg-gray-500 text-white"
                          }`}>
                          {job.number_of_spots > 0 &&
                          job.expiry_date != null &&
                          new Date(job.expiry_date) > new Date()
                            ? `残り${job.number_of_spots}名募集中`
                            : "締め切りました"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="font-bold">
                          報酬額 {job.fee.toLocaleString()}円
                        </span>
                      </div>

                      <div className="flex gap-2"></div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                className="rounded-full flex items-center gap-1">
                もっと見る
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="hidden md:block">
                <Image
                  src="/chef_illust/chef_illust.png?height=200&width=400"
                  alt="Chef Illustrations"
                  width={500}
                  height={100}
                  className="h-auto"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  variant="outline"
                  className="border rounded-md py-2 px-4 text-center">
                  シェフのご登録はこちら
                </Button>

                <Button
                  variant="outline"
                  className="border rounded-md py-2 px-4 text-center">
                  飲食業社のご登録・ご相談はこちら
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Image
                src="/chef_illust/chef_logo.png?height=200&width=400"
                alt="CookChef Logo"
                width={120}
                height={30}
                className="text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400 mb-4">
            <Link href="#" className="hover:underline">
              運営会社
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              シェフ向け利用規約
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              飲食業社向け利用規約
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              プライバシーポリシー
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              お問い合わせ
            </Link>
          </div>

          <div className="text-center text-xs text-gray-400">
            © cookchef Co.,Ltd.
          </div>
        </div>
      </footer>
    </div>
  );
}
