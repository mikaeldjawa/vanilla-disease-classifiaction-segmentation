"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Eye, MessageCircle, Download, Share2 } from "lucide-react"
import { useState } from "react"
import { FollowUpQuestions } from "@/components/follow-up-questions"

interface ClassificationData {
  filename: string
  dominant_prediction: {
    id: number
    name: string
  }
  pixel_distribution: Record<string, number>
  visualizations: {
    mask_colorized: string
    overlay_image: string
  }
}

interface DiseaseClassificationResultsProps {
  data: ClassificationData
}

export function DiseaseClassificationResults({ data }: DiseaseClassificationResultsProps) {
  const [showOverlay, setShowOverlay] = useState(true)
  const [showQuestions, setShowQuestions] = useState(false)

  const getSeverityColor = (percentage: number) => {
    if (percentage >= 0.7) return "bg-destructive"
    if (percentage >= 0.4) return "bg-yellow-500"
    return "bg-primary"
  }

  const getSeverityLabel = (percentage: number) => {
    if (percentage >= 0.7) return "High Risk"
    if (percentage >= 0.4) return "Moderate Risk"
    return "Low Risk"
  }

  const dominantPercentage = data.pixel_distribution[data.dominant_prediction.name] || 0

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Classification Results
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Analysis for: {data.filename}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Results */}
        <div className="space-y-6">
          {/* Dominant Prediction */}
          <Card>
            <CardHeader>
              <CardTitle>Primary Detection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <h3 className="text-2xl font-bold text-foreground mb-2">{data.dominant_prediction.name}</h3>
                <Badge variant="secondary" className={`${getSeverityColor(dominantPercentage)} text-white`}>
                  {getSeverityLabel(dominantPercentage)}
                </Badge>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-primary">{Math.round(dominantPercentage * 100)}%</div>
                  <p className="text-sm text-muted-foreground">Confidence Level</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pixel Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Disease Distribution Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(data.pixel_distribution).map(([disease, percentage]) => (
                <div key={disease} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{disease}</span>
                    <span className="text-sm text-muted-foreground">{Math.round(percentage * 100)}%</span>
                  </div>
                  <Progress value={percentage * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-3">
                <Button onClick={() => setShowQuestions(!showQuestions)} className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Treatment Recommendations
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Schedule Expert Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Visualizations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Visual Analysis</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowOverlay(!showOverlay)}>
                  <Eye className="h-4 w-4 mr-2" />
                  {showOverlay ? "Hide Overlay" : "Show Overlay"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img
                  src={showOverlay ? data.visualizations.overlay_image : data.visualizations.mask_colorized}
                  alt="Disease analysis visualization"
                  className="w-full h-auto rounded-lg border"
                />
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    {showOverlay ? "Disease Overlay" : "Colorized Mask"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Color Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">Healthy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm">Fusarium Wilt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm">Black Rot</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm">Anthracnose</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Follow-up Questions */}
      {showQuestions && (
        <>
          <Separator />
          <FollowUpQuestions detectedDisease={data.dominant_prediction.name} />
        </>
      )}
    </div>
  )
}
