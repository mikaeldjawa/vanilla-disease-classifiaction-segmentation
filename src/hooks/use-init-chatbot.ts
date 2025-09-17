"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAppStore } from "@/stores/app-store";

export function useInitChatbot() {
  const t = useTranslations("prediction");
  const resetChat = useAppStore((s) => s.resetChat);

  useEffect(() => {
    resetChat(t("chatbot.greetings"));
  }, [t, resetChat]);
}
