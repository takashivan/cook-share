"use client";

import type React from "react";
import { EmailChangeForm } from "@/components/settings/EmailChangeForm";
import { PasswordChangeForm } from "@/components/settings/PasswordChangeForm";
import { DeleteAccountForm } from "@/components/settings/DeleteAccountForm";
import { ConnectSettings } from "./components/ConnectSettings";

export default function AccountSettings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">アカウント設定</h1>
      </div>

      <div className="space-y-6">
        <EmailChangeForm userType="chef" />

        <PasswordChangeForm userType="chef" />

        <ConnectSettings />

        <DeleteAccountForm
          userType="chef"
          description="アカウントを削除すると、すべてのプロフィール情報、応募履歴、メッセージなどが完全に削除されます。"
        />
      </div>
      

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
    </div>
  );
}
