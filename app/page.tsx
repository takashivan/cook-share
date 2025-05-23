"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Badge } from "@/components/ui/badge";
import { useGetJobsByUpcoming } from "@/hooks/api/all/jobs/useGetJobsByUpcoming";
import { motion } from "framer-motion";
import { SearchFields, SearchId } from "@/components/jobs/SearchFields";
import { QueryUpcomingListResult } from "@/api/__generated__/base/data-contracts";
import { DateSelector } from "@/components/jobs/DateSelector";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedArea, setSelectedArea] = useState<SearchId>("all");
  const [selectedCuisines, setSelectedCuisines] = useState<SearchId[]>(["all"]);
  const [keyword, setKeyword] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<
    QueryUpcomingListResult["jobs"]
  >([]);

  const { data: jobsData, error, isLoading } = useGetJobsByUpcoming();

  // jobsData が取得されたら初期表示として全件セット
  useEffect(() => {
    if (jobsData) {
      setFilteredJobs(jobsData.jobs);
    }
  }, [jobsData]);

  // 検索
  const handleSearch = (date: Date | null) => {
    if (!jobsData) return;

    const result = jobsData.jobs.filter((job) => {
      const matchArea =
        selectedArea === "all"
          ? true
          : selectedArea === 1
          ? [
              "茨城県",
              "栃木県",
              "群馬県",
              "埼玉県",
              "千葉県",
              "東京都",
              "神奈川県",
            ].some((prefecture) => job.restaurant.address?.includes(prefecture))
          : selectedArea === 2
          ? ["京都府", "大阪府", "兵庫県", "奈良県", "滋賀県", "和歌山県"].some(
              (prefecture) => job.restaurant.address?.includes(prefecture)
            )
          : true;
      const matchCuisine = selectedCuisines.includes("all")
        ? true
        : job.restaurant.restaurant_cuisine_id?.some((cuisine) =>
            selectedCuisines.includes(cuisine[0].id)
          ) ?? true;
      const matchKeyword = keyword
        ? job.title.includes(keyword) || job.restaurant.name.includes(keyword)
        : true;

      // 日付のフィルタリング
      const workDate = new Date(job.work_date);
      const isSameDate = date
        ? workDate.getFullYear() === date.getFullYear() &&
          workDate.getMonth() === date.getMonth() &&
          workDate.getDate() === date.getDate()
        : true;

      return matchArea && matchCuisine && matchKeyword && isSameDate;
    });

    setFilteredJobs(result);
  };

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
                  料理人のキャリアに、
                  <br className="md:hidden" />
                  もう一つの選択肢を
                </h1>
                {/* <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="rounded-full">
                    求人から探す
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    店舗から探す
                  </Button>
                </div> */}
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
        <SearchFields
          selectedAreaId={selectedArea}
          selectedCuisineIds={selectedCuisines}
          keyword={keyword}
          onAreaChangeAction={setSelectedArea}
          onCuisineChangeAction={setSelectedCuisines}
          onKeywordChangeAction={setKeyword}
          onSearchAction={() => handleSearch(selectedDate)}
        />

        {/* 日付選択 */}
        <DateSelector
          selectedDate={selectedDate}
          onDateChangeAction={(date) => {
            setSelectedDate(date);
            handleSearch(date);
          }}
        />

        {/* Job Listings */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            {/* <h1 className="text-2xl font-bold mb-6">新着求人</h1> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index: number) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full">
                  <Link href={`/job/${job.id}`} className="block h-full">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={job.image || "/images/default-job.jpg"}
                          alt={job.title}
                          fill
                          className="object-cover rounded-t-lg group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 bg-white/90 text-black px-3 py-2 rounded-lg text-sm font-bold shadow-md backdrop-blur-sm">
                          {new Date(job.work_date).toLocaleDateString("ja-JP", {
                            month: "2-digit",
                            day: "2-digit",
                            weekday: "short",
                          })}
                        </div>
                        <div className="absolute top-4 right-4">
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
                              ? `募集中`
                              : "締め切りました"}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            {job.restaurant.name}
                          </div>
                          <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {job.title}
                          </h3>

                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Clock className="h-4 w-4 mr-1 text-primary" />
                            <span>
                              {new Date(job.start_time).toLocaleTimeString(
                                "ja-JP",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                              {" 〜 "}
                              {new Date(job.end_time).toLocaleTimeString(
                                "ja-JP",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <MapPin className="h-4 w-4 mr-1 text-primary" />
                            <span className="line-clamp-1">
                              {job.restaurant.address}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mb-3 mt-5">
                            <div className="flex flex-wrap gap-1">
                              {job.restaurant.restaurant_cuisine_id &&
                              job.restaurant.restaurant_cuisine_id.length >
                                0 ? (
                                job.restaurant.restaurant_cuisine_id
                                  .map((item) => item[0])
                                  .map((cat) => (
                                    <Badge
                                      key={cat.category}
                                      variant="outline"
                                      className="text-xs bg-white/80 backdrop-blur-sm border-primary/20 text-primary hover:bg-primary/10 transition-colors">
                                      {cat.category}
                                    </Badge>
                                  ))
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-white/80 backdrop-blur-sm border-primary/20 text-primary">
                                  ジャンル未設定
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                          <span className="text-sm font-bold text-primary">
                            報酬額 {job.fee.toLocaleString()}円
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-primary hover:text-primary/80">
                            詳細を見る →
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
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
                <Link href="/register/chef">
                  <Button
                    variant="outline"
                    className="border rounded-md py-2 px-4 text-center">
                    シェフのご登録はこちら
                  </Button>
                </Link>

                <Link href="/register/company">
                  <Button
                    variant="outline"
                    className="border rounded-md py-2 px-4 text-center">
                    飲食業社のご登録はこちら
                  </Button>
                </Link>
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
                alt="CHEFDOM Logo"
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
            <Link href="/terms" className="hover:underline">
              利用規約
            </Link>

            <span>|</span>
            <Link
              href="https://corp.cookbiz.co.jp/privacy-policy/"
              className="hover:underline">
              プライバシーポリシー
            </Link>

            <span>|</span>
            <Link
              href="https://corp.cookbiz.co.jp/privacy-policy-treatment/ "
              className="hover:underline">
              個人情報の取扱いについて
            </Link>
            <span>|</span>
            <Link
              href="https://corp.cookbiz.co.jp/privacy-policy-publication/"
              className="hover:underline">
              個人情報に関する公表文
            </Link>
            <span>|</span>
            <Link
              href="https://corp.cookbiz.co.jp/tokushoho"
              className="hover:underline">
              特定商取引法に基づく表記
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:underline">
              お問い合わせ
            </Link>
            <span>|</span>
            <Link href="/faq" className="hover:underline">
              よくある質問
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
