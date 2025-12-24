"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PlanKey = "basic" | "special" | "premium";

type Plan = {
  key: PlanKey;
  label: string; // 탭 라벨
  title: string; // 카드 타이틀
  countBadge: string; // 4회/8회/12회
  lead: string; // 한 줄 카피
  desc: string; // 설명
  hashtags: string[];
  price: string;
  bullets: string[];
  accent: {
    price: string; // 가격 텍스트
    dot: string; // 불릿 도트
    ctaBg: string; // 버튼 배경
    ctaText: string; // 버튼 텍스트
    ring: string; // 선택 카드 테두리(링)
  };
};

const PLANS: Plan[] = [
  {
    key: "basic",
    label: "베이직",
    title: "베이직",
    countBadge: "4회",
    lead: "부담 없이 시작하고, 기본은 정확하게",
    desc: "방문 PT를 처음 시작하는 분",
    hashtags: ["#부담없이", "#기본기확립", "#루틴설계"],
    price: "₩280,000",
    bullets: [
      "방문 PT를 부담 없이 시작",
      "자세·호흡·가동성 중심의 정확한 기본기 확립",
      "홈 맞춤 루틴 설계로 꾸준함을 이어가게",
    ],
    accent: {
      price: "text-emerald-600",
      dot: "bg-emerald-500",
      ctaBg: "bg-emerald-100 hover:bg-emerald-200",
      ctaText: "text-[#1F2937]",
      ring: "ring-2 ring-emerald-200 border-emerald-200",
    },
  },
  {
    key: "special",
    label: "스페셜",
    title: "스페셜",
    countBadge: "8회",
    lead: "루틴은 유지하고, 완성도는 높인다",
    desc: "운동 습관을 잡고 꾸준히 운동하고 싶은 분",
    hashtags: ["#운동습관", "#지속성", "#꾸준한관리"],
    price: "₩540,000",
    bullets: [
      "체형교정 + 근력운동 중심의 중간 단계 관리",
      "정기 수업·피드백 루프로 운동 습관 유지",
      "일상 속 지속성을 높이는 효율적 세션 구성",
    ],
    accent: {
      price: "text-amber-600",
      dot: "bg-amber-500",
      ctaBg: "bg-amber-100 hover:bg-amber-200",
      ctaText: "text-[#1F2937]",
      ring: "ring-2 ring-amber-200 border-amber-200",
    },
  },
  {
    key: "premium",
    label: "프리미엄",
    title: "프리미엄",
    countBadge: "12회",
    lead: "목표는 선명하게, 결과는 확실하게",
    desc: "운동을 ‘관리’받고 결과로 증명하고 싶은 분",
    hashtags: ["#목표달성중심", "#완성도극대화"],
    price: "₩780,000",
    bullets: [
      "기간별 목표 로드맵으로 단계별 진행",
      "체성분·신체움직임의 변화로 눈에 보이는 변화",
      "완성도 극대화를 위한 장기 목표 기반 프로그램",
    ],
    accent: {
      price: "text-rose-600",
      dot: "bg-rose-500",
      ctaBg: "bg-rose-100 hover:bg-rose-200",
      ctaText: "text-[#1F2937]",
      ring: "ring-2 ring-rose-200 border-rose-200",
    },
  },
];

function openChatbot() {
  const kakaoBtn = document.getElementById("kakao-chat-button");
  if (kakaoBtn instanceof HTMLElement) {
    kakaoBtn.click();
    return;
  }

  const anyWindow = window as any;
  if (typeof anyWindow.PT_OPEN_CHATBOT === "function") {
    anyWindow.PT_OPEN_CHATBOT();
    return;
  }

  window.dispatchEvent(new Event("open-chatbot"));
}

