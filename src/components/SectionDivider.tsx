import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  /** Visual style variant */
  variant?: "gradient" | "glow" | "dots" | "diamond";
}

const SectionDivider = ({ variant = "gradient" }: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  if (variant === "glow") {
    return (
      <motion.div
        ref={ref}
        className="section-divider section-divider--glow"
        style={{ opacity }}
      >
        <div className="section-divider__glow-orb" />
      </motion.div>
    );
  }

  if (variant === "dots") {
    return (
      <motion.div
        ref={ref}
        className="section-divider section-divider--dots"
        style={{ opacity }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="section-divider__dot"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i, duration: 0.4, ease: "backOut" }}
          />
        ))}
      </motion.div>
    );
  }

  if (variant === "diamond") {
    return (
      <motion.div
        ref={ref}
        className="section-divider section-divider--diamond"
        style={{ opacity }}
      >
        <motion.div
          className="section-divider__line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="section-divider__diamond-shape"
          initial={{ scale: 0, rotate: 45 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
        />
        <motion.div
          className="section-divider__line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    );
  }

  // Default: gradient
  return (
    <motion.div ref={ref} className="section-divider section-divider--gradient" style={{ opacity }}>
      <motion.div
        className="section-divider__gradient-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
};

export default SectionDivider;
