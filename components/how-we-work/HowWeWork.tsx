'use client';

import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

export default function HowWeWork() {
  const t = useTranslations('howWeWork');

  const subProductionItems = [
    t('subProduction.items.0'),
    t('subProduction.items.1'),
    t('subProduction.items.2'),
    t('subProduction.items.3'),
  ];

  const fullProductionItems = [
    t('fullProduction.items.0'),
    t('fullProduction.items.1'),
    t('fullProduction.items.2'),
    t('fullProduction.items.3'),
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />

      <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{t('label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('heading')}
          </h2>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Spacer */}
        <div style={{ height: '60px' }} />

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Sub-Production */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="relative h-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 lg:p-8 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]">
              <div className="mb-5">
                <span className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium uppercase tracking-wider">
                  {t('subProduction.badge')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('subProduction.heading')}
              </h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                {t('subProduction.description')}
              </p>
              <ul className="space-y-3">
                {subProductionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <LuArrowRight className="h-4 w-4 text-accent flex-none mt-0.5 rtl:rotate-180" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Full Production */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="relative h-full rounded-xl border border-accent/20 bg-accent/[0.04] p-6 lg:p-8 transition-all duration-300 hover:border-accent/35 hover:bg-accent/[0.07]">
              <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative">
                <div className="mb-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-medium uppercase tracking-wider">
                    {t('fullProduction.badge')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t('fullProduction.heading')}
                </h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                  {t('fullProduction.description')}
                </p>
                <ul className="space-y-3">
                  {fullProductionItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <LuArrowRight className="h-4 w-4 text-accent flex-none mt-0.5 rtl:rotate-180" />
                      <span className="text-zinc-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
