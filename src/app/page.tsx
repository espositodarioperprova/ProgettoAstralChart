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
      {/*
       * Unified cosmic background: a single continuous gradient
       * from the hero all the way through the footer.
       * No more jarring color breaks between sections.
       */}
      <main className="relative overflow-hidden">
        {/* ---- Continuous background gradient ---- */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Top → deep cosmic for hero */}
          <div className="absolute inset-x-0 top-0 h-[100vh] bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#3730a3]" />
          {/* Mid → transitioning to lighter */}
          <div className="absolute inset-x-0 top-[100vh] h-[100vh] bg-gradient-to-b from-[#3730a3] via-[#4338ca] to-[#4f46e5]" />
          {/* Lower → warm purple into soft violet */}
          <div className="absolute inset-x-0 top-[200vh] h-[200vh] bg-gradient-to-b from-[#4f46e5] via-[#6366f1] to-[#7c3aed]" />
          {/* Bottom → back to deep for footer */}
          <div className="absolute inset-x-0 top-[400vh] bottom-0 bg-gradient-to-b from-[#7c3aed] via-[#4338ca] to-[#1e1b4b]" />
        </div>

        {/* ---- Decorative floating orbs ---- */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: -5 }}
        >
          {/* Large glow orb — top right */}
          <div className="animate-pulse-glow absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
          {/* Medium orb — mid left */}
          <div className="animate-pulse-glow absolute top-[120vh] -left-48 h-[400px] w-[400px] rounded-full bg-indigo-400/15 blur-[100px]" />
          {/* Small orb — lower right */}
          <div className="animate-pulse-glow absolute top-[250vh] -right-24 h-[300px] w-[300px] rounded-full bg-violet-500/20 blur-[80px]" />
          {/* Bottom glow */}
          <div className="animate-pulse-glow absolute bottom-[50vh] left-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>

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
