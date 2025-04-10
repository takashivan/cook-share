declare module 'swagger-typescript-api' {
  export function generateApi(options: {
    defaultResponseAsSuccess?: boolean;
    extractRequestBody?: boolean;
    extractRequestParams?: boolean;
    extractResponseBody?: boolean;
    extractResponseError?: boolean;
    httpClientType?: string;
    modular?: boolean;
    name: string;
    nameCase?: string;
    output: string;
    unionEnums?: boolean;
    url: string;
  }): Promise<void>;
}
