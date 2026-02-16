import { motion } from "framer-motion";
import { useRef } from "react";
import Galaxy from "./Galaxy";
import shaariffImg from "@/assets/shaariff.png";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-label="Hero">
      {/* Galaxy Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Galaxy />
      </div>

      {/* Gradient overlay to blend galaxy into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <motion.div
        className="relative z-10 w-full px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center">
          {/* Left side - SHAARIFF */}
          <motion.div
            className="flex flex-col justify-center md:text-left text-center"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight font-gilroy text-primary heading-fancy">
              SHAARIFF
            </h1>
          </motion.div>

          {/* Center - Profile Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-64 h-[400px] md:w-80 md:h-[500px] rounded-3xl overflow-hidden border border-border/30 shadow-2xl shadow-black/40 bg-gradient-to-b from-muted/20 to-transparent group transition-all duration-500 hover:shadow-primary/20 hover:border-primary/40 hover:scale-[1.02]">
              <img
                src={shaariffImg}
                alt="Shaariff Mujtaba - Automation Engineer & Web Developer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </motion.div>

          {/* Right side - MUJTABA */}
          <motion.div
            className="flex flex-col justify-center md:text-left text-center"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight font-gilroy text-foreground heading-fancy">
              MUJTABA
            </h1>
          </motion.div>
        </div>

        {/* Professional Title */}
        <motion.div
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <p className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide hover-glow cursor-default">
            Automation Engineer | Web Developer
          </p>
        </motion.div>

        {/* CTA Buttons - Below */}
        <motion.div
          className="flex gap-4 justify-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:shadow-lg hover:shadow-primary/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            data-cursor-hover
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-border text-foreground font-medium text-sm tracking-wide hover:border-primary/50 hover:text-primary hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            data-cursor-hover
          >
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
