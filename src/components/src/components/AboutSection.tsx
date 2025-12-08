// src/components/AboutSection.tsx
import Image from "next/image";
import { IconPro, IconEase, IconTrust } from "@/components/icons/PTIcons";

export default function AboutSection() {
  return (
    <section className="relative bg-[#F8F4EC]">
      <div className="container mx-auto max-w-[1100px] px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* 2열 레이아웃: 좌측 이미지, 우측 텍스트 카드 */}
        <div className="grid items-stretch gap-8 sm:gap-10 lg:grid-cols-2">
          {/* 이미지 카드 */}
          <div className="relative rounded-3xl bg-white/60 shadow-[0_12px_28px_rgba(0,0,0,.08)] ring-1 ring-[#E7DFD2] overflow-hidden">
            <div className="aspect-[4/3] sm:aspect-[16/11] lg:h-full">
              <Image
                src="/hero/hero-1.jpg" // 아래 이미지 사용
                alt="방문 PT 트레이닝"
                fill
                sizes="(min-width:1024px) 520px, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          {/* 텍스트 카드 (이미지와 높이 통일감을 위해 같은 외곽 스타일) */}
          <article className="relative rounded-3xl bg-[#F1EADF] shadow-[0_12px_28px_rgba(0,0,0,.08)] ring-1 ring-[#E4DACB] px-6 sm:px-8 py-7 sm:py-9">
            <p className="mb-2 text-[12px] tracking-[0.16em] text-[#8B7A66]">
              ABOUT 피티앳홈
            </p>

            <h2 className="text-[28px] sm:text-[34px] leading-tight font-extrabold text-[#2B241C] tracking-[-0.01em]">
              당신의 공간이,<br className="sm:hidden" />
              가장 완벽한 트레이닝<br className="sm:hidden" />
              공간이 됩니다.
            </h2>

            {/* 키포인트 배지 - SVG 아이콘 적용 */}
            <div className="mt-4 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D7CCBA] bg-white/90 px-3 py-1.5 text-[13px] text-[#4F4438]">
                <IconPro /> 운동과학 기반 1:1 설계
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D7CCBA] bg-white/90 px-3 py-1.5 text-[13px] text-[#4F4438]">
                <IconEase /> 이동 스트레스 ↓ · 시선 부담 ↓
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D7CCBA] bg-white/90 px-3 py-1.5 text-[13px] text-[#4F4438]">
                <IconTrust /> 검증된 코치 방문
              </span>
            </div>

            {/* 본문 */}
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#5E5245]">
              <p>
                피티앳홈은 운동을 <b>‘일상의 자연스러운 흐름’</b>으로
                바꿉니다. 가장 편안한 당신의 공간에서, 우리 없이 이어지는
                루틴을 설계합니다.
              </p>
              <p>
                <b>전문 코치가 직접 방문</b>해 체형·목표를 진단하고, 생활
                리듬에 맞춘 1:1 프로그램으로 꾸준함을 만들어 드립니다.
              </p>
              <p className="text-[#7A6B59]">
                꾸준함은 환경에서 시작됩니다. 익숙한 나의 공간에서, 작은
                루틴이 큰 변화를 만듭니다.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
