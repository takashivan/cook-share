/**
* @fileoverview Axiosインスタンスの設定
* @description APIリクエストのためのAxiosインスタンスを作成し、リクエストとレスポンスのインターセプターを設定します。
*/

import axios from 'axios';
import { getAuthToken } from '@/lib/api/config';

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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // JSONかFormDataかでContent-Typeを制御
    const isFormData = config.data instanceof FormData;
    if (!isFormData) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  });

  // レスポンスインターセプター
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}
