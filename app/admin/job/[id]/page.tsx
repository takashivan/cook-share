"use client";

import { useState, use, useEffect, useRef } from "react";
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
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
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
import { useParams } from "next/navigation";
import { Job } from "@/types";
import { WorkSessionWithJob, WorkSessionWithUser } from "@/types";
import { RestaurantReviewModal } from "@/components/modals/RestaurantReviewModal";
import { chefReviewApi } from "@/lib/api/chefReview";
import { ChefReview } from "@/types";
import { FaStar } from "react-icons/fa";
import { GetJobData } from "@/api/__generated__/chef-connect/data-contracts";
import { XanoClient } from "@xano/js-sdk";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  const { data: jobData, error: jobError } = useSWR<GetJobData>(
    [`job`, id],
    async ([_, jobId]: [string, string]) => jobApi.getJob(jobId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  const xanoClient = new XanoClient({
    instanceBaseUrl: process.env.NEXT_PUBLIC_XANO_BASE_URL || "",
    realtimeConnectionHash: process.env.NEXT_PUBLIC_XANO_REALTIME_HASH || "",
  });

  const job = jobData?.job;
  const restaurant = jobData?.restaurant;

  console.log("job data:", { job, restaurant });

  const { data: applications, error: applicationsError } =
    useSWR<GetApplicationsResponse>(
      id ? [`applications`, id] : null,
      async ([_, jobId]) => {
        const result = await applicationApi.getApplicationsByJob(Number(jobId));
        return result;
      },
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 10000,
      }
    );

  const {
    data: workSessions,
    error: workSessionsError,
    mutate,
  } = useSWR<WorkSessionWithUser[]>(
    id ? [`workSessions`, id] : null,
    async ([_, jobId]: [string, string]) => {
      const result = await workSessionApi.getWorkSessionsToDoByJobId(jobId);
      console.log("Fetched workSessions:", result);
      return result as WorkSessionWithUser[];
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const isLoading =
    (!job && !jobError) ||
    (!applications && !applicationsError) ||
    (!workSessions && !workSessionsError);
  const error = jobError || applicationsError || workSessionsError;

  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(
    null
  );
  console.log("selectedApplicant:", selectedApplicant);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [acceptMessage, setAcceptMessage] = useState(
    "この度は、ご応募いただき、ありがとうございます！\n\n当日、何卒よろしくお願いいたします。"
  );
  const router = useRouter();
  const [messageInput, setMessageInput] = useState("");
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedWorkSession, setSelectedWorkSession] =
    useState<WorkSessionWithUser | null>(null);
  const [isChefReviewModalOpen, setIsChefReviewModalOpen] = useState(false);
  const [chefReview, setChefReview] = useState<ChefReview | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedWorkSessionData = workSessions?.find((ws) => {
    console.log("Comparing:", {
      wsId: ws.id,
      selectedId: selectedApplicant,
      isMatch: ws.id === selectedApplicant,
    });
    return ws.id === selectedApplicant;
  });

  console.log("selectedWorkSessionData:", selectedWorkSessionData);

  const { data: messages, mutate: mutateMessages } = useSWR<Message[]>(
    selectedWorkSessionData?.id
      ? [`messages-${selectedWorkSessionData.id}`]
      : null,
    async ([_]) => {
      if (!selectedWorkSessionData?.id) return [];
      console.log(
        "Fetching messages for workSession:",
        selectedWorkSessionData.id
      );
      const result = await messageApi.getMessagesByWorkSessionId(
        selectedWorkSessionData.id
      );
      return result as Message[];
    }
  );

  // Xanoのリアルタイム接続を設定
  useEffect(() => {
    if (!selectedWorkSessionData?.id) return;

    let channel: any;

    const setupChannel = async () => {
      try {
        // チャンネルの設定
        channel = xanoClient.channel(
          `worksession/${selectedWorkSessionData.id}`
        );
        console.log(
          "Channel setup for workSession:",
          selectedWorkSessionData.id
        );

        // メッセージの購読
        channel.on((message: any) => {
          console.log("Admin received message:", message);
          mutateMessages();
        });
      } catch (error) {
        console.error("Error setting up channel:", error);
      }
    };

    setupChannel();
  }, [selectedWorkSessionData?.id, mutateMessages]);

  console.log("Debug - Current state:", {
    selectedApplicant,
    selectedWorkSessionData,
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
      toast({
        title: "不採用にしました",
        description: "応募者を不採用にしました",
      });
    } catch (error) {
      console.error("Failed to reject application:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedWorkSessionData) return;

    try {
      const channel = xanoClient.channel(
        `worksession/${selectedWorkSessionData.id}`
      );

      // メッセージをAPIで送信
      const messageParams: CreateMessageParams = {
        content: messageInput,
        worksession_id: selectedWorkSessionData.id,
        application_id: selectedWorkSessionData.application_id,
        sender_type: "restaurant",
      };

      await messageApi.createMessage(messageParams);

      // Xanoチャンネルでメッセージを送信
      channel.message(messageParams);

      setMessageInput("");
      mutateMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleReviewSubmit = async (
    rating: number,
    comment: string,
    approved: boolean
  ) => {
    if (!selectedWorkSession) return;

    try {
      await workSessionApi.updateWorkSessionToVerify(
        selectedWorkSession.id,
        rating,
        comment
      );

      // シェフの評価を取得
      const review = (await chefReviewApi.getChefReviewsBySessionId(
        selectedWorkSession.id
      )) as ChefReview;
      console.log("review", review);

      setChefReview(review);
      setIsChefReviewModalOpen(true);

      // Refresh work sessions
      mutate();
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast({
        title: "Error",
        description: "評価の送信に失敗しました",
        variant: "destructive",
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // メッセージが更新されたらスクロール
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
            <TabsTrigger value="todo">やること</TabsTrigger>
            <TabsTrigger value="applicants">応募者管理</TabsTrigger>
            <TabsTrigger value="detail">求人詳細</TabsTrigger>
          </TabsList>

          <TabsContent value="todo">
            <div className="space-y-4">
              {workSessions?.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Edit className="h-5 w-5 text-gray-700" />
                      <div
                        className={`px-3 py-1 rounded-full text-sm ${
                          session.status === "SCHEDULED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {session.status === "SCHEDULED"
                          ? "お仕事開始前"
                          : "完了報告"}
                      </div>
                    </div>
                    {session.status === "SCHEDULED" ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <QrCode className="h-4 w-4 mr-2" />
                            チェックインQR
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>チェックインQRコード</DialogTitle>
                            <DialogDescription>
                              シェフにこのQRコードを提示してください
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col items-center justify-center p-4">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                              <QRCodeSVG
                                value={session.application_id}
                                size={200}
                                level="H"
                                includeMargin={true}
                              />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedWorkSession(session);
                            setIsReviewModalOpen(true);
                          }}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          完了報告を確認
                        </Button>
                      </Dialog>
                    )}
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {format(new Date(session.job.work_date), "MM/dd (E)", {
                          locale: ja,
                        })}
                      </span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-500">
                        {format(new Date(session.check_in_time), "HH:mm")} 〜{" "}
                        {format(new Date(session.check_out_time), "HH:mm")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={session.user.profile_image || "/default-avatar.png"}
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{session.user.name}</div>
                      <div className="text-sm text-gray-500">
                        {session.user.skills.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {workSessions?.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  現在、完了報告待ちの勤務はありません
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="applicants">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-lg">応募者一覧</CardTitle>
                  <Tabs
                    defaultValue="ACCEPTED"
                    className="w-full"
                    onValueChange={() => setSelectedApplicant(null)}>
                    <TabsList className="grid w-full grid-cols-2">
                      {/* <TabsTrigger value="APPLIED">応募中</TabsTrigger> */}
                      <TabsTrigger value="ACCEPTED">
                        来てくれるシェフ
                      </TabsTrigger>
                      <TabsTrigger value="CENCELLED">キャンセル</TabsTrigger>
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
                        {workSessions?.map((session) => (
                          <div
                            key={session.id}
                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedApplicant === session.id
                                ? "bg-gray-50"
                                : ""
                            }`}
                            onClick={() => setSelectedApplicant(session.id)}>
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={
                                    session.user.profile_image ||
                                    `/placeholder.svg?height=40&width=40&text=${session.user.name.charAt(
                                      0
                                    )}`
                                  }
                                  alt={session.user.name}
                                />
                                <AvatarFallback>
                                  {session.user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">
                                    {session.user.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {format(
                                      new Date(session.created_at),
                                      "MM/dd HH:mm"
                                    )}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">
                                    {session.status === "SCHEDULED"
                                      ? "お仕事開始前"
                                      : session.status === "CHECKED_IN"
                                        ? "勤務中"
                                        : session.status === "CHECKED_OUT"
                                          ? "勤務完了"
                                          : session.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {!workSessions?.length && (
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
                {selectedWorkSessionData ? (
                  <>
                    <CardHeader className="px-4 py-3 flex-row items-center justify-between space-y-0 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              selectedWorkSessionData.user.profile_image ||
                              `/placeholder.svg?height=40&width=40&text=${selectedWorkSessionData.user.name.charAt(
                                0
                              )}`
                            }
                            alt={selectedWorkSessionData.user.name}
                          />
                          <AvatarFallback>
                            {selectedWorkSessionData.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {selectedWorkSessionData.user.name}
                          </CardTitle>
                          <Badge variant="outline">
                            {selectedWorkSessionData.status === "SCHEDULED"
                              ? "お仕事開始前"
                              : selectedWorkSessionData.status === "CHECKED_IN"
                                ? "勤務中"
                                : selectedWorkSessionData.status ===
                                    "CHECKED_OUT"
                                  ? "勤務完了"
                                  : selectedWorkSessionData.status}
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
                                      selectedWorkSessionData.user
                                        .profile_image ||
                                      `/placeholder.svg?height=40&width=40&text=${selectedWorkSessionData.user.name.charAt(
                                        0
                                      )}`
                                    }
                                    alt={selectedWorkSessionData.user.name}
                                  />
                                  <AvatarFallback>
                                    {selectedWorkSessionData.user.name.charAt(
                                      0
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-medium">
                                    {selectedWorkSessionData.user.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {
                                      selectedWorkSessionData.user
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
                                    {selectedWorkSessionData.user.bio}
                                  </p>
                                </div>
                                {selectedWorkSessionData.user.skills &&
                                  selectedWorkSessionData.user.skills.length >
                                    0 && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">
                                        スキル
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedWorkSessionData.user.skills.map(
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
                                {selectedWorkSessionData.user.certifications &&
                                  selectedWorkSessionData.user.certifications
                                    .length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">
                                        資格
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedWorkSessionData.user.certifications.map(
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
                        {selectedWorkSessionData.status === "ACCEPTED" && (
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
                                    value={selectedWorkSessionData.id.toString()}
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
                        {selectedWorkSessionData.status === "APPLIED" && (
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
                                    selectedWorkSessionData.id.toString()
                                  )
                                }>
                                不採用にする
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 h-[calc(100vh-300px)] flex flex-col">
                      {selectedWorkSessionData.status === "APPLIED" ? (
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
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleRejectApplication(
                                  selectedWorkSessionData.id.toString()
                                )
                              }>
                              不採用にする
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 overflow-y-auto space-y-4 p-4">
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
                            <div ref={messagesEndRef} />
                          </div>
                          <div className="flex gap-2 border-t bg-white p-2 mt-auto">
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
                            </Button>
                          </div>
                        </>
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
                if (selectedWorkSessionData) {
                  handleAcceptApplication(
                    selectedWorkSessionData.id.toString()
                  );
                }
              }}>
              採用する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isChefReviewModalOpen}
        onOpenChange={setIsChefReviewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>お疲れ様でした！</DialogTitle>
            <DialogDescription>
              シェフからの評価が届いています
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {chefReview ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-5 w-5 ${
                          i < chefReview.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ({chefReview.rating}点)
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">シェフからのコメント</h3>
                  <p className="text-sm">{chefReview.comment}</p>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                シェフからの評価はまだありません
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsChefReviewModalOpen(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <RestaurantReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        chefName={selectedWorkSession?.user.name || ""}
        chefImage={selectedWorkSession?.user.profile_image}
        jobTitle={selectedWorkSession?.job.title || ""}
        jobDate={new Date(
          selectedWorkSession?.job.work_date || ""
        ).toLocaleDateString()}
        jobTime={`${selectedWorkSession?.job.start_time}:00 - ${selectedWorkSession?.job.end_time}:00`}
      />
    </div>
  );
}
