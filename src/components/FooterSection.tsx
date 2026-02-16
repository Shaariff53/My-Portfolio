import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import GlassIcons from "./GlassIcons";

const socialItems = [
  {
    icon: <Github className="w-full h-full" />,
    color: "gold",
    label: "GitHub",
    href: "https://github.com/Shaariff53",
  },
  {
    icon: <Linkedin className="w-full h-full" />,
    color: "gold",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shaariff-mujtaba-19a939327/",
  },
  {
    icon: <Mail className="w-full h-full" />,
    color: "gold",
    label: "Email",
    href: "mailto:shaariff1234@gmail.com",
  },
  {
    icon: <MessageCircle className="w-full h-full" />,
    color: "gold",
    label: "WhatsApp",
    href: "https://wa.me/923215052302",
  },
];

const FooterSection = () => (
  <footer className="py-20 px-6 border-t border-border/30" role="contentinfo">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassIcons items={socialItems} />
      </motion.div>

      <motion.div
        className="text-center mt-16 space-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-default">
          © {new Date().getFullYear()} Shaariff Mujtaba
        </p>
        <p className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 cursor-default">
          Designed & Built with intention
        </p>
      </motion.div>
    </div>
  </footer>
);

export default FooterSection;
