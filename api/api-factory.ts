import type { AxiosInstance } from 'axios';
import axiosInstance from './axios';

type Constructor<T> = new (args: { axiosInstance: AxiosInstance }) => T;

// 自動で API クラスのマップを作る（PascalCase 前提）
const apiCache = new WeakMap<Constructor<any>, any>();

/**
* @description
* この関数は、指定された API クラスのインスタンスを取得します。
* もしインスタンスがまだ作成されていない場合は、新しいインスタンスを作成します。
* @param ApiClass - インスタンス化する API クラス
* @returns - 指定された API クラスのインスタンス
*/
export function getApi<T>(ApiClass: Constructor<T>): T {
  console.log('getApi', ApiClass);
  if (!apiCache.has(ApiClass)) {
    // axios のインスタンスを渡して API クラスを初期化
    apiCache.set(ApiClass, new ApiClass({ axiosInstance: axiosInstance }));
    console.log('apiCache', apiCache);
  }
  return apiCache.get(ApiClass);
}
