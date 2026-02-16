import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import shaariffImg from "@/assets/shaariff.png";
import SafeWrapper from "./SafeWrapper";

const ScrambledTextLazy = lazy(() => import("./ScrambledText"));

const FadeInText = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.p
    className={className}
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.p>
);

const SafeScrambled = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <SafeWrapper fallback={<p className={className}>{children}</p>}>
    <Suspense fallback={<p className={className}>{children}</p>}>
      <ScrambledTextLazy radius={80} duration={0.8} speed={0.4} scrambleChars=".:" className={className}>
        {children}
      </ScrambledTextLazy>
    </Suspense>
  </SafeWrapper>
);

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section id="about" ref={ref} className="py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="text-sm tracking-[0.3em] text-primary mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ABOUT
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl text-foreground tracking-normal font-bold mb-8 heading-fancy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            A bit about me
          </motion.h2>

          <div className="space-y-5">
            <SafeScrambled className="text-base md:text-lg text-muted-foreground leading-[1.8]">
              I'm a Computer Science undergraduate at Bahria University, Islamabad — passionate about turning ideas into elegant digital experiences.
            </SafeScrambled>

            <SafeScrambled className="text-base md:text-lg text-muted-foreground leading-[1.8]">
              With a solid foundation in C++, OOP, and problem-solving, I've built everything from chess games to brand websites. My goal is to merge Data Science with Web Development — combining analytical depth with creative execution.
            </SafeScrambled>

            <SafeScrambled className="text-base md:text-lg text-muted-foreground leading-[1.8]">
              I believe great work comes from curiosity, collaboration, and an obsession with the details that most people overlook.
            </SafeScrambled>
          </div>

          <motion.a
            href="https://shaariff.netlify.app/My%20Portfolio.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex mt-8 px-6 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:border-primary/50 hover:text-primary hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            data-cursor-hover
          >
            View Resume
          </motion.a>
        </motion.div>

        <motion.div
          className="flex-shrink-0"
          style={{ scale: imgScale }}
        >
          <div className="relative group">
            <img
              src={shaariffImg}
              alt="Shaariff Mujtaba"
              loading="lazy"
              decoding="async"
              className="w-64 h-64 md:w-72 md:h-72 rounded-2xl object-cover border border-border transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
