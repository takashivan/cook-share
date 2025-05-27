/**
* @fileoverview Axiosインスタンスの設定
* @description APIリクエストのためのAxiosインスタンスを作成し、リクエストとレスポンスのインターセプターを設定します。
*/

import axios from 'axios';
import { getAuthToken, clearAuthToken } from '@/lib/api/config';

export const createAxios = () => {
  const instance = axios.create({
    headers: {
      Accept: 'application/json',
    },
  });

  // リクエストインターセプター
  instance.interceptors.request.use((config) => {
    const userType = config.headers['X-User-Type'] || 'chef'; // デフォルトは 'chef'
    const token = getAuthToken(userType);
    config.headers['X-User-Type'] = undefined; // ヘッダーから削除

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // JSONかFormDataかでContent-Typeを制御
    const isFormData = config.data instanceof FormData;
    if (!isFormData) {
      config.headers['Content-Type'] = 'application/json';
    }

    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: isFormData ? 'FormData' : config.data,
    });

    return config;
  });

  // レスポンスインターセプター
  instance.interceptors.response.use(
    (response) => {
      console.log('API Success Response:', response.data);
      return response;
    },
    async (error) => {
      console.error('API Error Response:', error.response?.data);
      // 認証エラー (401) の場合、ログアウト処理など
      if (error.response?.status === 401) {
        clearAuthToken();
        // リダイレクトやエラー表示など
        console.log('Authentication error, redirecting to login...');
        // 認証エラー処理をここに追加（例：ログインページへリダイレクト）
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
