"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PlanKey = "basic" | "special" | "premium";

type Plan = {
  key: PlanKey;
  label: string;
  title: string;
  countBadge: string;
  lead: string;
  desc: string;
  hashtags: string[];
  price: string;
  bullets: string[];
  accent: {
    price: string;
    dot: string;
    ctaBg: string;
    ctaText: string;
    ring: string;
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
  window.dispatchEvent(new Event("open-chatbot"));
}

export default function PricingSection() {
  const [activeKey, setActiveKey] = useState<PlanKey>("special");

  return (
    <section className="bg-[#FBF4E8] py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-6 lg:px-8">
        
        {/* 라벨 */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#E6D8CB] bg-white px-3 py-1 text-xs font-medium text-[#C69C72]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C69C72]" />
          가격 안내
        </div>

        {/* 제목 */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-[#3B2F2F] sm:text-3xl md:text-[2.1rem]">
            라이프스타일에 맞게
            <br />
            맞춤형 방문 PT를 선택하세요
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-[#5E5147]">
            코칭의 본질은 그대로, 나의 일정과 생활에 맞춰 유연하게.
            원하는 페이스로 지속 가능한 변화를 만들어갑니다.
          </p>
        </div>

        {/* ✅ 탭 (중앙 정렬 적용) */}
        <div className="pt-2">
          <div className="flex items-center justify-center gap-2">
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

        {/* 카드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((p) => {
            const selected = p.key === activeKey;
            return (
              <div
                key={p.key}
                onClick={() => setActiveKey(p.key)}
                className={[
                  "cursor-pointer rounded-3xl border bg-white px-7 pb-7 pt-6 transition shadow-sm",
                  selected
                    ? `${p.accent.ring}`
                    : "border-[#E7DCCB] hover:border-[#D7C5A8]",
                ].join(" ")}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-[#0F172A]">{p.title}</h3>
                  <span className="rounded-full bg-[#FBF4E8] px-3 py-1 text-xs font-semibold text-[#6B7280]">
                    {p.countBadge}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#6B7280]">{p.lead}</p>

                <div className="mt-4 text-3xl font-extrabold tracking-tight">
                  <span className={p.accent.price}>{p.price}</span>
                  <span className="ml-1 text-sm text-[#6B7280]">/ 월</span>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-[#334155]">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className={`mt-2 h-2 w-2 rounded-full ${p.accent.dot}`} />
                      {b}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openChatbot();
                  }}
                  className={[
                    "mt-6 w-full rounded-full px-5 py-3 text-sm font-bold transition",
                    p.accent.ctaBg,
                    p.accent.ctaText,
                  ].join(" ")}
                >
                  체험 수업 신청하기
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-[#6B7280]">
          전원 한국체육대학교 출신 · 국가공인 자격 코치가 직접 방문합니다.
        </p>
      </div>
    </section>
  );
}
