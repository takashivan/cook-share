import { MetadataRoute } from 'next';

const isProduction =
  process.env.NODE_ENV === 'production' &&
  process.env.VERCEL_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // TODO: 本番公開時にコメントを戻す
      // disallow: isProduction ? undefined : '/'
      disallow: '/',
    },
  };
}
