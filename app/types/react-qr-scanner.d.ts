declare module "react-qr-scanner" {
  import { Component } from "react";

  interface QrScannerProps {
    onResult: (result: { getText: () => string }) => void;
    onError: (error: Error) => void;
    constraints?: {
      facingMode?: "user" | "environment";
    };
    className?: string;
  }

  const QrScanner: React.FC<QrScannerProps>;
  export default QrScanner;
}
