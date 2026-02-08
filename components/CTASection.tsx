'use client';

import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08)_0%,transparent_60%)]" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to bring your story to life?
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Whether it is a single episode or a full documentary series, our team is ready to deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-black font-semibold text-lg hover:bg-accent/90 transition-colors duration-300"
            >
              Get in Touch
            </a>
            <a
              href="/work"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
