"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LuCamera, LuClapperboard, LuMusic } from "react-icons/lu";

type Service = {
  id: string;
  title: string;
  description: string;
  points: string[];
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    id: "cinematography",
    title: "Cinematography",
    description:
      "High-end camera work and lighting for commercials, films, and branded content.",
    points: [
      "Camera packages & crew",
      "Lighting design",
      "On-set monitoring",
      "Color pipeline",
    ],
    icon: (
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
        <LuCamera className="h-6 w-6" aria-hidden />
      </span>
    ),
  },
  {
    id: "production",
    title: "Production",
    description:
      "From pre-production to delivery — seamless production management and execution.",
    points: [
      "Scheduling & budgeting",
      "Location scouting",
      "Casting & crew",
      "Permits & logistics",
    ],
    icon: (
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
        <LuClapperboard className="h-6 w-6" aria-hidden />
      </span>
    ),
  },
  {
    id: "music",
    title: "Music & Sound",
    description:
      "Original music, licensing, and sound design that elevate the visual narrative.",
    points: [
      "Original scoring",
      "Sound design",
      "Voiceover & ADR",
      "Mix & master",
    ],
    icon: (
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
        <LuMusic className="h-6 w-6" aria-hidden />
      </span>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="w-full">
      <div className="mb-6 flex items-end justify-between">
        <h2
          id="services-heading"
          className="text-base/7 font-semibold tracking-wide text-white/80"
        >
          Our Services
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((svc, idx) => (
          <motion.article
            key={svc.id}
            className="relative overflow-hidden rounded-2xl bg-zinc-900/60 ring-1 ring-white/10 p-6 transition will-change-transform hover:-translate-y-0.5 hover:ring-white/20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
          >
            {/* Subtle always-present media layer (kept in DOM for SSR/CSR parity) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
            >
              {/* Soft radial pattern using CSS gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_20%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_80%_70%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_70%)]" />
            </div>

            {/* Icon */}
            <div className="mb-4">{svc.icon}</div>

            {/* Title & description */}
            <h3 className="text-lg font-semibold text-white">{svc.title}</h3>
            <p className="mt-1 text-sm text-white/70">
              {svc.description}
            </p>

            {/* Bullet points */}
            <ul className="mt-3 space-y-1.5 text-sm text-white/75">
              {svc.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-[6px] inline-block h-1.5 w-1.5 flex-none rounded-full bg-white/60" />
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              type="button"
              className="mt-4 inline-flex items-center rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-zinc-100 transition"
            >
              Learn More →
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
