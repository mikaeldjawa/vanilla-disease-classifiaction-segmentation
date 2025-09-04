"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, Loader2 } from "lucide-react"

interface UploadPredictProps {
  onUpload: (file: File) => void
  isLoading: boolean
}

export function UploadPredict({ onUpload, isLoading }: UploadPredictProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
                      Ganti Gambar
                    </Button>
                    <Button onClick={handlePredict} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Menganalisis...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Prediksi Penyakit
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
                  <h3 className="text-lg font-semibold">Upload Gambar Daun Vanili</h3>
                  <p className="text-muted-foreground">Drag & drop gambar atau klik untuk memilih file</p>
                  <p className="text-xs text-muted-foreground">Format: JPG, PNG, JPEG (Max 10MB)</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} className="mt-4">
                  <Upload className="w-4 h-4 mr-2" />
                  Pilih Gambar
                </Button>
              </>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-primary font-bold">1</span>
          </div>
          <h4 className="font-medium">Upload Gambar</h4>
          <p className="text-sm text-muted-foreground">Pilih foto vanili yang akan dianalisis</p>
        </div>
        <div className="space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-primary font-bold">2</span>
          </div>
          <h4 className="font-medium">Analysis</h4>
          <p className="text-sm text-muted-foreground">Sistem menganalisis penyakit pada daun</p>
        </div>
        <div className="space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-primary font-bold">3</span>
          </div>
          <h4 className="font-medium">Hasil Diagnosis</h4>
          <p className="text-sm text-muted-foreground">Dapatkan hasil dan rekomendasi penanganan</p>
        </div>
      </div>
    </div>
  )
}
