import {
  BarChart3,
  Bot,
  Brain,
  Building2,
  FileText,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const features = [
  {
    icon: Brain,
    title: "AI Error Prevention Engine",
    desc: "Proactively detects and corrects payroll anomalies before submission.",
  },
  {
    icon: ShieldCheck,
    title: "HMRC Compliance Built-in",
    desc: "Always up-to-date with UK tax law, NI rates, and RTI requirements.",
  },
  {
    icon: Building2,
    title: "Multi-Employer Management",
    desc: "Manage unlimited payrolls and employers from a single dashboard.",
  },
  {
    icon: Zap,
    title: "Lightning-Fast Migration",
    desc: "Switch in hours, not months. Our AI imports and validates your data instantly.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Payroll Insights",
    desc: "Live dashboards with trend analysis, cost breakdowns, and predictive alerts.",
  },
  {
    icon: Lock,
    title: "Secure Cloud Infrastructure",
    desc: "ISO 27001-aligned security with end-to-end encryption and GDPR compliance.",
  },
  {
    icon: FileText,
    title: "Automated Reporting & Submissions",
    desc: "One-click HMRC submissions, payslip distribution, and audit-ready reports.",
  },
  {
    icon: Bot,
    title: "Intelligent Payroll Assistant",
    desc: "Ask questions, get answers. Your AI co-pilot for every payroll scenario.",
  },
];

export function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" className="relative py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`section-fade-in text-center mb-16 ${isVisible ? "visible" : ""}`}
        >
          <p className="eyebrow mb-4">Features</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[oklch(0.96_0.01_240)] mb-6 tracking-tight">
            Everything You Need.{" "}
            <span className="gradient-text">Nothing You Don't.</span>
          </h2>
          <p className="text-lg text-[oklch(0.72_0.04_240)] max-w-xl mx-auto">
            Purpose-built for UK payroll professionals who demand precision,
            speed, and compliance.
          </p>
        </div>

        <div
          className={`card-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ${isVisible ? "visible" : ""}`}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4"
              data-ocid="features.card"
            >
              <div className="w-11 h-11 rounded-xl bg-[oklch(0.82_0.13_195/0.12)] border border-[oklch(0.82_0.13_195/0.25)] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[oklch(0.82_0.13_195)]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[oklch(0.96_0.01_240)] mb-2 leading-tight">
                  {title}
                </h3>
                <p className="text-sm text-[oklch(0.72_0.04_240)] leading-relaxed">
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
