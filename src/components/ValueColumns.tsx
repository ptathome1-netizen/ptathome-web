"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type ValueCard = {
  id: number;
  image: string;
  tag: string;
  title: string;
  description: string;
};

/* =========================
   COPY (텍스트 시스템화)
========================= */
const COPY = {
  sectionLabel: "피티앳홈 가치",
  heading: {
    line1: "피티앳홈이 만들어가는",
    line2: "새로운 트레이닝 기준",
  },
  description: "전문 코치와 함께 익숙한 공간에서 꾸준히 이어지는 1:1 홈트레이닝.",
  aria: {
    prev: "이전 카드",
    next: "다음 카드",
    indicator: (n: number) => `${n}번 카드로 이동`,
  },
  cards: [
    {
      id: 0,
      image: "/values/v1.jpg",
      tag: "전문성",
      title: "피티앳홈 코치는 모두\n체육전공자 출신입니다.",
      description:
        "단순한 운동 지도에서 벗어나, 과학적 분석과 전문 지식을 기반으로 당신의 몸과 생활 패턴에 꼭 맞는 1:1 루틴을 설계합니다.",
    },
    {
      id: 1,
      image: "/values/v2.jpg",
      tag: "준비물",
      title: "운동 준비물은 모두\n코치가 대신 챙겨갑니다.",
      description:
        "요가매트, 덤벨, 밴드 없어도 괜찮아요. 코치가 필요한 도구를 직접 준비해 방문하며, 공간만 있으면 바로 운동을 시작할 수 있습니다.",
    },
    {
      id: 2,
      image: "/values/v3.jpg",
      tag: "지속성",
      title: "꾸준함은 의지가 아니라\n구조의 문제입니다.",
      description:
        "억지로 버티는 운동은 오래갈 수 없습니다. 생활 리듬에 자연스럽게 녹아드는 방식으로, 무리 없이 지속 가능한 루틴을 함께 만들어갑니다.",
    },
    {
      id: 3,
      image: "/values/v4.jpg",
      tag: "홈 트레이닝",
      title: "익숙한 공간이 편안한\n트레이닝 환경이 됩니다.",
      description:
        "코치가 직접 방문하여 생활 패턴과 공간 특성에 맞춘 운동 루틴을 구성합니다. 헬스장보다 편안하게, 일상 속에서 변화가 이어집니다.",
    },
  ] as ValueCard[],
};

/* =========================
   BEHAVIOR (동작 설정)
========================= */
const SLIDER = {
  autoplayDelay: 6000,
  // Embla options
  loop: true,
  align: "center" as const,
  skipSnaps: false,
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function ValueColumns() {
  const autoplay = useRef(
    Autoplay({
      delay: SLIDER.autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: SLIDER.loop,
      align: SLIDER.align,
      skipSnaps: SLIDER.skipSnaps,
    },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    autoplay.current.stop();
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    autoplay.current.stop();
    emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      autoplay.current.stop();
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const cards = COPY.cards;
  const total = cards.length;

  return (
    <section className="bg-[#F7F0E6] py-16">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        {/* 라벨 */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#E6D8CB] bg-white px-3 py-1 text-xs font-medium text-[#C69C72]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C69C72]" />
          {COPY.sectionLabel}
        </div>

        {/* 제목 및 설명 */}
        <div className="mt-6 max-w-3xl space-y-3">
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-[#3B2F2F] sm:text-3xl md:text-[2.1rem]">
            <span className="block">{COPY.heading.line1}</span>
            <span className="block">{COPY.heading.line2}</span>
          </h2>

          <p className="text-sm leading-relaxed text-[#5E5147] sm:text-[0.95rem]">
            {COPY.description}
          </p>
        </div>

        {/* 슬라이더 영역 */}
        <div className="relative mt-8 overflow-x-hidden">
          {/* 좌/우 화살표 */}
          <button
            type="button"
            aria-label={COPY.aria.prev}
            onClick={scrollPrev}
            className="
              absolute left-[6%] top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center
              rounded-full border border-[#E4D6C4]
              bg-[#FBF6EE]/95 shadow-sm backdrop-blur-sm
              active:scale-95
              sm:left-[10%] sm:h-10 sm:w-10
            "
          >
            <span className="text-lg text-[#7A6B59] sm:text-xl">‹</span>
          </button>

          <button
            type="button"
            aria-label={COPY.aria.next}
            onClick={scrollNext}
            className="
              absolute right-[6%] top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center
              rounded-full border border-[#E4D6C4]
              bg-[#FBF6EE]/95 shadow-sm backdrop-blur-sm
              active:scale-95
              sm:right-[10%] sm:h-10 sm:w-10
            "
          >
            <span className="text-lg text-[#7A6B59] sm:text-xl">›</span>
          </button>

          {/* Embla 뷰포트 */}
          <div className="overflow-hidden px-6" ref={emblaRef}>
            <div className="-mx-3 flex">
              {cards.map((card, index) => {
                const leftIndex = mod(selectedIndex - 1, total);
                const rightIndex = mod(selectedIndex + 1, total);

                const isActive = index === selectedIndex;
                const isSide = index === leftIndex || index === rightIndex;

                const scaleClass = isActive
                  ? "scale-100"
                  : isSide
                  ? "scale-[0.94]"
                  : "scale-[0.88]";
                const opacityClass = isActive
                  ? "opacity-100"
                  : isSide
                  ? "opacity-70"
                  : "opacity-40";
                const blurClass = isActive ? "blur-0" : "blur-[1px]";

                return (
                  <div
                    key={card.id}
                    className="min-w-0 flex-[0_0_85%] px-3 sm:flex-[0_0_70%] lg:flex-[0_0_55%]"
                  >
                    <article
                      className={[
                        "flex flex-col overflow-hidden rounded-[32px] bg-[#F3E5D5] shadow-md",
                        "transition-all duration-500 ease-out",
                        "border border-[#E4D6C4]/70",
                        scaleClass,
                        opacityClass,
                        blurClass,
                      ].join(" ")}
                    >
                      {/* 이미지 */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.tag}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 90vw, 60vw"
                          priority={index === 0}
                        />
                      </div>

                      {/* 텍스트 영역 */}
                      <div className="flex min-h-[190px] flex-col px-6 pb-7 pt-4 sm:px-7 sm:pb-8 sm:pt-5">
                        <div className="inline-flex rounded-full bg-[#F8EFE4] px-3 py-1 text-[11px] font-medium text-[#8B7B68]">
                          {card.tag}
                        </div>

                        <h3 className="mt-3 whitespace-pre-line text-[17px] font-semibold leading-snug text-[#3B3127]">
                          {card.title}
                        </h3>

                        <p className="mt-3 text-[13px] leading-relaxed text-[#7A6B59]">
                          {card.description}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 인디케이터 점 */}
          <div className="mt-6 flex justify-center gap-2">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={COPY.aria.indicator(index + 1)}
                className={[
                  "h-1.5 rounded-full transition-all duration-300",
                  selectedIndex === index
                    ? "w-5 bg-[#D39A6A]"
                    : "w-1.5 bg-[#E4D6C4]",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
