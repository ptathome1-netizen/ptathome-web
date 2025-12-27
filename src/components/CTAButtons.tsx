"use client";

import React from "react";

type Props = {
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryNote?: string;   // 왼쪽 버튼 하단 보조 문구
  secondaryNote?: string; // 오른쪽 버튼 하단 보조 문구
};

export default function CTAButtons({
  onPrimary,
  onSecondary,
  primaryNote = "첫 수업은 무료, 부담 없이 시작하세요.",
  secondaryNote = "전문 자격 코치가 직접 방문합니다.",
}: Props) {
  /* 두 버튼 동일 폭/높이(오른쪽 기준) */
  const BTN_WIDTH = "min-w-[240px]";  // 필요시 248~256px로 미세 조정 가능
  const BTN_HEIGHT = "h-12";

  return (
    <div className="mt-6 flex items-start gap-3 sm:gap-4">
      {/* 왼쪽: 0원으로 시작하기 */}
      <div className={`flex w-auto flex-col items-center ${BTN_WIDTH}`}>
        <button
          onClick={onPrimary}
          className={`pta-btn-gloss group inline-flex ${BTN_HEIGHT} w-full items-center justify-center
                     rounded-full bg-[#2B241C] px-6 text-[15px] font-semibold text-white
                     shadow-[0_6px_18px_rgba(0,0,0,0.15)]
                     ring-0 transition-all duration-200
                     hover:shadow-[0_12px_26px_rgba(0,0,0,0.22)]
                     focus-visible:ring-2 focus-visible:ring-[#CBBBA3]/60`}
          aria-label="0원으로 시작하기"
        >
          0원으로 시작하기
          <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5">→</span>

          {/* 반사광(글로스) */}
          <span className="pta-shine" />
        </button>

        {/* 버튼 폭에 딱 맞춘 하단 문구 */}
        <div className="mt-2 w-full text-center text-[13px] leading-relaxed text-[#5F5547]">
          {primaryNote}
        </div>
      </div>

      {/* 오른쪽: 나만의 코치 만나보기 */}
      <div className={`flex w-auto flex-col items-center ${BTN_WIDTH}`}>
        <button
          onClick={onSecondary}
          className={`pta-btn-gloss inline-flex ${BTN_HEIGHT} w-full items-center justify-center
                     rounded-full border border-[#CFC7BA] bg-white/85
                     px-6 text-[15px] font-semibold text-[#2B241C]
                     shadow-[0_4px_14px_rgba(0,0,0,0.08)] backdrop-blur-[2px]
                     transition-all duration-200
                     hover:shadow-[0_10px_24px_rgba(0,0,0,0.14)]
                     focus-visible:ring-2 focus-visible:ring-[#CBBBA3]/60`}
          aria-label="나만의 코치 만나보기"
        >
          나만의 코치 만나보기
          <span className="ml-2">→</span>

          {/* 반사광(글로스) */}
          <span className="pta-shine" />
        </button>

        {/* 버튼 폭에 딱 맞춘 하단 문구 */}
        <div className="mt-2 w-full text-center text-[13px] leading-relaxed text-[#5F5547]">
          {secondaryNote}
        </div>
      </div>
    </div>
  );
}
