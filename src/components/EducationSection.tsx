import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

const EducationSection = () => (
  <section className="py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <TextReveal text="EDUCATION" as="h2" className="text-3xl md:text-4xl font-bold text-center mb-16 justify-center heading-fancy" />

      <motion.div
        className="relative pl-8 border-l-2 border-primary/40"
        initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        />
        <h3 className="text-xl font-bold heading-fancy">Bahria University</h3>
        <h4 className="text-primary font-medium mt-1">Bachelor's degree, Computer Science</h4>
        <span className="text-sm text-muted-foreground">2024 – 2028</span>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Currently pursuing core and advanced topics in Computer Science including
          programming, software engineering, data structures, OOP, web development,
          and system design. Actively involved in academic projects focusing on
          practical applications, creativity, and teamwork.
        </p>
      </motion.div>
    </div>
  </section>
);

export default EducationSection;
