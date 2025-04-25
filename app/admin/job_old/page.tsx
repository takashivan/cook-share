"use client";

import { useState, useEffect, use } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  Phone,
  Send,
  User,
  MessageSquare,
  Plus,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { applicationApi } from "@/lib/api/application";
import { jobApi, getJobDetails } from "@/lib/api/job";
import { useParams, useRouter } from "next/navigation";
import type { Application } from "@/types";
import type { UserProfile } from "@/types/user";
import { CreateJobModal } from "@/components/modals/CreateJobModal";

interface ApplicationWithUser extends Omit<Application, "user"> {
  user: UserProfile;
}

interface Message {
  id: number;
  content: string;
  sender_type: "USER" | "RESTAURANT";
  created_at: string;
}

interface JobDetail {
  job: {
    id: number;
    title: string;
    description: string;
    work_date: string;
    start_time: number;
    end_time: number;
    hourly_rate: number;
    status: string;
    image: string;
    task: string;
    skill: string;
    whattotake: string;
    note: string;
    point: string;
    transportation: string;
  };
  restaurant: {
    id: string;
    name: string;
    address: string;
    business_hours: string;
    contact_info: string;
    profile_image: string;
    station: string;
    access: string;
  };
}

export default function JobApplicants({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(
    null
  );
  const [applications, setApplications] = useState<ApplicationWithUser[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<JobDetail | null>(null);
  const router = useRouter();
  // const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [copiedJob, setCopiedJob] = useState<any>(null);

  const fetchJob = async () => {
    try {
      const response = await getJobDetails(id);
      setJob(response);
    } catch (error) {
      console.error("Failed to fetch job:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationApi.getApplicationsByJob(
        parseInt(id, 10)
      );
      setApplications(response as ApplicationWithUser[]);
      // 最初の応募者を選択
      if (response.length > 0 && !selectedApplicant) {
        setSelectedApplicant(response[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
    fetchApplications();
  }, [id]);

  const selectedApplicantData =
    applications.find((a) => a.id === selectedApplicant) || null;

  const handleAcceptApplication = async (applicationId: string) => {
    try {
      // 応募一覧を再取得
      await fetchApplications();
    } catch (error) {
      console.error("Failed to accept application:", error);
    }
  };

  const handleCopyJob = (job: any) => {
    const jobData = {
      ...job,
      title: `${job.title} (コピー)`,
      status: "DRAFT",
      id: undefined,
    };
    setCopiedJob(jobData);
    // setIsCreateJobModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">応募者管理</h2>
        <p className="text-muted-foreground">
          【明治創業】上野駅徒歩5分、老舗洋食店での勤務
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicants List */}
        <Card className="lg:col-span-1">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-lg">応募者一覧</CardTitle>
            <CardDescription>全 {applications.length} 名</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedApplicant === application.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedApplicant(application.id)}>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={application.user?.avatar_url || "/placeholder.svg"}
                        alt={application.user?.name || ""}
                      />
                      <AvatarFallback>
                        {application.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{application.user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            application.created_at
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`
                          ${
                            application.status === "APPLIED"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                          }
                          ${
                            application.status === "ACCEPTED"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                          ${
                            application.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : ""
                          }
                        `}>
                          {application.status === "APPLIED"
                            ? "応募済み"
                            : application.status === "ACCEPTED"
                              ? "採用決定"
                              : application.status === "REJECTED"
                                ? "不採用"
                                : application.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {application.notes || "メッセージはありません"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedApplicantData ? (
            <>
              <CardHeader className="px-4 py-3 flex-row items-center justify-between space-y-0 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        selectedApplicantData.user?.avatar_url ||
                        "/placeholder.svg"
                      }
                      alt={selectedApplicantData.user?.name || ""}
                    />
                    <AvatarFallback>
                      {selectedApplicantData.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {selectedApplicantData.user?.name}
                    </CardTitle>
                    <Badge
                      className={`
                        ${
                          selectedApplicantData.status === "APPLIED"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }
                        ${
                          selectedApplicantData.status === "ACCEPTED"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          selectedApplicantData.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                      `}>
                      {selectedApplicantData.status === "APPLIED"
                        ? "応募済み"
                        : selectedApplicantData.status === "ACCEPTED"
                          ? "採用決定"
                          : selectedApplicantData.status === "REJECTED"
                            ? "不採用"
                            : selectedApplicantData.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        プロフィール
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>応募者プロフィール</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={
                                selectedApplicantData.user?.avatar_url ||
                                "/placeholder.svg"
                              }
                              alt={selectedApplicantData.user?.name || ""}
                            />
                            <AvatarFallback>
                              {selectedApplicantData.user?.name?.charAt(0) ||
                                "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-medium">
                              {selectedApplicantData.user?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              30歳・男性
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">連絡先</h4>
                            <div className="text-sm flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              090-1234-5678
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              希望勤務日
                            </h4>
                            <div className="text-sm flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              月・水・金
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              希望勤務時間
                            </h4>
                            <div className="text-sm flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              11:00〜15:00
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">居住地</h4>
                            <div className="text-sm flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              東京都台東区
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              経歴・スキル
                            </h4>
                            <p className="text-sm">
                              洋食店で2年ほど調理補助として勤務。ハンバーグやオムライスなどの基本的な調理が可能。接客経験もあり。
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">メニューを開く</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>面接を設定</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleAcceptApplication(
                            selectedApplicantData.id.toString()
                          )
                        }>
                        採用する
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        不採用にする
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 h-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender_type === "RESTAURANT"
                            ? "justify-end"
                            : "justify-start"
                        }`}>
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.sender_type === "RESTAURANT"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}>
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender_type === "RESTAURANT"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}>
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      メッセージはまだありません
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="メッセージを入力..." className="flex-1" />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">送信</span>
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-8 flex flex-col items-center justify-center h-[500px] text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                応募者を選択してください
              </h3>
              <p className="text-muted-foreground">
                左側のリストから応募者を選択すると、チャット履歴が表示されます。
              </p>
            </CardContent>
          )}
        </Card>
      </div>

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-2xl font-bold">求人一覧</h2>
        {/* <Button onClick={() => setIsCreateJobModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          新規求人を作成
        </Button> */}
      </div>

      <div className="space-y-4">
        {/* ここに求人一覧の表示ロジックを追加 */}
        {/* 例: */}
        {job && (
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">{job.job.title}</h3>
              <p className="text-sm text-gray-500">{job.job.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleCopyJob(job.job)}>
                <Copy className="h-4 w-4 mr-2" />
                コピーして新規作成
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* {isCreateJobModalOpen && (
        <CreateJobModal
          isOpen={isCreateJobModalOpen}
          onClose={() => {
            setIsCreateJobModalOpen(false);
            setCopiedJob(null);
          }}
          onSubmit={async (formData) => {
            try {
              const response = await fetch("/api/jobs", {
                method: "POST",
                body: formData,
              });

              if (!response.ok) {
                throw new Error("Failed to create job");
              }

              router.push("/admin/job");
            } catch (error) {
              console.error("Error creating job:", error);
            }
          }}
          restaurantId={0} // TODO: 実際のレストランIDを設定する
          initialData={copiedJob}
        />
      )} */}
    </div>
  );
}
