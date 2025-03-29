"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"details" | "store" | "access">("details")
  const isMobile = useMobile()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=30&width=30"
              alt="CookChef Logo"
              width={30}
              height={30}
              className="text-orange-500"
            />
            <span className="font-bold">CookChef</span>
            <span className="text-xs text-gray-500">(仮)</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden md:flex items-center gap-2 text-sm border rounded-md px-3 py-1.5">
              <Image src="/placeholder.svg?height=20&width=20" alt="Restaurant Icon" width={20} height={20} />
              飲食業社のご登録・ご相談
            </Link>
            <Link href="#" className="flex items-center gap-2 text-sm border rounded-md px-3 py-1.5">
              <Image src="/placeholder.svg?height=20&width=20" alt="Chef Icon" width={20} height={20} />
              シェフの皆様にご登録
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-4">
            <Link href="/" className="text-gray-500 hover:underline">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
            <span className="text-gray-500">【明治創業】上野駅徒歩5分、老舗洋食店での勤務</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Date and Time */}
              <div className="inline-block border rounded-md mb-4">
                <div className="flex items-center">
                  <div className="px-4 py-2 border-r">
                    <span className="font-medium">03/31 (月)</span>
                  </div>
                  <div className="px-4 py-2">
                    <span>09:00 〜 22:00</span>
                  </div>
                </div>
              </div>

              {/* Job Title */}
              <h1 className="text-xl font-bold mb-4">洋食 黒船亭</h1>

              {/* Job Image */}
              <div className="mb-6">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Job Image"
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-md"
                />
              </div>

              {/* Job Description */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">【明治創業】上野駅徒歩5分、老舗洋食店での勤務</h2>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  下町で愛される洋食店は、デミグラスソースは自家製。昔ながらに愛されてきた洋食屋。日本に馴染みのいい洋食を一週間以上かけて作られます。
                  このソースがハヤシライスやシチューの、深い味わいが生まれるのです。明治に創業の老舗のレストランで手作りの技を感じながら働いています。
                </p>

                <div className="flex justify-center mt-6">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-md px-8 py-2 flex items-center gap-2">
                    応募する
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Tabs */}
              {isMobile && (
                <div className="mb-4 border-t pt-4">
                  <div className="flex border rounded-md overflow-hidden">
                    <button
                      className={`flex-1 py-2 text-center text-sm ${activeTab === "details" ? "bg-gray-100 font-medium" : "bg-white"}`}
                      onClick={() => setActiveTab("details")}
                    >
                      募集要項
                    </button>
                    <button
                      className={`flex-1 py-2 text-center text-sm ${activeTab === "store" ? "bg-gray-100 font-medium" : "bg-white"}`}
                      onClick={() => setActiveTab("store")}
                    >
                      店舗情報
                    </button>
                    <button
                      className={`flex-1 py-2 text-center text-sm ${activeTab === "access" ? "bg-gray-100 font-medium" : "bg-white"}`}
                      onClick={() => setActiveTab("access")}
                    >
                      アクセス
                    </button>
                  </div>
                </div>
              )}

              {/* Job Details - Desktop or Mobile with active tab */}
              {(!isMobile || (isMobile && activeTab === "details")) && (
                <>
                  <hr className="my-8" />
                  <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">募集要項</h2>

                    <div className="space-y-6">
                      {/* Working Hours */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">勤務時間</h3>
                          <p className="text-sm">9:00〜22:00</p>
                        </div>
                      </div>

                      {/* Specific Shift */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">想定の勤務時間・終了時間</h3>
                          <p className="text-sm">15:00〜17:00 ※時間帯は相談の可能となります。</p>
                        </div>
                      </div>

                      {/* Hourly Wage */}
                      <div className="border border-red-500 p-4 rounded-md">
                        <div className="flex">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">●</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">時間あたりの報酬額</h3>
                            <p className="text-sm">****円</p>
                          </div>
                        </div>

                        <div className="flex mt-4">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">●</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">時間あたりの店舗報酬額</h3>
                            <p className="text-sm">****円</p>
                          </div>
                        </div>

                        <div className="flex mt-4">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">●</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">想定報酬総額</h3>
                            <p className="text-sm">****円</p>
                          </div>
                        </div>

                        <div className="flex justify-center mt-4">
                          <div className="text-center">
                            <p className="text-sm mb-2">アカウント登録後に確認できます。</p>
                            <div className="flex justify-center mb-2">
                              <Button className="bg-white border border-red-500 text-red-500 hover:bg-red-50 rounded-md px-4 py-2 flex items-center gap-2">
                                <Image
                                  src="/placeholder.svg?height=20&width=20"
                                  alt="Chef Icon"
                                  width={20}
                                  height={20}
                                />
                                シェフの皆様にご登録
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <Link href="#" className="text-sm text-gray-500 flex items-center justify-center gap-1">
                              <Image
                                src="/placeholder.svg?height=16&width=16"
                                alt="Login Icon"
                                width={16}
                                height={16}
                              />
                              ログインはこちら
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Transportation */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">交通費</h3>
                          <p className="text-sm">一律500円</p>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">想定の業務委託内容</h3>
                          <div className="text-sm space-y-1">
                            <p>【目標（最低2〜3日、3ヶ月以上）勤務可能な方のみ募集】</p>
                            <p className="mt-2">【業務内容】</p>
                            <p>・ハンバーグ、デミレグライス、ステーキなどの一般洋食メニューの調理</p>
                            <p>・あたれに必要なものの準備</p>
                            <p>・片付け、清掃等</p>
                            <p className="mt-2">
                              ★そのほかの事、そのお店スキルによりますので詳細をお聞きする場合がございます。
                            </p>
                            <p>
                              ★当日の状況によって勤務時間、終業時間が多少前後する場合がございますのでご了承ください。
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Appeal Points */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">アピールポイント</h3>
                          <div className="text-sm space-y-1">
                            <p>・明治創業の老舗洋食店です。</p>
                            <p>・勤務時間、休憩時間に関してはご相談可能です。</p>
                            <p>・こちらからの連絡をお願いする場合がございますのでご了承ください。</p>
                          </div>
                        </div>
                      </div>

                      {/* Required Skills */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">必要なスキル・経験</h3>
                          <div className="text-sm space-y-1">
                            <p>★下記全て必須</p>
                            <p>・和の食材取り扱いがわかり、調理ができる方</p>
                            <p>・オムレツができる、デミライスを研究できる。</p>
                            <p>・細かな盛り付けができる</p>
                            <p>・忙しい中でも落ち着ける人材</p>
                            <p>【目標（最低2〜3日、3ヶ月以上）勤務可能な方】</p>
                          </div>
                        </div>
                      </div>

                      {/* Dress Code */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">持ち物</h3>
                          <div className="text-sm space-y-1">
                            <p>・初回のみ身分、黒ズボンはご持参ください。</p>
                            <p>・靴くらいでいいのですが白は特に無いし、ご用意します。</p>
                            <p>・エプロンはこちらで用意</p>
                          </div>
                        </div>
                      </div>

                      {/* Dress Regulations */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">服装規定</h3>
                          <div className="text-sm space-y-1">
                            <p>・男女ともアクセサリーNGになります。（イヤリング、リング、ネックレス、等）です。</p>
                            <p>・髪色は自然なものになります。</p>
                          </div>
                        </div>
                      </div>

                      {/* Contract Type */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">契約形態</h3>
                          <p className="text-sm">業務委託</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Store Information - Desktop or Mobile with active tab */}
              {(!isMobile || (isMobile && activeTab === "store")) && (
                <>
                  {!isMobile && <hr className="my-8" />}
                  <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">店舗情報</h2>

                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">店舗名</h3>
                          <p className="text-sm">洋食 黒船亭</p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">住所</h3>
                          <p className="text-sm">東京都台東区上野</p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">営業時間</h3>
                          <p className="text-sm">11:00〜22:00（L.O. 21:30）</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Access Information - Desktop or Mobile with active tab */}
              {(!isMobile || (isMobile && activeTab === "access")) && (
                <>
                  {!isMobile && <hr className="my-8" />}
                  <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">アクセス</h2>

                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">最寄り駅</h3>
                          <p className="text-sm">JR上野駅 徒歩5分</p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">アクセス方法</h3>
                          <p className="text-sm">上野駅公園口を出て、アメ横方面に向かって徒歩5分</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="bg-gray-200 h-64 w-full rounded-md flex items-center justify-center">
                          <p className="text-gray-500">地図が表示されます</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar - Desktop only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="border rounded-md p-4 bg-white sticky top-4">
                <div className="text-center py-2 border-b mb-2">
                  <h3 className="font-medium">募集要項</h3>
                </div>
                <div className="text-center py-2 border-b mb-2">
                  <h3 className="font-medium">店舗情報</h3>
                </div>
                <div className="text-center py-2 border-b mb-4">
                  <h3 className="font-medium">アクセス</h3>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-md py-2 flex items-center justify-center gap-2">
                  応募する
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
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

          <div className="text-center text-xs text-gray-400">© cookchef Co.,Ltd.</div>
        </div>
      </footer>
    </div>
  )
}

