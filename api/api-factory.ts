import type { AxiosInstance } from 'axios';
import axiosInstance from './axios';

type Constructor<T> = new (args: { axiosInstance: AxiosInstance }) => T;

/**
* @description
* この関数は、指定された API クラスのインスタンスを取得します。
* @param ApiClass - インスタンス化する API クラス
* @returns - 指定された API クラスのインスタンス
*/
export function getApi<T>(ApiClass: Constructor<T>): T {
  return new ApiClass({ axiosInstance: axiosInstance });
}
