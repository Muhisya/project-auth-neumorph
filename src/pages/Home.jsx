import HeroSection from "@/components/sections/Hero";         // was hero-section
import AboutSection from "@/components/sections/About";       // was about-section
import TestimonySection from "@/components/sections/Testimony"; // was testimony-section
import FaqSection from "@/components/sections/Faq";           // was faq-section
import FooterSection from "@/components/sections/Footer";     // was footer-section

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TestimonySection />
      <FaqSection />
      <FooterSection />
    </>
  );
}