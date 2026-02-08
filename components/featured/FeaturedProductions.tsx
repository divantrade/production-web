import Image from "next/image";

type Production = {
  title: string;
  category: string;
  poster: string; // public path e.g. /images/...
  previewVideo?: string; // public path e.g. /videos/...
};

const PRODUCTIONS: Production[] = [
  {
    title: "Desert Mirage",
    category: "Commercial",
    poster: "/images/productions/desert-mirage.jpg",
    previewVideo: "/videos/productions/desert-mirage-preview.mp4",
  },
  {
    title: "City Lights",
    category: "Music Video",
    poster: "/images/productions/city-lights.jpg",
    // No preview video for this one
  },
  {
    title: "Echoes of Time",
    category: "Short Film",
    poster: "/images/productions/echoes-of-time.jpg",
    previewVideo: "/videos/productions/echoes-of-time-preview.mp4",
  },
];

export default function FeaturedProductions() {
  return (
    <section className="w-full">
      {/* Mobile: horizontal scroll-snap carousel; Desktop: grid */}
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [-webkit-overflow-scrolling:touch]
                   lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {PRODUCTIONS.map((item) => (
          <article
            key={item.title}
            className="group relative min-w-[85%] snap-center overflow-hidden rounded-xl ring-1 ring-white/10 transition
                       hover:ring-white/20 hover:-translate-y-0.5 md:min-w-[60%] lg:min-w-0 will-change-transform"
          >
            {/* Media container with fixed aspect ratio */}
            <div className="relative aspect-[3/4] w-full bg-zinc-900">
              {/* Poster Image */}
              <Image
                src={item.poster}
                alt={`${item.title} poster`}
                fill
                sizes="(min-width: 1024px) 33vw, 85vw"
                className="object-cover"
                priority={false}
                loading="lazy"
              />

              {/* Hover preview video (if exists) */}
              {item.previewVideo ? (
                <video
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300
                             group-hover:opacity-100"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={item.previewVideo} type="video/mp4" />
                </video>
              ) : null}

              {/* Play icon (visible on hover) */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300
                           group-hover:opacity-100"
                aria-hidden
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/40 ring-1 ring-white/30 backdrop-blur">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="text-white"
                  >
                    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                  </svg>
                </span>
              </div>

              {/* Bottom gradient with title & category */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0">
                <div className="bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-4 pt-16">
                  <p className="text-xs font-medium uppercase tracking-wide text-white/70">{item.category}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                </div>
              </div>
            </div>

            {/* Focus ring for accessibility if this becomes interactive later */}
            <span className="absolute inset-0 rounded-xl ring-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60" />
          </article>
        ))}
      </div>
    </section>
  );
}
