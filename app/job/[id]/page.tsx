import { getJobDetails } from "@/lib/api/job";
import { JobDetailClient } from "./client";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const jobDetail = await getJobDetails(params.id);
  return <JobDetailClient jobDetail={jobDetail} />;
}
