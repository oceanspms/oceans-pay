import { Quote } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const companies = [
  "Mondo",
  "Starling",
  "Gymshark",
  "Deliveroo",
  "Revolut",
  "OakNorth",
];

const testimonials = [
  {
    quote:
      "Oceans Pay cut our payroll processing time by 75%. The AI validation alone has saved us from at least three major HMRC penalties this year.",
    name: "Sarah Mitchell",
    role: "HR Director",
    company: "Gymshark",
    initials: "SM",
    color: "oklch(0.82 0.13 255)",
  },
  {
    quote:
      "We migrated 12 payrolls in under 4 hours. What normally takes us 3 months of dual-running was done before lunch. Genuinely remarkable.",
    name: "James Okafor",
    role: "CFO",
    company: "OakNorth",
    initials: "JO",
    color: "oklch(0.75 0.15 255)",
  },
  {
    quote:
      "As a payroll bureau managing 200+ employers, having one platform with real-time AI oversight is transformational. Our error rate is now zero.",
    name: "Claire Davies",
    role: "Payroll Manager",
    company: "Davies Bureau Ltd",
    initials: "CD",
    color: "oklch(0.82 0.13 255)",
  },
];

export function SocialProofSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="social-proof" className="relative py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`section-fade-in text-center mb-16 ${isVisible ? "visible" : ""}`}
        >
          <p className="eyebrow mb-4">Trusted by UK Businesses</p>
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-10 tracking-tight">
            Loved by the Teams{" "}
            <span className="gradient-text">Running UK Payroll</span>
          </h2>

          {/* Company logos */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {companies.map((company) => (
              <div
                key={company}
                className="px-5 py-2.5 rounded-full glass-card text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`card-stagger grid grid-cols-1 md:grid-cols-3 gap-6 ${isVisible ? "visible" : ""}`}
        >
          {testimonials.map(({ quote, name, role, company, initials }) => (
            <div
              key={name}
              className="glass-card glass-card-hover rounded-2xl p-8 flex flex-col gap-6"
              data-ocid="testimonials.card"
            >
              <Quote className="w-8 h-8 text-primary" />
              <p className="text-foreground/80 leading-relaxed flex-1 text-base italic">
                "{quote}"
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0 bg-primary">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {role}, {company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
