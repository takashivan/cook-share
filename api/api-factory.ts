import type { AxiosInstance } from 'axios';
import axiosInstance from './axios';

type Constructor<T> = new (args: { axiosInstance: AxiosInstance }) => T;

// 自動で API クラスのマップを作る（PascalCase 前提）
const apiCache = new Map<string, any>();

/**
* @description
* この関数は、指定された API クラスのインスタンスを取得します。
* もしインスタンスがまだ作成されていない場合は、新しいインスタンスを作成します。
* @param ApiClass - インスタンス化する API クラス
* @returns - 指定された API クラスのインスタンス
*/
export function getApi<T>(ApiClass: Constructor<T>): T {
  const className = ApiClass.name;
  if (!apiCache.has(className)) {
    // axios のインスタンスを渡して API クラスを初期化
    apiCache.set(className, new ApiClass({ axiosInstance: axiosInstance }));
  }
  return apiCache.get(className);
}
