export interface DiseaseClassificationResponse {
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

export interface ChatbotResponse {
  status: number
  response: string
}

export interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export interface AppState {
  // Classification state
  isClassifying: boolean
  classificationResult: DiseaseClassificationResponse | null
  originalImage: string | null
  error: string | null

  // Chatbot state
  isChatOpen: boolean
  messages: Message[]
  isSendingMessage: boolean
}
