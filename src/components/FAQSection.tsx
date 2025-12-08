"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "수업은 어떤 순서로 진행되나요?",
      a: `피티앳홈은 단순한 운동 지도가 아니라, 회원님의 목표와 상태에 맞춘 개인 루틴 설계 과정으로 운영됩니다.

1️⃣ 수업 신청 및 사전 정보 제공 — 운동 목표, 불편 부위, 희망 요일 등 기본 정보를 입력합니다.
2️⃣ 전문 코치 매칭 — 사전 정보를 기반으로 담당 트레이너가 배정됩니다.
3️⃣ 일정 확정 — 담당 트레이너가 직접 연락드려 수업 일정을 확정합니다.
4️⃣ 첫 방문 수업 — 공간·체형·목표를 함께 점검하고 맞춤 루틴을 설계합니다.
5️⃣ 피드백 및 일정 조율 — 수업 종료 후 피드백과 다음 일정이 조정됩니다.

🩶 이렇게 매 세션이 누적되며, ‘나에게 맞는 루틴이 완성되는 과정’으로 발전합니다.`,
    },
    {
      q: "어떤 운동 도구가 제공되나요?",
      a: `모든 트레이너는 전용 이동 장비 세트를 휴대하고 방문합니다.

제공되는 도구는 마사지 베드, 덤벨, 케틀벨, 바벨, 밴드류, 토닝볼, 밸런스패드 등이며,
공간 상황에 따라 필요한 장비만 선택적으로 세팅됩니다.

🩶 회원님은 별도 준비 없이, 집 안에서 완전한 트레이닝 환경을 경험할 수 있습니다.`,
    },
    {
      q: "수업 일정은 어떻게 조율하나요?",
      a: `모든 일정 조율은 담당 트레이너와의 1:1 연락을 통해 진행됩니다.

복잡한 예약 시스템 없이 카카오톡 또는 전화로 직접 소통하며 조정할 수 있습니다.

🩶 피티앳홈은 고객의 일정 변화에 유연하게 대응하는 구조를 유지합니다.`,
    },
    {
      q: "트레이너 배정은 어떻게 진행되나요?",
      a: `피티앳홈은 트레이너 배정을 단순한 스케줄 매칭이 아닌 전문성 기반의 큐레이션 과정으로 진행합니다.

1️⃣ 사전 상담을 통해 운동 목적과 신체 상태를 파악합니다.
2️⃣ 내부 시스템에서 가장 적합한 전공·경력 트레이너를 선별합니다.
3️⃣ 트레이너의 경력과 자격사항이 포함된 프로필을 회원님께 제공하고, 승인 후 일정이 확정됩니다.

🩶 피티앳홈은 ‘아무 코치나 오는 서비스’가 아니라, 목표와 상황에 최적화된 트레이너 매칭 시스템을 운영합니다.`,
    },
    {
      q: "어떤 프로그램을 받을 수 있나요?",
      a: `피티앳홈은 운동 목적에 따른 세분화된 프로그램을 제공합니다.

- 체형 교정 / 바른 자세 루틴
- 다이어트 및 체중 감량 루틴
- 근력·근지구력 강화 프로그램
- 컨디셔닝 및 피로 회복 관리
- 산전·산후 케어 및 재활 프로그램

🩶 모든 프로그램은 회원의 신체 조건, 회복 속도, 생활 패턴에 맞게 커스터마이징되어 진행됩니다.`,
    },
    {
      q: "운동 중 통증이나 부상이 생기면 어떻게 하나요?",
      a: `피티앳홈은 단순한 ‘운동 지도 서비스’가 아니라, 부상 예방부터 회복까지 아우르는 전문 피지컬 케어 시스템을 운영합니다.

1️⃣ 모든 트레이너는 한국체육대학교 운동건강관리학과 출신 및 국가공인 자격증(운동처방사·건강운동관리사 등) 보유자로,
근골격계 통증과 재활 단계별 접근법에 대한 전문 교육을 이수하고 있습니다.

2️⃣ 수업 중 통증이 발생할 경우, 즉시 세션을 중단하고 통증 원인을 평가한 뒤 해당 부위에 맞는 안정화·가동성 회복 프로그램으로 전환합니다.

3️⃣ 과거 부상 이력이나 질환이 있는 회원은 초기 상담 시 이를 기반으로 한 ‘맞춤 회복 루틴’을 별도 설계합니다.

4️⃣ 모든 고객의 상태 기록은 트레이너 전용 관리 시스템에 누적되어, 매 세션마다 진행 경과와 통증 변화를 지속적으로 추적·관리합니다.

🩶 피티앳홈은 ‘문제가 생겼을 때 대처하는 것’이 아니라, 처음부터 부상을 예방하는 운동 설계를 목표로 합니다.`,
    },
  ];

  return (
    <section className="bg-[#FAF8F3] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-[30px] sm:text-[36px] font-semibold text-[#1E1B16]">
          자주 묻는 질문 (FAQ)
        </h2>
        <p className="mt-3 text-center text-[#6A6052] text-[15px]">
          피티앳홈 서비스의 진행 방식과 특징을 자세히 안내드립니다.
        </p>

        <div className="mt-10 divide-y divide-[#E5DED2] border-y border-[#E5DED2]">
          {faqs.map((item, i) => (
            <div key={i} className="py-6">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <h3 className="text-[17px] font-semibold text-[#2B241C]">{item.q}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-[#6B5B43] transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  open === i ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-[#4B4035]">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
