"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function NotFound({ error }: { error: Error & { digest?: string } }) {
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
        <h1 className="text-2xl font-bold mb-4">お探しのページは見つかりませんでした。</h1>
        <p className="text-lg text-center">URLが間違っているか、ページが移動または削除された可能性があります。</p>
        <p className="text-lg text-center mt-4">
          <Link href="/" className="text-blue-500 hover:underline">
            トップページに戻る
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
