import { JobDetailClient } from "./client";
import { getApi } from "@/api/api-factory";
import { Jobs } from "@/api/__generated__/base/Jobs";

export default async function JobDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const jobsApi = getApi(Jobs)
  const { data: jobDetail } = await jobsApi.jobsDetail(Number(params.id));
  return <JobDetailClient jobDetail={jobDetail} />;
}
