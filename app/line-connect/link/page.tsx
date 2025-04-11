import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LinkLineId } from "@/lib/api/line";
import { getAuthToken } from "@/lib/api/config";

export default function LinkPage() {
  const router = useRouter();
  const [lineUserId, setLineUserId] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const liff = (await import("@line/liff")).default;
        await liff.init({
          liffId: "実際のLIFF ID",
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
    if (!lineUserId || !name) return;

    setIsLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        router.push("/login");
        return;
      }

      await LinkLineId(lineUserId, name, picture);
      router.push("/chef/mypage");
    } catch (error) {
      console.error("Failed to link line account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>LINEアカウント連携</h1>
      {name && <p>ようこそ、{name}さん</p>}
      <button onClick={handleLink} disabled={isLoading}>
        {isLoading ? "連携中..." : "連携する"}
      </button>
    </div>
  );
}
