import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  const springConfig = { damping: 30, stiffness: 400 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setHovered(true);
      }
    };

    const handleOut = () => setHovered(false);
    const handleLeave = () => setHidden(true);
    const handleEnter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/40 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 0.4,
        }}
        animate={{
          width: hovered ? 48 : 28,
          height: hovered ? 48 : 28,
          borderColor: hovered
            ? "hsl(28 36% 51%)"
            : "hsl(28 36% 51% / 0.3)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
