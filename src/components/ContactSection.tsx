import { useState } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const inputClasses =
    "w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 text-sm";

  return (
    <section id="contact" className="py-32 px-6" aria-label="Contact form">
      <div className="max-w-xl mx-auto">
        <motion.p
          className="text-sm tracking-[0.3em] text-primary mb-3 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          CONTACT
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-4 font-gilroy heading-fancy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground mb-12 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Send me a message and I'll respond as soon as possible.
        </motion.p>

        <motion.form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onSubmit={() => setSubmitted(true)}
        >
          <input type="hidden" name="access_key" value="" />
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Name" required className={inputClasses} autoComplete="name" />
            <input type="email" name="email" placeholder="Email" required className={inputClasses} autoComplete="email" />
          </div>
          <input type="text" name="message_subject" placeholder="Subject" required className={inputClasses} autoComplete="off" />
          <textarea name="message" placeholder="Your message..." required rows={5} className={`${inputClasses} resize-none`} />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
            data-cursor-hover
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
