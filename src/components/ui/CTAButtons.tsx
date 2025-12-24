"use client";

import React from "react";

type Props = {
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryNote?: string;
  secondaryNote?: string;
};

export default function CTAButtons({
  onPrimary,
  onSecondary,
  primaryNote = "첫 수업은 무료, 부담 없이 시작하세요.",
  secondaryNote = "전문 자격 코치가 직접 방문합니다.",
}: Props) {
  const BTN_WIDTH = "min-w-[240px]";
  const BTN_HEIGHT = "h-12";

  return (
    <div className="mt-6 flex items-start gap-3 sm:gap-4">
      {/* Primary */}
      <div className={`flex flex-col items-center ${BTN_WIDTH}`}>
        <button
          onClick={onPrimary}
          className={`group inline-flex ${BTN_HEIGHT} w-full items-center justify-center
            rounded-full bg-[#2B241C] px-6 text-[15px] font-semibold text-white
            shadow-[0_6px_18px_rgba(0,0,0,0.15)]
            transition hover:shadow-[0_12px_26px_rgba(0,0,0,0.22)]
            active:scale-[0.98]`}
        >
          0원으로 시작하기
          <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
        </button>
        <p className="mt-2 text-center text-[13px] text-[#5F5547]">
          {primaryNote}
        </p>
      </div>

      {/* Secondary */}
      <div className={`flex flex-col items-center ${BTN_WIDTH}`}>
        <button
          onClick={onSecondary}
          className={`inline-flex ${BTN_HEIGHT} w-full items-center justify-center
            rounded-full border border-[#CFC7BA] bg-white
            px-6 text-[15px] font-semibold text-[#2B241C]
            shadow-[0_4px_14px_rgba(0,0,0,0.08)]
            transition hover:shadow-[0_10px_24px_rgba(0,0,0,0.14)]
            active:scale-[0.98]`}
        >
          나만의 코치 만나보기 →
        </button>
        <p className="mt-2 text-center text-[13px] text-[#5F5547]">
          {secondaryNote}
        </p>
      </div>
    </div>
  );
}
