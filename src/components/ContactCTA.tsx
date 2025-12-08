"use client";

export default function ContactCTA() {
  return (
    <section className="bg-[#FAF8F3] py-16 sm:py-20 text-center border-t border-[#E5DED2]">
      <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#1E1B16]">
        궁금한 점이 있으신가요?
      </h3>
      <p className="mt-2 text-[15px] text-[#6A6052]">
        1분만에 빠르게 문의 남기기
      </p>

      <a
        href="https://pf.kakao.com/_yourkakaolink" // 🔹 실제 카카오톡 채널 주소로 교체
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 rounded-full bg-[#CDBA97] hover:bg-[#BDA781] text-white px-8 py-3 text-[15px] font-medium shadow-md transition-all duration-300"
      >
        💬 문의하기
      </a>
    </section>
  );
}
