import 'dotenv/config';
import path from "path";
import { generateApi } from "swagger-typescript-api";

type ApiDefinition = {
  outputDir: string;
  url: string;
};

const aPIs: ApiDefinition[] = [
  {
    outputDir: "base",
    url: process.env.XANO_BASE_API_URL || "",
  },
  {
    outputDir: "authentication",
    url: process.env.XANO_AUTHENTICATION_API_URL || "",
  },
  {
    outputDir: "company",
    url: process.env.XANO_COMPANY_API_URL || "",
  },
  {
    outputDir: "LINE",
    url: process.env.XANO_LINE_API_URL || "",
  },
  {
    outputDir: "operator",
    url: process.env.XANO_OPERATOR_API_URL || "",
  },
  {
    outputDir: "stripe",
    url: process.env.XANO_STRIPE_API_URL || "",
  },
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
  nameCase: "camel",
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
          codeGenConstructs: (struct: any) => ({
            ...struct,
            TypeField: (content: any) => {
              const { readonly, key, value } = content;
              return `${readonly ? "readonly " : ""}${key}: ${value}`;
            },
          }),
        })
      )
    );
    console.log("全てのAPI型定義ファイルを生成しました");
  } catch (error) {
    console.error("型生成エラー:", error);
  }
};

generateApiTypes();
