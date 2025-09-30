"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface SplashScreenProps {
  onFinished: () => void;
}

/**
 * SplashScreen component for Agrovani using GSAP.
 * Displays an animated logo, brand name, and an interactive button.
 * @param {object} props - The component props.
 * @param {function} props.onFinished - Callback function to execute when the splash animation is complete.
 */
export default function SplashScreen({ onFinished }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoPathRef = useRef<SVGPathElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("index")

  useEffect(() => {
    if (typeof gsap === "undefined" || typeof gsap.context !== "function") {
      console.error("GSAP is not loaded. Skipping animations.");
      const fallbackTimer = setTimeout(onFinished, 3000);
      return () => clearTimeout(fallbackTimer);
    }

    const ctx = gsap.context(() => {
      if (!subtitleRef.current || !logoPathRef.current || !buttonWrapperRef.current) return;
      const subtitleChars = subtitleRef.current.textContent?.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        return span;
      }) || [];

      subtitleRef.current.textContent = '';
      subtitleChars.forEach(char => subtitleRef.current?.appendChild(char));

      gsap.set(["#title", subtitleChars, buttonWrapperRef.current], { opacity: 0, y: 20 });

      const logoPath = logoPathRef.current;
      const pathLength = logoPath.getTotalLength();

      gsap.set(logoPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0,
      });

      gsap.set("#logo", { scale: 0.95, opacity: 0 });

      const tl = gsap.timeline();

      tl.to("#logo", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
      })
        .to(logoPath, {
          opacity: 1,
          duration: 0.2
        }, "-=1.5")
        .to(logoPath, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "sine.inOut",
        }, "-=1.3")
        .to("#title", {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
        }, "-=1.8")
        .to(subtitleChars, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "expo.out",
        }, "-=1.6")
        .to(buttonWrapperRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out"
        }, "-=1.2");

    }, containerRef);
    return () => ctx.revert();
  }, [onFinished]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleStart = () => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
      onComplete: onFinished,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 bg-[url('/web-bg.webp')] bg-cover"
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div id="logo" className="relative w-40 h-40">
        <svg
          className="w-full h-full text-green-600"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={logoPathRef}
            d="M7.5 15V7M7.5 7.5V10.5M7.5 7.5C7.5 5.29086 5.70914 3.5 3.5 3.5H0.5V6.5C0.5 8.70914 2.29086 10.5 4.5 10.5H7.5M7.5 7.5H10.5C12.7091 7.5 14.5 5.70914 14.5 3.5V0.5H11.5C9.29086 0.5 7.5 2.29086 7.5 4.5V7.5ZM7.5 7.5L11.5 3.5M7.5 10.5L3.5 6.5"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="text-center mt-6">
        <h1
          id="title"
          className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 tracking-wider"
        >
          AgroVanil
        </h1>
        <p ref={subtitleRef} id="subtitle" className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          {t("slogan")}
        </p>
        <div ref={buttonWrapperRef} className="mt-8">
          <Link href={"/prediction"}>
            <Button
              onClick={handleStart}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 cursor-pointer"
            >
              {t("startButton")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}