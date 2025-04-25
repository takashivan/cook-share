export function formatToJapanTime(ms: number): string {
  const date = new Date(ms);
  return date.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatToJapanDate(ms: number): string {
  const date = new Date(ms);
  return date.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatToJapanDateTime(ms: number): string {
  const date = new Date(ms);
  return date.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });
}

export function formatJapanHHMM(ms: number): string {
  const date = new Date(ms);
  return date.toLocaleString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatWorkSessionJapaneseStatus(status: string): string {
  switch (status) {
    case "VERIFIED":
      return "確認済み";
    case "APPROVED":
      return "承認済み";
    case "REJECTED":
      return "拒否";
    case "CANCELED":
      return "キャンセル";
    case "COMPLETED":
      return "完了";
    case "EXPIRED":
      return "期限切れ";
    case "FAILED":
      return "失敗";
    case "SCHEDULED":
      return "予定";
    case "IN_PROGRESS":
      return "進行中";
    case "PAUSED":
      return "一時停止";
    case "RESCHEDULED":
      return "再予定";
    default:
      return status;
  }
}

export function formatJobPostingJapaneseStatus(status: string): string {
  switch (status) {
    case "PUBLISHED":
      return "公開中";
    case "DRAFT":
      return "下書き";
    case "EXPIRED":
      return "終了";
    case "CANCELED":
      return "キャンセル";
    case "PENDING":
      return "一時停止中";
    default:
      return status;
  }
}
