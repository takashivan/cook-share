import { getJobDetails } from "@/lib/api/job";
import { JobDetailClient } from "./client";

export default async function JobDetailPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const jobDetail = await getJobDetails(params.id);
  return <JobDetailClient jobDetail={jobDetail} />;
}
