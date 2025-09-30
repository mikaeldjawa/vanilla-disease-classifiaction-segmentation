"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

interface UploadPredictProps {
  onUpload: (file: File) => void
  isLoading: boolean
}

export function UploadPredict({ onUpload, isLoading }: UploadPredictProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations("prediction")

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("image/")) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handlePredict = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
        <CardContent className="p-8">
          <div
            className={`relative flex flex-col items-center justify-center space-y-4 ${dragActive ? "bg-primary/5" : ""
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="space-y-4">
                <div className="relative w-64 h-64 mx-auto">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">File: {selectedFile?.name}</p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPreview(null)
                        setSelectedFile(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ""
                        }
                      }}
                    >
                      {t("home.changeImage")}
                    </Button>
                    <Button onClick={handlePredict} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("home.analyze")}...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4 mr-2" />
                          {t("home.diseasePrediction")}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">{t("home.uploadTitle")}</h3>
                  <p className="text-muted-foreground">{t("home.uploadSubtitle")}</p>
                  <p className="text-xs text-muted-foreground">{t("home.uploadFormat")}</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} className="mt-4">
                  <Upload className="w-4 h-4 mr-2" />
                  {t("home.selectImage")}
                </Button>
              </>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
