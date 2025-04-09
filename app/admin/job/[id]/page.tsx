"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Users,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  MoreHorizontal,
  QrCode,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import useSWR from "swr";
import { jobApi } from "@/lib/api/job";
import { applicationApi } from "@/lib/api/application";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChefReviewModal } from "@/components/modals/ChefReviewModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { GetApplicationsResponse } from "@/lib/api/application";
import { Application } from "@/types";
import { useRouter } from "next/navigation";
import { workSessionApi } from "@/lib/api/workSession";
import { messageApi, CreateMessageParams } from "@/lib/api/message";
import { Message, WorkSession } from "@/types";
import { QRCodeSVG } from "qrcode.react";

interface ApplicantCardProps {
  application: Application;
  isSelected: boolean;
  onSelect: () => void;
}

const ApplicantCard = ({
  application,
  isSelected,
  onSelect,
}: ApplicantCardProps) => (
  <div
    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
      isSelected ? "bg-gray-50" : ""
    }`}
    onClick={onSelect}>
    <div className="flex items-start gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={
            application.user.profile_image ||
            `/placeholder.svg?height=40&width=40&text=${application.user.name.charAt(
              0
            )}`
          }
          alt={application.user.name}
        />
        <AvatarFallback>{application.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium">{application.user.name}</p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(application.created_at), "MM/dd HH:mm")}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline">
            {application.status === "APPLIED"
              ? "応募中"
              : application.status === "ACCEPTED"
              ? "採用"
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
);

export default function JobDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(
    null
  );
  console.log("selectedApplicant", selectedApplicant);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [acceptMessage, setAcceptMessage] = useState(
    "この度は、ご応募いただき、ありがとうございます！\n\n当日、何卒よろしくお願いいたします。"
  );
  const router = useRouter();
  const [messageInput, setMessageInput] = useState("");
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);

  const { data: job, error: jobError } = useSWR(
    [`job`, params.id],
    ([_, id]) => jobApi.getJob(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  const { data: applications, error: applicationsError } =
    useSWR<GetApplicationsResponse>(
      params.id ? [`applications`, params.id] : null,
      async ([_, id]) => {
        const result = await applicationApi.getApplicationsByJob(Number(id));
        return result;
      },
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 10000,
      }
    );

  const isLoading =
    (!job && !jobError) || (!applications && !applicationsError);
  const error = jobError || applicationsError;

  const selectedApplicantData = applications?.find(
    (a) => a.id === selectedApplicant
  );

  console.log("Selected applicant status:", selectedApplicantData?.status);

  const { data: workSession } = useSWR<WorkSession | null>(
    selectedApplicantData?.status === "ACCEPTED"
      ? [`workSession-${selectedApplicantData.id}`]
      : null,
    async ([_]) => {
      if (!selectedApplicantData) return null;
      const result = (await workSessionApi.getWorkSessions()) as WorkSession[];
      // 選択された応募者のワークセッションをフィルタリング
      const applicantWorkSession = result.find(
        (ws) => ws.application_id === selectedApplicantData.id.toString()
      );
      return applicantWorkSession || null;
    }
  );

  const { data: messages, mutate: mutateMessages } = useSWR<Message[]>(
    workSession?.id ? [`messages-${workSession.id}`] : null,
    async ([_]) => {
      if (!workSession?.id) return [];
      const result = await messageApi.getMessagesByWorkSessionId(
        workSession.id
      );
      return result as Message[];
    },
    {
      refreshInterval: 3000,
    }
  );

  console.log("Debug - Current state:", {
    selectedApplicantData,
    workSession,
    messages,
  });

  const handleAcceptApplication = async (applicationId: string) => {
    try {
      await applicationApi.acceptApplication(applicationId, {
        message: acceptMessage,
      });
      setIsAcceptDialogOpen(false);
      // ページをリフレッシュして最新の状態を取得
      router.refresh();
    } catch (error) {
      console.error("Failed to accept application:", error);
    }
  };

  const handleRejectApplication = async (applicationId: string) => {
    try {
      await applicationApi.rejectApplication(applicationId);
      // ページをリフレッシュして最新の状態を取得
      router.refresh();
    } catch (error) {
      console.error("Failed to reject application:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !workSession || !selectedApplicantData) return;

    try {
      const messageParams: CreateMessageParams = {
        content: messageInput,
        worksession_id: workSession.id,
        application_id: selectedApplicantData.id.toString(),
        sender_type: "restaurant",
      };

      await messageApi.createMessage(messageParams);
      setMessageInput("");
      mutateMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="container mx-auto py-0">
      <div className="space-y-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
            className="hover:opacity-80">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {job?.title || "求人詳細"}
            </h2>
            <p className="text-muted-foreground">
              {format(
                job?.work_date ? new Date(job.work_date) : new Date(),
                "yyyy年MM月dd日",
                { locale: ja }
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            求人を編集
          </Button>
        </div>

        <Tabs defaultValue="applicants">
          <TabsList>
            <TabsTrigger value="applicants">応募者管理</TabsTrigger>
            <TabsTrigger value="detail">求人詳細</TabsTrigger>
          </TabsList>

          <TabsContent value="detail">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>求人詳細</CardTitle>
                  <Badge variant="outline">{job?.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      勤務日時
                    </h3>
                    <p>
                      {format(
                        job?.work_date ? new Date(job.work_date) : new Date(),
                        "yyyy年MM月dd日",
                        { locale: ja }
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(
                        job?.start_time ? new Date(job.start_time) : new Date(),
                        "HH:mm"
                      )}{" "}
                      〜{" "}
                      {format(
                        job?.end_time ? new Date(job.end_time) : new Date(),
                        "HH:mm"
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      給与
                    </h3>
                    <p>時給 {job?.hourly_rate}円</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    仕事内容
                  </h3>
                  <p className="whitespace-pre-wrap">{job?.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applicants">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-lg">応募者一覧</CardTitle>
                  <Tabs
                    defaultValue="APPLIED"
                    className="w-full"
                    onValueChange={() => setSelectedApplicant(null)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="APPLIED">応募中</TabsTrigger>
                      <TabsTrigger value="ACCEPTED">採用</TabsTrigger>
                      <TabsTrigger value="REJECTED">不採用</TabsTrigger>
                    </TabsList>
                    <TabsContent value="APPLIED" className="mt-4">
                      <div className="divide-y">
                        {applications
                          ?.filter((app) => app.status === "APPLIED")
                          .map((application) => (
                            <div
                              key={application.id}
                              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                                selectedApplicant === application.id
                                  ? "bg-gray-50"
                                  : ""
                              }`}
                              onClick={() =>
                                setSelectedApplicant(application.id)
                              }>
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={
                                      application.user.profile_image ||
                                      `/placeholder.svg?height=40&width=40&text=${application.user.name.charAt(
                                        0
                                      )}`
                                    }
                                    alt={application.user.name}
                                  />
                                  <AvatarFallback>
                                    {application.user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">
                                      {application.user.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {format(
                                        new Date(application.created_at),
                                        "MM/dd HH:mm"
                                      )}
                                    </p>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {application.message ||
                                      "メッセージはありません"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        {applications?.filter((app) => app.status === "APPLIED")
                          .length === 0 && (
                          <p className="text-center text-muted-foreground py-4">
                            応募者はいません
                          </p>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="ACCEPTED" className="mt-4">
                      <div className="divide-y">
                        {applications
                          ?.filter((app) => app.status === "ACCEPTED")
                          .map((application) => (
                            <div
                              key={application.id}
                              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                                selectedApplicant === application.id
                                  ? "bg-gray-50"
                                  : ""
                              }`}
                              onClick={() =>
                                setSelectedApplicant(application.id)
                              }>
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={
                                      application.user.profile_image ||
                                      `/placeholder.svg?height=40&width=40&text=${application.user.name.charAt(
                                        0
                                      )}`
                                    }
                                    alt={application.user.name}
                                  />
                                  <AvatarFallback>
                                    {application.user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">
                                      {application.user.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {format(
                                        new Date(application.created_at),
                                        "MM/dd HH:mm"
                                      )}
                                    </p>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {application.message ||
                                      "メッセージはありません"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        {applications?.filter(
                          (app) => app.status === "ACCEPTED"
                        ).length === 0 && (
                          <p className="text-center text-muted-foreground py-4">
                            採用者はいません
                          </p>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="REJECTED" className="mt-4">
                      <div className="divide-y">
                        {applications
                          ?.filter((app) => app.status === "REJECTED")
                          .map((application) => (
                            <div
                              key={application.id}
                              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                                selectedApplicant === application.id
                                  ? "bg-gray-50"
                                  : ""
                              }`}
                              onClick={() =>
                                setSelectedApplicant(application.id)
                              }>
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={
                                      application.user.profile_image ||
                                      `/placeholder.svg?height=40&width=40&text=${application.user.name.charAt(
                                        0
                                      )}`
                                    }
                                    alt={application.user.name}
                                  />
                                  <AvatarFallback>
                                    {application.user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">
                                      {application.user.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {format(
                                        new Date(application.created_at),
                                        "MM/dd HH:mm"
                                      )}
                                    </p>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {application.notes ||
                                      "不採用理由は記録されていません"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        {applications?.filter(
                          (app) => app.status === "REJECTED"
                        ).length === 0 && (
                          <p className="text-center text-muted-foreground py-4">
                            不採用者はいません
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>

              <Card className="lg:col-span-2">
                {selectedApplicantData ? (
                  <>
                    <CardHeader className="px-4 py-3 flex-row items-center justify-between space-y-0 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              selectedApplicantData.user.profile_image ||
                              `/placeholder.svg?height=40&width=40&text=${selectedApplicantData.user.name.charAt(
                                0
                              )}`
                            }
                            alt={selectedApplicantData.user.name}
                          />
                          <AvatarFallback>
                            {selectedApplicantData.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {selectedApplicantData.user.name}
                          </CardTitle>
                          <Badge variant="outline">
                            {selectedApplicantData.status === "APPLIED"
                              ? "応募中"
                              : selectedApplicantData.status === "ACCEPTED"
                              ? "採用"
                              : "不採用"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-2" />
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
                                      selectedApplicantData.user
                                        .profile_image ||
                                      `/placeholder.svg?height=40&width=40&text=${selectedApplicantData.user.name.charAt(
                                        0
                                      )}`
                                    }
                                    alt={selectedApplicantData.user.name}
                                  />
                                  <AvatarFallback>
                                    {selectedApplicantData.user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-medium">
                                    {selectedApplicantData.user.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {
                                      selectedApplicantData.user
                                        .experience_level
                                    }
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-1">
                                    経歴・スキル
                                  </h4>
                                  <p className="text-sm">
                                    {selectedApplicantData.user.bio}
                                  </p>
                                </div>
                                {selectedApplicantData.user.skills &&
                                  selectedApplicantData.user.skills.length >
                                    0 && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">
                                        スキル
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedApplicantData.user.skills.map(
                                          (skill, index) => (
                                            <Badge
                                              key={index}
                                              variant="secondary">
                                              {skill}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                {selectedApplicantData.user.certifications &&
                                  selectedApplicantData.user.certifications
                                    .length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">
                                        資格
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedApplicantData.user.certifications.map(
                                          (cert, index) => (
                                            <Badge
                                              key={index}
                                              variant="secondary">
                                              {cert}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {selectedApplicantData.status === "ACCEPTED" && (
                          <Dialog
                            open={isQrDialogOpen}
                            onOpenChange={setIsQrDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <QrCode className="h-4 w-4 mr-2" />
                                QRコード
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>勤務開始用QRコード</DialogTitle>
                                <DialogDescription>
                                  シェフにこのQRコードを提示してください
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex flex-col items-center justify-center p-4">
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                  <QRCodeSVG
                                    value={selectedApplicantData.id.toString()}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                  />
                                </div>
                                <p className="text-sm text-gray-500 mt-4">
                                  シェフがこのQRコードをスキャンすると、勤務開始が可能になります
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        {selectedApplicantData.status === "APPLIED" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">メニューを開く</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setIsAcceptDialogOpen(true)}>
                                採用する
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  handleRejectApplication(
                                    selectedApplicantData.id.toString()
                                  )
                                }>
                                不採用にする
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 h-[400px] flex flex-col">
                      {selectedApplicantData.status === "APPLIED" ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                          <div className="text-center space-y-2">
                            <p className="text-lg font-medium">応募者の確認</p>
                            <p className="text-muted-foreground">
                              この応募者のプロフィールを確認し、採用を検討してください。
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsAcceptDialogOpen(true)}>
                              採用する
                            </Button>
                            <Button variant="destructive">不採用にする</Button>
                          </div>
                        </div>
                      ) : selectedApplicantData.status === "ACCEPTED" ? (
                        <>
                          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                            {messages && messages.length > 0 ? (
                              messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`flex ${
                                    message.sender_type === "restaurant"
                                      ? "justify-end"
                                      : "justify-start"
                                  }`}>
                                  <div
                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                      message.sender_type === "restaurant"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-gray-100"
                                    }`}>
                                    <p className="text-sm">{message.content}</p>
                                    <p
                                      className={`text-xs mt-1 ${
                                        message.sender_type === "restaurant"
                                          ? "text-primary-foreground/70"
                                          : "text-gray-500"
                                      }`}>
                                      {format(
                                        new Date(message.created_at),
                                        "MM/dd HH:mm"
                                      )}
                                    </p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-center text-muted-foreground">
                                メッセージはありません
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="メッセージを入力..."
                              className="flex-1"
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendMessage();
                                }
                              }}
                            />
                            <Button
                              size="icon"
                              onClick={handleSendMessage}
                              disabled={!messageInput.trim()}>
                              <Send className="h-4 w-4" />
                              <span className="sr-only">送信</span>
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                          <div className="text-center space-y-2">
                            <p className="text-lg font-medium">不採用済み</p>
                            <p className="text-muted-foreground">
                              この応募者は不採用となりました。
                              {selectedApplicantData.notes && (
                                <>
                                  <br />
                                  理由: {selectedApplicantData.notes}
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      )}
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
                      左側のリストから応募者を選択すると、詳細が表示されます。
                    </p>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>採用の確認</DialogTitle>
            <DialogDescription>
              この応募者を採用します。採用時のメッセージを確認・編集してください。
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={acceptMessage}
              onChange={(e) => setAcceptMessage(e.target.value)}
              placeholder="採用メッセージを入力..."
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAcceptDialogOpen(false)}>
              キャンセル
            </Button>
            <Button
              onClick={() => {
                if (selectedApplicantData) {
                  handleAcceptApplication(selectedApplicantData.id.toString());
                }
              }}>
              採用する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
