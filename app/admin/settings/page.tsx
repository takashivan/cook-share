"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "./components/ProfileForm";
import { EmailChangeForm } from "./components/EmailChangeForm";
import { PasswordChangeForm } from "./components/PasswordChangeForm";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">アカウント設定</h2>
        <p className="text-muted-foreground">
          アカウント情報とセキュリティ設定を管理します
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="security">セキュリティ</TabsTrigger>
          <TabsTrigger value="notifications">通知設定</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <EmailChangeForm />

          <PasswordChangeForm />

          {/* <Card>
            <CardHeader>
              <CardTitle>二要素認証</CardTitle>
              <CardDescription>
                アカウントのセキュリティを強化します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">二要素認証</p>
                  <p className="text-sm text-muted-foreground">
                    ログイン時に追加の認証コードを要求してセキュリティを強化します
                  </p>
                </div>
                <Switch id="2fa" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">ログイン通知</p>
                  <p className="text-sm text-muted-foreground">
                    新しいデバイスからのログイン時に通知を受け取ります
                  </p>
                </div>
                <Switch id="login-notification" defaultChecked />
              </div>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">アカウント削除</CardTitle>
              <CardDescription>
                アカウントを完全に削除します。この操作は元に戻せません。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">アカウントを削除</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>
                通知の受け取り方法と種類を管理します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">通知方法</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">メール通知</p>
                    <p className="text-sm text-muted-foreground">
                      メールで通知を受け取ります
                    </p>
                  </div>
                  <Switch
                    id="email-notification"
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("email", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">アプリ内通知</p>
                    <p className="text-sm text-muted-foreground">
                      アプリ内で通知を受け取ります
                    </p>
                  </div>
                  <Switch
                    id="app-notification"
                    checked={notifications.app}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("app", checked)
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">通知の種類</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">求人応募通知</p>
                    <p className="text-sm text-muted-foreground">
                      新しい求人応募があった時に通知を受け取ります
                    </p>
                  </div>
                  <Switch
                    id="job-applications"
                    checked={notifications.jobApplications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("jobApplications", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">システム更新通知</p>
                    <p className="text-sm text-muted-foreground">
                      システムの更新情報を受け取ります
                    </p>
                  </div>
                  <Switch
                    id="system-updates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("systemUpdates", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">マーケティング通知</p>
                    <p className="text-sm text-muted-foreground">
                      新機能や特別オファーの情報を受け取ります
                    </p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={notifications.marketing}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("marketing", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>設定を保存</Button>
            </CardFooter>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
