"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Leaf, Droplets, Bug, Calendar, MapPin } from "lucide-react"

interface FollowUpQuestionsProps {
  detectedDisease: string
}

export function FollowUpQuestions({ detectedDisease }: FollowUpQuestionsProps) {
  const questions = [
    {
      icon: <Leaf className="h-4 w-4" />,
      question: `Bagaimana cara mengatasi ${detectedDisease} pada tanaman vanili?`,
      category: "Treatment",
    },
    {
      icon: <Droplets className="h-4 w-4" />,
      question: `Apa penyebab utama ${detectedDisease} dan bagaimana cara pencegahannya?`,
      category: "Prevention",
    },
    {
      icon: <Bug className="h-4 w-4" />,
      question: `Fungisida atau pestisida apa yang efektif untuk ${detectedDisease}?`,
      category: "Chemical Control",
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      question: `Berapa lama waktu yang dibutuhkan untuk menyembuhkan ${detectedDisease}?`,
      category: "Timeline",
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      question: `Apakah ${detectedDisease} dapat menyebar ke tanaman vanili lainnya?`,
      category: "Spread Risk",
    },
    {
      icon: <Leaf className="h-4 w-4" />,
      question: `Bagaimana cara merawat tanaman vanili yang terkena ${detectedDisease}?`,
      category: "Care",
    },
  ]

  const handleQuestionClick = (question: string) => {
    // This would typically integrate with your chatbot system
    console.log("Redirecting to chatbot with question:", question)
    // Example: window.open(`/chat?question=${encodeURIComponent(question)}`, '_blank')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Pertanyaan Lanjutan untuk Chatbot
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Klik pertanyaan di bawah untuk mendapatkan panduan lebih detail dari asisten AI kami
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 text-left justify-start bg-transparent"
              onClick={() => handleQuestionClick(item.question)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="text-primary mt-0.5">{item.icon}</div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">{item.category}</div>
                  <div className="text-sm font-medium text-balance">{item.question}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tips:</strong> Pertanyaan-pertanyaan ini akan diarahkan ke chatbot AI yang dapat memberikan
            panduan detail tentang penanganan penyakit, pencegahan, dan perawatan tanaman vanili.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
