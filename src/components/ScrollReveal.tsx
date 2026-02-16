import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in"
  | "slide-up";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  /** Enable parallax background shift on scroll */
  parallax?: boolean;
  /** Parallax intensity in pixels (default 60) */
  parallaxAmount?: number;
  /** Viewport trigger threshold 0-1 (default 0.15) */
  threshold?: number;
}

const variants: Record<AnimationVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 100, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  className = "",
  parallax = false,
  parallaxAmount = 60,
  threshold = 0.15,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxAmount, -parallaxAmount]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={parallax ? { y: parallaxY } : undefined}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