export default function PricingSection() {
  // 기본 선택: special
  const [activeKey, setActiveKey] = useState<PlanKey>("special");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // 프로그램 스크롤 중 onScroll 동기화 방지
  const isProgrammaticScrollRef = useRef(false);
  // 최초 1회 "스페셜 중앙 정렬"을 강제 적용(모바일에서 기본값이 scroll 이벤트로 덮이는 문제 방지)
  const didInitialSnapRef = useRef(false);

  const activeIndex = useMemo(
    () => Math.max(0, PLANS.findIndex((p) => p.key === activeKey)),
    [activeKey]
  );

  const scrollToIndex = useCallback(
    (idx: number, behavior: ScrollBehavior = "smooth") => {
      const el = scrollerRef.current;
      if (!el) return;
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-plan-card]"));
      const target = cards[idx];
      if (!target) return;

      const left = target.offsetLeft - (el.clientWidth - target.clientWidth) / 2;

      isProgrammaticScrollRef.current = true;
      el.scrollTo({ left: Math.max(0, left), behavior });

      // 스크롤 이벤트가 연속으로 발생하므로 잠시 후 해제
      window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, behavior === "smooth" ? 450 : 80);
    },
    []
  );

  // 탭/activeKey 변경 시 스크롤 동기화
  useEffect(() => {
    // 최초 마운트 시에는 "즉시(auto)"로 스페셜을 중앙 정렬해,
    // 초기 scroll 이벤트가 basic으로 되돌리는 현상을 차단
    if (!didInitialSnapRef.current) {
      didInitialSnapRef.current = true;
      // 레이아웃 안정화 후 위치 잡기
      requestAnimationFrame(() => scrollToIndex(activeIndex, "auto"));
      return;
    }
    scrollToIndex(activeIndex, "smooth");
  }, [activeIndex, scrollToIndex]);

  const prev = useCallback(() => {
    const nextIdx = Math.max(0, activeIndex - 1);
    setActiveKey(PLANS[nextIdx].key);
  }, [activeIndex]);

  const next = useCallback(() => {
    const nextIdx = Math.min(PLANS.length - 1, activeIndex + 1);
    setActiveKey(PLANS[nextIdx].key);
  }, [activeIndex]);

  // 모바일에서 드래그 스크롤로 바뀐 경우 activeKey 동기화
  const onScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;

    const el = scrollerRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-plan-card]"));
    if (!cards.length) return;

    const center = el.scrollLeft + el.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    cards.forEach((c, idx) => {
      const cCenter = c.offsetLeft + c.clientWidth / 2;
      const dist = Math.abs(cCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });

    const key = PLANS[bestIdx]?.key;
    if (key && key !== activeKey) setActiveKey(key);
  }, [activeKey]);

  return (
    <section className="bg-[#FBF4E8] py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-6 lg:px-8">
        {/* 라벨 */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#E6D8CB] bg-white px-3 py-1 text-xs font-medium text-[#C69C72]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C69C72]" />
          가격 안내
        </div>

        {/* 제목 및 설명 */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-[#3B2F2F] sm:text-3xl md:text-[2.1rem]">
            라이프스타일에 맞게
            <br />
            맞춤형 방문 PT를 선택하세요
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-[#5E5147] sm:text-[0.95rem]">
            코칭의 본질은 그대로, 나의 일정과 생활에 맞춰 유연하게. 원하는 페이스로 지속 가능한 변화를 만들어갑니다.
          </p>

          {/* 탭 */}
          <div className="pt-4">
            <div className="flex items-center gap-2">
              {PLANS.map((p) => {
                const active = p.key === activeKey;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setActiveKey(p.key)}
                    className={[
                      "rounded-full border px-5 py-2 text-sm transition",
                      active
                        ? "border-[#D7C5A8] bg-white text-[#0F172A] shadow-sm"
                        : "border-[#E7DCCB] bg-white/40 text-[#6B7280] hover:bg-white/60",
                    ].join(" ")}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== 데스크탑: 그리드 ===== */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-6">
            {PLANS.map((p) => {
              const selected = p.key === activeKey;
              return (
                <PlanCard
                  key={p.key}
                  plan={p}
                  selected={selected}
                  onSelect={() => setActiveKey(p.key)}
                />
              );
            })}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {PLANS.map((p) => (
              <span
                key={p.key}
                className={[
                  "h-2 w-2 rounded-full transition",
                  p.key === activeKey ? "bg-[#C9B08A]" : "bg-[#E5D8C6]",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* ===== 모바일/태블릿: 캐러셀 ===== */}
        <div className="relative lg:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label="이전"
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[#E7DCCB] bg-white/90 px-3 py-3 shadow-sm backdrop-blur hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="다음"
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[#E7DCCB] bg-white/90 px-3 py-3 shadow-sm backdrop-blur hover:bg-white"
          >
            ›
          </button>

          <div
            ref={scrollerRef}
            onScroll={onScroll}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-10 pb-2 pt-2"
          >
            {PLANS.map((p) => {
              const selected = p.key === activeKey;
              return (
                <div
                  key={p.key}
                  data-plan-card
                  className="snap-center"
                  style={{ width: "min(86vw, 420px)" }}
                >
                  <PlanCard plan={p} selected={selected} onSelect={() => setActiveKey(p.key)} />
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {PLANS.map((p) => (
              <span
                key={p.key}
                className={[
                  "h-2 w-2 rounded-full transition",
                  p.key === activeKey ? "bg-[#C9B08A]" : "bg-[#E5D8C6]",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-[#6B7280]">
          전원 한국체육대학교 출신 · 국가공인 자격 코치가 직접 방문하여 관리합니다.
        </p>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={[
        "group h-full rounded-3xl border bg-white px-7 pb-7 pt-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition",
        selected ? `${plan.accent.ring} border` : "border-[#E7DCCB] hover:border-[#D7C5A8]",
      ].join(" ")}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xl font-extrabold tracking-[-0.01em] text-[#0F172A]">
              {plan.title}
            </div>
            <div className="mt-1 text-sm text-[#6B7280]">{plan.lead}</div>
          </div>
          <div className="shrink-0 rounded-full border border-[#E7DCCB] bg-[#FBF4E8] px-3 py-1 text-xs font-semibold text-[#6B7280]">
            {plan.countBadge}
          </div>
        </div>

        <div className="mt-4 text-sm text-[#6B7280]">{plan.desc}</div>

        <div className="no-scrollbar mt-4 flex flex-nowrap gap-2 overflow-x-auto">
          {plan.hashtags.map((h) => (
            <span
              key={h}
              className="whitespace-nowrap rounded-full border border-[#EFE3D2] bg-white px-3 py-1 text-xs text-[#6B7280]"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <div className="flex items-end gap-2">
            <div
              className={["text-3xl font-extrabold tracking-[-0.02em]", plan.accent.price].join(" ")}
            >
              {plan.price}
            </div>
            <div className="pb-1 text-sm text-[#6B7280]">/ 월</div>
          </div>
          <div className="mt-1 text-xs leading-5 text-[#94A3B8]">
            VAT 포함 · 1:1 방문 PT 기준, 개인별 상담 후 조정 가능합니다.
          </div>
        </div>

        <div className="mt-5 flex-1">
          <ul className="space-y-2 text-sm text-[#334155]">
            {plan.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span
                  className={["mt-2 h-2 w-2 shrink-0 rounded-full", plan.accent.dot].join(" ")}
                />
                <span className="leading-6">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openChatbot();
          }}
          className={[
            "mt-6 w-full rounded-full px-5 py-4 text-sm font-extrabold tracking-[-0.01em] transition",
            plan.accent.ctaBg,
            plan.accent.ctaText,
          ].join(" ")}
        >
          체험 수업 신청하기
        </button>

        <div className="mt-3 text-center text-xs text-[#94A3B8]">
          버튼을 누르시면 바로 체험 수업 상담 챗봇이 실행됩니다.
        </div>
      </div>
    </div>
  );
}
