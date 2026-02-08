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
  LuMicVocal,
  LuPalette,
} from "react-icons/lu";

const SERVICES = [
  { title: "Documentary", icon: LuFilm },
  { title: "Investigations\n& Research", icon: LuFileSearch },
  { title: "Drama &\nDocudrama", icon: LuClapperboard },
  { title: "Interview\nProduction", icon: LuMic },
  { title: "Full Episode\nProduction", icon: LuTv },
  { title: "Script\nDevelopment", icon: LuPenTool },
  { title: "International\nProduction", icon: LuGlobe },
  { title: "Voice Over", icon: LuMicVocal },
  { title: "Graphics", icon: LuPalette },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative min-h-screen flex flex-col items-center justify-center py-10">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-950" />

      <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What We Produce
          </h2>
        </motion.div>

        {/* Services Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <div className="flex flex-col items-center justify-center text-center h-36 sm:h-40 rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.04] cursor-pointer">
                  <Icon className="h-9 w-9 lg:h-10 lg:w-10 text-accent mb-3 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors whitespace-pre-line leading-tight">
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
