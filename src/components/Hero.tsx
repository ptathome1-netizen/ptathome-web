"use client";

import Image from "next/image";

const KAKAO_CHAT_URL = "https://pf.kakao.com/_GVuxin/chat";

export default function Hero() {
  const openChat = () => {
    try {
      window.dispatchEvent(new Event("open-chatbot"));
    } catch (e) {
      console.warn("[Hero] open-chatbot dispatch 실패", e);
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#F8F4EC]">
      {/* ===== Background Image ===== */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero/hero-bg.jpg"
          alt="홈 트레이닝 이미지"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[20%_center] opacity-[0.28] sm:opacity-[0.34]"
        />

        {/* 중앙 라이트 오버레이 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_38%,rgba(255,255,255,0.48),rgba(255,255,255,0)_65%)] sm:bg-[radial-gradient(60%_55%_at_50%_40%,rgba(255,255,255,0.43),rgba(255,255,255,0)_60%)]" />
        {/* 상단 페이드 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[24%] bg-[linear-gradient(to_bottom,rgba(246,239,229,0.64),rgba(246,239,229,0))]" />
      </div>

      {/* ===== Content Wrapper ===== */}
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 pt-12 sm:pt-18 lg:pt-24 pb-16 sm:pb-20 lg:pb-28 text-center">
        {/* ===== Logo (조금 더 큼 + 살짝 오른쪽) ===== */}
        <div className="flex justify-center mb-2 sm:mb-4">
          <Image
            src="/logo/ptathome_logo_transparent_hd.png"
            alt="PT앳홈 로고"
            width={290}
            height={90}
            priority
            className="w-[270px] sm:w-[290px] h-auto opacity-[0.97] drop-shadow-[0_2px_4px_rgba(0,0,0,0.16)] transform translate-x-[2px]"
          />
        </div>

        {/* ===== Title ===== */}
        <h1 className="mt-1 sm:mt-3 mx-auto max-w-[20rem] sm:max-w-[30rem] lg:max-w-[42rem] text-[28px] xs:text-[32px] sm:text-[46px] lg:text-[60px] font-extrabold leading-[1.23] tracking-[-0.01em] text-[#1F1711]">
          <span className="block">운동의 새로운 기준,</span>
          <span className="block">나만의 공간에서 완성되다</span>
        </h1>

        {/* ===== Sub Description ===== */}
        <p className="mx-auto mt-4 sm:mt-5 max-w-[22rem] sm:max-w-[700px] text-[15px] sm:text-[17px] leading-[1.45] text-[#5C5245]">
          <span className="block">코치가 직접 찾아가는 1:1 맞춤 PT,</span>
          <span className="block">
            가장 편안한 <span className="whitespace-nowrap">공간에서</span> 진짜
            변화를 시작하세요.
          </span>
        </p>

        {/* ===== CTA Buttons ===== */}
        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* 0원으로 시작하기 */}
          <div className="w-full max-w-[360px] sm:w-[280px]">
            <button
              onClick={openChat}
              className="group relative inline-flex w-full h-12 sm:h-[52px] items-center justify-center gap-2 rounded-full bg-[#2B241C] text-[15px] sm:text-[16px] font-semibold text-white border border-[#1F1A14] shadow-[0_8px_22px_rgba(0,0,0,.22)] active:scale-[0.98] transition-all duration-200 hover:-translate-y-[1px]"
            >
              <span>0원으로 시작하기</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
            <div className="mt-2 text-center text-[13px] sm:text-[13.5px] text-[#4F4639] leading-tight">
              첫 수업은 무료, 부담 없이 시작하세요.
            </div>
          </div>

          {/* 나만의 코치 만나보기 */}
          <div className="w-full max-w-[360px] sm:w-[280px]">
            <button
              onClick={openChat}
              className="group relative inline-flex w-full h-12 sm:h-[52px] items-center justify-center gap-2 rounded-full bg-white/95 backdrop-blur-[2px] text-[15px] sm:text-[16px] font-semibold text-[#2B241C] border border-[#C2B7A6] shadow-[0_6px_18px_rgba(0,0,0,.14)] active:scale-[0.98] transition-all duration-200 hover:-translate-y-[1px]"
            >
              <span>나만의 코치 만나보기</span>
            </button>
            <div className="mt-2 text-center text-[13px] sm:text-[13.5px] text-[#4F4639] leading-tight">
              몇 가지 질문만으로, 나만의 코치를 추천해드려요.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
