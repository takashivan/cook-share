'use client'

import React, { useEffect, useRef, useState } from 'react';
import { CameraDevice, Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';

interface QrCodeReaderProps {
  handleDecodeAction: (decodedText: string) => void;
  handleErrorAction?: (error: string) => void;
}

export function QrCodeReader({
  handleDecodeAction,
  handleErrorAction
}: QrCodeReaderProps) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const LOCAL_STORAGE_KEY = 'qr-camera-config';

  type CameraConfig = {
    hasPermission: boolean;
    lastUsedCameraId?: string;
  };
  
  const getStoredCameraConfig = (): CameraConfig => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { hasPermission: false };
    try {
      return JSON.parse(raw);
    } catch {
      return { hasPermission: false };
    }
  };
  
  const saveCameraConfig = (config: CameraConfig) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  };

  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(
    getStoredCameraConfig().hasPermission
  );

  const initCamera = async () => {
    setError(null);
    try {
      const devices = await Html5Qrcode.getCameras();
      if (!devices.length) {
        setError('カメラデバイスが見つかりません');
        return;
      }

      const storedConfig = getStoredCameraConfig();
      let selectedCamera: CameraDevice | null = null;

      if (storedConfig.lastUsedCameraId) {
        const matched = devices.find(d => d.id === storedConfig.lastUsedCameraId);
        if (matched) selectedCamera = matched;
      }

      const html5QrCode = new Html5Qrcode(scannerRef.current!.id);
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        // 一度承認したカメラがあればそれを、なければ背面カメラを使用
        selectedCamera?.id ?? {
          facingMode: 'environment',
        },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          console.log('読み取り成功:', decodedText);
          handleDecodeAction(decodedText);
          html5QrCode.stop();
        },
        (errorMessage) => {
          console.log('読み取り失敗:', errorMessage);
          handleErrorAction?.(errorMessage);
        }
      );

      const newCameraId = html5QrCode.getRunningTrackSettings().deviceId;
      saveCameraConfig({ hasPermission: true, lastUsedCameraId: newCameraId });
      setHasPermission(true);
    } catch (err) {
      console.error('カメラアクセスに失敗しました', err);
      setError('カメラアクセスが拒否されました。許可してください。');
      setHasPermission(false);
    }
  };

  useEffect(() => {
    initCamera();

    return () => {
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3" style={{ width: '300px', height: '300px' }}>
      {error && (
        <div className="text-red-600 border border-red-300 bg-red-50 p-3 rounded w-full max-w-sm text-center">
          {error}
        </div>
      )}
      {!hasPermission && (
        <Button
          variant="outline"
          onClick={initCamera}
        >
          カメラアクセスを許可する
        </Button>
      )}
      <div id="qr-reader" ref={scannerRef} style={{ width: '300px', height: '300px' }} />
    </div>
  );
}
