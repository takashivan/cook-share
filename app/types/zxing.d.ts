declare module "@zxing/browser" {
  import { Result } from "@zxing/library";

  export class BrowserQRCodeReader {
    constructor();
    decodeFromVideoDevice(
      deviceId: string | undefined,
      videoElement: HTMLVideoElement,
      callback: (result: Result | undefined, error?: Error) => void
    ): Promise<void>;
    stop(): void;
  }
}
