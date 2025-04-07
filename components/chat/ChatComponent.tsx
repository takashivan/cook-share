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
    const initializeXanoClient = async () => {
      if (!instanceUrl || !connectionHash) {
        setError("XanoのURLとconnectionHashが必要です");
        return;
      }

      try {
        setIsConnecting(true);
        setError(null);

        // Xanoクライアントの初期化
        xanoClient.current = new XanoClient({
          instanceBaseUrl: instanceUrl,
          realtimeConnectionHash: connectionHash,
        });

        // チャンネルの設定
        channel.current = xanoClient.current.channel(channelName);

        // 接続イベントのリスナー
        channel.current.on("connected", () => {
          setIsConnected(true);
          setIsConnecting(false);
          onConnect();
        });

        // 切断イベントのリスナー
        channel.current.on("disconnected", () => {
          setIsConnected(false);
          setIsConnecting(false);
          onDisconnect();
        });

        // メッセージ受信イベントのリスナー
        channel.current.on("message", (message: XanoRealtimeMessage) => {
          if (message.action === "chat") {
            const chatMessage = message.payload as ChatMessage;
            setMessages((prev) => [...prev, chatMessage]);
            onMessageReceived(chatMessage);
          }
        });

        // 接続
        await channel.current.connect();
      } catch (err) {
        setError("接続に失敗しました");
        setIsConnecting(false);
        console.error("Xano接続エラー:", err);
      }
    };

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
  }, [
    instanceUrl,
    connectionHash,
    channelName,
    onConnect,
    onDisconnect,
    onMessageReceived,
  ]);

  // メッセージ送信処理
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !isConnected) return;

    try {
      const message: ChatMessage = {
        text: inputMessage,
        user: username || "匿名ユーザー",
        timestamp: new Date().toISOString(),
      };

      await channel.current?.send("chat", message);
      setMessages((prev) => [...prev, message]);
      setInputMessage("");
      onMessageSent(message);
    } catch (err) {
      setError("メッセージの送信に失敗しました");
      console.error("メッセージ送信エラー:", err);
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
