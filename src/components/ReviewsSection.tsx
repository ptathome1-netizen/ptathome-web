"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { REVIEWS, Review } from "@/data/reviews";
import { Quote, CheckCircle } from "lucide-react";

/* =========================
   COPY
========================= */
const COPY = {
  label: "고객후기",
  title: { line1: "편안하게 시작하고,", line2: "믿고 맡길 수 있는 홈트레이닝" },
  description: { line1: "집에서 받는 1:1 방문 PT,", line2: "실제 고객들의 변화를 직접 확인해 보세요." },
  badges: { verified: "예약 고객 후기" },
  aria: { verifiedIcon: "예약 고객 후기 아이콘" },
  titleDerive: { maxLen: 28 },
};

/* =========================
   SCROLL SETTINGS
========================= */
const SCROLL = {
  // ✅ 섹션 진입 후 정지 (0.8초)
  enterDelayMs: 800,

  // ✅ 시작 가속(이징 느낌) 구간 (2초)
  easePhaseMs: 2000,

  desktop: {
    col1: 52,
    col2: 60,
    col3: 56,
    heightPx: 620,
  },
  mobile: {
    col1: 72,
    heightPx: 560,
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * “2초 동안 느리게 출발 → 이후 정상 속도” 느낌을
 * CSS keyframes 2단계로 구현.
 *
 * - 전체 이동은 0% -> -50%
 * - easeStopPct 시점에는 linear보다 더 적게 이동(느리게)
 */
function buildEasedKeyframes(name: string, durationSec: number, easePhaseMs: number) {
  const totalMs = durationSec * 1000;
  const stopPct = clamp((easePhaseMs / totalMs) * 100, 0.1, 30); // 너무 크면 부자연스러워서 상한
  const t = stopPct / 100;

  // linear라면 yLinear = -50 * t
  // 더 느리게 출발하도록 y = -50 * t^2 (초반 훨씬 느림, 이후 가속)
  const yPct = -50 * (t * t);

  const stopPctStr = stopPct.toFixed(4);
  const yPctStr = yPct.toFixed(4);

  return `
@keyframes ${name} {
  0%   { transform: translateY(0); }
  ${stopPctStr}% { transform: translateY(${yPctStr}%); }
  100% { transform: translateY(-50%); }
}`;
}

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [canAnimate, setCanAnimate] = useState(false);

  // ✅ 뷰포트 진입 감지
  // - 들어오면: 0.8초 정지 후 시작
  // - 완전히 나가면: 리셋 → 다시 들어오면 또 0.8초 정지
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let enterTimer: number | null = null;

    const clearTimer = () => {
      if (enterTimer) {
        window.clearTimeout(enterTimer);
        enterTimer = null;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        // 완전히 나감(0%) → 리셋
        if (!entry.isIntersecting && entry.intersectionRatio === 0) {
          clearTimer();
          setCanAnimate(false);
          return;
        }

        // 25% 이상 진입 → 0.8초 정지 후 시작
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          if (enterTimer || canAnimate) return;

          enterTimer = window.setTimeout(() => {
            setCanAnimate(true);
            enterTimer = null;
          }, SCROLL.enterDelayMs);
        }
      },
      { threshold: [0, 0.25] }
    );

    io.observe(el);
    return () => {
      clearTimer();
      io.disconnect();
    };
  }, [canAnimate]);

  // ✅ 데스크탑 3열 분배(REVIEWS 순서 유지)
  const { col1, col2, col3 } = useMemo(() => {
    const c1: Review[] = [];
    const c2: Review[] = [];
    const c3: Review[] = [];

    REVIEWS.forEach((r, i) => {
      if (i % 3 === 0) c1.push(r);
      else if (i % 3 === 1) c2.push(r);
      else c3.push(r);
    });

    return { col1: c1, col2: c2, col3: c3 };
  }, []);

  // ✅ 각 컬럼별 “이징 시작” keyframes 생성
  const kfDesktop1 = useMemo(
    () => buildEasedKeyframes("pta-vscroll-d1", SCROLL.desktop.col1, SCROLL.easePhaseMs),
    []
  );
  const kfDesktop2 = useMemo(
    () => buildEasedKeyframes("pta-vscroll-d2", SCROLL.desktop.col2, SCROLL.easePhaseMs),
    []
  );
  const kfDesktop3 = useMemo(
    () => buildEasedKeyframes("pta-vscroll-d3", SCROLL.desktop.col3, SCROLL.easePhaseMs),
    []
  );
  const kfMobile1 = useMemo(
    () => buildEasedKeyframes("pta-vscroll-m1", SCROLL.mobile.col1, SCROLL.easePhaseMs),
    []
  );

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
      }}
      className="relative isolate bg-[linear-gradient(180deg,#FFFDF8_0%,#FAF5EC_100%)] py-14 sm:py-18"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* 라벨 */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#E6D8CB] bg-white px-3 py-1 text-xs font-medium text-[#C69C72]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C69C72]" />
            {COPY.label}
          </div>

          {/* 타이틀 */}
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-[#3B2F2F] sm:text-3xl md:text-[2.1rem]">
              <span className="block">{COPY.title.line1}</span>
              <span className="block">{COPY.title.line2}</span>
            </h2>

            <p className="text-sm leading-relaxed text-[#5E5147] sm:text-[0.95rem]">
              <span className="block">{COPY.description.line1}</span>
              <span className="block">{COPY.description.line2}</span>
            </p>
          </div>

          {/* ✅ 자동 스크롤 영역 */}
          <div className="relative mt-2">
            {/* MOBILE: 1열 */}
            <div className="md:hidden">
              <VerticalMarqueeColumn
                items={REVIEWS}
                heightPx={SCROLL.mobile.heightPx}
                durationSec={SCROLL.mobile.col1}
                canAnimate={canAnimate}
                animationName="pta-vscroll-m1"
              />
            </div>

            {/* DESKTOP: 3열 */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-6">
              <VerticalMarqueeColumn
                items={col1}
                heightPx={SCROLL.desktop.heightPx}
                durationSec={SCROLL.desktop.col1}
                canAnimate={canAnimate}
                animationName="pta-vscroll-d1"
              />
              <VerticalMarqueeColumn
                items={col2}
                heightPx={SCROLL.desktop.heightPx}
                durationSec={SCROLL.desktop.col2}
                canAnimate={canAnimate}
                animationName="pta-vscroll-d2"
              />
              <VerticalMarqueeColumn
                items={col3}
                heightPx={SCROLL.desktop.heightPx}
                durationSec={SCROLL.desktop.col3}
                canAnimate={canAnimate}
                animationName="pta-vscroll-d3"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        ${kfDesktop1}
        ${kfDesktop2}
        ${kfDesktop3}
        ${kfMobile1}

        .pta-vmask {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .pta-vtrack { animation: none !important; transform: translateY(0) !important; }
        }
      `}</style>
    </section>
  );
}

/* =========================
   Column: CSS 무한 세로 스크롤
========================= */
function VerticalMarqueeColumn({
  items,
  heightPx,
  durationSec,
  canAnimate,
  animationName,
}: {
  items: Review[];
  heightPx: number;
  durationSec: number;
  canAnimate: boolean;
  animationName: string;
}) {
  if (!items || items.length === 0) return <div />;

  return (
    <div className="pta-vmask relative overflow-hidden" style={{ height: `${heightPx}px` }}>
      <div
        className="pta-vtrack flex flex-col gap-4 will-change-transform"
        style={{
          animation: canAnimate ? `${animationName} ${durationSec}s linear infinite` : "none",
        }}
      >
        {[0, 1].map((k) => (
          <div key={k} className="flex flex-col gap-4">
            {items.map((r) => (
              <ReviewCard key={`${k}-${r.id}`} data={r} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ data }: { data: Review }) {
  const title = deriveTitleFromBody(data.body, COPY.titleDerive.maxLen);
  const hasImage = Boolean(data.imageSrc);

  return (
    <article
      className="
        rounded-[26px] border border-[#EFE2D2] bg-[#FFFBF5]
        px-4 py-4 md:px-5 md:py-5
        shadow-[0_10px_26px_rgba(0,0,0,0.06)]
        backdrop-blur-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.09)]
      "
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4E7D7] text-[#C08A4D]">
            <Quote className="h-4 w-4" />
          </div>

          <div className="flex flex-col">
            <p className="text-[12px] font-medium text-[#7A6B59]">{data.name}</p>
            {data.date && <p className="mt-0.5 text-[11px] text-[#A69480]">{data.date}</p>}
          </div>
        </div>
      </header>

      {hasImage && (
        <div className="relative mt-3 overflow-hidden rounded-2xl border border-[#EFE2D2] bg-white">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={data.imageSrc!}
              alt={data.imageAlt || `${data.name} 수업 이미지`}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <h3 className="mt-3 text-[14px] font-semibold leading-6 text-[#111827]">{title}</h3>
      <p className="mt-3 whitespace-pre-line text-[13px] leading-7 text-[#4B5563]">{data.body}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {data.tags?.map((t) => (
          <span key={t} className="rounded-full bg-[#F8EFE4] px-3 py-1 text-[11px] font-medium text-[#7A6B59]">
            {t}
          </span>
        ))}

        {data.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-3 py-1 text-[11px] font-medium text-[#166534]">
            <CheckCircle className="h-[14px] w-[14px]" aria-label={COPY.aria.verifiedIcon} />
            {COPY.badges.verified}
          </span>
        )}
      </div>
    </article>
  );
}

function deriveTitleFromBody(body: string, maxLen = 28) {
  const first = (body.split(/\n|\. |\! |\? |요\./)[0] || body).trim();
  return first.length <= maxLen ? first : first.slice(0, maxLen).trim() + "…";
}
