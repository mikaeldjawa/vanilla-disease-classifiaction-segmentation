"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

const TutorialModalContent: React.FC = () => {
  const t = useTranslations("prediction.help")

  const renderStyledText = (text: string) => {
    const parts = text.split(/(\[\[.*?\]\])/g);

    return parts.map((part, i) => {
      if (part.startsWith("[[") && part.endsWith("]]")) {
        const clean = part.slice(2, -2);
        return (
          <span
            key={i}
            className="font-semibold text-emerald-700"
          >
            {clean}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="p-6 font-sans text-slate-700">
      <header className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-500">
          {t("subtitle")}
        </p>
      </header>

      <ol className="space-y-6 text-sm md:text-base max-w-xl mx-auto">

        {
          Array.from({ length: 3 }).map((_, i) =>
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white font-bold">
                {i + 1}
              </span>
              <p>
                <span className="font-semibold text-slate-800">
                  {t(`steps.${i + 1}.title`)}
                </span>{" "}
                {renderStyledText(t(`steps.${i + 1}.desc`))}
              </p>
            </li>
          )
        }
      </ol>
    </div>
  );
};

// --- TutorialModal Props ---
interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- TutorialModal ---
export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
}) => {

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0">
        <DialogTitle></DialogTitle>
        <TutorialModalContent />
      </DialogContent>
    </Dialog>
  );
};
