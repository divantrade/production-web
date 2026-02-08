"use client";

import { motion } from "framer-motion";
import {
  LuFileSearch,
  LuMic,
  LuClapperboard,
  LuFilm,
  LuTv,
  LuPenTool,
  LuGlobe,
} from "react-icons/lu";

const SERVICES = [
  { title: "Documentary", icon: LuFilm },
  { title: "Investigations\n& Research", icon: LuFileSearch },
  { title: "Drama &\nDocudrama", icon: LuClapperboard },
  { title: "Interview\nProduction", icon: LuMic },
  { title: "Full Episode\nProduction", icon: LuTv },
  { title: "Script\nDevelopment", icon: LuPenTool },
  { title: "International\nProduction", icon: LuGlobe },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-950" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What We Produce
          </h2>
        </motion.div>

        {/* Services - Flex wrap with centered last row */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6">
          {SERVICES.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="group w-[calc(50%-0.5rem)] sm:w-44 lg:w-52"
              >
                <div className="aspect-square flex flex-col items-center justify-center text-center rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.04] cursor-pointer">
                  <Icon className="h-10 w-10 lg:h-12 lg:w-12 text-accent mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors whitespace-pre-line leading-tight">
                    {svc.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
