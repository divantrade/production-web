'use client';

import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';

const subProductionItems = [
  'Research & scriptwriting for existing projects',
  'Interview production in any country',
  'Drama scenes for your documentary',
  'Specific production phases on demand',
];

const fullProductionItems = [
  'Complete documentary films from scratch',
  'Full documentary series & episodes',
  'End-to-end project management',
  'Broadcast-ready final delivery',
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">How We Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            One Team, Two Ways to Work
          </h2>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">
            Whether you need support on a single phase or a full production partner — we deliver with the same level of quality and dedication.
          </p>
        </motion.div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Sub-Production */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 lg:p-8"
          >
            <div className="mb-5">
              <span className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium uppercase tracking-wider">
                Production Services
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Need help with a specific phase?
            </h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              We partner with production companies worldwide, providing specialized support for any stage of documentary production.
            </p>
            <ul className="space-y-3">
              {subProductionItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <LuArrowRight className="h-4 w-4 text-accent flex-none mt-0.5" />
                  <span className="text-zinc-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Full Production */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl border border-accent/20 bg-accent/[0.04] p-6 lg:p-8"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-medium uppercase tracking-wider">
                  Full Production
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Want us to handle everything?
              </h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                From initial concept to broadcast-ready delivery, we produce complete documentaries and series with our experienced in-house team.
              </p>
              <ul className="space-y-3">
                {fullProductionItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <LuArrowRight className="h-4 w-4 text-accent flex-none mt-0.5" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
