"use client";

type Item = { id: string; src: string; alt?: string };

function MarqueeRow({
  items,
  reverse = false,
  speed = 20, // 초 단위: 숫자 커질수록 느리게
}: {
  items: Item[];
  reverse?: boolean;
  speed?: number;
}) {
  // 트랙을 2번 렌더 → 끊김 없이 루프
  const track = [...items, ...items];
  return (
    <div
      className={`pta-marquee ${reverse ? "pta-marquee--reverse" : ""}`}
      style={{ ["--pta-duration" as any]: `${speed}s` }}
    >
      <div className="pta-marquee__track">
        {track.map((it, idx) => (
          <div className="pta-thumb" key={`${it.id}-${idx}`}>
            <img src={it.src} alt={it.alt || ""} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgramsMarquee() {
  // 여기에 들어가는 이미지는 /public/programs 폴더에 두면 편해.
  // 파일 없으면 404로 떨어지지만 빌드는 깨지지 않아.
  const top: Item[] = [
    { id: "p01", src: "/programs/01.jpg", alt: "체형교정" },
    { id: "p02", src: "/programs/02.jpg", alt: "스트레칭" },
    { id: "p03", src: "/programs/03.jpg", alt: "재활/컨디셔닝" },
    { id: "p04", src: "/programs/04.jpg", alt: "시니어 PT" },
    { id: "p05", src: "/programs/05.jpg", alt: "다이어트" },
    { id: "p06", src: "/programs/06.jpg", alt: "근력 향상" },
  ];

  const bottom: Item[] = [
    { id: "p07", src: "/programs/07.jpg", alt: "소도구 홈트" },
    { id: "p08", src: "/programs/08.jpg", alt: "필라테스" },
    { id: "p09", src: "/programs/09.jpg", alt: "산후 회복" },
    { id: "p10", src: "/programs/10.jpg", alt: "유연성" },
    { id: "p11", src: "/programs/11.jpg", alt: "자세 교정" },
    { id: "p12", src: "/programs/12.jpg", alt: "코어 강화" },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium text-[#8B7A60]">PROGRAMS</p>
          <h3 className="mt-3 text-2xl font-semibold text-[#1E1B16] sm:text-3xl">
            집에서 만나는 다양한 PT 프로그램
          </h3>
          <p className="mt-2 text-[15px] text-[#5F5547]/90">
            관심가는 영역을 둘러보세요. 이미지는 예시이며 언제든 교체할 수 있어요.
          </p>
        </div>

        {/* 윗줄: 왼쪽으로 흐름 (느리게) */}
        <MarqueeRow items={top} speed={26} />

        {/* 간격 */}
        <div className="h-6 sm:h-8" />

        {/* 아랫줄: 오른쪽으로 흐름 (조금 빠르게) */}
        <MarqueeRow items={bottom} reverse speed={22} />
      </div>
    </section>
  );
}
