// src/components/PricingSection.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type PlanKey = "basic" | "special" | "premium";

type Plan = {
  key: PlanKey;
  name: string;
  sessions: number;
  price: string;
  taglineStrong: string;
  taglineSub: string;
  bullets: { strong: string; rest?: string }[];
  hashtags: string[];
};

/* -------------------------------
   테두리 + 그림자 스타일 세트
---------------------------------*/

const PLAN_STYLES: Record<PlanKey, { border: string; shadow: string }> = {
  basic: {
    border: "border-[#F0B86A]", // 따뜻한 골드
    shadow: "shadow-[0_8px_22px_rgba(240,184,106,0.22)]",
  },
  special: {
    border: "border-[#7FA8FF]", // 파스텔 블루
    shadow: "shadow-[0_8px_22px_rgba(127,168,255,0.22)]",
  },
  premium: {
    border: "border-[#FF4B4B]", // 🔥 강렬 레드
    shadow: "shadow-[0_10px_26px_rgba(255,75,75,0.30)]",
  },
};

/* -------------------------------
   요금제 데이터
---------------------------------*/

const PLANS: Plan[] = [
  {
    key: "basic",
    name: "베이직",
    sessions: 4,
    price: "₩280,000",
    taglineStrong: "부담 없이 시작하고, 기본은 정확하게",
    taglineSub: "방문PT를 부담없이 시작하고 싶은 사람.",
    bullets: [
      { strong: "방문 PT", rest: " 를 부담 없이 시작" },
      { strong: "자세·호흡·가동성", rest: " 중심의 정확한 기본기 확립" },
      { strong: "홈 맞춤 루틴", rest: " 설계로 꾸준함을 이어가게" },
    ],
    hashtags: ["#부담없이", "#기본기확립", "#루틴설계"],
  },
  {
    key: "special",
    name: "스페셜",
    sessions: 8,
    price: "₩540,000",
    taglineStrong: "루틴은 유지하고, 완성도는 높인다",
    taglineSub: "운동습관을 잡고 꾸준히 운동하고 싶은 사람.",
    bullets: [
      { strong: "체형교정 + 근력운동", rest: " 중심의 중간 단계 관리" },
      { strong: "정기 수업·피드백 루프", rest: " 로 운동 습관 유지" },
      { strong: "일상 속 지속성", rest: " 을 높이는 효율적 세션 구성" },
    ],
    hashtags: ["#운동습관", "#지속성", "#꾸준한관리"],
  },
  {
    key: "premium",
    name: "프리미엄",
    sessions: 12,
    price: "₩780,000",
    taglineStrong: "목표는 선명하게, 결과는 확실하게",
    taglineSub: "목표달성을 위해 집중 관리를 원하는 사람.",
    bullets: [
      { strong: "기간별 목표 로드맵", rest: " 으로 단계별 진행" },
      { strong: "체성분·신체움직임 변화", rest: " 를 리포트로 추적" },
      { strong: "완성도 극대화", rest: " 를 위한 장기 목표 기반 프로그램" },
    ],
    hashtags: ["#목표달성중심", "#변화추적", "#완성도극대화"],
  },
];

/* -------------------------------
   메인 컴포넌트
---------------------------------*/

