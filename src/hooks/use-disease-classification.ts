"use client"

import { useCallback } from "react"
import { useAppStore } from "@/stores/app-store"
import { DiseaseService } from "@/services/disease-service"

export const useDiseaseClassification = () => {
  const {
    isClassifying,
    classificationResult,
    originalImage,
    error,
    setClassifying,
    setClassificationResult,
    setOriginalImage,
    setError,
    resetClassification,
  } = useAppStore()

  const classifyImage = useCallback(
    async (file: File) => {
      try {
        setError(null)
        setClassifying(true)

        // Store original image
        const reader = new FileReader()
        reader.onload = (e) => {
          setOriginalImage(e.target?.result as string)
        }
        reader.readAsDataURL(file)

        // Classify disease
        const result = await DiseaseService.classifyDisease(file)
        setClassificationResult(result)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Terjadi kesalahan")
      } finally {
        setClassifying(false)
      }
    },
    [setClassifying, setClassificationResult, setOriginalImage, setError],
  )

  return {
    isClassifying,
    classificationResult,
    originalImage,
    error,
    classifyImage,
    resetClassification,
  }
}
