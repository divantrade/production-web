'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';

const stats = [
  { id: '1', value: 50, label: 'Episodes Produced', suffix: '+' },
  { id: '2', value: 15, label: 'Countries Covered', suffix: '+' },
  { id: '3', value: 30, label: 'Clients & Networks', suffix: '+' },
  { id: '4', value: 10, label: 'Years of Experience', suffix: '+' },
];

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

  return (
    <section ref={ref} className="relative py-20 lg:py-24 overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Our Track Record ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Our Track Record</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            From Trusted Partner to Full Production House
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto">
            Over the years, we have built our expertise through collaborating with leading production companies and networks — delivering research, interviews, drama, and full episodes across the globe.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col items-center justify-center text-center h-40 sm:h-44 rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.04]">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2 transition-transform duration-300 group-hover:scale-110">
                  <Counter end={stat.value} suffix={stat.suffix} shouldStart={isInView} />
                </div>
                <p className="text-zinc-400 text-sm font-medium group-hover:text-zinc-300 transition-colors">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── How We Work ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">How We Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            One Team, Two Ways to Work
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto">
            Whether you need support on a single phase or a full production partner — we deliver with the same level of quality and dedication.
          </p>
        </motion.div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Sub-Production */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="relative h-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-7 lg:p-9 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]">
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
            <div className="relative h-full rounded-xl border border-accent/20 bg-accent/[0.04] p-7 lg:p-9 transition-all duration-300 hover:border-accent/35 hover:bg-accent/[0.07]">
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
