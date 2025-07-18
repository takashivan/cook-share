import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { strToU8 } from "fflate";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * UTF-8エンコーディングのためのBOM（バイト順マーク）付きのBlobを生成する
 * @param data Blobに変換するデータ
 * @param type BlobのMIMEタイプ
 */
export const generateBlobWithBom = (data: Uint8Array, type: string): Blob => {
  const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), data], { type });
  return blob;
}

/**
* ダウンロード処理
* @param blob ダウンロードするBlob
* @param fileName ダウンロードするファイル名
*/
export const download = (blob: Blob, fileName: string): void => {
  // ダウンロードリンクを生成してダウンロード実行
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // メモリ解放
}

/**
 * CSVファイルをエクスポートする
 * @param data エクスポートするデータ
 * @param fileName エクスポートするファイル名
*/
export const exportCsv = (data: string, fileName: string): void => {
  // Blobを作成
  const blob = generateBlobWithBom(strToU8(data), 'text/csv;charset=utf-8;');
  download(blob, fileName);
}
