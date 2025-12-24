"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BadgeCheck, DoorOpen, Shield } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

/**
 * 3컬럼 - 사진 상단 배치 버전
 * - 좌: 전문성 / 중: 방문 편의성 / 우: 프라이버시
 * - 이미지가 없으면 onError로 투명 처리 → UI 유지
 * - 톤: 네이비(전문성), 베이지(편의성), 웜베이지(프라이버시)
 */

export default function BrandValues() {
  return (
    <section className="relative isolate bg-[linear-gradient(180deg,#FFFFFF_0%,#FAF8F3_100%)]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
        <SectionHeader
          align="center"
          label="PT앳홈의 가치"
          title={
            <>
              <span className="block">신뢰로 시작해, 편안함을 거쳐,</span>
              <span className="block">안정으로 마무리합니다.</span>
            </>
          }
        />

        <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-3">
          {/* ① 전문성 */}
          <RevealCard>
            <Card className="group h-full overflow-hidden rounded-2xl border border-[#E6E0D6] bg-[#0F172A] text-white shadow-sm">
              <figure className="relative h-44 w-full overflow-hidden">
                <Image
                  src="/hero/hero-2.png"
                  alt=""
                  fill
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.03]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
              </figure>

              <div className="space-y-3 p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-3 py-1">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  <Text as="span" variant="micro" tone="subtle" className="text-white/90">
                    전문성
                  </Text>
                </div>

                <Heading level={3} variant="card" tone="subtle" className="text-white text-lg">
                  전문성을 갖춘 코치의 1:1 맞춤 트레이닝
                </Heading>

                <div className="space-y-2">
                  <Text variant="bodySm" tone="subtle" className="text-[#E5E7EB]">
                    단순한 운동 지도가 아니라, 움직임의 원리를 이해하는 세밀한 코칭입니다.
                  </Text>
                  <Text variant="bodySm" tone="subtle" className="text-[#E5E7EB]">
                    체계적인 교육을 거친 트레이너가, 당신의 몸을 정확히 바라보고 이끌어갑니다.
                  </Text>
                </div>
              </div>
            </Card>
          </RevealCard>

          {/* ② 방문 편의성 */}
          <RevealCard delay={0.12}>
            <Card className="group h-full overflow-hidden rounded-2xl border border-[#E6E0D6] bg-[#FFFDF8] text-[#1F2937] shadow-sm">
              <figure className="relative h-44 w-full overflow-hidden">
                <Image
                  src="/hero/hero-3.jpg"
                  alt=""
                  fill
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.03]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
              </figure>

              <div className="space-y-3 p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#CDBA97]/50 bg-white/80 px-3 py-1">
                  <DoorOpen className="h-3.5 w-3.5" />
                  <Text as="span" variant="micro" tone="slate" className="text-[#1F2937]">
                    방문 편의성
                  </Text>
                </div>

                <Heading level={3} variant="card" tone="slate" className="text-[#1F2937] text-lg">
                  내가 있는 곳이 곧, 운동의 시작입니다
                </Heading>

                <div className="space-y-2">
                  <Text variant="bodySm" tone="slateMuted" className="text-[#364152]">
                    복잡한 준비 없이, 코치가 직접 방문해 루틴을 만들어갑니다.
                  </Text>
                  <Text variant="bodySm" tone="slateMuted" className="text-[#364152]">
                    일상을 해치지 않으면서 변화를 이어가는 가장 효율적인 방법입니다.
                  </Text>
                </div>
              </div>
            </Card>
          </RevealCard>

          {/* ③ 프라이버시 */}
          <RevealCard delay={0.22}>
            <Card className="group h-full overflow-hidden rounded-2xl border border-[#E6E0D6] bg-[#F2EEE9] text-[#1F2937] shadow-sm">
              <figure className="relative h-44 w-full overflow-hidden">
                <Image
                  src="/hero/hero-1.jpg"
                  alt=""
                  fill
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.03]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
              </figure>

              <div className="space-y-3 p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D8BE91]/60 bg-white/70 px-3 py-1">
                  <Shield className="h-3.5 w-3.5" />
                  <Text as="span" variant="micro" tone="muted" className="text-[#6B5B43]">
                    프라이버시
                  </Text>
                </div>

                <Heading level={3} variant="card" tone="slate" className="text-[#1F2937] text-lg">
                  오직 나만의 공간에서, 나에게 집중하는 시간
                </Heading>

                <div className="space-y-2">
                  <Text variant="bodySm" tone="slateMuted" className="text-[#364152]">
                    타인의 시선 없이, 익숙한 공간에서 편안하게 운동에 몰입할 수 있습니다.
                  </Text>
                  <Text variant="bodySm" tone="slateMuted" className="text-[#364152]">
                    PT앳홈은 개인의 속도와 컨디션을 존중하며, 가장 편안한 트레이닝을 제공합니다.
                  </Text>
                </div>
              </div>
            </Card>
          </RevealCard>
        </div>
      </div>
    </section>
  );
}

/* 스크롤 진입 시 부드럽게 나타나는 래퍼 */
function RevealCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setShow(true);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={[
        "transform-gpu transition duration-700",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
