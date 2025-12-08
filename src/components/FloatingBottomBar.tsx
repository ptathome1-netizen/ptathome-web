"use client";

import React from "react";

const KAKAO_CHAT_URL = "https://pf.kakao.com/_GVuxin/chat";

export default function FloatingBottomBar() {
  // 0원 체험 수업 신청(챗봇 열기)
  const handleOpenChatbot = () => {
    if (typeof window === "undefined") return;

    window.dispatchEvent(new CustomEvent("open-chatbot"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 카카오톡 문의 열기
  const handleOpenKakao = () => {
    if (typeof window === "undefined") return;
    window.open(KAKAO_CHAT_URL, "_blank");
  };

  return (
    // 모바일 전용 하단 바 (md 이상에서는 숨김)
    <div className="fixed inset-x-0 bottom-0 z-[900] flex justify-center px-3 pb-[env(safe-area-inset-bottom)] pointer-events-none md:hidden">
      <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-center gap-2.5 rounded-t-2xl border border-[#E6E0D6] bg-white px-3 py-2 shadow-[0_-6px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm">
        {/* 0원으로 시작하기 버튼 - 서브 레벨 톤다운 */}
        <button
          type="button"
          onClick={handleOpenChatbot}
          className="inline-flex h-9 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-[#F3E5CF] px-4 text-[13px] font-semibold text-[#31261B] shadow-sm transition hover:bg-[#EBD8BE] active:scale-[0.97]"
        >
          0원으로 시작하기
        </button>

        {/* 문의하기 버튼 - 카카오톡 문의 */}
        <button
          type="button"
          onClick={handleOpenKakao}
          className="inline-flex h-9 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-[#CDBDA7] bg-white px-4 text-[13px] font-semibold text-[#4A3A2A] shadow-sm transition hover:bg-[#F8F3EC] active:scale-[0.97]"
        >
          문의하기
        </button>
      </div>
    </div>
  );
}

