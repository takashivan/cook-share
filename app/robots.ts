import { MetadataRoute } from 'next';

const isProduction = process.env.VERCEL_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: isProduction ? undefined : '/'
    },
  };
}
