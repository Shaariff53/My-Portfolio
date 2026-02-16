import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

const TextReveal = ({ text, className = "", delay = 0, as = "h2", once = true }: TextRevealProps) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 30, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const Tag = motion[as];

  return (
    <Tag
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      style={{ perspective: 400 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="mr-[0.3em] inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

export default TextReveal;
