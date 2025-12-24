// src/components/sections/AboutSection.tsx
"use client";

import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

const FEATURES = [
  {
    icon: "/about/icons/feature-science.png",
    label: "운동과학 기반 · 1:1 설계",
  },
  {
    icon: "/about/icons/feature-coach.png",
    label: "검증된 코치 방문",
  },
  {
    icon: "/about/icons/feature-car.png",
    label: "이동 스트레스 ↓",
  },
  {
    icon: "/about/icons/feature-private.png",
    label: "프라이빗한 환경 유지",
  },
];

export default function AboutSection() {
  return (
    <section className="bg-[#F7F2E8]">
      <div className="mx-auto max-w-[1120px] px-6 py-16 lg:py-24">
        {/* 전체 카드 */}
        <Card className="rounded-[32px] bg-[#EBDDCE] px-5 pb-9 pt-8 shadow-[0_18px_60px_rgba(0,0,0,.08)] sm:px-7 sm:pt-9 sm:pb-10 border-0">
          {/* 헤더(텍스트 시스템화) */}
          <SectionHeader
            align="left"
            label="ABOUT 피티앳홈"
            title={
              <>
                <span className="block">나의 공간이 가장 완벽한</span>
                <span className="block">트레이닝 공간이 됩니다.</span>
              </>
            }
            description={undefined}
            className="max-w-none"
          />

          {/* 이미지 */}
          <div className="mt-6 rounded-[28px] bg-[#F4E7D8] p-1.5 sm:mt-7 sm:p-2">
            <div className="relative overflow-hidden rounded-[24px]">
              <Image
                src="/about/about-coaching.jpg"
                alt="전문 코치가 집에서 자세를 교정하는 방문 PT 수업 장면"
                width={960}
                height={720}
                className="h-full w-full object-cover object-center"
                priority
              />
              {/* 아래쪽 부드러운 페이드 아웃 */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#EBDDCE] via-transparent" />
            </div>
          </div>

          {/* 특징 배너들 */}
          <div className="mt-6 space-y-3 sm:mt-7">
            {FEATURES.map((feature) => (
              <FeatureBadge
                key={feature.label}
                icon={feature.icon}
                label={feature.label}
              />
            ))}
          </div>

          {/* 본문 텍스트 */}
          <div className="mt-8 space-y-3">
            <Text
              variant="bodySm"
              tone="base"
              className="text-[#4F4337] text-[14px] sm:text-[15px] leading-[1.9]"
            >
              피티앳홈은 운동을 <strong>‘일상의 자연스러운 흐름’</strong>으로
              바꿉니다. 가장 편안한 나만의 공간에서, 언제든 진행할 수 있는
              루틴을 설계합니다.
            </Text>

            <Text
              variant="bodySm"
              tone="base"
              className="text-[#4F4337] text-[14px] sm:text-[15px] leading-[1.9]"
            >
              전문 코치가 <strong>직접 방문</strong>하여 체형·목표를 진단하고,
              생활 리듬에 맞춘 <strong>1:1 프로그램</strong>으로 꾸준함을
              만들어 드립니다.
            </Text>

            <Text
              variant="bodySm"
              tone="strong"
              className="font-semibold text-[#2B241C] text-[14px] sm:text-[15px] leading-[1.9]"
            >
              꾸준함은 환경에서 결정됩니다. 익숙한 나의 공간에서 시작된 작은
              루틴이, 결국 큰 변화를 만듭니다.
            </Text>
          </div>
        </Card>
      </div>
    </section>
  );
}

/* -----------------------
   Feature Badge 컴포넌트
------------------------ */
function FeatureBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,.08)]">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FFF5E5]">
        <Image
          src={icon}
          alt={label}
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
      </div>

      <Text as="span" variant="bodySm" tone="strong" className="text-[#3B3026] text-[14px] font-medium">
        {label}
      </Text>
    </div>
  );
}
