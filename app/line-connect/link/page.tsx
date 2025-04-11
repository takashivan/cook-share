"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LinkLineId } from "@/lib/api/line";
import { login } from "@/lib/api/user";

export default function LinkPage() {
  const router = useRouter();

  const [lineUserId, setLineUserId] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const liff = (await import("@line/liff")).default;
        await liff.init({
          liffId: "2007239287-yqkpjQBl",
          withLoginOnExternalBrowser: true,
        });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const profile = await liff.getProfile();
        setLineUserId(profile.userId);
        setName(profile.displayName);
        setPicture(profile.pictureUrl || "");
      } catch (err) {
        console.error("LIFF初期化エラー:", err);
      }
    };
    init();
  }, []);

  const handleLink = async () => {
    if (!lineUserId || !name || !email || !password) return;

    setIsLoading(true);
    try {
      // ① メール＋パスワードでログイン
      const loginRes = await login({ email, password });
      if (!loginRes.authToken) {
        alert("ログイン失敗しました");
        return;
      }

      // ② LINE IDを紐づける（トークン付きで）
      await LinkLineId(lineUserId, name, picture, loginRes.authToken);
      router.push("/chef/mypage");
    } catch (error) {
      console.error("連携失敗:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>LINEアカウント連携</h1>
      {name && <p>こんにちは、{name}さん</p>}

      <input
        type="email"
        placeholder="登録済みのメールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLink} disabled={isLoading}>
        {isLoading ? "連携中..." : "連携する"}
      </button>
    </div>
  );
}
