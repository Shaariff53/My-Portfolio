import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ParticleField from "./ParticleField";

const services = [
  { title: "WEB DEVELOPMENT", desc: "Building full-stack web applications with React, TypeScript, and modern frameworks, delivering high-performance, scalable solutions" },
  { title: "N8N AUTOMATION", desc: "Creating intelligent automation workflows using n8n to streamline repetitive tasks and integrate business applications seamlessly" },
  { title: "AUTOMATION WORKFLOWS", desc: "Designing and implementing custom business process automation to boost productivity, reduce manual work, and enhance operational efficiency" },
  { title: "WORDPRESS WEBSITES", desc: "Building and customizing WordPress sites with responsive design, SEO optimization, and e-commerce capabilities tailored to your needs" },
  { title: "SHOPIFY WEBSITES", desc: "Building and customizing Shopify stores with seamless e-commerce functionality, payment integration, and conversion-optimized designs tailored to your brand" },
];

const HowIWorkSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="how-i-work" className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Services List */}
          <div className="flex-1 max-w-2xl">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-gilroy text-foreground mb-12 heading-fancy">
              WHAT I CAN DO FOR YOU
            </h2>

            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md">
              A full-stack creative developer blending design excellence with technical expertise. I craft stunning digital experiences and build scalable solutions that elevate your brand.
            </p>

            <div className="space-y-3">
              {services.map((service, index) => (
                <motion.button
                  key={service.title}
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full text-left group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between py-4 px-4 border-b border-border/30 hover:border-primary/50 hover:bg-primary/5 hover:pl-6 transition-all duration-300">
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 heading-fancy">
                      {index + 1}. {service.title}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedIndex === index ? "auto" : 0,
                      opacity: expandedIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 py-3 text-muted-foreground text-sm md:text-base">
                      {service.desc}
                    </p>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

          {/* Right side - Particle Animation */}
          <motion.div
            className="flex-1 hidden lg:block w-full h-[500px] relative"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ParticleField
              className="w-full h-full rounded-2xl"
              count={200}
              color="#b8864e"
              magnetRadius={120}
              ringRadius={80}
              particleSize={3}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowIWorkSection;
