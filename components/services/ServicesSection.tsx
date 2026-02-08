"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuFileSearch, LuMic, LuClapperboard, LuFilm, LuArrowRight } from "react-icons/lu";

const SERVICES = [
  {
    id: "research",
    number: "01",
    title: "Research & Script Development",
    subtitle: "The Foundation of Every Great Documentary",
    description:
      "Our pre-production team specializes in deep documentary research, crafting compelling narratives that inform and captivate. From initial concept development to final script review, we build the intellectual backbone that great documentaries demand.",
    points: [
      "In-depth documentary research & fact-checking",
      "Script writing & treatment development",
      "Story structure & narrative design",
      "Content review & editorial consultation",
      "Subject matter expert coordination",
    ],
    icon: LuFileSearch,
    accent: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: "interviews",
    number: "02",
    title: "Interview Production",
    subtitle: "Global Reach, Local Expertise",
    description:
      "We produce professional interviews across multiple countries, coordinating local crews and managing every logistical detail. Our network spans the globe, ensuring you get the voices your story needs — wherever they are.",
    points: [
      "International interview coordination & scheduling",
      "Local crew & equipment sourcing worldwide",
      "Travel & logistics management",
      "Multi-language production support",
      "Remote & hybrid interview setups",
    ],
    icon: LuMic,
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "drama",
    number: "03",
    title: "Drama & Docudrama",
    subtitle: "Where Facts Meet Cinematic Storytelling",
    description:
      "Our drama team brings documentary narratives to life through carefully crafted dramatic sequences. From casting to set design, we produce docudrama content that adds emotional depth and visual impact to factual storytelling.",
    points: [
      "Docudrama scene production & direction",
      "Casting & talent management",
      "Set design & art direction",
      "Cinematic lighting & camera work",
      "Period-accurate production design",
    ],
    icon: LuClapperboard,
    accent: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "full-production",
    number: "04",
    title: "Full Episode Production",
    subtitle: "End-to-End Documentary Excellence",
    description:
      "From the first research note to broadcast-ready delivery, we handle complete documentary episode production. Our integrated team manages every stage of the process, delivering polished content that meets the highest industry standards.",
    points: [
      "Complete end-to-end episode production",
      "Post-production, editing & color grading",
      "Sound design, mixing & mastering",
      "Delivery to broadcast & streaming standards",
      "Multi-format output & distribution prep",
    ],
    icon: LuFilm,
    accent: "from-emerald-500/20 to-teal-500/20",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICES[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="w-full">
      {/* Tab Selectors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {SERVICES.map((svc, idx) => {
          const Icon = svc.icon;
          const isActive = idx === activeIndex;
          return (
            <button
              key={svc.id}
              onClick={() => setActiveIndex(idx)}
              className={`group relative text-left p-5 rounded-xl border transition-all duration-300 ${
                isActive
                  ? "border-accent/40 bg-accent/[0.06]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
              }`}
            >
              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-4 right-4 h-[2px] bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="flex items-center gap-3 mb-2">
                <Icon className={`h-5 w-5 ${isActive ? "text-accent" : "text-zinc-500 group-hover:text-zinc-300"} transition-colors`} />
                <span className={`text-xs font-mono ${isActive ? "text-accent" : "text-zinc-600"}`}>{svc.number}</span>
              </div>
              <h3 className={`text-sm font-semibold leading-tight ${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"} transition-colors`}>
                {svc.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Active Service Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08]"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${active.accent} opacity-30`} />
          <div className="absolute inset-0 bg-zinc-950/80" />

          <div className="relative grid lg:grid-cols-5 gap-10 p-8 lg:p-12">
            {/* Left: Content */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <ActiveIcon className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-accent text-xs font-mono font-bold tracking-wider">{active.number}</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">{active.title}</h3>
                </div>
              </div>

              <p className="text-lg text-accent/80 font-medium mb-4">{active.subtitle}</p>
              <p className="text-zinc-400 leading-relaxed mb-8">{active.description}</p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent/90 transition-colors"
              >
                Discuss This Service
                <LuArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Right: Feature Points */}
            <div className="lg:col-span-2 flex items-center">
              <div className="w-full space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">What&apos;s Included</p>
                {active.points.map((pt, idx) => (
                  <motion.div
                    key={pt}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{pt}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
