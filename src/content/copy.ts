// src/content/copy.ts
export const COPY = {
  pricing: {
    label: "가격 안내",
    titleLine1: "라이프스타일에 맞게",
    titleLine2: "맞춤형 방문 PT를 선택하세요",
    desc:
      "코칭의 본질은 그대로, 나의 일정과 생활에 맞춰 유연하게. 원하는 페이스로 지속 가능한 변화를 만들어갑니다.",
    perMonth: "/ 월",
    priceNote: "VAT 포함 · 1:1 방문 PT 기준, 개인별 상담 후 조정 가능합니다.",
    cta: "체험 수업 신청하기",
    ctaNote: "버튼을 누르시면 바로 체험 수업 상담 챗봇이 실행됩니다.",
    footer:
      "전원 한국체육대학교 출신 · 국가공인 자격 코치가 직접 방문하여 관리합니다.",

    plans: [
      {
        key: "basic",
        label: "베이직",
        title: "베이직",
        countBadge: "4회",
        lead: "부담 없이 시작하고, 기본은 정확하게",
        desc: "방문 PT를 처음 시작하는 분",
        hashtags: ["#부담없이", "#기본기확립", "#루틴설계"],
        price: "₩280,000",
        bullets: [
          "방문 PT를 부담 없이 시작",
          "자세·호흡·가동성 중심의 정확한 기본기 확립",
          "홈 맞춤 루틴 설계로 꾸준함을 이어가게",
        ],
        accent: {
          price: "text-emerald-600",
          dot: "bg-emerald-500",
          ctaBg: "bg-emerald-100 hover:bg-emerald-200",
          ctaText: "text-[#1F2937]",
          ring: "ring-2 ring-emerald-200 border-emerald-200",
        },
      },
      {
        key: "special",
        label: "스페셜",
        title: "스페셜",
        countBadge: "8회",
        lead: "루틴은 유지하고, 완성도는 높인다",
        desc: "운동 습관을 잡고 꾸준히 운동하고 싶은 분",
        hashtags: ["#운동습관", "#지속성", "#꾸준한관리"],
        price: "₩540,000",
        bullets: [
          "체형교정 + 근력운동 중심의 중간 단계 관리",
          "정기 수업·피드백 루프로 운동 습관 유지",
          "일상 속 지속성을 높이는 효율적 세션 구성",
        ],
        accent: {
          price: "text-amber-600",
          dot: "bg-amber-500",
          ctaBg: "bg-amber-100 hover:bg-amber-200",
          ctaText: "text-[#1F2937]",
          ring: "ring-2 ring-amber-200 border-amber-200",
        },
      },
      {
        key: "premium",
        label: "프리미엄",
        title: "프리미엄",
        countBadge: "12회",
        lead: "목표는 선명하게, 결과는 확실하게",
        desc: "운동을 ‘관리’받고 결과로 증명하고 싶은 분",
        hashtags: ["#목표달성중심", "#완성도극대화"],
        price: "₩780,000",
        bullets: [
          "기간별 목표 로드맵으로 단계별 진행",
          "체성분·신체움직임의 변화로 눈에 보이는 변화",
          "완성도 극대화를 위한 장기 목표 기반 프로그램",
        ],
        accent: {
          price: "text-rose-600",
          dot: "bg-rose-500",
          ctaBg: "bg-rose-100 hover:bg-rose-200",
          ctaText: "text-[#1F2937]",
          ring: "ring-2 ring-rose-200 border-rose-200",
        },
      },
    ] as const,
  },
} as const;
