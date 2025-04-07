"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ChatComponent from "@/components/chat/ChatComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChatPage() {
  const [userType, setUserType] = useState<string>("Admin");

  return (
    <Card className="bg-white">
      <CardContent className="p-6 space-y-4">
        <div className="w-[200px]">
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger>
              <SelectValue placeholder="ユーザータイプを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">管理者</SelectItem>
              <SelectItem value="User">一般ユーザー</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ChatComponent
          instanceUrl="https://xcti-onox-8bdw.n7e.xano.io/"
          connectionHash="NHjYDPivFvrmrFLc5lyYZubMyrc"
          channelName="chat-room"
          allowAnonymous={false}
          username={userType}
        />
      </CardContent>
    </Card>
  );
}
