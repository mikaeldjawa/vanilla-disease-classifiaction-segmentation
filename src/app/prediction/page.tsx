"use client";

import { UploadPredict } from "@/components/upload-predict";
import { SimplifiedResults } from "@/components/simplified-results";
import { ChatbotFloat } from "@/components/chatbot-float";
import { LanguageSwitcher } from "@/components/language-switcher"; // <-- Import
import { useDiseaseClassification } from "@/hooks/use-disease-classification";
import { useTranslations } from "next-intl";
import DockNav from "@/components/layout/DockNav";

export default function Home() {
  const t = useTranslations("prediction");
  const { isClassifying, classificationResult, originalImage, error, classifyImage, resetClassification } =
    useDiseaseClassification();

  return (
    <main>
      <section className="min-h-screen h-fit bg-[url('/web-bg.webp')] bg-no-repeat bg-cover w-full flex flex-col justify-center bg-center p-8 md:p-0">
        <section className=" h-screen w-full flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-green-600 text-2xl sm:text-4xl font-extrabold mb-2 flex items-center justify-center gap-2">
              <svg
                className="text-green-600 w-10 sm:w-15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15V7M7.5 7.5V10.5M7.5 7.5C7.5 5.29086 5.70914 3.5 3.5 3.5H0.5V6.5C0.5 8.70914 2.29086 10.5 4.5 10.5H7.5M7.5 7.5H10.5C12.7091 7.5 14.5 5.70914 14.5 3.5V0.5H11.5C9.29086 0.5 7.5 2.29086 7.5 4.5V7.5ZM7.5 7.5L11.5 3.5M7.5 10.5L3.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              {t("home.appName")}
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl font-semibold">{t("home.title")}</p>
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
        </section>
      </section>
      <ChatbotFloat />
      <div className="fixed mx-auto bottom-8 w-full">
        <DockNav />
      </div>
    </main>
  );
}