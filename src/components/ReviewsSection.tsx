"use client";

import { useMemo } from "react";
import { REVIEWS, Review } from "@/data/reviews";
import { Quote, CheckCircle } from "lucide-react";

export default function ReviewsSection() {
  const railA = useMemo(() => REVIEWS.filter((_, i) => i % 2 === 0), []);
  const railB = useMemo(() => REVIEWS.filter((_, i) => i % 2 === 1), []);

  return (
    <section className="relative isolate bg-[linear-gradient(180deg,#FFFDF8_0%,#FAF5EC_100%)] py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-6 lg:px-8">
        {/* 라벨 */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#E6D8CB] bg-white px-3 py-1 text-xs font-medium text-[#C69C72]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C69C72]" />
          고객후기
        </div>

        {/* 제목 및 설명 */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-[#3B2F2F] sm:text-3xl md:text-[2.1rem]">
            편안하게 시작하고,
            <br />
            믿고 맡길 수 있는 홈트레이닝
          </h2>

          <p className="text-sm leading-relaxed text-[#5E5147] sm:text-[0.95rem]">
            집에서 받는 1:1 방문 PT,
            <br />
            실제 고객들의 변화를 직접 확인해 보세요.
          </p>
        </div>

        {/* 2줄 레일 */}
        <div>
          <MarqueeRail items={railA} durationSec={44} />
          <div className="h-6" />
          <MarqueeRail items={railB} durationSec={52} reverse />
        </div>
      </div>

      <style>{`
        @keyframes ptahome-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ptahome-rail-container:hover > div > div {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function MarqueeRail({
  items,
  durationSec,
  reverse = false,
}: {
  items: Review[];
  durationSec: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="ptahome-rail-container relative overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className="flex w-max gap-4 will-change-transform"
        style={{
          animation: `ptahome-marquee ${durationSec}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((n) => (
          <div key={n} className="flex w-max gap-4">
            {items.map((r) => (
              <ReviewCard key={`${n}-${r.id}`} data={r} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ data }: { data: Review }) {
  const title = deriveTitleFromBody(data.body);

  return (
    <article
      className="
        group
        min-w-[260px] max-w-[320px] sm:max-w-[340px]
        rounded-[26px] border border-[#EFE2D2] bg-[#FFFBF5]
        px-5 py-6
        shadow-[0_10px_26px_rgba(0,0,0,0.06)]
        backdrop-blur-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.09)]
      "
    >
      {/* 상단 정보 */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4E7D7] text-[#C08A4D]">
            <Quote className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <p className="text-[12px] font-medium text-[#7A6B59]">{data.name}</p>
            {data.date && (
              <p className="mt-0.5 text-[11px] text-[#A69480]">{data.date}</p>
            )}
          </div>
        </div>
      </header>

      {/* 제목 / 본문 */}
      <h3 className="mt-3 text-[14px] font-semibold leading-6 text-[#111827]">
        {title}
      </h3>
      <p className="mt-3 whitespace-pre-line text-[13px] leading-7 text-[#4B5563]">
        {data.body}
      </p>

      {/* 태그 & 뱃지 */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {data.tags?.map((t) => (
          <span
            key={t}
            className="rounded-full bg-[#F8EFE4] px-3 py-1 text-[11px] font-medium text-[#7A6B59]"
          >
            #{t}
          </span>
        ))}

        {data.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-3 py-1 text-[11px] font-medium text-[#166534]">
            <CheckCircle className="h-[14px] w-[14px]" />
            예약 고객 후기
          </span>
        )}
      </div>
    </article>
  );
}

function deriveTitleFromBody(body: string, maxLen = 26) {
  const first = (body.split(/\n|\. |\! |\? |요\./)[0] || body).trim();
  return first.length <= maxLen ? first : first.slice(0, maxLen).trim() + "…";
}
