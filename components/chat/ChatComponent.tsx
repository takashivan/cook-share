"use client";

// ChatComponent.tsx
import React, { useState, useEffect, useRef } from "react";
import { XanoClient } from "@xano/js-sdk";
import styles from "./ChatComponent.module.css";

interface XanoRealtimeMessage {
  action: string;
  payload: ChatMessage | ConnectionStatus;
}

interface ConnectionStatus {
  status: "connected" | "disconnected";
}

// 型定義
interface ChatMessage {
  text: string;
  user: string;
  timestamp: string;
}

interface XanoMessage {
  action: string;
  options: any;
  payload: any;
}

interface ChatComponentProps {
  // Xano設定
  instanceUrl: string;
  connectionHash: string;
  channelName?: string;

  // UI設定
  height?: string;

  // ユーザー設定
  username?: string;
  allowAnonymous?: boolean;

  // コールバック
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessageSent?: (message: ChatMessage) => void;
  onMessageReceived?: (message: ChatMessage) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  instanceUrl,
  connectionHash,
  channelName = "chat-room",
  height = "500px",
  username = "",
  allowAnonymous = true,
  onConnect = () => {},
  onDisconnect = () => {},
  onMessageSent = () => {},
  onMessageReceived = () => {},
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const xanoClient = useRef<XanoClient | null>(null);
  const channel = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 初期化と接続
  useEffect(() => {
    initializeXanoClient();

    // クリーンアップ
    return () => {
      if (channel.current) {
        channel.current = null;
      }
      if (xanoClient.current) {
        xanoClient.current = null;
      }
      setIsConnected(false);
      setIsConnecting(false);
    };
  }, [instanceUrl, connectionHash]); // 依存配列に接続情報を追加

  // Xanoクライアント初期化
  const initializeXanoClient = async () => {
    if (!instanceUrl || !connectionHash) {
      setError("XanoのURLとconnectionHashが必要です");
      return;
    }

    if (isConnecting) {
      console.log("接続処理中のため、新しい接続は開始しません");
      return;
    }

    console.log("Xanoクライアント初期化開始");
    setIsConnecting(true);
    setIsLoading(true);
    setError(null);

    try {
      // 既存の接続をクリーンアップ
      if (channel.current) {
        try {
          channel.current = null;
        } catch (e) {
          console.error("既存のチャンネルのクリーンアップに失敗:", e);
        }
      }

      if (xanoClient.current) {
        try {
          xanoClient.current = null;
        } catch (e) {
          console.error("既存のクライアントのクリーンアップに失敗:", e);
        }
      }

      // 新しいクライアントを作成
      const client = new XanoClient({
        instanceBaseUrl: instanceUrl,
        realtimeConnectionHash: connectionHash,
      });

      xanoClient.current = client;
      console.log("Xanoクライアント作成完了");

      // チャンネルの作成
      const chatChannel = client.channel(channelName);
      channel.current = chatChannel;
      console.log("チャンネル作成完了");

      // メッセージハンドラーの設定
      chatChannel.on((message: any) => {
        console.log("メッセージ受信:", message);
        if (message.text && message.user) {
          setMessages((prev) => [...prev, message]);
        }
      });

      setIsConnected(true);
      setIsConnecting(false);
      setError(null);

      onConnect();
    } catch (error) {
      console.error("接続エラー:", error);
      setError("接続に失敗しました - 再接続します");
      setIsLoading(false);
      setIsConnecting(false);

      // 3秒後に再接続を試みる
      setTimeout(() => {
        console.log("再接続を試みます");
        initializeXanoClient();
      }, 3000);
    }
  };

  // メッセージ送信処理
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      return;
    }

    if (!channel.current) {
      console.error("チャンネルが初期化されていません");
      setError("チャンネルが初期化されていません");
      await initializeXanoClient();
      return;
    }

    if (!isConnected) {
      console.error("WebSocket接続が確立されていません");
      setError("WebSocket接続が確立されていません");
      return;
    }

    try {
      setIsLoading(true);
      const messageData = {
        text: inputMessage.trim(),
        user: username || "Anonymous",
        timestamp: new Date().toISOString(),
      };

      // メッセージを送信
      console.log("Sending message:", messageData);
      await channel.current.message(messageData);
      console.log("Message sent successfully");

      // 送信成功後にメッセージを表示
      setMessages((prev) => [...prev, messageData]);
      setInputMessage("");
      onMessageSent(messageData);
    } catch (error) {
      console.error("メッセージ送信エラー:", error);
      setError("メッセージの送信に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // Enterキーでメッセージ送信
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // メッセージの表示用関数
  const renderMessage = (msg: ChatMessage, index: number) => {
    const isOwnMessage = msg.user === username;
    return (
      <div
        key={`${msg.timestamp}-${index}`}
        className={`${styles.message} ${
          isOwnMessage ? styles.ownMessage : styles.otherMessage
        }`}>
        <div className={styles.messageUser}>{msg.user}</div>
        <div className={styles.messageContent}>{msg.text}</div>
        {msg.timestamp && (
          <div className={styles.messageTime}>
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.chatContainer} style={{ height }}>
      <div className={styles.chatBox}>
        <div className={styles.chatHeader}>
          <h3>{channelName}</h3>
          <div className={styles.connectionStatus}>
            {isConnected ? "接続中" : "未接続"}
          </div>
        </div>

        <div className={styles.messagesList}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          {messages.length === 0 && !isLoading && !error && (
            <div className={styles.emptyMessage}>メッセージはありません</div>
          )}

          {messages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.messageInput}>
          <input
            type="text"
            placeholder={isConnected ? "メッセージを入力..." : "接続中..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || !isConnected}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !isConnected}>
            送信
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
