"use client";

import React from "react";

const KAKAO_CHAT_URL = "https://pf.kakao.com/_GVuxin/chat";

export default function FloatingBottomBar() {
  const handleOpenChatbot = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("open-chatbot"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenKakao = () => {
    if (typeof window === "undefined") return;
    window.open(KAKAO_CHAT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* =========================
          Desktop: 완전 제거 (아무것도 노출 X)
          - md 이상에서는 렌더는 되지만 hidden 처리
         ========================= */}

      {/* =========================
          Mobile: 패턴 2번(우측 하단 미니 플로팅 CTA)
         ========================= */}
      <div
        className="md:hidden fixed right-4 z-[900] pointer-events-none"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
      >
        <div className="pointer-events-auto flex flex-col gap-2">
          <button
            type="button"
            onClick={handleOpenChatbot}
            className="inline-flex h-11 w-[148px] items-center justify-center whitespace-nowrap rounded-full
                       bg-[#F3E5CF] px-4 text-[13.5px] font-semibold text-[#31261B]
                       shadow-[0_12px_26px_rgba(0,0,0,0.14)]
                       transition active:scale-[0.98]"
          >
            0원으로 시작하기
          </button>

          <button
            type="button"
            onClick={handleOpenKakao}
            className="inline-flex h-11 w-[148px] items-center justify-center whitespace-nowrap rounded-full
                       border border-[#CDBDA7] bg-white/92 backdrop-blur px-4
                       text-[13.5px] font-semibold text-[#4A3A2A]
                       shadow-[0_10px_22px_rgba(0,0,0,0.10)]
                       transition active:scale-[0.98]"
          >
            문의하기
          </button>
        </div>
      </div>
    </>
  );
}
