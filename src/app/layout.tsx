// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PT앳홈 - 방문 PT 서비스",
  description: "나만의 공간에서 완성되는 프리미엄 방문 PT 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased bg-white text-[#1F1B16]">
        {/* 
          ✅ 하단 고정바에 가려지는 영역 방지
          - --bottom-bar-h : 고정바 높이
          - env(safe-area-inset-bottom) : iOS 홈 인디케이터 영역
        */}
        <div className="min-h-dvh pb-[calc(var(--bottom-bar-h)+env(safe-area-inset-bottom,0px))]">
          {children}
        </div>
      </body>
    </html>
  );
}
