"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type PlanKey = "basic" | "special" | "premium";

type Plan = {
  key: PlanKey;
  name: string;
  price: string;
  sessions: string;
  title: string;
  desc: string;
  bullets: string[];
};

const PLANS: Plan[] = [
  {
    key: "basic",
    name: "베이직",
    sessions: "월 4회",
    price: "₩280,000",
    title: "부담 없이 시작하고, 기본은 정확하게",
    desc: "방문 PT를 처음 시작하고 싶은 분",
    bullets: [
      "자세·호흡·가동성 중심 기본기 확립",
      "집 환경에 맞춘 루틴 설계",
      "운동 습관 형성을 위한 안정적인 시작",
    ],
  },
  {
    key: "special",
    name: "스페셜",
    sessions: "월 8회",
    price: "₩540,000",
    title: "루틴은 유지하고, 완성도는 높인다",
    desc: "운동을 습관으로 만들고 싶은 분",
    bullets: [
      "체형 교정 + 근력 중심 관리",
      "정기 피드백으로 루틴 유지",
      "일상 속 지속 가능한 운동 설계",
    ],
  },
  {
    key: "premium",
    name: "프리미엄",
    sessions: "월 12회",
    price: "₩780,000",
    title: "목표는 선명하게, 결과는 확실하게",
    desc: "눈에 보이는 변화를 원하는 분",
    bullets: [
      "목표 기반 로드맵 설계",
      "체성분·움직임 변화 관리",
      "집중 관리로 완성도 극대화",
    ],
  },
];

const accent = {
  basic: "bg-[#CDEBD7] text-[#064E3B]",
  special: "bg-[#F5E0B4] text-[#7C4A02]",
  premium: "bg-[#F7D1D5] text-[#7C1F32]",
};

export default function PricingSection() {
  const [index, setIndex] = useState(1);
  const [ref, api] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => api.off("select", onSelect);
  }, [api]);

  const openChatbot = () => {
    const kakaoBtn = document.getElementById("kakao-chat-button");
    if (kakaoBtn instanceof HTMLElement) {
      kakaoBtn.click();
      return;
    }
    window.dispatchEvent(new Event("open-chatbot"));
  };

  return (
    <section className="bg-[#F7EFE3] py-20">
      <div className="mx-auto max-w-6xl px-4 text-[#1F2937]">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs tracking-[0.25em] text-[#C6A676] font-semibold">
            PRICE PLAN
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            라이프스타일에 맞게 맞춤형 방문 PT를 선택하세요
          </h2>
          <p className="mt-3 text-sm text-[#6B7280]">
            나의 일정과 생활에 맞춰, 집에서 완성하는 프리미엄 PT
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
          <div ref={ref} className="overflow-hidden md:overflow-visible">
            <div className="flex gap-6">
              {PLANS.map((p) => (
                <div
                  key={p.key}
                  className="flex-[0_0_100%] md:flex-[0_0_33.333%] rounded-3xl bg-white border border-[#E6E0D6] px-6 py-8 shadow-sm"
                >
                  <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <span className="text-xs bg-[#F7EFE3] px-3 py-1 rounded-full">
                      {p.sessions}
                    </span>
                  </div>

                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="mt-1 text-xs text-[#6B7280]">{p.desc}</p>

                  <div className="mt-5 text-3xl font-semibold">
                    {p.price}
                    <span className="text-xs text-[#9CA3AF]"> / VAT 포함</span>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C6A676]" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={openChatbot}
                    className={`mt-8 w-full rounded-full py-3 text-sm font-semibold ${accent[p.key]}`}
                  >
                    체험 수업 신청하기
                  </button>

                  <p className="mt-2 text-center text-xs text-[#9CA3AF]">
                    버튼 클릭 시 바로 상담 챗봇이 실행됩니다.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="mt-6 flex justify-center gap-2 md:hidden">
            {PLANS.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 w-2 rounded-full ${
                  index === i ? "bg-[#C6A676]" : "bg-[#E5D6C3]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
