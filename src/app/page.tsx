"use client"

import { UploadPredict } from "@/components/upload-predict"
import { SimplifiedResults } from "@/components/simplified-results"
import { ChatbotFloat } from "@/components/chatbot-float"
import { useDiseaseClassification } from "@/hooks/use-disease-classification"

export default function Home() {
  const { isClassifying, classificationResult, originalImage, error, classifyImage, resetClassification } =
    useDiseaseClassification()

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Deteksi Penyakit Tanaman Vanilis</h1>
          <p className="text-muted-foreground">Upload gambar daun vanili untuk deteksi penyakit</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {!classificationResult ? (
          <UploadPredict onUpload={classifyImage} isLoading={isClassifying} />
        ) : (
          <SimplifiedResults
            data={classificationResult}
            originalImage={originalImage || ""}
            onReset={resetClassification}
          />
        )}
      </div>

      <ChatbotFloat />
    </main>
  )
}
