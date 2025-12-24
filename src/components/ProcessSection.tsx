"use client";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    title: "체험 수업 신청 또는 카톡 문의",
    description:
      "홈페이지 신청 폼 또는 카카오톡으로 간단하게 체험 수업을 신청해 주세요. 남겨주신 연락처로 담당 트레이너가 직접 연락을 드립니다.",
    icon: "💬",
  },
  {
    id: 2,
    title: "운동 목표·환경 확인 & 일정 조율",
    description:
      "운동 목적, 집 구조(운동 가능 공간), 사용 가능한 장비, 가능한 요일·시간대를 확인한 뒤 방문 PT 수업 스케줄을 함께 조율합니다.",
    icon: "📅",
  },
  {
    id: 3,
    title: "첫 방문, 체형·체력 진단",
    description:
      "트레이너가 직접 방문해 체형과 동작 패턴, 기본 근력과 생활 패턴을 종합적으로 진단합니다. 집에서 안전하게 운동할 수 있는지까지 꼼꼼히 체크합니다.",
    icon: "🩺",
  },
  {
    id: 4,
    title: "맞춤 프로그램 설계 & 무료 체험 수업",
    description:
      "진단 결과를 바탕으로 개인 맞춤 운동 프로그램을 설계하고, 첫 회는 무료 체험 수업으로 진행합니다. 해보신 뒤 등록 여부를 편하게 결정하셔도 됩니다.",
    icon: "✨",
  },
];

export default function VisitProcessSection() {
  return (
    <section className="w-full bg-[#F9F4EF] py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-6 lg:px-8">
        
        {/* 라벨 */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#E6D8CB] bg-white px-3 py-1 text-xs font-medium text-[#C69C72]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C69C72]" />
          방문 PT 진행 과정
        </div>

        {/* 제목 및 설명 */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-[#3B2F2F] sm:text-3xl md:text-[2.1rem] leading-snug">
            무료 체험부터 정기 수업까지,
            <br /> 이렇게 진행돼요
          </h2>

          <p className="text-sm leading-relaxed text-[#5E5147] sm:text-[0.95rem]">
            신청만 해두시면 상담·방문·프로그램 설계까지 전 과정은 PT앳홈에서 책임집니다.
            처음 운동을 시작하는 분들도 부담 없이 따라오실 수 있도록 체계적인 프로세스를 준비했어요.
          </p>
        </div>

        {/* 스텝 카드 */}
        <div className="grid gap-6 md:grid-cols-2">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="group flex flex-col rounded-2xl border border-[#E6D8CB] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D3C0AD] hover:shadow-md md:p-7"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                
                {/* 아이콘 */}
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2E8DF] text-xl">
                  <span>{step.icon}</span>
                </div>

                {/* STEP 라벨 */}
                <div className="rounded-full bg-[#F2E8DF] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#7A6A5B]">
                  Step {String(step.id).padStart(2, "0")}
                </div>
              </div>

              {/* 텍스트 */}
              <h3 className="mb-2 text-base font-semibold text-[#3B2F2F] sm:text-[1.02rem]">
                {step.title}
              </h3>

              <p className="text-[0.87rem] leading-relaxed text-[#5E5147] sm:text-[0.9rem]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* 하단 안내 박스 */}
        <div className="mt-2 flex flex-col gap-3 rounded-2xl bg-[#F2E8DF] px-5 py-4 text-[0.86rem] text-[#5E5147] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C69C72]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C69C72]" />
            첫 수업 무료 진행
          </div>

          <p className="font-medium text-[#3B2F2F]">
            첫 방문 수업은 100% 무료로 진행되며, 체험 후 마음에 드실 때만 정기 수업으로 이어가시면 됩니다.
          </p>
        </div>

      </div>
    </section>
  );
}