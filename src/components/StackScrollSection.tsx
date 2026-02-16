import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import chessImg from "@/assets/chess.png";
import gymImg from "@/assets/gymwebsite.png";
import huffmanImg from "@/assets/huffman.png";
import naqshImg from "@/assets/naqsh.png";

const projects = [
  { img: chessImg, type: "C++ & SFML", title: "Chess", desc: "Two-player chess game using OOP principles and SFML graphics library.", imgPosition: "center 30%" },
  { img: gymImg, type: "WEB DESIGN", title: "Gym Website", desc: "Responsive frontend design with modern layout and clean aesthetics.", imgPosition: "center center" },
  { img: huffmanImg, type: "C++", title: "Huffman Coding", desc: "Data compression algorithm implementation with efficient encoding.", imgPosition: "center center" },
  { img: naqshImg, type: "WORDPRESS", title: "Naqsh", desc: "Brand website with custom WordPress design and mobile-first approach.", imgPosition: "center center" },
];

const ProjectCard = ({
  project,
  index,
  totalCards,
  containerRef,
}: {
  project: (typeof projects)[0];
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;

  const scale = useTransform(scrollYProgress, [cardStart, cardEnd], [1, 0.92]);
  const y = useTransform(scrollYProgress, [cardStart, cardEnd], [0, -30]);

  return (
    <motion.div
      className="sticky top-32 mb-10"
      style={{ scale, y, zIndex: index + 1 }}
    >
      <motion.div
        className="rounded-2xl overflow-hidden max-w-5xl mx-auto relative bg-background group cursor-pointer"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Full background image */}
        <img
          src={project.img}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: project.imgPosition }}
          aria-hidden="true"
        />
        {/* Subtle bottom gradient - always visible for grounding */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Hover overlay - darkens on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-[background-color] duration-300 ease-out" />

        {/* Content - bottom left, appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-12 pb-8 md:pb-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300 ease-out">
          <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold tracking-wider uppercase mb-3 hover:scale-110 transition-transform duration-300">
            {project.type}
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent font-gilroy uppercase tracking-tight leading-[1.1] mb-2 heading-fancy">
            {project.title}
          </h3>
          <p className="text-accent/70 text-sm max-w-md leading-relaxed hover:text-accent/90 transition-colors duration-300">
            {project.desc}
          </p>
        </div>

        {/* Spacer to maintain card height */}
        <div className="min-h-[380px] md:min-h-[480px]" />
      </motion.div>
    </motion.div>
  );
};

const StackScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-sm tracking-[0.3em] text-primary mb-3 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          SELECTED WORK
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-20 font-gilroy heading-fancy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Projects
        </motion.h2>
        <div
          ref={containerRef}
          className="relative"
          style={{ minHeight: `${projects.length * 70}vh` }}
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              totalCards={projects.length}
              containerRef={containerRef as React.RefObject<HTMLDivElement>}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackScrollSection;
