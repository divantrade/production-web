'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08)_0%,transparent_60%)]" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            {t('label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('heading')}
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent/90 transition-all duration-300 hover:scale-105"
            >
              {t('getInTouch')}
            </a>
            <a
              href={`/${locale}/work`}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-white/40 hover:bg-white/5 transition-all duration-300 hover:scale-105"
            >
              {t('viewWork')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
