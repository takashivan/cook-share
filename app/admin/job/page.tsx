"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  Phone,
  Send,
  User,
  MessageSquare,
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
import { jobApi } from "@/lib/api/job";
import { useParams } from "next/navigation";
import type { Application } from "@/types";
import type { UserProfile } from "@/types/user";
import type { Job } from "@/types";

interface ApplicationWithUser extends Omit<Application, "user"> {
  user: UserProfile;
}

interface Message {
  id: number;
  content: string;
  sender_type: "USER" | "RESTAURANT";
  created_at: string;
}

export default function JobApplicants() {
  const params = useParams();
  const jobId = params.id as string;
  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(
    null
  );
  const [applications, setApplications] = useState<ApplicationWithUser[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);

  const fetchJob = async () => {
    try {
      const response = await jobApi.getJob(jobId);
      const jobData: Job = {
        ...response,
        created_at: new Date(response.created_at).getTime(),
        updated_at: new Date(response.updated_at).getTime(),
        image: response.image || "",
        task: response.task || "",
        skill: response.skill || "",
        whattotake: response.whattotake || "",
        note: response.note || "",
        point: response.point || "",
      };
      setJob(jobData);
    } catch (error) {
      console.error("Failed to fetch job:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationApi.getApplicationsByJob(
        parseInt(jobId, 10)
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
  }, [jobId]);

  const selectedApplicantData =
    applications.find((a) => a.id === selectedApplicant) || null;

  const handleAcceptApplication = async (applicationId: string) => {
    if (!job) {
      console.error("Job information is not available");
      return;
    }
    try {
      // 応募一覧を再取得
      await fetchApplications();
    } catch (error) {
      console.error("Failed to accept application:", error);
    }
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
    </div>
  );
}
