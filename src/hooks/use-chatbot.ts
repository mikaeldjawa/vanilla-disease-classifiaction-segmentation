"use client"

import { useCallback } from "react"
import { useAppStore } from "@/stores/app-store"
import { ChatbotService } from "@/services/chatbot-service"
import type { Message } from "@/lib/types"

export const useChatbot = () => {
  const { isChatOpen, messages, isSendingMessage, setChatOpen, addMessage, setSendingMessage, resetChat } =
    useAppStore()

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isSendingMessage) return

      try {
        setSendingMessage(true)

        // Add user message
        const userMessage: Message = {
          id: Date.now().toString(),
          text: text.trim(),
          sender: "user",
          timestamp: new Date(),
        }
        addMessage(userMessage)

        // Get bot response
        const botResponse = await ChatbotService.sendMessage(text.trim())

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }
        addMessage(botMessage)
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Maaf, terjadi kesalahan. Silakan coba lagi.",
          sender: "bot",
          timestamp: new Date(),
        }
        addMessage(errorMessage)
      } finally {
        setSendingMessage(false)
      }
    },
    [isSendingMessage, addMessage, setSendingMessage],
  )

  return {
    isChatOpen,
    messages,
    isSendingMessage,
    setChatOpen,
    sendMessage,
    resetChat,
  }
}
