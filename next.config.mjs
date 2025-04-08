/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // ... existing domains ...
      "x8ki-letl-twmt.n7.xano.io", // Xanoのドメイン
      "storage.googleapis.com", // Google Cloud Storageのドメイン
      "xcti-onox-8bdw.n7e.xano.io", // 新しいXanoのドメイン
    ],
  },
};

export default nextConfig;
