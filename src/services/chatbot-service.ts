import { apiClient } from "@/lib/api";
import type { ChatbotResponse } from "@/lib/types";

export class ChatbotService {
  static async sendMessage(question: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("question", question);

      const response = await apiClient.post<ChatbotResponse>(
        "/generate_response",
        formData
      );

      if (response.data.status === 200) {
        return response.data.response;
      } else {
        throw new Error("Invalid response status");
      }
    } catch (error) {
      console.error("[v0] Chatbot service error:", error);
      throw new Error("Gagal mendapatkan respons. Silakan coba lagi.");
    }
  }
}
