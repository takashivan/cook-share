import Image from "next/image";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function GuideFlow() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-8">ご利用の流れ</h1>

        {/* STEP 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#DB3F1C" }}>
            STEP01
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: "#DB3F1C" }}></div>
            <p className="font-bold">プロフィールの登録</p>
          </div>

          <div className="flex justify-center mb-6">
            <div>
              <div className=" rotate-[deg]">
                <Image
                  src="/chef_illust/chef_profile_image.png"
                  alt="シェフプロフィール1"
                  width={350}
                  height={100}
                  className="w-full h-auto"
                />
              </div>
              {/* <div className="border p-1 rotate-[3deg]">
                <Image
                  src="/placeholder.svg?height=120&width=80&text=Chef2"
                  alt="シェフプロフィール2"
                  width={80}
                  height={120}
                  className="w-full h-auto"
                />
              </div>
              <div className="border p-1 rotate-[-2deg]">
                <Image
                  src="/placeholder.svg?height=120&width=80&text=Chef3"
                  alt="シェフプロフィール3"
                  width={80}
                  height={120}
                  className="w-full h-auto"
                />
              </div>
              <div className="border p-1 rotate-[5deg]">
                <Image
                  src="/placeholder.svg?height=120&width=80&text=Chef4"
                  alt="シェフプロフィール4"
                  width={80}
                  height={120}
                  className="w-full h-auto"
                />
              </div> */}
            </div>
          </div>

          <p className="text-sm mb-4">
            ダミーコピー。プロフィールを充実させましょう！
            <br />
            詳しく記入することで、より魅力をアピールできます。
            <br />
            (所要時間: 約3分)
          </p>

          <div
            className="border p-4 mb-6"
            style={{
              borderColor: "#DB3F1C",
              backgroundColor: "rgba(219, 63, 28, 0.05)",
            }}>
            <div className="flex items-start gap-2">
              <AlertTriangle
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: "#DB3F1C" }}
              />
              <p className="text-sm text-gray-700">
                ダミーコピー。正式な登録には、プロフィールの項目をすべて登録することが必要です。
              </p>
            </div>
          </div>

          <Link href="/chef/profile">
            <button
              className="w-full py-4 text-white rounded-md font-medium"
              style={{ backgroundColor: "#DB3F1C" }}>
              プロフィールの登録
            </button>
          </Link>
        </section>

        {/* STEP 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#DB3F1C" }}>
            STEP02
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: "#DB3F1C" }}></div>
            <p className="font-bold">お仕事を探して応募する</p>
          </div>

          <div className="flex justify-center mb-6 relative">
            <div className="relative">
              <Image
                src="/chef_illust/chef_search_image.png"
                alt="お仕事を探す"
                width={250}
                height={150}
                className="w-full h-auto"
              />
            </div>
          </div>

          <p className="text-sm mb-6">
            ダミーコピー。希望のお仕事が見つかったら、日付を選択して応募してみましょう。
            <br />
            条件や詳細などはお仕事詳細ページで確認しレストランとやりとり可能です。
          </p>

          <Link href="/">
            <button
              className="w-full py-4 border rounded-full font-medium"
              style={{ borderColor: "#DB3F1C", color: "#DB3F1C" }}>
              お仕事を探す
            </button>
          </Link>
        </section>

        {/* STEP 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#DB3F1C" }}>
            STEP03
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: "#DB3F1C" }}></div>
            <p className="font-bold">完了報告・レビューの投稿</p>
          </div>

          <p className="text-sm mb-6">
            ダミーコピー。お仕事が終わったら、実際に勤務した時間など完了報告を送りましょう。
            <br />
            レストラン側で内容の確認が完了したら、レビューを投稿してください。
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-black text-white py-8">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="CookChef Logo"
              width={40}
              height={40}
              className="text-white"
            />
            <span className="font-bold">Cookchef</span>
            <span className="text-xs text-gray-400">(仮)</span>
          </div>

          <div className="flex flex-col items-center gap-6 mb-6">
            <Link href="#" className="text-white hover:underline">
              運営会社
            </Link>
            <Link href="/terms" className="hover:underline">
              利用規約
            </Link>

            <Link
              href="https://corp.cookbiz.co.jp/privacy-policy/"
              className="text-white hover:underline">
              プライバシーポリシー
            </Link>

            <Link
              href="https://corp.cookbiz.co.jp/privacy-policy-treatment/"
              className="text-white hover:underline">
              個人情報の取扱いについて
            </Link>
            <Link
              href="https://corp.cookbiz.co.jp/privacy-policy-publication/"
              className="text-white hover:underline">
              個人情報に関する公表文
            </Link>
          </div>

          <div className="text-center text-xs text-gray-400">
            © cookbiz Co.,Ltd.
          </div>
        </div>
      </footer>
    </div>
  );
}
