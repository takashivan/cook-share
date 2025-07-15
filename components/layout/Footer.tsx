"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
          <a
            href="https://corp.cookbiz.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            運営会社
          </a>

          <span>|</span>
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            利用規約
          </Link>

          <span>|</span>
          <a
            href="https://corp.cookbiz.co.jp/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            プライバシーポリシー
          </a>

          <span>|</span>
          <a
            href="https://corp.cookbiz.co.jp/privacy-policy-treatment/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            個人情報の取扱いについて
          </a>

          <span>|</span>
          <a
            href="https://corp.cookbiz.co.jp/privacy-policy-publication/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            個人情報に関する公表文
          </a>
          
          <span>|</span>
          <a
            href="https://corp.cookbiz.co.jp/tokushoho"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            特定商取引法に基づく表記
          </a>

          <span>|</span>
          <Link
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            お問い合わせ
          </Link>

          <span>|</span>
          <Link
            href="/faq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            よくある質問
          </Link>
        </div>
      </div>
    </footer>
  );
}
