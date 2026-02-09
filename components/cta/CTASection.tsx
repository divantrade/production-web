'use client';

import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative w-full max-w-[1170px] mx-auto px-6 sm:px-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-accent/10 via-accent/[0.06] to-transparent border border-accent/20 px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 text-center"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Let&apos;s Work Together
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to bring your story to life?
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Whether it is a single episode or a full documentary series, our team is ready to deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent/90 transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </a>
            <a
              href="/work"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-white/40 hover:bg-white/5 transition-all duration-300 hover:scale-105"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
