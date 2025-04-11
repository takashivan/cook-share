import path from "path";
import { generateApi } from "swagger-typescript-api";

type ApiDefinition = {
  outputDir: string;
  url: string;
};

const aPIs: ApiDefinition[] = [
  {
    outputDir: "application",
    url: "https://xcti-onox-8bdw.n7e.xano.io/apispec:MJ8mZ3fN?type=json&token=",
  },
  {
    outputDir: "authentication",
    url: "https://xcti-onox-8bdw.n7e.xano.io/apispec:xaJlLYDj?type=json&token=",
  },
  {
    outputDir: "chef-connect",
    url: "https://xcti-onox-8bdw.n7e.xano.io/apispec:Mv5jTolf?type=json&token=",
  },
  {
    outputDir: "company",
    url: "https://xcti-onox-8bdw.n7e.xano.io/apispec:3LZoUG6X?type=json&token=",
  },
  {
    outputDir: "operator",
    url: "https://xcti-onox-8bdw.n7e.xano.io/apispec:grw3Vlqa?type=json&token=",
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
        })
      )
    );
    console.log("全てのAPI型定義ファイルを生成しました");
  } catch (error) {
    console.error("型生成エラー:", error);
  }
};

generateApiTypes();
