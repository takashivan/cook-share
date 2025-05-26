"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  delay?: number;
  className?: string;
}

export function LoadingScreen({
  message = "読み込み中...",
  fullScreen = true,
  delay = 300,
  className,
}: LoadingScreenProps) {
  const [show, setShow] = useState(delay === 0);
  const logo = "/chef_illust/chef_logo.png?height=800&width=1200";

  useEffect(() => {
    if (delay === 0) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        fullScreen ? "fixed inset-0 z-50 bg-white" : "w-full h-full min-h-[300px]",
        className
      )}>
      <div className="flex flex-col items-center max-w-md px-8 text-center">
        <div className="relative w-48 h-48 mb-6 animate-pulse">
          <img
            src={logo}
            alt="CHEFDOM"
            className="object-contain w-full h-full"
          />
        </div>

        <div className="w-full max-w-xs mb-6">
          <div className="h-1 bg-gray-100 rounded-full">
            <div className="h-1 bg-gray-800 rounded-full animate-loadingBar"></div>
          </div>
        </div>

        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export function ChefLoadingScreen({
  fullScreen = true,
  className,
}: {
  fullScreen?: boolean;
  className?: string;
}) {
  return (
    <LoadingScreen
      message="シェフ情報を読み込んでいます..."
      fullScreen={fullScreen}
      className={className}
    />
  );
}

export function AdminLoadingScreen({
  fullScreen = true,
  className,
}: {
  fullScreen?: boolean;
  className?: string;
}) {
  return (
    <LoadingScreen
      message="管理画面を準備しています..."
      fullScreen={fullScreen}
      className={className}
    />
  );
}

export function RestaurantLoadingScreen({
  fullScreen = true,
  className,
}: {
  fullScreen?: boolean;
  className?: string;
}) {
  return (
    <LoadingScreen
      message="レストラン情報を読み込んでいます..."
      fullScreen={fullScreen}
      className={className}
    />
  );
}
