import { Brain, CheckCircle2, Upload } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Import Your Data",
    desc: "Connect your existing payroll system or upload a file. Our AI automatically maps, cleanses, and validates your data — no manual reformatting required.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Validates & Optimizes",
    desc: "Our engine runs thousands of compliance checks in seconds. Every tax code, NI category, and pension contribution is verified against the latest HMRC rules.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Run Payroll with Confidence",
    desc: "Approve your pay run with one click. Payslips are distributed, RTI is filed, and your full audit trail is ready — all automated, all compliant.",
  },
];

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="how-it-works"
      className="relative py-24 lg:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[oklch(0.82_0.13_195/0.03)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`section-fade-in text-center mb-16 ${isVisible ? "visible" : ""}`}
        >
          <p className="eyebrow mb-4">How It Works</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[oklch(0.96_0.01_240)] mb-6 tracking-tight">
            Payroll in <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-[oklch(0.72_0.04_240)] max-w-xl mx-auto">
            From data import to HMRC submission in minutes, not months.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connector lines on desktop */}
          <div className="hidden lg:block absolute top-16 left-1/3 right-1/3 h-px">
            <div className="h-px bg-gradient-to-r from-[oklch(0.82_0.13_195/0.5)] to-transparent w-full" />
          </div>
          <div className="hidden lg:block absolute top-16 left-2/3 right-0 h-px">
            <div className="h-px bg-gradient-to-r from-[oklch(0.82_0.13_195/0.5)] to-transparent w-full" />
          </div>

          {steps.map(({ number, icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`section-fade-in glass-card rounded-2xl p-8 text-center relative ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
              data-ocid={`how-it-works.item.${i + 1}`}
            >
              {/* Step number */}
              <div className="text-7xl font-black text-[oklch(0.82_0.13_195/0.08)] leading-none mb-6 select-none">
                {number}
              </div>

              <div className="w-14 h-14 rounded-2xl bg-[oklch(0.82_0.13_195/0.15)] border border-[oklch(0.82_0.13_195/0.3)] flex items-center justify-center mx-auto mb-5">
                <Icon className="w-7 h-7 text-[oklch(0.82_0.13_195)]" />
              </div>

              <h3 className="text-xl font-bold text-[oklch(0.96_0.01_240)] mb-3">
                {title}
              </h3>
              <p className="text-[oklch(0.72_0.04_240)] leading-relaxed">
                {desc}
              </p>

              {/* Step connector dot */}
              {i < 2 && (
                <div className="hidden lg:block absolute -right-4 top-16 w-8 h-8 rounded-full border-2 border-[oklch(0.82_0.13_195/0.5)] bg-[oklch(0.08_0.025_240)] flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-[oklch(0.82_0.13_195)]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
