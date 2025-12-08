// src/components/PricingSection.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type PlanKey = "basic" | "special" | "premium";

type Plan = {
  key: PlanKey;
  name: string;
  price: string;
  subtitle?: string;
  description: string;
  badge?: string;
  features: string[];
  highlight?: boolean;
  accentColor: string; // Tailwind color name (ex: 'emerald-500')
};

const PLANS: Plan[] = [
  {
    key: "basic",
    name: "Basic",
    price: "280,000원",
    subtitle: "월 4회 방문 PT",
    description: "주 1회, 바쁜 일정 속에서도 꾸준히 운동을 시작하고 싶은 분께.",
    badge: "입문 추천",
    features: [
      "1:1 방문 PT (50분 수업)",
      "체형·자세 체크 후 맞춤 프로그램 구성",
      "집/헬스장/커뮤니티룸 방문 가능",
      "카카오톡 운동 피드백 (주 1회)",
    ],
    highlight: false,
    accentColor: "emerald-500",
  },
  {
    key: "special",
    name: "Special",
    price: "540,000원",
    subtitle: "월 8회 방문 PT",
    description: "체형 교정 + 바디라인 관리까지 함께 잡고 싶은 분께.",
    badge: "가장 많이 선택",
    features: [
      "1:1 방문 PT (50분 수업)",
      "체형·통증 개선 맞춤 프로그램",
      "주 2회 방문으로 빠른 체감 변화",
      "카카오톡 운동/식단 피드백 (주 2회)",
    ],
    highlight: true,
    accentColor: "amber-400",
  },
  {
    key: "premium",
    name: "Premium",
    price: "780,000원",
    subtitle: "월 12회 방문 PT",
    description: "체지방 감량, 바디프로필·웨딩 등 확실한 변화를 원하시는 분께.",
    badge: undefined, // 🔴 프리미엄은 두 줄 효과(뱃지) 제거
    features: [
      "1:1 방문 PT (50분 수업)",
      "주 3회 고정 스케줄 관리",
      "체형·체력·식단까지 풀케어",
      "체성분 변화 리포트 제공",
    ],
    highlight: false,
    // 🔴 프리미엄은 포인트 컬러 빨간색
    accentColor: "red-500",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const PricingSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(1); // 기본 선택: Special
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const snap = emblaApi.selectedScrollSnap();
      setSelectedIndex(snap);
    };

    emblaApi.on("select", onSelect);
    onSelect(); // 초기 한 번 동기화

    // 🔧 타입 에러 안 나게 정석 cleanup 형태로 반환
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleTabClick = (planIndex: number) => {
    scrollTo(planIndex);
  };

  return (
    <section id="pricing" className="bg-slate-950 py-20 text-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        {/* 제목 영역 */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            MEMBERSHIP
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            내 집에서 받는 프리미엄 1:1 방문 PT
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            횟수에 따라 자유롭게 선택하세요. 부담 없이 시작하고, 눈에 보이는 변화까지 함께 갑니다.
          </p>
        </div>

        {/* 탭 (모바일 우선) */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 sm:justify-center">
          {PLANS.map((plan, index) => {
            const isActive = selectedIndex === index;
            const accentBase = plan.accentColor; // ex) 'emerald-500'
            const ringClass = isActive
              ? `ring-2 ring-${accentBase} bg-slate-900`
              : "ring-1 ring-slate-700 bg-slate-900/40";

            return (
              <button
                key={plan.key}
                type="button"
                onClick={() => handleTabClick(index)}
                className={cn(
                  "flex-shrink-0 rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm",
                  ringClass,
                )}
              >
                {plan.name}
              </button>
            );
          })}
        </div>

        {/* 캐러셀 영역 */}
        <div className="relative">
          {/* Embla viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {PLANS.map((plan, index) => {
                const isActive = selectedIndex === index;
                const accentBase = plan.accentColor; // ex) 'red-500'

                return (
                  <article
                    key={plan.key}
                    className={cn(
                      "min-w-0 flex-[0_0_100%] rounded-3xl border bg-slate-900/60 p-6 shadow-lg shadow-black/40 transition duration-300 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]",
                      isActive
                        ? "border-emerald-400/70 shadow-emerald-500/20"
                        : "border-slate-800",
                    )}
                  >
                    <div className="flex h-full flex-col">
                      {/* 상단 뱃지 + 이름/설명 */}
                      <div className="mb-4 flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold sm:text-xl">
                            {plan.name}
                          </h3>
                          {plan.subtitle && (
                            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                              {plan.subtitle}
                            </p>
                          )}
                        </div>
                        {/* 🔸 프리미엄은 badge 없음(두 줄 효과 제거) */}
                        {plan.badge && (
                          <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/30">
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <p className="mb-4 text-xs text-slate-400 sm:text-sm">
                        {plan.description}
                      </p>

                      {/* 가격 */}
                      <div className="mb-5">
                        <div className="flex items-baseline gap-1">
                          <span
                            className={cn(
                              "text-2xl font-semibold sm:text-3xl",
                              // 🔴 프리미엄만 빨간색, 나머지는 에메랄드/앰버 유지
                              plan.key === "premium"
                                ? "text-red-500"
                                : plan.key === "special"
                                  ? "text-amber-400"
                                  : "text-emerald-400",
                            )}
                          >
                            {plan.price}
                          </span>
                          <span className="text-xs text-slate-500 sm:text-sm">
                            / 월
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                          VAT 포함 · 1:1 방문 PT 기준
                        </p>
                      </div>

                      {/* 혜택 리스트 */}
                      <ul className="mb-6 space-y-2 text-xs text-slate-200 sm:text-sm">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex gap-2">
                            <span
                              className={cn(
                                "mt-[3px] inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full",
                                plan.key === "premium"
                                  ? "bg-red-500"
                                  : plan.key === "special"
                                    ? "bg-amber-400"
                                    : "bg-emerald-400",
                              )}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA 버튼 */}
                      <div className="mt-auto pt-2">
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
                            plan.key === "premium"
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : plan.key === "special"
                                ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
                                : "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
                          )}
                          onClick={() => {
                            // 여기에 카카오톡 상담 / 신청 모달 오픈 등 연결 가능
                            // 예: window.open(KAKAO_CHAT_URL, "_blank");
                          }}
                        >
                          체험 수업 상담 받기
                        </button>
                        <p className="mt-2 text-center text-[11px] text-slate-500 sm:text-xs">
                          첫 상담 후, 목적·체형에 맞는 최적의 요금제를 함께 안내드립니다.
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* 인디케이터 (동그라미) */}
          <div className="mt-6 flex justify-center gap-2">
            {PLANS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition",
                  selectedIndex === index
                    ? "bg-emerald-400"
                    : "bg-slate-600 hover:bg-slate-400",
                )}
                aria-label={`요금제 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
