import path from "path";
import { generateApi } from "swagger-typescript-api";

type ApiDefinition = {
  outputDir: string;
  url: string;
};

const aPIs: ApiDefinition[] = [
  {
    outputDir: "base",
    url: "https://xcti-onox-8bdw.n7e.xano.io/apispec:Mv5jTolf?type=json&token=",
  },
  // シェフ側のauth、Operator、Stripe、LINE
];

const baseConfig = {
  defaultResponseAsSuccess: false,
  // リクエストボディ、リクエストパラメータ、レスポンスボディ、レスポンスエラーの型を生成する
  extractRequestBody: true,
  extractRequestParams: true,
  extractResponseBody: true,
  extractResponseError: true,
  httpClientType: "axios" as const,
  modular: true,
  nameCase: 'camel',
  templates: path.resolve(process.cwd(), "scripts/generate-apis/templates"),
  unionEnums: true,
};

const generateApiTypes = async () => {
  try {
    await Promise.all(
      aPIs.map(({ url, outputDir }) =>
        generateApi({
          ...baseConfig,
          url,
          output: path.resolve(process.cwd(), "api/__generated__", outputDir),
          codeGenConstructs: (struct) => ({
            ...struct,
            TypeField: (content) => {
              const { readonly, key, value } = content as any;
              return `${readonly ? 'readonly ' : ''}${key}: ${value}`;
            }
          })
        })
      )
    );
    console.log("全てのAPI型定義ファイルを生成しました");
  } catch (error) {
    console.error("型生成エラー:", error);
  }
};

generateApiTypes();
