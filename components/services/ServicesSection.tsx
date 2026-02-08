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
    <section id="services" className="relative py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-950" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What We Produce
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="group cursor-pointer"
              >
                <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.04] aspect-square justify-center">
                  <Icon className="h-10 w-10 text-accent mb-5 transition-transform duration-300 group-hover:scale-110" />
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
