"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Info,
  Eye,
  EyeOff,
  MessageCircle,
  Download,
} from "lucide-react";
import { useState, useRef } from "react";
import type { DiseaseClassificationResponse } from "@/lib/types";
import { useAppStore } from "@/stores/app-store";
import { useChatbot } from "@/hooks/use-chatbot";
import { useTranslations } from "next-intl";
import parseCookies from "@/utils/parse-cookies";

interface SimplifiedResultsProps {
  data: DiseaseClassificationResponse;
  originalImage: string;
  onReset: () => void;
}

export function SimplifiedResults({
  data,
  originalImage,
  onReset,
}: SimplifiedResultsProps) {
  const t = useTranslations("prediction");
  const [showOverlay, setShowOverlay] = useState(true);
  const { setChatOpen } = useAppStore();
  const { sendMessage } = useChatbot();
  const cookies = parseCookies(document.cookie);
  const imageRef = useRef<HTMLImageElement>(null);

  const confidence = Math.round(
    (data.pixel_distribution[data.dominant_prediction.name] || 0) * 100
  );
  const isHealthy =
    data.dominant_prediction.name.toLowerCase().includes("sehat") ||
    data.dominant_prediction.name.toLowerCase().includes("healthy");

  const getSeverityIcon = (isHealthy: boolean, confidence: number) => {
    if (isHealthy) return <CheckCircle className="h-7 w-7 text-green-500" />;
    if (confidence >= 70)
      return <AlertTriangle className="h-7 w-7 text-red-500" />;
    return <Info className="h-7 w-7 text-yellow-500" />;
  };

  const handleExpertConsultation = () => {
    const consultationMessage =
      cookies.locale == "id"
        ? `Saya baru saja mendeteksi penyakit "${data.dominant_prediction.name}". Bagaimana cara menangani penyakit ini?`
        : `I just detected the disease "${data.dominant_prediction.name}". How do I treat this disease?`;

    setChatOpen(true);
    setTimeout(() => {
      sendMessage(consultationMessage);
    }, 300);
  };

  const handleDownloadImage = () => {
    if (!imageRef.current) return;

    const link = document.createElement("a");
    link.href = imageRef.current.src;
    link.download = showOverlay
      ? `hasil-deteksi-${data.dominant_prediction.name.replace(/\s+/g, "-")}.png`
      : "gambar-asli.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden bg-slate-50 dark:bg-slate-950 lg:flex-row rounded-lg max-w-[80vh] mx-auto mt-10">
      {/* Kolom Kiri */}
      <div className="relative flex h-1/2 flex-col items-center justify-center bg-slate-100 p-4 dark:bg-slate-900 lg:h-[60vh] lg:w-3/5">
        <Button
          variant="ghost"
          onClick={onReset}
          className="absolute left-4 top-4 z-10 gap-2 bg-white/70 backdrop-blur-sm dark:bg-black/50 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("result.backButtonLabel")}
        </Button>

        <div className="relative aspect-square w-full max-w-sm md:max-w-lg overflow-hidden rounded-2xl shadow-2xl">
          <img
            ref={imageRef}
            src={
              showOverlay
                ? `data:image/png;base64,${data.visualizations.overlay_image}`
                : originalImage || "/placeholder.svg"
            }
            alt={showOverlay ? "Disease overlay" : "Original"}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            crossOrigin="anonymous"
          />
          <div className="absolute bottom-4 right-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowOverlay(!showOverlay)}
              className="gap-2 rounded-full shadow-lg cursor-pointer"
            >
              {showOverlay ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {showOverlay
                ? t("result.hideOverlay")
                : t("result.showOverlay")}
            </Button>
          </div>
        </div>
      </div>

      {/* Kolom Kanan */}
      <div className="flex h-1/2 flex-col p-6 lg:h-[60vh] lg:w-2/5 lg:justify-center lg:p-10">
        <div className="mx-auto w-full max-w-md space-y-8 overflow-y-auto lg:overflow-hidden">
          <header className="space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              {getSeverityIcon(isHealthy, confidence)}
              <h1 className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
                {t("result.predictionResult")}
              </h1>
            </div>
            <p
              className={`text-2xl md:text-4xl font-extrabold tracking-tight ${isHealthy
                ? "text-green-600 dark:text-green-400"
                : "text-slate-800 dark:text-slate-100"
                }`}
            >
              {data.dominant_prediction.name}
            </p>
          </header>

          <div className="flex flex-col gap-4">
            <Button
              size="lg"
              onClick={handleExpertConsultation}
              className="h-12 w-full gap-2 text-base cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              {t("result.consultationWithChatbot")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadImage}
              className="h-12 w-full gap-2 bg-transparent text-base cursor-pointer"
            >
              <Download className="h-5 w-5" />
              {t("result.saveResult")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
