export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP.",
    }
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "Ukuran file terlalu besar. Maksimal 10MB.",
    }
  }

  return { isValid: true }
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const createImageFromBase64 = (base64: string): string => {
  if (base64.startsWith("data:image")) {
    return base64
  }
  return `data:image/png;base64,${base64}`
}
