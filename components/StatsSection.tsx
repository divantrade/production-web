'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { id: '1', value: 50, label: 'Episodes Produced', suffix: '+' },
  { id: '2', value: 15, label: 'Countries Covered', suffix: '+' },
  { id: '3', value: 30, label: 'Clients & Networks', suffix: '+' },
  { id: '4', value: 10, label: 'Years of Experience', suffix: '+' },
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

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Our Track Record</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From Trusted Partner to Full Production House
          </h2>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">
            Over the years, we have built our expertise through collaborating with leading production companies and networks — delivering research, interviews, drama, and full episodes across the globe.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                <Counter end={stat.value} suffix={stat.suffix} shouldStart={isInView} />
              </div>
              <p className="text-zinc-400 text-sm font-medium">{stat.label}</p>
              <div className="w-8 h-px bg-accent/30 mx-auto mt-3" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
