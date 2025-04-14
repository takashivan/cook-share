declare module "html5-qrcode" {
  export class Html5QrcodeScanner {
    constructor(
      elementId: string,
      config: {
        fps: number;
        qrbox: { width: number; height: number };
        aspectRatio: number;
      },
      verbose: boolean
    );
    render(
      successCallback: (decodedText: string) => void,
      errorCallback: (errorMessage: string) => void
    ): Promise<void>;
    clear(): Promise<void>;
  }
}
