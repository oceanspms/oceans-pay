import { Brain, RefreshCw, Shield, Zap } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const differentiators = [
  {
    icon: Brain,
    title: "AI Prevents Errors Before Submission",
    desc: "Our AI engine validates every calculation in real-time, catching issues before they reach HMRC.",
  },
  {
    icon: Shield,
    title: "HMRC-Aligned Smart Compliance",
    desc: "Built-in compliance guides auto-update with every tax year, legislative change, and regulatory update.",
  },
  {
    icon: Zap,
    title: "Real-Time Validation & Alerts",
    desc: "Instant anomaly detection flags discrepancies the moment data is entered — zero lag, zero surprises.",
  },
  {
    icon: RefreshCw,
    title: "Fully Automated Workflows",
    desc: "From data import to HMRC submission, Oceans Pay automates every step of your payroll cycle.",
  },
];

export function SolutionSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="solution" className="relative py-24 lg:py-32 px-4 sm:px-6">
      {/* Subtle divider glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24 bg-gradient-to-b from-transparent to-[oklch(var(--primary)/0.3)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`section-fade-in text-center mb-16 ${isVisible ? "visible" : ""}`}
        >
          <p className="eyebrow mb-4">The Solution</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[oklch(var(--foreground))] mb-6 tracking-tight">
            Meet <span className="primary-glow">Oceans Pay</span>
          </h2>
          <p className="text-lg text-[oklch(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed">
            We didn't rebuild traditional payroll software. We created something
            entirely new — an AI-native platform designed from the ground up to
            eliminate errors, not just report them.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {differentiators.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`section-fade-in glass-card glass-card-hover rounded-2xl p-6 lg:p-8 flex gap-5 ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[oklch(var(--primary)/0.15)] border border-[oklch(var(--primary)/0.3)] flex items-center justify-center">
                <Icon className="w-6 h-6 text-[oklch(var(--primary))]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[oklch(var(--foreground))] mb-2">
                  {title}
                </h3>
                <p className="text-[oklch(var(--muted-foreground))] leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
