import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import SplashCursor from "@/components/SplashCursor";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import { useEffect, lazy, Suspense } from "react";

// Lazy load below-the-fold sections for faster initial paint
const HowIWorkSection = lazy(() => import("@/components/HowIWorkSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const StackScrollSection = lazy(() => import("@/components/StackScrollSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

const SectionFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background scroll-smooth-container">
      <SplashCursor />
      <FloatingNav />
      <HeroSection />

      <Suspense fallback={<SectionFallback />}>
        {/* How I Work */}
        <ScrollReveal variant="fade-up" duration={0.9}>
          <HowIWorkSection />
        </ScrollReveal>

        <SectionDivider variant="diamond" />

        {/* About */}
        <ScrollReveal variant="blur-in" duration={0.9} delay={0.05}>
          <AboutSection />
        </ScrollReveal>

        <SectionDivider variant="glow" />

        {/* Projects Stack Scroll */}
        <ScrollReveal variant="slide-up" duration={1}>
          <StackScrollSection />
        </ScrollReveal>

        <SectionDivider variant="dots" />

        {/* Projects */}
        <ScrollReveal variant="fade-up" duration={0.9}>
          <ProjectsSection />
        </ScrollReveal>

        <SectionDivider variant="gradient" />

        {/* CTA */}
        <ScrollReveal variant="scale-up" duration={0.9}>
          <CTASection />
        </ScrollReveal>

        <SectionDivider variant="diamond" />

        {/* Contact */}
        <ScrollReveal variant="fade-up" duration={0.9} delay={0.05}>
          <ContactSection />
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal variant="fade-up" duration={0.6} delay={0.1}>
          <FooterSection />
        </ScrollReveal>
      </Suspense>
    </div>
  );
};

export default Index;
