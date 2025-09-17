"use client";

import { useCallback } from "react";
import { useAppStore } from "@/stores/app-store";
import { ChatbotService } from "@/services/chatbot-service";
import type { Message } from "@/lib/types";
import { useTranslations } from "next-intl";

export const useChatbot = () => {
  const t = useTranslations("prediction");
  const {
    isChatOpen,
    messages,
    isSendingMessage,
    setChatOpen,
    addMessage,
    setSendingMessage,
    resetChat,
  } = useAppStore();

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isSendingMessage) return;

      try {
        setSendingMessage(true);

        const userMessage: Message = {
          id: Date.now().toString(),
          text: text.trim(),
          sender: "user",
          timestamp: new Date(),
        };
        addMessage(userMessage);

        const botResponse = await ChatbotService.sendMessage(text.trim());

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        addMessage(botMessage);
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: t("chatbot.error"),
          sender: "bot",
          timestamp: new Date(),
        };
        addMessage(errorMessage);
      } finally {
        setSendingMessage(false);
      }
    },
    [isSendingMessage, addMessage, setSendingMessage, t]
  );

  return {
    isChatOpen,
    messages,
    isSendingMessage,
    setChatOpen,
    sendMessage,
    resetChat,
  };
};
