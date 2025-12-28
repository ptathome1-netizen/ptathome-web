"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import CalendarPicker from "@/components/CalendarPicker";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

declare global {
  interface Window {
    daum?: any;
  }
}

/** ✅ 실제 고객 응대 번호로 교체 */
const CS_PHONE = "0507-1469-0975";
const KAKAO_CHAT_URL = "https://pf.kakao.com/_GVuxin/chat";

/* ====== 데이터 타입 ====== */
type FormData = {
  name: string;
  phone: string;
  gender: "여성" | "남성" | "";
  ageRange: "10대" | "20대" | "30대" | "40대" | "50대" | "60대 이상" | "";
  purposes: string[];
  purposeDetail: string;
  equipments: string;
  address: string;
  addressDetail: string;
  calendarKeys: string[];
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
const toggleArray = (list: string[], v: string) =>
  list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

const digitsOnly = (v: string) => v.replace(/\D/g, "");

const formatPhoneInput = (v: string) => {
  const d = digitsOnly(v).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
};

/* ====== 메인 컴포넌트 ====== */
export default function ChatbotModal() {
  const QUESTION_STEPS = 8;
  const LOADING_STEP = 9;

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* 외부 이벤트로 열기 */
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStep(1);
      setData(defaultForm);
      setSubmitted(false);
      setSubmitting(false);
      setErrorOpen(false);
      setTimeout(() => scrollRef.current?.scrollTo({ top: 0 }), 0);
    };
    window.addEventListener("open-chatbot", handler as EventListener);
    return () => window.removeEventListener("open-chatbot", handler as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [step, open]);

  const progress = useMemo(
    () => Math.round((Math.min(step, QUESTION_STEPS) / QUESTION_STEPS) * 100),
    [step]
  );

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const canNext = useMemo(() => {
    switch (step) {
      case 1:
        return data.name.trim();
      case 2:
        return digitsOnly(data.phone).length >= 10;
      case 3:
        return data.gender;
      case 4:
        return data.ageRange;
      case 5:
        return data.purposes.length > 0;
      case 7:
        return data.address.trim();
      case 8:
        return data.calendarKeys.length > 0;
      default:
        return true;
    }
  }, [step, data]);

  const raiseError = (msg: string) => {
    setSubmitting(false);
    setStep(QUESTION_STEPS);
    setErrorMessage(msg);
    setErrorOpen(true);
  };

  const beginSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);
    setStep(LOADING_STEP);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          phone: data.phone.trim(),
          address: `${data.address} ${data.addressDetail || ""}`.trim(),
        }),
      });

      if (!res.ok) {
        raiseError(
          "일시적인 오류로 신청이 정상적으로 접수되지 않았습니다. 잠시 후 다시 시도해 주세요. 계속 문제가 발생하면 아래 연락처로 문의해 주세요."
        );
        return;
      }

      setSubmitted(true);
      setSubmitting(false);
    } catch {
      raiseError(
        "네트워크 문제로 신청 전송이 실패했습니다. 잠시 후 다시 시도해 주세요. 문제가 지속되면 아래 연락처로 문의해 주세요."
      );
    }
  };

  const next = () => {
    if (step < QUESTION_STEPS) setStep(step + 1);
    else beginSubmit();
  };

  const prev = () => !submitting && step > 1 && setStep(step - 1);

  if (!open) return null;

  const headerTitle =
    submitted ? "트레이너 배정 안내" : step === LOADING_STEP ? "접수 중입니다" : "체험 수업 신청";

  return (
    <>
      {/* ====== 메인 모달 ====== */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3">
        <Card className="w-full max-w-[560px] rounded-2xl bg-white shadow-xl">
          <div className="border-b px-5 py-4 flex justify-between">
            <Heading level={3}>{headerTitle}</Heading>
            <button onClick={() => !submitting && setOpen(false)}>닫기</button>
          </div>

          {!submitted && step <= QUESTION_STEPS && (
            <div className="px-5 pt-3">
              <div className="h-1.5 bg-[#F3EDE3] rounded-full">
                <div className="h-1.5 bg-[#CDBA97]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <div ref={scrollRef} className="max-h-[60vh] overflow-y-auto px-5 py-5">
            {/* 기존 질문 UI 그대로 유지 */}
            {/* (중략 — 질문 UI는 현재 사용 중인 코드 그대로 유지하면 됩니다) */}
          </div>
        </Card>
      </div>

      {/* ====== 에러 안내 모달 (전화 + 카카오) ====== */}
      <ErrorFallbackModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        phoneNumber={CS_PHONE}
        message={errorMessage}
      />
    </>
  );
}

/* ====== 에러 안내 모달 ====== */
function ErrorFallbackModal({
  open,
  onClose,
  phoneNumber,
  message,
}: {
  open: boolean;
  onClose: () => void;
  phoneNumber: string;
  message: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-[420px] rounded-2xl bg-white px-5 py-5 shadow-xl">
        <h3 className="font-semibold">일시적인 오류가 발생했어요.</h3>
        <p className="mt-2 text-sm">{message}</p>

        <div className="mt-4 rounded-xl bg-[#F8F3EC] p-3">
          <div className="text-xs">전화 문의</div>
          <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="text-lg font-semibold">
            {phoneNumber}
          </a>
        </div>

        <button
          onClick={() => window.open(KAKAO_CHAT_URL, "_blank")}
          className="mt-3 w-full rounded-full bg-[#F3E5CF] py-2 font-semibold"
        >
          카카오톡으로 문의하기
        </button>

        <button onClick={onClose} className="mt-3 w-full border rounded-full py-2">
          확인
        </button>
      </div>
    </div>
  );
}
