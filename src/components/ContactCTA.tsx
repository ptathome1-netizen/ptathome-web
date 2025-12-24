// src/components/ContactCTA.tsx
"use client";

import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Text } from "@/components/ui/Text";

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
    <section className="border-t border-[#E5DED2] bg-[#FAF8F3] py-16 text-center sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          align="center"
          label={undefined}
          title="궁금한 점이 있으신가요?"
          description="1분만에 빠르게 문의 남기기"
          className="mx-auto"
        />

        {/* ✅ a 태그 대신 button + window.open으로 동작 통일 (하단 고정바와 동일) */}
        <button
          type="button"
          onClick={handleOpenKakao}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#CDBA97] px-8 py-3 text-[15px] font-medium text-white shadow-md transition-all duration-300 hover:bg-[#BDA781]"
        >
          <Text as="span" variant="bodySm" tone="subtle" className="text-[15px] font-medium text-white">
            문의하기
          </Text>
        </button>

        <Text
          as="p"
          variant="caption"
          tone="slateMuted"
          className="mt-3 text-center text-[12px] leading-relaxed text-[#9A8C7E]"
        >
          버튼 클릭 시 카카오톡 채널(새 창)로 이동합니다.
        </Text>
      </div>
    </section>
  );
}
