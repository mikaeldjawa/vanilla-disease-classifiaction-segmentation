import { create } from "zustand";
import type {
  AppState,
  DiseaseClassificationResponse,
  Message,
} from "@/lib/types";

interface AppActions {
  // Classification actions
  setClassifying: (isClassifying: boolean) => void;
  setClassificationResult: (
    result: DiseaseClassificationResponse | null
  ) => void;
  setOriginalImage: (image: string | null) => void;
  setError: (error: string | null) => void;
  resetClassification: () => void;
  saveResults: () => void;

  // Chatbot actions
  setChatOpen: (isOpen: boolean) => void;
  addMessage: (message: Message) => void;
  setSendingMessage: (isSending: boolean) => void;
  resetChat: () => void;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Halo! Saya siap membantu Anda dengan pertanyaan seputar penyakit vanili. Silakan pilih pertanyaan di bawah atau ketik pertanyaan Anda sendiri.",
    sender: "bot",
    timestamp: new Date(),
  },
];

export const useAppStore = create<AppState & AppActions>((set, get) => ({
  // Initial state
  isClassifying: false,
  classificationResult: null,
  originalImage: null,
  error: null,
  isChatOpen: false,
  messages: initialMessages,
  isSendingMessage: false,

  // Classification actions
  setClassifying: (isClassifying) => set({ isClassifying }),
  setClassificationResult: (result) => set({ classificationResult: result }),
  setOriginalImage: (image) => set({ originalImage: image }),
  setError: (error) => set({ error }),
  resetClassification: () =>
    set({
      classificationResult: null,
      originalImage: null,
      error: null,
      isClassifying: false,
    }),
  saveResults: () => {
    const state = get();
    if (!state.classificationResult) return;

    const resultsData = {
      timestamp: new Date().toISOString(),
      filename: state.classificationResult.filename,
      prediction: state.classificationResult.dominant_prediction,
      pixelDistribution: state.classificationResult.pixel_distribution,
      originalImage: state.originalImage,
    };

    const blob = new Blob([JSON.stringify(resultsData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vanilla-disease-results-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Chatbot actions
  setChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setSendingMessage: (isSending) => set({ isSendingMessage: isSending }),
  resetChat: () => set({ messages: initialMessages }),
}));
