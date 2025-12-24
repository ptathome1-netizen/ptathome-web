// src/components/ContactCTA.tsx
"use client";

import React from "react";

const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_GVuxin";
const KAKAO_CHAT_URL = "https://pf.kakao.com/_GVuxin/chat";

export default function ContactCTA() {
  const handleOpenKakao = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === "undefined") return;

    // ✅ 외부 링크는 Next 라우팅/프리페치 영향을 받지 않게 window.open 고정
    // ✅ 인앱 브라우저/특정 환경에서 chat 경로가 막히는 경우를 대비해 채널 홈 fallback
    const w = window.open(KAKAO_CHAT_URL, "_blank", "noopener,noreferrer");
    if (!w) {
      // 팝업 차단 등으로 open이 막혔을 때 안전 fallback
      window.location.href = KAKAO_CHANNEL_URL;
    }
  };

  return (
    <section className="bg-[#FAF8F3] py-16 sm:py-20 text-center border-t border-[#E5DED2]">
      <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#1E1B16]">
        궁금한 점이 있으신가요?
      </h3>
      <p className="mt-2 text-[15px] text-[#6A6052]">
        1분만에 빠르게 문의 남기기
      </p>

      {/* ✅ a 태그 대신 button + window.open으로 동작 통일 (하단 고정바와 동일) */}
      <button
        type="button"
        onClick={handleOpenKakao}
        className="inline-flex items-center justify-center mt-6 rounded-full bg-[#CDBA97] hover:bg-[#BDA781] text-white px-8 py-3 text-[15px] font-medium shadow-md transition-all duration-300"
      >
        문의하기
      </button>

      <p className="mt-3 text-center text-[12px] leading-relaxed text-[#9A8C7E]">
        버튼 클릭 시 카카오톡 채널(새 창)로 이동합니다.
      </p>
    </section>
  );
}
