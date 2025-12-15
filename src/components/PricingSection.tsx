// src/components/PricingSection.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type PlanKey = "basic" | "special" | "premium";

type Plan = {
  key: PlanKey;
  name: string;
  countLabel: string; // 4회/8회/12회
  price: string;
  tagline: string; // 한 줄 강점
  desc: string; // 대상 설명
  tags: string[];
  bullets: string[];
  pastel: {
    priceText: string;
    dot: string;
    buttonBg: string;
    buttonText: string;
    ring: string;
  };
};

const PLANS: Plan[] = [
  {
    key: "basic",
    name: "베이직",
    countLabel: "4회",
    price: "₩280,000",
    tagline: "부담 없이 시작하고, 기본은 정확하게",
    desc: "방문 PT를 부담없이 시작하고 싶은 사람",
    tags: ["#부담없이", "#기본기확립", "#루틴설계"],
    bullets: [
      "방문 PT를 부담 없이 시작",
      "자세·호흡·가동성 중심의 정확한 기본기 확립",
      "홈 맞춤 루틴 설계로 꾸준함을 이어가게",
    ],
    pastel: {
      priceText: "text-emerald-600",
      dot: "bg-emerald-500/70",
      buttonBg: "bg-emerald-100 hover:bg-emerald-200",
      buttonText: "text-emerald-900",
      ring: "ring-emerald-200",
    },
  },
  {
    key: "special",
    name: "스페셜",
    countLabel: "8회",
    price: "₩540,000",
    tagline: "루틴은 유지하고, 완성도는 높인다",
    desc: "운동습관을 잡고 꾸준히 운동하고 싶은 사람",
    tags: ["#운동습관", "#지속성", "#꾸준한관리"],
    bullets: [
      "체형교정 + 근력운동 중심의 중간 단계 관리",
      "정기 수업·피드백 루프로 운동 습관 유지",
      "일상 속 지속성을 높이는 효율적 세션 구성",
    ],
    pastel: {
      priceText: "text-amber-600",
      dot: "bg-amber-500/70",
      buttonBg: "bg-amber-100 hover:bg-amber-200",
      buttonText: "text-amber-950",
      ring: "ring-amber-200",
    },
  },
  {
    key: "premium",
    name: "프리미엄",
    countLabel: "12회",
    price: "₩780,000",
    tagline: "목표는 선명하게, 결과는 확실하게",
    desc: "목표달성을 위해 집중 관리를 원하는 사람",
    tags: ["#목표달성중심", "#변화추적", "#완성도극대화"],
    bullets: [
      "기간별 목표 로드맵으로 단계별 진행",
      "체성분·신체움직임의 변화로 눈에 보이는 변화",
      "완성도 극대화를 위한 장기 목표 기반 프로그램",
    ],
    pastel: {
      priceText: "text-rose-600",
      dot: "bg-rose-500/70",
      buttonBg: "bg-rose-100 hover:bg-rose-200",
      buttonText: "text-rose-950",
      ring: "ring-rose-200",
    },
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });

  const selectedPlan = PLANS[selectedIndex];

  const openChatbot = useCallback(() => {
    // ChatbotModal이 듣고 있는 이벤트
    window.dispatchEvent(new Event("open-chatbot"));
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const canScrollPrev = useMemo(() => (emblaApi ? emblaApi.canScrollPrev() : false), [emblaApi, selectedIndex]);
  const canScrollNext = useMemo(() => (emblaApi ? emblaApi.canScrollNext() : false), [emblaApi, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleTabClick = (idx: number) => {
    setSelectedIndex(idx);
    scrollTo(idx);
  };

  const Card = ({ plan, active }: { plan: Plan; active: boolean }) => {
    return (
      <article
        className={cn(
          "h-full rounded-3xl border bg-white p-7 shadow-[0_14px_30px_rgba(20,20,20,0.06)] transition",
          "border-[#E7DCCB]",
          active && `ring-2 ${plan.pastel.ring}`,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[#1F2937]">{plan.name}</h3>
            <p className="mt-1 text-sm text-[#6B7280]">{plan.tagline}</p>
          </div>
          <span className="rounded-full border border-[#E7DCCB] bg-[#FBF6ED] px-3 py-1 text-xs font-medium text-[#7A6A55]">
            {plan.countLabel}
          </span>
        </div>

        <p className="mt-3 text-sm text-[#6B7280]">{plan.desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {plan.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#EFE3D2] bg-[#FFF9F0] px-3 py-1 text-xs text-[#7A6A55]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-end gap-2">
          <div className={cn("text-3xl font-semibold leading-none", plan.pastel.priceText)}>{plan.price}</div>
          <div className="pb-[2px] text-sm text-[#6B7280]">/ 월</div>
        </div>
        <p className="mt-2 text-xs text-[#9CA3AF]">VAT 포함 · 1:1 방문 PT 기준, 개인별 상담 후 조정 가능합니다.</p>

        <ul className="mt-5 space-y-3 text-sm text-[#374151]">
          {plan.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className={cn("mt-[7px] h-2 w-2 flex-shrink-0 rounded-full", plan.pastel.dot)} />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <button
            type="button"
            onClick={openChatbot}
            className={cn(
              "w-full rounded-full px-5 py-3 text-sm font-semibold transition",
              plan.pastel.buttonBg,
              plan.pastel.buttonText,
            )}
          >
            체험 수업 신청하기
          </button>
          <p className="mt-3 text-center text-xs text-[#9CA3AF]">
            버튼을 누르시면 바로 체험 수업 상담 챗봇이 실행됩니다.
          </p>
        </div>
      </article>
    );
  };

  return (
    <section id="pricing" className="bg-[#FBF3E7] py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#C6A97A]">PRICE PLAN</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#111827] sm:text-4xl">
            라이프스타일에 맞게 맞춤형 방문 PT를 선택하세요
          </h2>
          <p className="mt-4 text-sm text-[#6B7280] sm:text-base">
            코칭의 본질은 그대로, 나의 일정과 생활에 맞춰 유연하게. 원하는 페이스로 지속 가능한 변화를 만들어갑니다.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-2">
          {PLANS.map((p, idx) => {
            const active = idx === selectedIndex;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => handleTabClick(idx)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm transition",
                  active
                    ? "border border-[#E7DCCB] bg-white text-[#111827] shadow-sm"
                    : "border border-[#EFE3D2] bg-[#FFF9F0] text-[#6B7280] hover:bg-white/70",
                )}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Desktop: grid (no clipping) */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {PLANS.map((p, idx) => (
            <Card key={p.key} plan={p} active={idx === selectedIndex} />
          ))}
        </div>

        {/* Mobile/Tablet: carousel */}
        <div className="relative mt-10 lg:hidden">
          {/* arrows */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="이전 요금제"
            className={cn(
              "absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white/90 px-3 py-2 shadow-sm transition",
              "border-[#E7DCCB] hover:bg-white",
              !canScrollPrev && "opacity-40",
            )}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="다음 요금제"
            className={cn(
              "absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white/90 px-3 py-2 shadow-sm transition",
              "border-[#E7DCCB] hover:bg-white",
              !canScrollNext && "opacity-40",
            )}
          >
            ›
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {PLANS.map((p, idx) => (
                <div key={p.key} className="flex-[0_0_92%] px-2 sm:flex-[0_0_70%]">
                  <Card plan={p} active={idx === selectedIndex} />
                </div>
              ))}
            </div>
          </div>

          {/* dots */}
          <div className="mt-6 flex justify-center gap-2">
            {PLANS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleTabClick(i)}
                className={cn(
                  "h-2 w-2 rounded-full transition",
                  i === selectedIndex ? "bg-[#C6A97A]" : "bg-[#E7DCCB]",
                )}
                aria-label={`요금제 ${i + 1}로 이동`}
              />
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-[#6B7280]">
          전원 한국체육대학교 출신 · 국가공인 자격 코치가 직접 방문하여 관리합니다.
        </p>
      </div>
    </section>
  );
}
