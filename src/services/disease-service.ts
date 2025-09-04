import { apiClient } from "@/lib/api"
import type { DiseaseClassificationResponse } from "@/lib/types"

export class DiseaseService {
  static async classifyDisease(file: File): Promise<DiseaseClassificationResponse> {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await apiClient.post<DiseaseClassificationResponse>("/segment", formData)
      return response.data
    } catch (error) {
      console.error("[v0] Disease classification error:", error)
      throw new Error("Gagal menganalisis gambar. Silakan coba lagi.")
    }
  }
}
