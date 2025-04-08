import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Award,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ChefProfile() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-8">プロフィール</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=80&width=80&text=山"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <button className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-1">
              <Edit className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold">山田 太郎</h2>
            <p className="text-gray-500">30歳・男性</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-500">電話番号</h3>
              <p>090-1234-5678</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-500">メールアドレス</h3>
              <p>yamada@example.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-500">住所</h3>
              <p>東京都新宿区新宿1-1-1</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-500">登録日</h3>
              <p>2023年10月15日</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">スキル・経験</h2>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            編集
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500 mb-2">スキル</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                和食
              </Badge>
              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                魚が捌ける
              </Badge>
              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                洋食
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">経験年数</h3>
            <p>10年以上</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">保有資格</h3>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-yellow-500" />
              <span>調理師免許</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">自己紹介</h3>
            <p className="text-sm">
              都内の有名和食店で10年間勤務後、独立。魚の捌き方には自信があります。和食を中心に、洋食のメニューも提供できます。丁寧な仕事を心がけています。
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Link
          href="/chef/account-settings"
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <span>アカウント設定</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link
          href="/chef/notification-settings"
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <span>通知設定</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link
          href="/chef/payment-settings"
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <span>支払い設定</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Button variant="outline" className="w-full mt-6" asChild>
          <Link href="/logout">ログアウト</Link>
        </Button>
      </div>
    </div>
  );
}
