"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, AlertTriangle, CheckCircle, Info, Eye, EyeOff, MessageCircle, Download } from "lucide-react"
import { useState } from "react"
import type { DiseaseClassificationResponse } from "@/lib/types"
import { useAppStore } from "@/stores/app-store"
import { useChatbot } from "@/hooks/use-chatbot"

interface SimplifiedResultsProps {
  data: DiseaseClassificationResponse
  originalImage: string
  onReset: () => void
}

export function SimplifiedResults({ data, originalImage, onReset }: SimplifiedResultsProps) {
  const [showOverlay, setShowOverlay] = useState(true)
  const { setChatOpen, saveResults } = useAppStore()
  const { sendMessage } = useChatbot()

  const confidence = Math.round((data.pixel_distribution[data.dominant_prediction.name] || 0) * 100)
  const isHealthy =
    data.dominant_prediction.name.toLowerCase().includes("sehat") ||
    data.dominant_prediction.name.toLowerCase().includes("healthy")

  const getSeverityColor = (confidence: number) => {
    if (confidence >= 70) return "destructive"
    if (confidence >= 40) return "secondary"
    return "outline"
  }

  const getSeverityIcon = (isHealthy: boolean, confidence: number) => {
    if (isHealthy) return <CheckCircle className="w-5 h-5 text-green-600" />
    if (confidence >= 70) return <AlertTriangle className="w-5 h-5 text-red-600" />
    return <Info className="w-5 h-5 text-yellow-600" />
  }

  const handleExpertConsultation = () => {
    const consultationMessage = `Saya baru saja mendeteksi penyakit "${data.dominant_prediction.name}". Bagaimana cara menangani penyakit ini?`

    setChatOpen(true)
    // Send the consultation message after a brief delay to ensure chat is open
    setTimeout(() => {
      sendMessage(consultationMessage)
    }, 300)
  }

  const handleSaveResults = () => {
    saveResults()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onReset} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Upload Gambar Baru
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            {getSeverityIcon(isHealthy, confidence)}
            <CardTitle className="text-xl">Hasil Diagnosis</CardTitle>
          </div>
          <div className="space-y-2">
            <Badge variant={isHealthy ? "default" : getSeverityColor(confidence)} className="text-lg px-4 py-2">
              {data.dominant_prediction.name}
            </Badge>
            <p className="text-muted-foreground">
              Tingkat kepercayaan: <span className="font-semibold">{confidence}%</span>
            </p>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Perbandingan Gambar</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowOverlay(!showOverlay)} className="gap-2">
              {showOverlay ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showOverlay ? "Sembunyikan Overlay" : "Tampilkan Overlay"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-center">{showOverlay ? "Area Terdeteksi" : "Gambar Asli"}</h4>
              <div className="relative aspect-square max-w-md mx-auto">
                <img
                  src={
                    showOverlay
                      ? `data:image/png;base64,${data.visualizations.overlay_image}`
                      : originalImage || "/placeholder.svg"
                  }
                  alt={showOverlay ? "Disease overlay" : "Original"}
                  className="w-full h-full object-cover rounded-lg border"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 gap-2" size="lg" onClick={handleExpertConsultation}>
          <MessageCircle className="w-4 h-4" />
          Konsultasi dengan Ahli
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent gap-2" size="lg" onClick={handleSaveResults}>
          <Download className="w-4 h-4" />
          Simpan Hasil
        </Button>
      </div>
    </div>
  )
}
