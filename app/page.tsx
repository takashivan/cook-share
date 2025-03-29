import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=30&width=30"
              alt="CookChef Logo"
              width={30}
              height={30}
              className="text-orange-500"
            />
            <span className="font-bold">CookChef</span>
            <span className="text-xs text-gray-500">(仮)</span>
          </div>
          <Button variant="outline" size="sm" className="border-gray-300">
            ログイン
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="col-span-1 md:col-span-3 py-8">
                <h1 className="text-xl font-bold mb-2">
                  なんかキャッチコピーとか
                  <br className="md:hidden" />
                  入れたくはある
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

              <div className="hidden md:block col-span-1 border rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Chef Icon"
                      width={80}
                      height={80}
                    />
                  </div>
                  <p className="text-sm">シェフのご登録はこちら</p>
                </div>
              </div>

              <div className="hidden md:block col-span-1">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Chef Illustrations"
                  width={400}
                  height={200}
                  className="w-full h-auto"
                />
              </div>

              <div className="hidden md:block col-span-1 border rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Restaurant Icon"
                      width={80}
                      height={80}
                    />
                  </div>
                  <p className="text-sm">飲食店様のご登録・ご相談はこちら</p>
                </div>
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

        {/* Date Selector */}
        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-sm font-medium mb-4">日付で絞り込む</h2>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-xs text-gray-500">今日</span>
                <span className="text-sm font-medium">03/31</span>
              </div>

              <button className="rounded-full bg-black text-white p-1">
                <ChevronLeft className="h-4 w-4" />
              </button>

              {["04/01", "04/02", "04/03", "04/04", "04/05", "04/06"].map(
                (date, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center min-w-[60px]">
                    <span className="text-xs text-gray-500">&nbsp;</span>
                    <span className="text-sm">{date}</span>
                  </div>
                )
              )}

              <button className="rounded-full bg-black text-white p-1">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <Link
                    key={index}
                    href={`/job/${index + 1}`}
                    className="block border rounded-md overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <Image
                        src="/placeholder.svg?height=200&width=400"
                        alt="Food Image"
                        width={400}
                        height={200}
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-0 left-0 bg-white px-2 py-1 text-xs">
                        03/31（月）
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">
                        求人 飲食店
                      </div>
                      <h3 className="font-bold text-sm mb-2">
                        【明治創業】上野駅徒歩5分、老舗洋食店での勤務
                      </h3>

                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>09:00 〜 22:00</span>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>東京都台東区</span>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <span>※詳細するにはログインしてください</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-full">
                          日本料理
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-full">
                          時給
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-full">
                          交通費
                        </Button>
                      </div>
                    </div>
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
                  src="/placeholder.svg?height=100&width=300"
                  alt="Chef Illustrations"
                  width={300}
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
                src="/placeholder.svg?height=30&width=30"
                alt="CookChef Logo"
                width={30}
                height={30}
                className="text-white"
              />
              <span className="font-bold">CookChef</span>
              <span className="text-xs text-gray-400">(仮)</span>
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
