export const DISEASE_CLASSES = {
  HEALTHY: "Sehat",
  FUSARIUM: "Fusarium Wilt",
  BLACK_ROT: "Black Rot",
  ANTHRACNOSE: "Anthracnose",
  SCLEROTIUM: "Sclerotium",
  COLLETOTRICHUM: "Colletotrichum",
} as const

export const FOLLOW_UP_QUESTIONS = [
  "Bagaimana cara mengatasi penyakit Fusarium Wilt?",
  "Apa penyebab utama penyakit Black Rot pada vanili?",
  "Bagaimana cara mencegah penyakit Anthracnose?",
  "Kapan waktu terbaik untuk menyemprot fungisida?",
  "Apa tanda-tanda awal penyakit pada daun vanili?",
  "Bagaimana cara merawat tanaman vanili yang sehat?",
  "Apakah penyakit ini bisa menular ke tanaman lain?",
  "Berapa lama proses penyembuhan tanaman vanili?",
  "Bagaimana cara mencegah penyakit Sclerotium?",
  "Apa yang harus dilakukan jika tanaman terinfeksi Colletotrichum?",
] as const

export const API_ENDPOINTS = {
  SEGMENT: "/segment",
  GENERATE_RESPONSE: "/generate_response",
} as const

export const APP_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  API_TIMEOUT: 30000, // 30 seconds
} as const
