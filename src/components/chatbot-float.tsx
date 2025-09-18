"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Loader2, RotateCcw } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useChatbot } from "@/hooks/use-chatbot"
import { useInitChatbot } from "@/hooks/use-init-chatbot"
import { useTranslations } from "next-intl"

export function ChatbotFloat() {
  const { isChatOpen, messages, isSendingMessage, setChatOpen, sendMessage, resetChat } = useChatbot()
  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("prediction")

  useInitChatbot()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return
    sendMessage(text)
    setInputText("")
  }

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <>
      <Button
        onClick={() => setChatOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 ${isChatOpen ? "scale-0" : "scale-100"}`}
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {isChatOpen && (
        <Card className="fixed bottom-6 right-6 w-full max-w-xs sm:max-w-lg h-[70vh] max-h-[600px] shadow-2xl z-50 flex flex-col mx-4 sm:mx-0 pt-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-primary text-primary-foreground rounded-t-lg flex-shrink-0 pt-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Chatbot
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => resetChat(t("chatbot.greetings"))}
                className="text-primary-foreground hover:bg-primary-foreground/20"
                title="Mulai percakapan baru"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setChatOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 min-h-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-lg text-sm break-words ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {message.text}
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isSendingMessage && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-muted-foreground">
                      {t("chatbot.typing")}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="p-4 border-t flex-shrink-0">
                <div className="space-y-1 overflow-y-auto">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleQuestionClick(
                          t(`chatbot.followUpQuestions.${index + 1}`)
                        )
                      }
                      className="w-full text-left p-2 rounded bg-muted hover:bg-muted/80 transition-colors disabled:opacity-50"
                      disabled={isSendingMessage}
                    >
                      {t(`chatbot.followUpQuestions.${index + 1}`)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t("chatbot.placeholderInput")}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(inputText)
                    }
                  }}
                  className="flex-1 text-sm"
                  disabled={isSendingMessage}
                />
                <Button
                  onClick={() => handleSendMessage(inputText)}
                  size="icon"
                  disabled={!inputText.trim() || isSendingMessage}
                  className="flex-shrink-0"
                >
                  {isSendingMessage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
