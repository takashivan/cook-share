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
  Building2,
  Briefcase,
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
        <div className="p-2 bg-gray-100 rounded-full">
          <Icon className="h-5 w-5 text-gray-900" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default function RestaurantLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50">
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
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              CHEFDOM
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
              ベータ版
            </span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-gray-900 transition-colors">
              特徴
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-gray-900 transition-colors">
              利用の流れ
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-gray-900 transition-colors">
              料金
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-gray-900 transition-colors">
              よくある質問
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/lp/chef">
              <Button variant="outline" className="hidden sm:flex">
                シェフの方はこちら
              </Button>
            </Link>
            <Link href="#register">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white transition-colors">
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
                  <span className="text-gray-900">人材不足</span>を
                  <br />
                  解決する新しい方法
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  CHEFDOMは、飲食店と優秀なシェフをつなぐプラットフォーム。
                  <br />
                  人材不足の悩みを解決し、お店の運営をサポートします。
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="#register">
                    <Button
                      size="lg"
                      className="bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 transform hover:scale-105">
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
                          alt={`Restaurant ${i}`}
                          width={40}
                          height={40}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900">300+</span>{" "}
                    の飲食店が既に登録しています
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
                      alt="Restaurant kitchen"
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
                      <div className="rounded-full bg-gray-100 p-2">
                        <Users className="h-6 w-6 text-gray-900" />
                      </div>
                      <div>
                        <p className="font-medium">人材不足を解決</p>
                        <p className="text-sm text-gray-600">
                          平均2日以内に人材が見つかります
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
                CHEFDOMで<span className="text-gray-900">人材不足</span>を解決
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                CHEFDOMは、飲食店の皆様に最適な人材を提供するプラットフォームです。
                必要な時に必要なだけ、優秀なシェフを確保できます。
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Shield}
                title="完全審査制で安心"
                description="登録シェフは全て審査済み。技術や経験を確認した優秀な人材のみを紹介します。安心して任せられます。"
              />
              <FeatureCard
                icon={Clock}
                title="すぐに人材が見つかる"
                description="求人掲載後、平均2日以内に人材が見つかります。急な欠員や繁忙期の人手不足も迅速に解決できます。"
              />
              <FeatureCard
                icon={Users}
                title="柔軟な雇用形態"
                description="単発のスポット採用から長期契約まで、お店のニーズに合わせた柔軟な雇用形態が可能です。コスト管理も容易になります。"
              />
              <FeatureCard
                icon={Star}
                title="高品質な人材"
                description="様々な経験を持つ優秀なシェフが登録しています。お店の料理やコンセプトに合った人材を見つけることができます。"
              />
              <FeatureCard
                icon={MessageSquare}
                title="充実したサポート"
                description="専任のサポートスタッフが、求人掲載から契約まで全面的にサポート。困ったことがあればいつでも相談できます。"
              />
              <FeatureCard
                icon={CheckCircle}
                title="コスト削減"
                description="必要な時に必要なだけ人材を確保できるため、固定費を抑えることができます。人件費の最適化が可能です。"
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
                CHEFDOMの利用は簡単です。ウェブサイトで登録して、審査が完了したら求人を掲載できます。
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 md:grid-cols-4">
              {[
                {
                  icon: Building2,
                  title: "ウェブ登録",
                  description:
                    "ウェブサイトで必要情報を入力して登録します。簡単な手続きで完了します。",
                },
                {
                  icon: Shield,
                  title: "審査",
                  description:
                    "店舗情報や営業許可証などを確認する審査を行います。審査完了後に通知が届きます。",
                },
                {
                  icon: Briefcase,
                  title: "求人掲載",
                  description:
                    "審査通過後、管理画面で求人情報を入力して掲載します。",
                },
                {
                  icon: Users,
                  title: "シェフ採用",
                  description:
                    "応募があったシェフの中から選考し、マッチングが成立したら契約完了です。",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                  className="relative">
                  <div className="relative flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-900 mb-4">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-center text-gray-600">
                      {step.description}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className="absolute top-8 right-0 h-px w-[calc(100%-4rem)] bg-gray-200 hidden md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 料金セクション */}
        <AnimatedSection id="pricing" className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                シンプルな料金体系
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                登録は無料。シェフを採用した時のみ手数料が発生します。
              </p>
            </motion.div>

            <div className="mt-16 mx-auto max-w-3xl">
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl bg-gray-900 p-8 sm:p-12 text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">手数料プラン</h3>
                  <div className="mt-4 flex items-center justify-center">
                    <span className="text-5xl font-bold">30%</span>
                    <span className="ml-2 text-gray-300">
                      / シェフの報酬から
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">
                    ※登録料・月額費用は一切かかりません
                  </p>
                </div>

                <div className="mt-8 bg-gray-800 p-4 rounded-lg">
                  <p className="font-bold text-center">
                    期間限定キャンペーン実施中！
                  </p>
                  <p className="text-center text-gray-300 mt-2">
                    2024年6月末までの登録で
                    <span className="font-bold">手数料20%</span>に割引
                  </p>
                </div>

                <ul className="mt-8 space-y-4">
                  {[
                    "登録料・月額費用は無料",
                    "シェフを採用した場合のみ手数料が発生",
                    "無制限の求人掲載",
                    "専任サポートスタッフによるサポート",
                    "安心の審査済みシェフのみを紹介",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}>
                  <Button
                    size="lg"
                    className="mt-8 w-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    今すぐ登録する
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* 登録セクション */}
        <AnimatedSection id="register" className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={fadeInUp}
              className="mx-auto max-w-3xl rounded-2xl bg-gray-900 p-8 sm:p-12 text-white">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  今すぐ登録して始めよう
                </h2>
                <p className="mt-4 text-lg opacity-90">
                  簡単な登録フォームに必要事項を入力するだけ。
                  <br />
                  審査完了後、すぐに求人を掲載できます。
                </p>
              </div>

              <div className="mt-8">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="company-name"
                        className="block text-sm font-medium text-gray-300 mb-1">
                        会社名 <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="company-name"
                        type="text"
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="例：株式会社CHEFDOM"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="store-name"
                        className="block text-sm font-medium text-gray-300 mb-1">
                        店舗名 <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="store-name"
                        type="text"
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="例：レストランCHEFDOM 渋谷店"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1">
                      メールアドレス <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="例：info@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-1">
                      電話番号 <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="例：03-1234-5678"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-1">
                      ご要望・お問い合わせ
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="ご質問やご要望があればご記入ください"></textarea>
                  </div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}>
                    <Button
                      type="submit"
                      className="w-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                      登録する
                    </Button>
                  </motion.div>
                </form>
                <p className="mt-6 text-sm text-gray-400 text-center">
                  ※審査には1〜3営業日ほどお時間をいただきます。
                  <br />
                  審査完了後、メールにて通知いたします。
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
                    a: "はい、CHEFDOMへの登録は完全無料です。シェフを採用した際に発生する手数料（シェフの報酬の30%）のみをいただいております。現在キャンペーン中につき、2024年6月末までの登録で手数料は20%となります。",
                  },
                  {
                    q: "どのような審査がありますか？",
                    a: "店舗情報、営業許可証の確認、必要に応じて店舗訪問を行います。安心・安全なサービス提供のための審査となります。",
                  },
                  {
                    q: "どのようなシェフが登録していますか？",
                    a: "和食、洋食、中華など様々なジャンルの経験豊富なシェフが登録しています。全てのシェフは審査済みで、スキルや経験を確認しています。",
                  },
                  {
                    q: "料金体系はどうなっていますか？",
                    a: "シェフを採用した際に、シェフの報酬の30%を手数料としていただいております。登録料や月額費用は一切かかりません。現在キャンペーン中につき、2024年6月末までの登録で手数料は20%となります。",
                  },
                  {
                    q: "キャンセルはできますか？",
                    a: "やむを得ない事情でのキャンセルは可能ですが、直前のキャンセルは手数料が発生する場合があります。できるだけ早めにご連絡ください。",
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
              className="mx-auto max-w-3xl rounded-2xl bg-gray-900 p-8 sm:p-12 text-white text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                人材不足の悩みを今すぐ解決
              </h2>
              <p className="mt-4 text-lg opacity-90">
                CHEFDOMで新しい採用方法を始めましょう。
                <br />
                今すぐ登録して、あなたのお店に合ったシェフを見つけましょう。
              </p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}>
                <Button
                  size="lg"
                  className="mt-8 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  今すぐ登録する
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
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  CHEFDOM
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                飲食店とシェフをつなぐ、
                <br />
                新しい採用のプラットフォーム
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
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    特徴
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    利用の流れ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    料金
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
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
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    会社概要
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://corp.cookbiz.co.jp/privacy-policy/"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    プライバシーポリシー
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://corp.cookbiz.co.jp/privacy-policy-treatment/"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    個人情報の取扱いについて
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://corp.cookbiz.co.jp/privacy-policy-publication/"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    個人情報に関する公表文
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://corp.cookbiz.co.jp/tokushoho"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    特定商取引法に基づく表記
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
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
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
