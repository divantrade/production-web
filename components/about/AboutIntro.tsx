'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function AboutIntro() {
  const t = useTranslations('about');
  const paragraphs = t.raw('storyParagraphs') as string[];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            {t('heroTagline')}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('heroHeading')}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('heroDescription')}
          </p>
        </motion.div>
      </section>

      {/* Who we are */}
      <section className="relative py-20 lg:py-24 bg-zinc-950">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-6 sm:px-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            {t('storyHeading')}
          </h2>
          <div className="space-y-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-zinc-400 text-base md:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
