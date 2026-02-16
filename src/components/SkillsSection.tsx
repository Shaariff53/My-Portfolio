import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type MouseEvent } from "react";
import TextReveal from "./TextReveal";

const skills = [
  { title: "C++", desc: "Object-Oriented Programming, File Handling, Game Development" },
  { title: "Web Development", desc: "HTML, CSS, JavaScript, WordPress, Responsive Design" },
  { title: "Tools & Libraries", desc: "SFML, VS Code, Git, CMS Platforms, WordPress" },
  { title: "Strengths", desc: "Analytical Thinking, Logic Building, Adaptability, Problem-Solving" },
];

const TiltCard = ({ children, className, delay }: { children: React.ReactNode; className?: string; delay: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      data-cursor-hover
    >
      {children}
    </motion.div>
  );
};

const SkillsSection = () => (
  <section id="skills" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <TextReveal text="SKILLS" as="h2" className="text-3xl md:text-4xl font-bold text-center mb-16 justify-center heading-fancy" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((s, i) => (
          <TiltCard
            key={s.title}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors cursor-default"
            delay={i * 0.1}
          >
            <h3 className="text-lg font-bold mb-2 heading-fancy">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </TiltCard>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
