"use client";

import { UploadPredict } from "@/components/upload-predict";
import { SimplifiedResults } from "@/components/simplified-results";
import { ChatbotFloat } from "@/components/chatbot-float";
import { LanguageSwitcher } from "@/components/language-switcher"; // <-- Import
import { useDiseaseClassification } from "@/hooks/use-disease-classification";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("prediction");
  const { isClassifying, classificationResult, originalImage, error, classifyImage, resetClassification } =
    useDiseaseClassification();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="w-32"></div> {/* Spacer */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-foreground mb-2">{t("home.appName")}</h1>
            <p className="text-muted-foreground text-xl font-semibold">{t("home.title")}</p>
          </div>

          <LanguageSwitcher /> {/* <-- Use the component */}
        </div>

        {/* ... rest of your component ... */}
        {!classificationResult ? (
          <UploadPredict onUpload={classifyImage} isLoading={isClassifying} />
        ) : (
          <SimplifiedResults
            data={classificationResult}
            originalImage={originalImage || ""}
            onReset={resetClassification}
          />
        )}
      </div>
      <ChatbotFloat />
    </main>
  );
}