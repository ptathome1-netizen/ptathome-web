// src/app/page.tsx
import CTAHandlers from "@/components/CTAHandlers";
import ChatbotModal from "@/components/ChatbotModal";
import FloatingBottomBar from "@/components/FloatingBottomBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ValueColumns from "@/components/ValueColumns";
import ReviewsSection from "@/components/ReviewsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactCTA from "@/components/ContactCTA";
import ProcessSection from "@/components/ProcessSection";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FFFFFF] overflow-x-hidden">
      {/* HERO SECTION */}
      <Hero />

      {/* ABOUT SECTION */}
      <About />

     {/* 방문 PT 진행 과정 섹션 */}
      <ProcessSection />
 

      {/* VALUE COLUMNS */}
      <ValueColumns />

      {/* REVIEWS SECTION */}
      <ReviewsSection />

      {/* PRICING SECTION */}
      <PricingSection />

      {/* FAQ SECTION */}
      <FAQSection />

      {/* CONTACT CTA */}
      <ContactCTA />

      {/* FLOATING BOTTOM BAR */}
      <FloatingBottomBar />

      {/* GLOBAL CTA HANDLERS */}
      <CTAHandlers />

      {/* CHATBOT MODAL */}
      <ChatbotModal />

      {/* FOOTER */}
      <footer className="bg-[#FAF8F3] py-12 text-center text-[#6A6052] text-sm border-t border-[#E5DED2]">
        <p>© 2025 PT앳홈 | All Rights Reserved.</p>
        <p className="mt-1">서울특별시 송파구 | 사업자등록번호 000-00-00000</p>
      </footer>
    </main>
  );
}
