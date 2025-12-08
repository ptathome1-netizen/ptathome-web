// src/components/About.tsx
import Image from "next/image";
import {
  IconPro,     // 운동과학 아이콘
  IconTrust,   // 검증된 코치(실드/체크) 아이콘
  IconCar,     // 이동 스트레스(자동차) 아이콘
  IconEye,     // 시선 부담(눈) 아이콘
} from "@/components/icons/PTIcons";

export default function About() {
  return (
    <section id="about" className="bg-[#F7F2E8] py-14 lg:py-18">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 좌: 이미지 카드 */}
          <div
            className="
              relative rounded-3xl bg-white/40 ring-1 ring-black/5
              shadow-[0_18px_60px_rgba(0,0,0,.08)]
              overflow-hidden min-h-[480px] lg:min-h-[520px]
            "
          >
            <Image
              src="/hero/hero-1.jpg"
              alt="방문 PT 트레이닝"
              fill
              sizes="(min-width:1024px) 520px, 100vw"
              className="object-cover"
              // 피사체 좌측을 조금 더 보여주기 위해 35%로 이동
              style={{ objectPosition: "35% 50%" }}
              // 히어로만 priority, 어바웃은 lazy로 두어 성능 최적화
              priority={false as unknown as boolean}
            />
          </div>

          {/* 우: 카피 카드 */}
          <div
            className="
              rounded-3xl bg-[#EBDDCE] ring-1 ring-black/5
              shadow-[0_18px_60px_rgba(0,0,0,.08)]
              px-6 sm:px-7 lg:px-8 py-7 sm:py-8
              min-h-[480px] lg:min-h-[520px] flex flex-col
            "
          >
            {/* 섹션 라벨 */}
            <div className="text-[12px] tracking-[0.08em] text-[#7B6C5D]">
              ABOUT 피티앳홈
            </div>

            {/* 헤드라인 */}
            <h2 className="mt-1.5 text-[26px] leading-tight sm:text-[30px] font-extrabold text-[#2A2119]">
              당신의 공간이 가장 완벽한 <br className="hidden sm:block" />
              트레이닝 공간이 됩니다.
            </h2>

            {/* 칩: 4개 한 줄(태블릿↑) */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Chip icon={<IconPro className="text-[#6E5F50]" aria-hidden="true" />} label="운동과학 기반 · 1:1 설계" />
              <Chip icon={<IconTrust className="text-[#6E5F50]" aria-hidden="true" />} label="검증된 코치 방문" />
              <Chip icon={<IconCar className="text-[#6E5F50]" aria-hidden="true" />} label="이동 스트레스 ↓" />
              <Chip icon={<IconEye className="text-[#6E5F50]" aria-hidden="true" />} label="시선 부담 ↓" />
            </div>

            {/* 본문 */}
            <div className="mt-5 space-y-3 text-[15.5px] leading-[1.75] text-[#4A3F34]">
              <p>
                피티앳홈은 운동을 ‘일상의 자연스러운 흐름’으로 바꿉니다. 가장 편안한 당신의 공간에서,
                우리 없이 이어지는 루틴을 설계합니다.
              </p>
              <p>
                전문 코치가 직접 방문하여 체형·목표를 진단하고, 생활 리듬에 맞춘 1:1 프로그램으로
                꾸준함을 만들어 드립니다.
              </p>
              <p className="font-bold text-[#241E18]">
                꾸준함은 환경에서 시작됩니다. 익숙한 나의 공간에서, 작은 루틴이 큰 변화를 만듭니다.
              </p>
            </div>

            {/* 공간 채우기(카드 하단 정렬 안정화) */}
            <div className="mt-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* 재사용 칩 컴포넌트 */
function Chip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className="
        inline-flex items-center gap-1.5 rounded-full
        bg-white/85 backdrop-blur-[2px] px-3.5 h-8
        text-[13.5px] tracking-[0.01em] text-[#5B4E42]
        ring-1 ring-black/5 shadow-[0_4px_12px_rgba(0,0,0,.06)]
        whitespace-nowrap
      "
    >
      <span className="shrink-0 leading-none">{icon}</span>
      <span className="leading-none">{label}</span>
    </span>
  );
}
