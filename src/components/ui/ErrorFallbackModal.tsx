"use client";

import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  phoneNumber: string; // 예: " 0507-1469-0975"
};

export default function ErrorFallbackModal({
  open,
  onClose,
  title = "일시적인 오류가 발생했어요.",
  message = "잠시 후 다시 시도해 주세요. 계속 문제가 발생하면 아래 번호로 연락 주시면 바로 도와드리겠습니다.",
  phoneNumber,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />
      {/* modal */}
      <div className="relative w-full max-w-[420px] rounded-2xl border border-[#E6E0D6] bg-white px-5 py-5 shadow-[0_20px_70px_rgba(0,0,0,.20)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[16px] font-semibold text-[#2B241C]">
              {title}
            </h3>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-[#4F4337]">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-[#E6E0D6] text-[#4F4337] hover:bg-[#F8F3EC]"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 rounded-xl bg-[#F8F3EC] px-4 py-3">
          <div className="text-[12px] text-[#6A5A4C]">전화 문의</div>
          <a
            href={`tel:${phoneNumber.replace(/-/g, "")}`}
            className="mt-1 inline-block text-[18px] font-semibold text-[#2B241C]"
          >
            {phoneNumber}
          </a>
          <div className="mt-1 text-[12px] text-[#6A5A4C]">
            탭하면 바로 전화 연결됩니다.
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-full border border-[#CDBDA7] bg-white text-[14px] font-semibold text-[#2B241C] hover:bg-[#F8F3EC]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
