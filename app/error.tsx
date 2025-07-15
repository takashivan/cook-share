"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center flex-grow p-4 bg-white">
        <Image
          src="/chef_illust/chef_logo.png"
          alt="CHEFDOM"
          width={300}
          height={200}
          className="object-contain h-auto mb-4"
          priority
        />
        <h1 className="text-2xl font-bold mb-4">エラーが発生しました</h1>
        <p className="text-lg text-center">申し訳ありません。予期しないエラーが発生しました。<br />
ページを再読み込みするか、しばらく時間をおいて再度お試しください。</p>
      </div>
      <Footer />
    </div>
  );
}