"use client";

import { useLocale } from "next-intl";
import Image from "next/image";

export function LanguageSwitcher() {
  const locale = useLocale();

  const onSelectChange = (value: string) => {
    document.cookie = `locale=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  };

  const flags = [
    { code: "en", src: "/en-icon.png", alt: "English" },
    { code: "id", src: "/id-icon.png", alt: "Indonesia" },
  ];

  const activeFlag = flags.find((f) => f.code === locale) ?? flags[0];
  const otherFlag = flags.find((f) => f.code !== locale);

  return (
    <div className="relative inline-block group">
      {/* Dropdown on hover → hanya 1 flag (yang bukan aktif) */}
      {otherFlag && (
        <div
          className="
            absolute bottom-10 left-1/2 -translate-x-1/2
            bg-transparent p-2 flex flex-col gap-2 z-50 w-12
            opacity-0 translate-y-2 scale-95
            group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
            pointer-events-none group-hover:pointer-events-auto
            transition-all duration-300 ease-out
          "
        >
          <div className="relative group/item">
            <button
              onClick={() => onSelectChange(otherFlag.code)}
              className="hover:scale-110 transition-transform cursor-pointer"
            >
              <Image
                src={otherFlag.src}
                alt={otherFlag.alt}
                width={32}
                height={32}
                className="rounded-md"
              />
            </button>
            {/* Hover Label */}
            <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover/item:opacity-100 transition-opacity">
              {otherFlag.alt}
            </span>
          </div>
        </div>
      )}

      {/* Trigger (active flag) */}
      <button className="rounded-md hover:scale-105 transition-transform cursor-pointer">
        <Image
          src={activeFlag.src}
          alt={activeFlag.alt}
          width={32}
          height={32}
          className="rounded-md scale-110"
        />
      </button>
    </div>
  );
}
