"use client";

import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, Award } from "lucide-react";
import { useTranslations } from "next-intl";

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InformationModal: React.FC<InformationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("prediction")

  const renderStyledText = (text: string) => {
    const parts = text.split(/(\[\[.*?\]\])/g);

    return parts.map((part, i) => {
      if (part.startsWith("[[") && part.endsWith("]]")) {
        const clean = part.slice(2, -2); // buang [[ ]]
        return (
          <span
            key={i}
            className="font-semibold text-slate-700 dark:text-slate-200"
          >
            {clean}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={modalRef}
        className="fixed left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2
                   rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 
                   shadow-2xl shadow-slate-400/20 dark:border-slate-800 dark:from-slate-900 
                   dark:to-slate-950 dark:shadow-black/30
                   p-0 overflow-scroll max-h-screen"
      >

        <div className="px-8 pb-10 pt-14">
          <header className="mb-6">
            <DialogTitle className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
              {t("information.heading")}
            </DialogTitle>
            <p className="mt-1 text-base text-slate-500 dark:text-slate-400">
              {t("information.subHeading")}
            </p>
          </header>

          <div className="grid gap-8">
            <section>
              <h3 className="mb-3 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                {t("information.aboutHeading")}
              </h3>
              <p className="rounded-xl bg-white p-5 text-base leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
                {t("information.aboutApp")}
              </p>
            </section>

            <section>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-emerald-500 dark:bg-pink-500/10 ">
                  <Heart size={20} />
                </div>
                <div className="flex-grow">
                  <h3 className="mb-3 text-xl font-semibold text-green-600 ">
                    {t("information.thankHeading")}
                  </h3>
                  <blockquote className="rounded-lg border-l-4 border-emerald-400 bg-emerald-50/60 p-5 italic leading-relaxed text-slate-600 shadow-sm dark:border-emerald-500 dark:bg-emerald-900/20 dark:text-slate-400">
                    {renderStyledText(t("information.thankNote"))}
                  </blockquote>
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Award size={18} className="text-slate-400 dark:text-slate-500" />
                    <div>
                      <p className="font-semibold">{t("information.teamName")}</p>
                      <p>{t("information.university")}, {t("information.year")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
