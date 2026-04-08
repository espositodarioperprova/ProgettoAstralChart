import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
