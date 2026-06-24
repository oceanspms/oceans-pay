import { Play } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const videos = [
  {
    title: "Product Overview",
    caption: "See the full Oceans Pay platform in 3 minutes",
    gradient: "from-[oklch(var(--card))] to-[oklch(var(--background))]",
    duration: "3:12",
  },
  {
    title: "AI Error Prevention Demo",
    caption: "Watch AI catch and fix payroll errors in real time",
    gradient: "from-[oklch(var(--card))] to-[oklch(var(--background))]",
    duration: "5:47",
    featured: true,
  },
  {
    title: "Migration Walkthrough",
    caption: "Migrate your existing payroll in under 2 hours",
    gradient: "from-[oklch(var(--card))] to-[oklch(var(--background))]",
    duration: "4:23",
  },
];

export function VideoSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="video" className="relative py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`section-fade-in text-center mb-16 ${isVisible ? "visible" : ""}`}
        >
          <p className="eyebrow mb-4">See It in Action</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[oklch(var(--foreground))] mb-6 tracking-tight">
            See <span className="primary-glow">Oceans Pay</span> in Action
          </h2>
          <p className="text-lg text-[oklch(var(--muted-foreground))] max-w-xl mx-auto">
            Watch how teams eliminate payroll errors and cut processing time by
            80%.
          </p>
        </div>

        <div
          className={`card-stagger grid grid-cols-1 md:grid-cols-3 gap-6 ${isVisible ? "visible" : ""}`}
        >
          {videos.map(({ title, caption, gradient, duration, featured }) => (
            <div
              key={title}
              className={`glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer group ${
                featured
                  ? "ring-1 ring-[oklch(var(--primary)/0.4)] shadow-[0_4px_24px_oklch(var(--primary)/0.35)]"
                  : ""
              }`}
              data-ocid="video.card"
            >
              {/* Thumbnail */}
              <div
                className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}
              >
                {/* Grid lines overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary) / 0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Duration badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-[oklch(var(--background)/0.8)] text-xs text-[oklch(var(--muted-foreground))] font-medium">
                  {duration}
                </div>

                {/* Play button */}
                <div className="relative flex items-center justify-center">
                  <div className="play-pulse absolute w-16 h-16 rounded-full bg-[oklch(var(--primary)/0.2)] border border-[oklch(var(--primary)/0.4)]" />
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[oklch(var(--primary))] flex items-center justify-center shadow-[0_4px_24px_oklch(var(--primary)/0.35)] group-hover:scale-110 transition-transform duration-300">
                    <Play
                      className="w-5 h-5 text-[oklch(var(--primary-foreground))] ml-0.5"
                      fill="oklch(var(--primary-foreground))"
                    />
                  </div>
                </div>

                {featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[oklch(var(--primary))] text-xs text-[oklch(var(--primary-foreground))] font-bold">
                    Featured
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="p-5">
                <h3 className="text-base font-bold text-[oklch(var(--foreground))] mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-[oklch(var(--muted-foreground))]">
                  {caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
