import { Skeleton } from "@/components/ui/skeleton";

export default function AccountSettingsLoading() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-10 rounded-full mr-2" />
        <Skeleton className="h-8 w-48" />
      </div>

      <Skeleton className="h-12 w-full mb-6" />

      <div className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
