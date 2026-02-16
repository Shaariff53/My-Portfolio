import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Globe, Blocks, Gamepad2, Workflow } from "lucide-react";
import { type MouseEvent } from "react";
import TextReveal from "./TextReveal";

const services = [
  { icon: Globe, title: "Web Development", desc: "Responsive and interactive websites using HTML, CSS, JavaScript, and WordPress with clean design." },
  { icon: Blocks, title: "WordPress Solutions", desc: "Professional WordPress websites with custom design, mobile-friendly layouts, and easy management." },
  { icon: Gamepad2, title: "Game Development", desc: "Game development using C++ and SFML, focusing on game logic and OOP design patterns." },
  { icon: Workflow, title: "n8n Automations", desc: "Workflow automation and integration solutions using n8n to streamline business processes." },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group cursor-default"
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-cursor-hover
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="w-8 h-8 text-primary mb-4" />
      </motion.div>
      <h3 className="text-lg font-bold mb-2 heading-fancy">{service.title}</h3>
      <p className="text-sm text-muted-foreground">{service.desc}</p>
    </motion.div>
  );
};

const ServicesSection = () => (
  <section id="services" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <TextReveal text="SERVICES" as="h2" className="text-3xl md:text-4xl font-bold text-center mb-16 justify-center heading-fancy" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
