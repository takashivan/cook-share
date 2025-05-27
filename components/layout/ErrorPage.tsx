'use client';

interface ErrorPageProps {
  errorMessage?: string;
}

export function ErrorPage({
  errorMessage = 'データの取得中にエラーが発生しました。しばらくしてから再度お試しください。',
}: ErrorPageProps) {
  return (
    <div className="flex items-center justify-center min-h-48">
      <div className="text-center text-red-600 bg-red-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">エラーが発生しました</h2>
        <p>{errorMessage}</p>
      </div>
    </div>
  )
}
