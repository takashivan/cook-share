"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("general");

  const faqCategories = [
    { id: "general", name: "一般的な質問" },
    { id: "account", name: "アカウント" },
    { id: "job", name: "お仕事について" },
    { id: "payment", name: "お支払い" },
    { id: "trouble", name: "トラブル対応" },
  ];

  const faqItems = {
    general: [
      {
        question: "CHEFDOMとはどのようなサービスですか？",
        answer:
          "CHEFDOMは、シェフと飲食店をつなぐマッチングプラットフォームです。シェフは自分のスキルや経験を活かせる仕事を見つけることができ、飲食店は必要なときに必要なスキルを持ったシェフを採用することができます。",
      },
      {
        question: "利用料金はかかりますか？",
        answer:
          "シェフの方は基本的に無料でご利用いただけます。飲食店側は求人掲載や採用時に手数料が発生します。詳細は料金ページをご確認ください。",
      },
      {
        question: "対応エリアはどこですか？",
        answer:
          "現在は東京都内を中心に、神奈川県、千葉県、埼玉県の一部エリアでサービスを提供しています。今後、順次拡大予定です。",
      },
    ],
    account: [
      {
        question: "アカウントの登録方法を教えてください",
        answer:
          "トップページの「シェフ登録」ボタンから、メールアドレスとパスワードを入力して登録できます。その後、プロフィール情報を入力していただくことで、お仕事への応募が可能になります。",
      },
      {
        question: "パスワードを忘れてしまいました",
        answer:
          "ログイン画面の「パスワードをお忘れですか？」リンクから、登録したメールアドレスを入力することでパスワードリセットのメールが送信されます。",
      },
      {
        question: "プロフィール情報はあとから変更できますか？",
        answer:
          "はい、プロフィールページからいつでも情報を更新することができます。最新の情報に更新しておくことで、より多くのお仕事に応募できる可能性が高まります。",
      },
    ],
    job: [
      {
        question: "お仕事への応募方法を教えてください",
        answer:
          "お仕事一覧から気になる求人を選び、詳細ページの「応募する」ボタンをクリックするだけで応募できます。応募後は、店舗側からのメッセージをお待ちください。",
      },
      {
        question: "応募後のステータスはどこで確認できますか？",
        answer:
          "「お仕事スケジュール」ページの「応募中」タブから、応募したお仕事のステータスを確認できます。また、店舗とのメッセージのやり取りも同じページから行えます。",
      },
      {
        question: "応募をキャンセルしたい場合はどうすればいいですか？",
        answer:
          "応募中のお仕事詳細ページから「応募をキャンセル」ボタンをクリックすることでキャンセルできます。ただし、すでに確定したお仕事のキャンセルは店舗に迷惑がかかるため、やむを得ない場合のみにしてください。",
      },
    ],
    payment: [
      {
        question: "報酬はいつ支払われますか？",
        answer:
          "お仕事完了後、店舗側の確認が取れてから翌月15日に登録口座へ振り込まれます。振込状況は「給料詳細」ページから確認できます。",
      },
      {
        question: "報酬の受け取り方法を教えてください",
        answer:
          "報酬は登録した銀行口座に振り込まれます。口座情報は「プロフィール」ページの「支払い設定」から登録・変更できます。",
      },
      {
        question: "源泉徴収は行われますか？",
        answer:
          "CookChefでは業務委託契約となるため、源泉徴収は行われません。確定申告は各自で行っていただく必要があります。",
      },
    ],
    trouble: [
      {
        question:
          "予定していたお仕事に行けなくなった場合はどうすればいいですか？",
        answer:
          "できるだけ早く店舗側にメッセージで連絡し、状況を説明してください。また、サポートセンターにも連絡をお願いします。急なキャンセルは評価に影響する場合があります。",
      },
      {
        question: "店舗とのトラブルが発生した場合の対応は？",
        answer:
          "まずは冷静に店舗側と話し合いを行ってください。解決しない場合は、お問い合わせフォームからサポートセンターに連絡してください。状況に応じて仲介いたします。",
      },
      {
        question: "報酬が支払われない場合はどうすればいいですか？",
        answer:
          "支払い予定日から3営業日経過しても入金がない場合は、サポートセンターにご連絡ください。状況を確認し、適切に対応いたします。",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-8">よくある質問</h1>

      <Tabs
        defaultValue="general"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto">
          {faqCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:text-white py-2"
              style={{
                backgroundColor:
                  activeTab === category.id ? "#DB3F1C" : "transparent",
                color: activeTab === category.id ? "white" : "inherit",
              }}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {faqCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: "#DB3F1C" }}>
                {category.name}
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {faqItems[category.id as keyof typeof faqItems].map(
                  (item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">解決しない場合は</h2>
        <p className="text-sm mb-4">
          お探しの質問が見つからない場合や、さらに詳しい情報が必要な場合は、
          お問い合わせフォームからご連絡ください。
        </p>
        <a href="/chef/contact">
          <button
            className="w-full py-3 rounded-md text-white font-medium"
            style={{ backgroundColor: "#DB3F1C" }}>
            お問い合わせフォームへ
          </button>
        </a>
      </div>
    </div>
  );
}
