import { apiClient } from "@/lib/api";
import type { ChatbotResponse } from "@/lib/types";
import parseCookies from "@/utils/parse-cookies";

export class ChatbotService {
  static async sendMessage(question: string): Promise<string> {
    try {
      const cookies = parseCookies(document.cookie);
      const formData = new FormData();
      formData.append("question", question);
      formData.append("lang", cookies.locale);

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
      console.error("Chatbot service error:", error);
      throw new Error("An error occurred. Please try again later.");
    }
  }
}
