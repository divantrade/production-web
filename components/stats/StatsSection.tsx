'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const statKeys = ['episodesProduced', 'countriesCovered', 'clientsNetworks', 'yearsExperience'] as const;
const statValues = [50, 15, 30, 10];

function Counter({ end, suffix = '', shouldStart }: { end: number; suffix?: string; shouldStart: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number;
    let frame: number;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = (ts - startTime) / 2000;
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, shouldStart]);

  return <span>{count}{suffix}</span>;
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const tStats = useTranslations('stats');

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center py-20 lg:py-24 overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{tStats('label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {tStats('heading')}
          </h2>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">
            {tStats('description')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col items-center justify-center text-center h-40 sm:h-44 rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.04]">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2 transition-transform duration-300 group-hover:scale-110">
                  <Counter end={statValues[index]} suffix="+" shouldStart={isInView} />
                </div>
                <p className="text-zinc-400 text-sm font-medium group-hover:text-zinc-300 transition-colors">{tStats(key)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
