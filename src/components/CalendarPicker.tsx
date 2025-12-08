"use client";

import React from "react";

const DAY_LIST = ["월", "화", "수", "목", "금", "토", "일"];
const HOUR_LIST = Array.from({ length: 18 }, (_, i) => {
  const h = 6 + i; // 06~23
  return `${String(h).padStart(2, "0")}:00`;
});

type CalendarPickerProps = {
  /** 선택된 셀: "월-06:00" 같은 포맷 배열 */
  value: string[];
  /** 선택 토글 핸들러 */
  onToggle: (cellKey: string) => void;
  /** 상단 타이틀(선택) */
  title?: string;
  /** 서브텍스트(선택) */
  subtitle?: string;
};

export default function CalendarPicker({
  value,
  onToggle,
  title = "가능한 요일 · 시간 선택",
  subtitle = "여러 칸을 자유롭게 선택할 수 있어요 (1시간 단위)",
}: CalendarPickerProps) {
  return (
    <section className="rounded-2xl border border-[#E6E0D6] bg-white/80 p-5 shadow-sm">
      <header className="mb-4">
        <h3 className="text-[15px] font-semibold text-[#1F2937]">{title}</h3>
        <p className="mt-1 text-sm text-[#6B7280]">{subtitle}</p>
      </header>

      <div className="relative overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white/90 px-2 py-2 text-left text-xs font-medium text-[#6B7280] backdrop-blur">
                시간
              </th>
              {DAY_LIST.map((d) => (
                <th key={d} className="px-2 py-2 text-center text-xs font-medium text-[#6B7280]">
                  {d}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {HOUR_LIST.map((hh) => (
              <tr key={hh}>
                <td className="sticky left-0 z-10 bg-white/90 px-2 py-1 text-xs text-[#6B7280] backdrop-blur">
                  {hh}
                </td>

                {DAY_LIST.map((d) => {
                  const key = `${d}-${hh}`;
                  const active = value.includes(key);
                  return (
                    <td key={key} className="px-1 py-1">
                      <button
                        type="button"
                        onClick={() => onToggle(key)}
                        className={[
                          "h-9 w-full rounded-md border text-sm transition",
                          active
                            ? "border-[#CDBA97] bg-[#FAF8F3] text-[#1F2937] shadow-[0_2px_8px_rgba(0,0,0,.06)]"
                            : "border-[#E5E7EB] text-[#374151] hover:bg-black/[0.03]",
                        ].join(" ")}
                        aria-pressed={active}
                        aria-label={`${d} ${hh} ${active ? "선택 해제" : "선택"}`}
                      >
                        {active ? "●" : "○"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl bg-[#FAF8F3] px-3 py-2 text-sm text-[#374151]">
        <span className="font-medium text-[#1F2937]">선택한 시간</span>
        {value.length ? (
          <span className="ml-2">
            {value
              .slice()
              .sort((a, b) => a.localeCompare(b, "ko"))
              .join(" · ")}
          </span>
        ) : (
          <span className="ml-2 text-[#6B7280]">아직 선택한 시간이 없어요.</span>
        )}
      </div>
    </section>
  );
}
