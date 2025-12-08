"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CalendarPicker from "@/components/CalendarPicker";

declare global {
  interface Window {
    daum?: any;
  }
}

/* ====== 데이터 타입 ====== */
type FormData = {
  name: string;
  phone: string;
  gender: "여성" | "남성" | "";
  ageRange:
    | "10대"
    | "20대"
    | "30대"
    | "40대"
    | "50대"
    | "60대 이상"
    | "";
  purposes: string[]; // 복수 선택
  purposeDetail: string; // 선택 입력
  equipments: string; // 선택 입력
  address: string;
  addressDetail: string;
  calendarKeys: string[]; // "월-06:00" 형식 다중 선택
};

const defaultForm: FormData = {
  name: "",
  phone: "",
  gender: "",
  ageRange: "",
  purposes: [],
  purposeDetail: "",
  equipments: "",
  address: "",
  addressDetail: "",
  calendarKeys: [],
};

/* ====== 유틸 ====== */
function toggleArray(list: string[], v: string) {
  return list.includes(v)
    ? list.filter((x) => x !== v)
    : [...list, v];
}

function digitsOnly(v: string) {
  return v.replace(/\D/g, "");
}

function formatPhoneInput(v: string) {
  const d = digitsOnly(v).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

/* ====== 메인 컴포넌트 ====== */
export default function ChatbotModal() {
  const QUESTION_STEPS = 8; // 질문 단계 수
  const LOADING_STEP = 9; // 접수 중 화면

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 외부에서 열기: window.dispatchEvent(new Event("open-chatbot"))
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setSubmitted(false);
      setSubmitting(false);
      setData(defaultForm);
      setStep(1);
      setTimeout(() => scrollRef.current?.scrollTo({ top: 0 }), 0);
    };

    window.addEventListener("open-chatbot", handler as EventListener);
    return () =>
      window.removeEventListener("open-chatbot", handler as EventListener);
  }, []);

  // 스텝 이동 시 스크롤 아래로
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [step, open]);

  // 진행률 (질문 단계까지만 표시)
  const progress = useMemo(
    () =>
      Math.round(
        (Math.min(step, QUESTION_STEPS) / QUESTION_STEPS) * 100
      ),
    [step]
  );

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  // 다음 버튼 활성 조건 (질문 단계만)
  const canNext = useMemo(() => {
    switch (step) {
      case 1:
        return data.name.trim().length > 0;
      case 2: {
        const len = digitsOnly(data.phone).length;
        return len >= 10; // 10~11자리
      }
      case 3:
        return data.gender !== "";
      case 4:
        return data.ageRange !== "";
      case 5:
        return data.purposes.length > 0;
      case 6:
        return true; // 보유 도구 (선택)
      case 7:
        return data.address.trim().length > 0;
      case 8:
        return data.calendarKeys.length > 0;
      default:
        return false;
    }
  }, [step, data]);

  /* ====== 제출 시작 (로딩 화면으로 이동) ====== */
  const beginSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);
    setStep(LOADING_STEP);

    try {
      const payload = {
        name: data.name.trim(),
        phone: data.phone.trim(),
        gender: data.gender,
        ageRange: data.ageRange,
        purposes: data.purposes,
        purposeDetail: data.purposeDetail.trim(),
        equipments: data.equipments.trim(),
        address: `${data.address} ${data.addressDetail || ""}`.trim(),
        calendarKeys: data.calendarKeys,
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        console.error("[lead api] error response:", msg);
        alert(
          "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
        setSubmitting(false);
        setStep(QUESTION_STEPS); // 마지막 단계로 되돌리기
        return;
      }

      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error("[lead api] network error:", err);
      alert(
        "네트워크 문제로 접수에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
      setSubmitting(false);
      setStep(QUESTION_STEPS);
    }
  };

  const next = () => {
    if (step < QUESTION_STEPS) {
      setStep(step + 1);
    } else if (step === QUESTION_STEPS) {
      beginSubmit();
    }
  };

  const prev = () => {
    if (submitting) return;
    if (step > 1 && step <= QUESTION_STEPS) {
      setStep(step - 1);
    }
  };

  /* ====== 카카오(다음) 주소검색 ====== */
  const ensureDaumPostcode = () =>
    new Promise<void>((res, rej) => {
      if (window.daum?.Postcode) return res();
      const s = document.createElement("script");
      // 🔧 여기만 수정: 프로토콜 명시
      s.src =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      s.async = true;
      s.onload = () => res();
      s.onerror = () => rej(new Error("다음 주소검색 로드 실패"));
      document.body.appendChild(s);
    });

  const openDaumPostcode = async () => {
    try {
      await ensureDaumPostcode();
      new window.daum!.Postcode({
        oncomplete: (r: any) => {
          const addr =
            r.roadAddress?.trim() ||
            r.address?.trim() ||
            `${r.sido || ""} ${r.sigungu || ""} ${r.bname || ""}`.trim();
          set("address", addr);
          set("addressDetail", "");
        },
      }).open();
    } catch (e) {
      console.warn("[주소검색] 스크립트 로드 실패:", e);
      alert("주소검색을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  if (!open) return null;

  /* ====== 헤더 타이틀 ====== */
  const headerTitle = submitted
    ? "트레이너 배정 안내"
    : step === LOADING_STEP || submitting
    ? "접수 중입니다"
    : "체험 수업 신청";

  /* ====== UI ====== */
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-[560px] rounded-2xl border border-[#E6E0D6] bg-white shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between gap-3 border-b border-[#EFEAE2] px-5 py-4">
          <div className="text-[15px] font-semibold text-[#1F2937]">
            {headerTitle}
          </div>
          <button
            onClick={() => !submitting && setOpen(false)}
            className="rounded-lg px-3 py-1 text-sm text-[#6B7280] hover:bg-black/[0.04]"
            aria-label="닫기"
          >
            닫기
          </button>
        </div>

        {/* 진행바 (질문 단계에서만 표시) */}
        {!submitted && step <= QUESTION_STEPS && (
          <div className="px-5 pt-3">
            <div className="h-1.5 w-full rounded-full bg-[#F3EDE3]">
              <div
                className="h-1.5 rounded-full bg-[#CDBA97] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1.5 text-right text-xs text-[#6B7280]">
              {step} / {QUESTION_STEPS}
            </div>
          </div>
        )}

        {/* 바디 */}
        <div
          ref={scrollRef}
          className="max-h-[60vh] overflow-y-auto px-5 pb-5 pt-2"
        >
          {!submitted ? (
            step === LOADING_STEP ? (
              /* ====== 접수 중 화면 ====== */
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#E5D8C6] border-t-[#CDBA97] animate-spin" />
                <p className="text-[15px] font-medium text-[#1F2937]">
                  접수 중입니다
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#6B7280]">
                  잠시만 기다려 주세요. 보내주신 정보를 안전하게 저장하고 있어요.
                </p>
              </div>
            ) : (
              /* ====== 질문 단계들 ====== */
              <div className="space-y-4">
                {/* 1. 성함 */}
                {step === 1 && (
                  <Bubble>
                    <Q>성함을 알려주세요.</Q>
                    <input
                      className="mt-2 w-full rounded-lg border border-[#E5E7EB] px-3 py-2"
                      placeholder="예) 김하나"
                      value={data.name}
                      onChange={(e) => set("name", e.target.value)}
                      autoFocus
                      disabled={submitting}
                    />
                  </Bubble>
                )}

                {/* 2. 전화번호 */}
                {step === 2 && (
                  <Bubble>
                    <Q>전화번호를 입력해주세요.</Q>
                    <input
                      className="mt-2 w-full rounded-lg border border-[#E5E7EB] px-3 py-2 tracking-[0.05em]"
                      placeholder="예) 010-1234-5678"
                      inputMode="numeric"
                      value={data.phone}
                      onChange={(e) =>
                        set("phone", formatPhoneInput(e.target.value))
                      }
                      disabled={submitting}
                    />
                    <p className="mt-1 text-xs text-[#6B7280]" />
                  </Bubble>
                )}

                {/* 3. 성별 */}
                {step === 3 && (
                  <Bubble>
                    <Q>성별을 선택해주세요.</Q>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {["여성", "남성"].map((g) => (
                        <Choice
                          key={g}
                          active={data.gender === g}
                          onClick={() =>
                            !submitting &&
                            set("gender", g as FormData["gender"])
                          }
                          label={g}
                        />
                      ))}
                    </div>
                  </Bubble>
                )}

                {/* 4. 연령대 */}
                {step === 4 && (
                  <Bubble>
                    <Q>연령대를 선택해주세요.</Q>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {["10대", "20대", "30대", "40대", "50대", "60대 이상"].map(
                        (a) => (
                          <Choice
                            key={a}
                            active={data.ageRange === a}
                            onClick={() =>
                              !submitting &&
                              set("ageRange", a as FormData["ageRange"])
                            }
                            label={a}
                          />
                        )
                      )}
                    </div>
                  </Bubble>
                )}

                {/* 5. 운동 목적(복수 선택) */}
                {step === 5 && (
                  <Bubble>
                    <Q>운동 목적을 선택해주세요. (복수 선택 가능)</Q>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {[
                        "체형교정",
                        "생활통증완화",
                        "컨디셔닝",
                        "체력강화",
                        "다이어트",
                        "근력향상",
                        "스트레칭",
                      ].map((p) => (
                        <Choice
                          key={p}
                          active={data.purposes.includes(p)}
                          onClick={() =>
                            !submitting &&
                            set("purposes", toggleArray(data.purposes, p))
                          }
                          label={p}
                        />
                      ))}
                    </div>

                    <label className="mt-3 block text-sm text-[#6B7280]">
                      필요하시면 목적을 더 자세히 적어주세요. (선택)
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-lg border border-[#E5E7EB] px-3 py-2"
                      placeholder="예) 출산 후 체형 회복 / 목·허리 통증 완화 / 마라톤 대비 체력 강화 등"
                      rows={3}
                      value={data.purposeDetail}
                      onChange={(e) =>
                        set("purposeDetail", e.target.value)
                      }
                      disabled={submitting}
                    />
                  </Bubble>
                )}

                {/* 6. 보유 도구(선택) */}
                {step === 6 && (
                  <Bubble>
                    <Q>보유하고 있는 운동 도구가 있다면 적어주세요. (선택)</Q>
                    <input
                      className="mt-2 w-full rounded-lg border border-[#E5E7EB] px-3 py-2"
                      placeholder="예) 요가매트, 미니밴드, 2kg 덤벨 등"
                      value={data.equipments}
                      onChange={(e) => set("equipments", e.target.value)}
                      disabled={submitting}
                    />
                  </Bubble>
                )}

                {/* 7. 주소 */}
                {step === 7 && (
                  <Bubble>
                    <Q>주소를 알려주세요. (상담 방문을 위해 필요합니다)</Q>
                    <div className="mt-2 flex gap-2">
                      <input
                        className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2"
                        placeholder="도로명 주소"
                        value={data.address}
                        onChange={(e) => set("address", e.target.value)}
                        disabled={submitting}
                      />
                      <button
                        type="button"
                        onClick={submitting ? undefined : openDaumPostcode}
                        className="whitespace-nowrap rounded-lg border border-[#CDBA97] px-3 py-2 text-xs sm:text-sm text-[#1F2937] hover:bg-white/60"
                      >
                        주소검색
                      </button>
                    </div>
                    <input
                      className="mt-2 w-full rounded-lg border border-[#E5E7EB] px-3 py-2"
                      placeholder="상세주소 (동/호수 등)"
                      value={data.addressDetail}
                      onChange={(e) =>
                        set("addressDetail", e.target.value)
                      }
                      disabled={submitting}
                    />
                    <p className="mt-1 text-xs text-[#6B7280]">
                      ※ 카카오(다음) 주소검색을 이용해 도로명 주소를
                      자동으로 입력합니다.
                    </p>
                  </Bubble>
                )}

                {/* 8. 요일·시간 캘린더 (다중 선택) */}
                {step === 8 && (
                  <Bubble>
                    <Q>가능한 요일과 시간대를 선택해주세요. (복수 선택 가능)</Q>

                    <div className="mt-2">
                      <CalendarPicker
                        value={data.calendarKeys}
                        onToggle={(key: string) =>
                          !submitting &&
                          set("calendarKeys", toggleArray(data.calendarKeys, key))
                        }
                        title="가능한 요일 · 시간 선택"
                        subtitle="여러 칸을 자유롭게 선택할 수 있어요 (1시간 단위)"
                      />
                    </div>

                    <p className="mt-2 text-xs text-[#6B7280]">
                      ※ 선택하신 시간대를 기준으로 담당 트레이너가 연락드립니다.
                    </p>
                  </Bubble>
                )}
              </div>
            )
          ) : (
            /* ====== 완료 화면 ====== */
            <div className="rounded-xl bg-[#FAF8F3] p-6 text-center text-[#1F2937]">
              <div className="text-base font-semibold">
                트레이너 배정 중입니다 💪
              </div>
              <div className="mt-2 text-sm text-[#6B7280]">
                보내주신 정보를 확인하고 곧 연락드리겠습니다. 감사합니다.
              </div>
            </div>
          )}
        </div>

        {/* 푸터 버튼들 */}
        <div className="flex items-center justify-between gap-3 border-t border-[#EFEAE2] px-5 py-4">
          {!submitted && step <= QUESTION_STEPS ? (
            <>
              <button
                type="button"
                onClick={prev}
                disabled={step === 1 || submitting}
                className="rounded-lg border border-[#CDBA97] px-4 py-2 text-sm text-[#1F2937] disabled:cursor-not-allowed disabled:opacity-40 hover:bg:white/60"
              >
                이전
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!canNext || submitting}
                className="rounded-lg bg-[#EADBC4] px-5 py-2 text-sm font-semibold text-[#1F2937] hover:bg-[#e4d1b3] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step < QUESTION_STEPS
                  ? "다음"
                  : submitting
                  ? "접수 중..."
                  : "제출하기"}
              </button>
            </>
          ) : submitted ? (
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-[#1F1B16] px-5 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                확인
              </button>
            </div>
          ) : (
            // 로딩 화면일 때는 푸터 버튼 없음
            <div className="h-0 w-full" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ====== 프리미티브 ====== */
function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#E6E0D6] bg-white/80 p-4 shadow-sm">
      {children}
    </div>
  );
}

function Q({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[15px] font-medium text-[#1F2937]">
      {children}
    </div>
  );
}

function Choice({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-lg border px-3 py-2 text-sm transition",
        active
          ? "border-[#CDBA97] bg-[#FAF8F3] text-[#1F2937]"
          : "border-[#E5E7EB] text-[#374151] hover:bg-black/[0.03]",
      ].join(" ")}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}