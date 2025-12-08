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
        {children}
      </body>
    </html>
  );
}

