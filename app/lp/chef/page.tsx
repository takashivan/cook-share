"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  MessageSquare,
  Shield,
  Star,
  Users,
  ArrowRight,
  ChefHat,
  DollarSign,
  MapPin,
  LucideIcon,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  id,
  className,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      id={id}
      className={className}>
      {children}
    </motion.section>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default function ChefLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-orange-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2">
            <Image
              src="/chef_illust/chef_logo.png"
              alt="CHEFDOM Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
              CHEFDOM
            </span>
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
              ベータ版
            </span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-orange-600 transition-colors">
              特徴
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-orange-600 transition-colors">
              利用の流れ
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-orange-600 transition-colors">
              よくある質問
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/lp/restaurant">
              <Button variant="outline" className="hidden sm:flex">
                飲食店の方はこちら
              </Button>
            </Link>
            <Link href="#register">
              <Button className="bg-orange-600 hover:bg-orange-700 transition-colors">
                登録する
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="text-orange-600">料理人</span>
                  のキャリアに
                  <br />
                  もうひとつの選択肢を。{" "}
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  CHEFDOMは、シェフと飲食店をつなぐ新しいプラットフォーム。
                  <br />
                  あなたのスキルを活かせる場所がきっと見つかります。
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="#register">
                    <Button
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 transform hover:scale-105">
                      今すぐ登録する
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="transition-all duration-300 transform hover:scale-105">
                      詳しく見る
                    </Button>
                  </Link>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="inline-block h-10 w-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <Image
                          src={`/chef_illust/chef${i}.png`}
                          alt={`User ${i}`}
                          width={40}
                          height={40}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-orange-600">500+</span>{" "}
                    のシェフが既に登録しています
                  </p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative lg:pl-8">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="overflow-hidden rounded-xl shadow-xl">
                    <Image
                      src="/chef_illust/top_chef.png"
                      alt="Chef working in kitchen"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-orange-100 p-2">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">すぐに仕事が見つかる</p>
                        <p className="text-sm text-gray-600">
                          平均3日以内に初めての仕事が決まります
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <AnimatedSection id="features" className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                CHEFDOMで<span className="text-orange-600">料理の腕</span>
                を活かそう
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                CHEFDOMは、シェフの皆様に最適な仕事を提供するプラットフォームです。
                あなたのスキルと経験を活かせる場所がきっと見つかります。
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Shield}
                title="完全審査制で安心"
                description="登録飲食店は全て審査済み。安心して働ける環境を提供します。悪質な店舗は徹底的に排除しています。"
              />
              <FeatureCard
                icon={Clock}
                title="すぐに仕事が決まる"
                description="登録後、平均3日以内に初めての仕事が決まります。あなたのスキルを必要としている店舗がすぐに見つかります。"
              />
              <FeatureCard
                icon={Users}
                title="柔軟な働き方"
                description="単発の仕事から長期契約まで、あなたのライフスタイルに合わせた働き方が可能です。自分のペースで仕事を選べます。"
              />
              <FeatureCard
                icon={Star}
                title="スキルアップの機会"
                description="様々な店舗で働くことで、新しい料理技術や知識を習得できます。キャリアアップにつながる貴重な経験が得られます。"
              />
              <FeatureCard
                icon={MessageSquare}
                title="充実したサポート"
                description="専任のサポートスタッフが、仕事の紹介から契約まで全面的にサポート。困ったことがあればいつでも相談できます。"
              />
              <FeatureCard
                icon={CheckCircle}
                title="安定した収入"
                description="高単価の仕事が多数。あなたのスキルに見合った報酬を得られます。支払いも安心の仲介システムで確実です。"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* 利用の流れ */}
        <AnimatedSection id="how-it-works" className="bg-white py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                利用の流れ
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                CHEFDOMの利用は簡単です。LINEで登録して、審査が完了したら仕事を探すことができます。
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 md:grid-cols-4">
              {[
                {
                  icon: ChefHat,
                  title: "LINE登録",
                  description:
                    "公式LINEアカウントを友達追加して、必要情報を入力します。",
                },
                {
                  icon: Clock,
                  title: "審査",
                  description:
                    "経験やスキルの確認する審査を行います。審査完了後に通知が届きます。",
                },
                {
                  icon: DollarSign,
                  title: "仕事探し",
                  description:
                    "審査通過後、アプリで条件に合った仕事を探して応募します。",
                },
                {
                  icon: MapPin,
                  title: "働く",
                  description:
                    "店舗とマッチングが成立したら、指定の日時に働きます。報酬は安全に受け取れます。",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                  className="relative">
                  <div className="relative flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-4">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-center text-gray-600">
                      {step.description}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className="absolute top-8 right-0 h-px w-[calc(100%-4rem)] bg-orange-200 hidden md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 登録セクション */}
        <AnimatedSection id="register" className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={fadeInUp}
              className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-orange-600 to-orange-400 p-8 sm:p-12 text-white">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  今すぐ登録して始めよう
                </h2>
                <p className="mt-4 text-lg opacity-90">
                  LINEで簡単登録。審査完了後、すぐに仕事を探すことができます。
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative w-64 h-64 overflow-hidden rounded-xl border-8 border-white shadow-lg">
                  <Image
                    src="/chef_illust/line_qr.png"
                    alt="LINE QR Code"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </motion.div>
                <p className="mt-4 text-center text-white opacity-90">
                  QRコードをスキャンして友達追加
                  <br />
                  または
                </p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}>
                  <Button
                    size="lg"
                    className="mt-4 bg-[#06C755] hover:bg-[#05a748] transition-all duration-300 transform hover:scale-105">
                    <Image
                      src="/chef_illust/line_logo.png"
                      alt="LINE Logo"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    LINEで友達追加
                  </Button>
                </motion.div>
                <p className="mt-6 text-sm text-white opacity-80">
                  ※審査には1〜3営業日ほどお時間をいただきます。
                  <br />
                  審査完了後、LINEにて通知いたします。
                </p>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection id="faq" className="bg-white py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                よくある質問
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                CHEFDOMについてよくある質問と回答をまとめました。
              </p>
            </motion.div>

            <div className="mt-16 mx-auto max-w-3xl">
              <div className="divide-y">
                {[
                  {
                    q: "登録は無料ですか？",
                    a: "はい、CHEFDOMへの登録は完全無料です。仕事が決まった際に発生する手数料のみをいただいております。",
                  },
                  {
                    q: "どのような審査がありますか？",
                    a: "経歴やスキルの確認、身分証明書の提出、必要に応じてオンライン面談を行います。安心・安全なサービス提供のための審査となります。",
                  },
                  {
                    q: "どのような仕事がありますか？",
                    a: "和食、洋食、中華など様々なジャンルの飲食店での調理業務があります。単発のスポット勤務から長期契約まで、多様な働き方に対応しています。",
                  },
                  {
                    q: "報酬はいつ受け取れますか？",
                    a: "勤務完了後、翌月15日に指定の口座へ振り込まれます。安全な決済システムで確実にお支払いいたします。",
                  },
                  {
                    q: "キャンセルはできますか？",
                    a: "やむを得ない事情でのキャンセルは可能ですが、直前のキャンセルは評価に影響する場合があります。できるだけ早めにご連絡ください。",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    transition={{ delay: i * 0.1 }}
                    className="py-6">
                    <h3 className="text-lg font-bold">{item.q}</h3>
                    <p className="mt-2 text-gray-600">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={fadeInUp}
              className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-orange-600 to-orange-400 p-8 sm:p-12 text-white text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                あなたの料理スキルを活かす場所がここに
              </h2>
              <p className="mt-4 text-lg opacity-90">
                CHEFDOMで新しい働き方を始めましょう。
                <br />
                今すぐLINEで登録して、あなたに合った仕事を見つけましょう。
              </p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}>
                <Button
                  size="lg"
                  className="mt-8 bg-white text-orange-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  LINEで登録する
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>

      {/* フッター */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2">
                <Image
                  src="/chef_illust/chef_logo.png"
                  alt="CHEFDOM Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                  CHEFDOM
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                シェフと飲食店をつなぐ、
                <br />
                新しい働き方のプラットフォーム
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <h3 className="font-bold">サービス</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    特徴
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    利用の流れ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    よくある質問
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="font-bold">会社情報</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    会社概要
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    利用規約
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <h3 className="font-bold">お問い合わせ</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    お問い合わせフォーム
                  </Link>
                </li>
                <li>
                  <p className="text-sm text-gray-600">support@chefdom.jp</p>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 border-t pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2024 CHEFDOM. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
