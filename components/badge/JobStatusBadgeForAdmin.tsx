"use client";

import { JobsListOutput, WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { Badge } from "@/components/ui/badge";

interface JobStatusBadgeForAdminProps {
  job: JobsListOutput[number];
  lastWorksession: WorksessionsRestaurantTodosListData[number] | null;
}

export function JobStatusBadgeForAdmin({
  job,
  lastWorksession,
}: JobStatusBadgeForAdminProps) {
  if (job.status === "FILLED" && lastWorksession?.status === "SCHEDULED") {
    return (
      <Badge className="bg-yellow-500 hover:bg-yellow-500">
        未チェックイン
      </Badge>
    )
  }

  if (job.status === "FILLED" && lastWorksession?.status === "IN_PROGRESS") {
    return (
      <Badge className="bg-yellow-500 hover:bg-yellow-500">
        完了報告待ち
      </Badge>
    )
  }

  if (job.status === "FILLED" && lastWorksession?.status === "COMPLETED") {
    return (
      <Badge className="bg-yellow-500 hover:bg-yellow-500">
        完了報告承認待ち
      </Badge>
    )
  }

  if (job.status === "PUBLISHED" && job.expiry_date && job.expiry_date > Date.now() && lastWorksession == null) {
    return (
      <Badge className="bg-blue-500 hover:bg-blue-500">
        募集中
      </Badge>
    )
  }

  if (job.status === "DRAFT") {
    return (
      <Badge className="bg-gray-500 hover:bg-gray-500">
        下書き
      </Badge>
    )
  }

  if (job.status === "PENDING") {
    return (
      <Badge className="bg-red-500 hover:bg-red-500">
        一時停止中
      </Badge>
    )
  }

  if (job.status === "PUBLISHED" && job.expiry_date && job.expiry_date <= Date.now()) {
    return (
      <Badge className="bg-red-500 hover:bg-red-500">
        募集終了
      </Badge>
    )
  }

  if (job.status === "FILLED" && lastWorksession?.status === "VERIFIED") {
    return (
      <Badge className="bg-green-500 hover:bg-green-500">
        完了報告承認済
      </Badge>
    )
  }

  if (job.status === "FILLED" && lastWorksession?.status === "CANCELED_BY_CHEF") {
    return (
      <Badge className="bg-black hover:bg-black">
        シェフキャンセル
      </Badge>
    )
  }

  if (job.status === "FILLED" && lastWorksession?.status === "CANCELED_BY_RESTAURANT") {
    return (
      <Badge className="bg-black hover:bg-black">
        レストランキャンセル
      </Badge>
    )
  }
};
