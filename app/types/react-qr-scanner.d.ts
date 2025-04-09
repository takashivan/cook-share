declare module "react-qr-scanner" {
  import { Component } from "react";

  interface QrScannerProps {
    onResult: (result: { getText: () => string }) => void;
    onError: (error: Error) => void;
    constraints?: {
      facingMode?: string;
    };
    className?: string;
  }

  export default class QrScanner extends Component<QrScannerProps> {}
}
