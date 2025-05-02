"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { changeEmail, changePassword, confirmEmail } from "@/lib/api/user";
import { ChefEmailChangeModal } from "@/components/modals/ChefEmailChangeModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("account");

  // アカウント情報のステート
  const [accountInfo, setAccountInfo] = useState({
    email: "yamada@example.com",
    phone: "090-1234-5678",
    language: "ja",
  });
  const { user } = useAuth();

  // パスワード変更のステート
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEmailChange = (email: string) => {
    changeEmail(email);
    console.log(email);
  };

  // 通知設定のステート
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newJobs: true,
      applicationUpdates: true,
      messages: true,
      reviews: true,
      payments: true,
    },
    push: {
      newJobs: true,
      applicationUpdates: true,
      messages: true,
      reviews: false,
      payments: true,
    },
  });

  // アカウント情報の変更ハンドラ
  const handleAccountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccountInfo((prev) => ({ ...prev, [name]: value }));
  };

  // パスワード変更のハンドラ
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({ ...prev, [name]: value }));
  };

  // 通知設定の変更ハンドラ
  const handleNotificationChange = (
    type: "email" | "push",
    setting: string,
    checked: boolean
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: checked,
      },
    }));
  };

  // アカウント情報保存ハンドラ
  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // APIリクエストを送信する処理をここに実装
    alert("アカウント情報を保存しました");
  };

  // パスワード変更ハンドラ
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    // パスワードの検証
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      alert("新しいパスワードと確認用パスワードが一致しません");
      return;
    }

    // APIリクエストを送信する処理をここに実装
    alert("パスワードを変更しました");
    setPasswordInfo({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // 通知設定保存ハンドラ
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    // APIリクエストを送信する処理をここに実装
    alert("通知設定を保存しました");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">アカウント設定</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">アカウント情報</TabsTrigger>
          <TabsTrigger value="password">パスワード</TabsTrigger>
          {/* <TabsTrigger value="notifications">通知設定</TabsTrigger> */}
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>アカウント情報</CardTitle>
              <CardDescription>
                アカウントの基本情報を変更できます
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveAccount}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={accountInfo.email}
                    onChange={handleAccountChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={accountInfo.phone}
                    onChange={handleAccountChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">言語設定</Label>
                  <select
                    id="language"
                    name="language"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={accountInfo.language}
                    onChange={handleAccountChange}>
                    <option value="ja">日本語</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto">
                  <Save className="h-4 w-4 mr-2" />
                  保存する
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-red-600">アカウント削除</CardTitle>
              <CardDescription>
                アカウントを削除すると、すべてのデータが完全に削除されます。この操作は元に戻せません。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>警告</AlertTitle>
                <AlertDescription>
                  アカウントを削除すると、すべてのプロフィール情報、応募履歴、メッセージなどが完全に削除されます。
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="ml-auto">
                アカウントを削除する
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>パスワード変更</CardTitle>
              <CardDescription>
                アカウントのパスワードを変更できます
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleChangePassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">現在のパスワード</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordInfo.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="newPassword">新しいパスワード</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordInfo.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    パスワードは8文字以上で、英字、数字、記号を含める必要があります
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    新しいパスワード（確認）
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordInfo.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto">
                  パスワードを変更する
                </Button>
              </CardFooter>
            </form>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>メールアドレス変更</CardTitle>
              <CardDescription>メールアドレスを変更できます</CardDescription>
            </CardHeader>
            <CardFooter>
              <ChefEmailChangeModal
                currentEmail={user?.email || ""}
                trigger={
                  <Button className="ml-auto">メールアドレスを変更する</Button>
                }
                onSubmit={handleEmailChange}
              />
            </CardFooter>
          </Card>
        </TabsContent>

        {/* <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>
                通知の受け取り方法を設定できます
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveNotifications}>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">メール通知</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-newJobs"
                            className="font-medium">
                            新着求人
                          </Label>
                          <p className="text-sm text-gray-500">
                            新しい求人が登録されたときに通知
                          </p>
                        </div>
                        <Switch
                          id="email-newJobs"
                          checked={notificationSettings.email.newJobs}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "email",
                              "newJobs",
                              checked
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-applicationUpdates"
                            className="font-medium">
                            応募状況の更新
                          </Label>
                          <p className="text-sm text-gray-500">
                            応募した求人の状況が更新されたときに通知
                          </p>
                        </div>
                        <Switch
                          id="email-applicationUpdates"
                          checked={
                            notificationSettings.email.applicationUpdates
                          }
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "email",
                              "applicationUpdates",
                              checked
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-messages"
                            className="font-medium">
                            メッセージ
                          </Label>
                          <p className="text-sm text-gray-500">
                            新しいメッセージを受信したときに通知
                          </p>
                        </div>
                        <Switch
                          id="email-messages"
                          checked={notificationSettings.email.messages}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "email",
                              "messages",
                              checked
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-reviews"
                            className="font-medium">
                            レビュー
                          </Label>
                          <p className="text-sm text-gray-500">
                            新しいレビューが投稿されたときに通知
                          </p>
                        </div>
                        <Switch
                          id="email-reviews"
                          checked={notificationSettings.email.reviews}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "email",
                              "reviews",
                              checked
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-payments"
                            className="font-medium">
                            支払い
                          </Label>
                          <p className="text-sm text-gray-500">
                            支払いが完了したときに通知
                          </p>
                        </div>
                        <Switch
                          id="email-payments"
                          checked={notificationSettings.email.payments}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "email",
                              "payments",
                              checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">プッシュ通知</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-newJobs" className="font-medium">
                            新着求人
                          </Label>
                          <p className="text-sm text-gray-500">
                            新しい求人が登録されたときに通知
                          </p>
                        </div>
                        <Switch
                          id="push-newJobs"
                          checked={notificationSettings.push.newJobs}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("push", "newJobs", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="push-applicationUpdates"
                            className="font-medium">
                            応募状況の更新
                          </Label>
                          <p className="text-sm text-gray-500">
                            応募した求人の状況が更新されたときに通知
                          </p>
                        </div>
                        <Switch
                          id="push-applicationUpdates"
                          checked={notificationSettings.push.applicationUpdates}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "push",
                              "applicationUpdates",
                              checked
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="push-messages"
                            className="font-medium">
                            メッセージ
                          </Label>
                          <p className="text-sm text-gray-500">
                            新しいメッセージを受信したときに通知
                          </p>
                        </div>
                        <Switch
                          id="push-messages"
                          checked={notificationSettings.push.messages}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "push",
                              "messages",
                              checked
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-reviews" className="font-medium">
                            レビュー
                          </Label>
                          <p className="text-sm text-gray-500">
                            新しいレビューが投稿されたときに通知
                          </p>
                        </div>
                        <Switch
                          id="push-reviews"
                          checked={notificationSettings.push.reviews}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("push", "reviews", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="push-payments"
                            className="font-medium">
                            支払い
                          </Label>
                          <p className="text-sm text-gray-500">
                            支払いが完了したときに通知
                          </p>
                        </div>
                        <Switch
                          id="push-payments"
                          checked={notificationSettings.push.payments}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "push",
                              "payments",
                              checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto">
                  <Save className="h-4 w-4 mr-2" />
                  設定を保存する
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
