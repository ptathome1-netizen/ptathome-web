"use client";

import Image from "next/image";
import { useState } from "react";

export default function AboutSection() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FAF8F3_0%,#FFFFFF_100%)]">
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#6B7280]">About PT앳홈</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#1F2937] sm:text-[34px]">
              운동의 기준을, <br className="hidden sm:block" />집 안으로 옮기다.
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-8 text-[#364152]">
              <p>전문성을 갖춘 트레이너의 세심한 케어가, 당신의 공간 속으로 찾아갑니다.</p>
              <p>익숙한 공간에서 편안하게, 내 몸에 맞는 리듬으로 꾸준함을 이어갑니다.</p>
              <p>PT앳홈은 일상과 운동이 자연스럽게 섞이는 경험을 설계합니다.</p>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-2xl border border-[#E6E0D6] bg-white/70 p-6 backdrop-blur">
              <div className="relative h-[320px] w-full overflow-hidden rounded-xl sm:h-[360px]">
                {imgOk ? (
                  <Image
                    src="/about/about-img.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    onError={() => setImgOk(false)}
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#F3ECE1_0%,#FFFFFF_100%)]" />
                )}
              </div>
              <div className="mt-4 text-sm text-[#4B5563]">
                내 공간에서 만드는 가장 자연스러운 변화의 시작.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