export default function PricingSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="relative isolate bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFAF7_100%)] py-16 sm:py-24">
      {/* 헤더 */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs tracking-[0.2em] text-neutral-500">PRICE PLAN</p>

        <h2 className="mt-2 text-[26px] font-semibold leading-snug text-[#0F172A] sm:text-[32px]">
          맞춤형 방문 PT를 선택하세요
        </h2>

        <p className="mt-2 text-[14px] leading-7 text-[#5E5E5E]">
          원하는 페이스로 지속 가능한 변화를 만들어갑니다.
        </p>
      </div>

      {/* 슬라이더 */}
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <div className="relative">
          {/* 이전 버튼 */}
          <button
            onClick={scrollPrev}
            aria-label="이전 요금제"
            className="
              absolute left-[6%] sm:left-[10%] top-1/2 z-10
              flex h-10 w-10 -translate-y-1/2 items-center justify-center
              rounded-full border border-[#E6E0D6]
              bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              backdrop-blur-sm active:scale-95
            "
          >
            <span className="text-lg text-[#C0A88A]">‹</span>
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={scrollNext}
            aria-label="다음 요금제"
            className="
              absolute right-[6%] sm:right-[10%] top-1/2 z-10
              flex h-10 w-10 -translate-y-1/2 items-center justify-center
              rounded-full border border-[#E6E0D6]
              bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              backdrop-blur-sm active:scale-95
            "
          >
            <span className="text-lg text-[#C0A88A]">›</span>
          </button>

          {/* 뷰포트 */}
          <div className="overflow-hidden px-4" ref={emblaRef}>
            <div className="-mx-3 flex">
              {PLANS.map((plan, index) => (
                <div
                  key={plan.key}
                  className="
                    min-w-0 flex-[0_0_88%]
                    sm:flex-[0_0_70%]
                    md:flex-[0_0_55%]
                    lg:flex-[0_0_33.333%]
                    px-3
                  "
                >
                  <PlanCard data={plan} isActive={selectedIndex === index} />
                </div>
              ))}
            </div>
          </div>

          {/* 인디케이터 */}
          <div className="mt-4 flex justify-center gap-2">
            {PLANS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === idx
                    ? "w-5 bg-[#F28C38]"
                    : "w-2 bg-[#E5D9C9]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 하단 문구 */}
      <p className="mx-auto mt-8 max-w-6xl px-6 text-center text-[13px] leading-6 text-[#6B7280]">
        전원 한국체육대학교 출신 · 국가공인 자격 코치 전담 관리
        <br className="sm:hidden" />
        <span className="text-[#9AA1A9]">※ 환불 및 변경 규정은 공지사항 참고</span>
      </p>
    </section>
  );
}

/* -------------------------------
   카드 컴포넌트
---------------------------------*/

function PlanCard({ data, isActive }: { data: Plan; isActive: boolean }) {
  const isPremium = data.key === "premium";
  const style = PLAN_STYLES[data.key];

  const scaleClass = isActive ? "scale-100" : "scale-[0.95]";
  const shadowExtra = isActive ? "shadow-[0_12px_32px_rgba(0,0,0,0.08)]" : "";

  return (
    <article
      className={`
        relative flex h-full min-h-[470px] flex-col
        rounded-2xl border bg-white/95 px-5 pb-5 pt-6
        backdrop-blur transition-all duration-400 ease-out
        ${style.border} ${style.shadow} ${scaleClass} ${shadowExtra}
      `}
    >
      {/* 프리미엄 배지 */}
      {isPremium && (
        <div className="mb-3 flex justify-center">
          <span
            className="
              inline-flex items-center rounded-full border border-[#FF4B4B]
              bg-[linear-gradient(135deg,#FFD5D5_0%,#FF9A9A_45%,#FF4B4B_100%)]
              px-3 py-1 text-[11px] font-semibold text-[#7A1E1E]
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_12px_rgba(255,75,75,0.45)]
            "
          >
            가장 많이 선택
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold text-[#0F172A]">
          {data.name}
        </h3>
        <Badge>{data.sessions}회</Badge>
      </div>

      {/* Price */}
      <div className="mt-3 flex items-center justify-between">
        <div className="text-[26px] font-semibold text-[#0F172A] sm:text-[28px]">
          {data.price}
        </div>

        <div className="h-6 w-6 shrink-0" />
      </div>

      {/* Taglines */}
      <div className="mt-3">
        <p className="text-[15px] font-semibold text-[#111827]">
          {data.taglineStrong}
        </p>
        <p className="mt-1 text-[14px] leading-6 text-[#5E5E5E]">
          {data.taglineSub}
        </p>
      </div>

      {/* Hashtags */}
      <div className="mt-4 flex flex-nowrap gap-2 overflow-hidden">
        {data.hashtags.map((h) => (
          <Chip key={h} text={h} />
        ))}
      </div>

      {/* Bullets */}
      <ul className="mt-5 min-h-[160px] grow space-y-2.5 text-[14px] leading-7 text-[#374151]">
        {data.bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#D1C5B3]" />
            <span>
              <strong className="font-semibold text-[#111827]">
                {b.strong}
              </strong>
              {b.rest && <span className="text-[#374151]"> {b.rest}</span>}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto pt-3">
        <CTA>상담 예약</CTA>
      </div>
    </article>
  );
}

/* -------------------------------
   Badge / Chip / CTA
---------------------------------*/

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#E6E0D6] bg-white px-2.5 py-1 text-[12px] text-[#6B5B43]">
      {children}
    </span>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span
      className="inline-flex max-w-full items-center whitespace-nowrap rounded-full border border-[#E6E0D6] bg-white px-2.5 py-[5px] text-[12.5px] text-[#374151]"
      title={text}
    >
      {text}
    </span>
  );
}

function CTA({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="
        w-full rounded-xl border border-[#E6E0D6] bg-white
        px-4 py-3 text-center text-[14.5px] font-semibold text-[#0F172A]
        transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]
        hover:-translate-y-[1px] active:translate-y-0
      "
    >
      {children}
    </button>
  );
}
