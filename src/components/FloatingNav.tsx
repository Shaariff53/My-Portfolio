import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "CV", href: "/Profile.pdf", download: true },
];

const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
      if (isScrolled) {
        setExpanded(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed inset-x-0 z-[99] top-4 md:top-6 px-6 md:px-12 lg:px-20"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Main navbar - always visible on top */}
      <AnimatePresence mode="wait">
        {(!scrolled || expanded) ? (
          <motion.nav
            key="expanded"
            className="mx-auto max-w-[1600px] rounded-full bg-background/90 border border-border/40 shadow-lg px-4 py-2.5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-center gap-6">
              {/* Profile circle with initials */}
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary shrink-0">
                SM
              </div>

              {/* Navigation links - with divider */}
              <div className="flex items-center gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    download={link.download ? "Profile.pdf" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground hover-underline-slide transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Contact button */}
              <a
                href="#contact"
                className="px-5 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 shrink-0"
              >
                Contact
              </a>

              {/* Collapse button when scrolled */}
              {scrolled && (
                <button
                  onClick={() => setExpanded(false)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronUp size={16} />
                </button>
              )}
            </div>
          </motion.nav>
        ) : (
          <motion.button
            key="collapsed"
            onClick={() => setExpanded(true)}
            className="mx-auto max-w-[1600px] block rounded-full bg-background/90 border border-border/40 shadow-lg px-4 py-2.5 flex items-center gap-3 hover:bg-background transition-colors duration-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Profile circle */}
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
              SM
            </div>
            <span className="text-sm text-muted-foreground">Available for work</span>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingNav;
