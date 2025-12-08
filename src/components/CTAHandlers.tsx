"use client";

import { useEffect } from "react";

/**
 * 페이지 곳곳에 있는
 *  - "체험 수업 신청"
 *  - "0원으로 시작하기"
 * 같은 버튼들에 클릭 이벤트를 걸어서
 * ChatbotModal 을 열어주는 헬퍼 컴포넌트입니다.
 *
 * 실제 화면에는 아무것도 렌더링되지 않습니다.
 */

export default function CTAHandlers() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const clickHandler = (e: Event) => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-chatbot"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 여기에 “체험 수업 신청” 등의 버튼 셀렉터를 추가
    const selectors = [
      '[data-cta="hero-trial"]',
      '[data-cta="pricing-trial"]',
      '[data-cta="contact-trial"]',
      '[data-cta="floating-trial"]',
      'button[data-cta="open-chatbot"]',
    ];

    const targets: HTMLElement[] = [];

    selectors.forEach((sel) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        el.addEventListener("click", clickHandler);
        targets.push(el);
      });
    });

    return () => {
      targets.forEach((el) => el.removeEventListener("click", clickHandler));
    };
  }, []);

  return null;
}