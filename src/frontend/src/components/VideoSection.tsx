import { Play } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const videos = [
  {
    title: "Product Overview",
    caption: "See the full Oceans Pay platform in 3 minutes",
    gradient: "from-[oklch(0.15_0.06_220)] to-[oklch(0.10_0.04_240)]",
    duration: "3:12",
  },
  {
    title: "AI Error Prevention Demo",
    caption: "Watch AI catch and fix payroll errors in real time",
    gradient: "from-[oklch(0.14_0.07_200)] to-[oklch(0.09_0.03_240)]",
    duration: "5:47",
    featured: true,
  },
  {
    title: "Migration Walkthrough",
    caption: "Migrate your existing payroll in under 2 hours",
    gradient: "from-[oklch(0.12_0.05_230)] to-[oklch(0.09_0.03_240)]",
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
          <h2 className="text-4xl lg:text-5xl font-black text-[oklch(0.96_0.01_240)] mb-6 tracking-tight">
            See <span className="teal-glow">Oceans Pay</span> in Action
          </h2>
          <p className="text-lg text-[oklch(0.72_0.04_240)] max-w-xl mx-auto">
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
                  ? "ring-1 ring-[oklch(0.82_0.13_195/0.4)] shadow-teal"
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
                      "linear-gradient(oklch(0.82 0.13 195 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.13 195 / 0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Duration badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-[oklch(0.08_0.025_240/0.8)] text-xs text-[oklch(0.72_0.04_240)] font-medium">
                  {duration}
                </div>

                {/* Play button */}
                <div className="relative flex items-center justify-center">
                  <div className="play-pulse absolute w-16 h-16 rounded-full bg-[oklch(0.82_0.13_195/0.2)] border border-[oklch(0.82_0.13_195/0.4)]" />
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[oklch(0.82_0.13_195)] flex items-center justify-center shadow-teal group-hover:scale-110 transition-transform duration-300">
                    <Play
                      className="w-5 h-5 text-[oklch(0.08_0.025_240)] ml-0.5"
                      fill="oklch(0.08 0.025 240)"
                    />
                  </div>
                </div>

                {featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[oklch(0.82_0.13_195)] text-xs text-[oklch(0.08_0.025_240)] font-bold">
                    Featured
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="p-5">
                <h3 className="text-base font-bold text-[oklch(0.96_0.01_240)] mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-[oklch(0.72_0.04_240)]">{caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
