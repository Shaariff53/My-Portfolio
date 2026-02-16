import { motion } from "framer-motion";

const CTASection = () => (
  <section className="py-32 px-6">
    <div className="max-w-3xl mx-auto text-center">
      <motion.h2
        className="text-4xl md:text-6xl lg:text-7xl font-bold font-gilroy leading-tight heading-fancy"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Let's build
        <br />
        <span className="text-primary">something great</span>
      </motion.h2>

      <motion.p
        className="text-muted-foreground mt-6 text-base md:text-lg max-w-md mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Have a project in mind or want to collaborate? I'd love to hear from you.
      </motion.p>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <a
          href="#contact"
          className="inline-flex px-10 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:shadow-2xl hover:shadow-primary/25 hover:scale-110 hover:-translate-y-1 transition-all duration-500"
          data-cursor-hover
        >
          Get In Touch
        </a>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
