"use client";

import { motion } from "framer-motion";
import { LuFileSearch, LuMic, LuClapperboard, LuFilm } from "react-icons/lu";
import { ReactNode } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  points: string[];
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    id: "research",
    title: "Research & Script Development",
    description:
      "In-depth research and scriptwriting that form the backbone of compelling documentary storytelling.",
    points: [
      "Documentary research & fact-checking",
      "Script & treatment writing",
      "Story development & structure",
      "Content review & editorial consultation",
    ],
    icon: <LuFileSearch className="h-6 w-6" aria-hidden />,
  },
  {
    id: "interviews",
    title: "Interview Production",
    description:
      "Professional interview production services across multiple countries, managed end-to-end by our experienced field teams.",
    points: [
      "International interview coordination",
      "Local crew & equipment sourcing",
      "Travel & logistics management",
      "Multi-language production support",
    ],
    icon: <LuMic className="h-6 w-6" aria-hidden />,
  },
  {
    id: "drama",
    title: "Drama & Docudrama",
    description:
      "Cinematic dramatic sequences and docudrama production that bring documentary narratives to life with powerful visuals.",
    points: [
      "Docudrama scene production",
      "Casting & talent direction",
      "Set design & art direction",
      "Cinematic lighting & camera work",
    ],
    icon: <LuClapperboard className="h-6 w-6" aria-hidden />,
  },
  {
    id: "full-production",
    title: "Full Episode Production",
    description:
      "Complete documentary episode production from concept to final delivery — research, filming, editing, and mastering.",
    points: [
      "End-to-end episode production",
      "Post-production & color grading",
      "Sound design & mixing",
      "Delivery to broadcast standards",
    ],
    icon: <LuFilm className="h-6 w-6" aria-hidden />,
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full">
      <div className="grid gap-6 md:grid-cols-2">
        {SERVICES.map((svc, idx) => (
          <motion.article
            key={svc.id}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.05]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            {/* Accent glow on hover */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            {/* Icon */}
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              {svc.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2">{svc.title}</h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-zinc-400 mb-5">
              {svc.description}
            </p>

            {/* Points */}
            <ul className="space-y-2.5">
              {svc.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent/60" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
