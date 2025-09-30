"use client"

import React, { useState } from 'react'
import { Dock, DockIcon } from '@/components/ui/dock'
import { CircleQuestionMark, Home, Info, Scan } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TutorialModal } from '../modal/tutorial-modal'
import { InformationModal } from '../modal/information-modal'
import { useTranslations } from 'next-intl'

const DockNav = ({ children }: { children: React.ReactNode }) => {
  const [isTutorialOpen, setTutorialOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const t = useTranslations("navigation")

  const DOCK_ITEMS = [
    {
      label: t("homeLabel"),
      icon: <Home className="size-6" />,
      href: "/"
    },
    {
      label: t("infoLabel"),
      icon: <Info className="size-6" />,
      action: () => setInfoOpen(true)
    },
    {
      label: t("predictLabel"),
      icon: <Scan className="size-6" />,
      href: "/prediction"
    },
    {
      label: t("helpLabel"),
      icon: <CircleQuestionMark className="size-6" />,
      action: () => setTutorialOpen(true)
    },
    {
      label: t("changeLangLabel"),
      icon: <LanguageSwitcher />,
    },
  ];

  return (
    <section className='relative h-screen p-0 m-0 w-full'>
      <div className='absolute left-1/2 -translate-x-1/2 bottom-10'>
        <TooltipProvider>
          <Dock direction="middle">
            {DOCK_ITEMS.map((item) => (
              <DockIcon key={item.label} onClick={item.action}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* Jika ada href, gunakan <a> atau <Link> */}
                    {item.href ? (
                      <a href={item.href}>{item.icon}</a>
                    ) : (
                      <div>{item.icon}</div>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>

      </div>

      {/* Render komponen modal di sini */}
      <TutorialModal isOpen={isTutorialOpen} onClose={() => setTutorialOpen(false)} />
      <InformationModal isOpen={isInfoOpen} onClose={() => setInfoOpen(false)} />
      <div className='grid place-items-center h-[90vh] w-full'>
        {
          children
        }
      </div>

    </section>
  )
}

export default DockNav