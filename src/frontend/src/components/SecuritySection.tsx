import { FileCheck, Lock, Server, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const badges = [
  {
    icon: FileCheck,
    title: "HMRC Recognised Software",
    desc: "Officially recognised by HMRC for RTI submissions and payroll tax reporting.",
    tag: "Certified",
  },
  {
    icon: ShieldCheck,
    title: "GDPR Compliant",
    desc: "Full UK GDPR compliance with data processing agreements and employee rights baked in.",
    tag: "Compliant",
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Encryption",
    desc: "AES-256 encryption at rest and in transit. Zero-knowledge architecture for maximum privacy.",
    tag: "Secured",
  },
  {
    icon: Server,
    title: "Secure Cloud Architecture",
    desc: "ISO 27001-aligned infrastructure hosted in UK data centres with 99.99% uptime SLA.",
    tag: "ISO 27001",
  },
];

export function SecuritySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="security" className="relative py-24 lg:py-32 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[oklch(var(--primary)/0.2)] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`section-fade-in text-center mb-16 ${isVisible ? "visible" : ""}`}
        >
          <p className="eyebrow mb-4">Enterprise-Grade Security</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[oklch(var(--foreground))] mb-6 tracking-tight">
            Built for Trust.{" "}
            <span className="gradient-text">Certified for Compliance.</span>
          </h2>
          <p className="text-lg text-[oklch(var(--muted-foreground))] max-w-xl mx-auto">
            Payroll data is some of the most sensitive data your organisation
            holds. We treat it that way.
          </p>
        </div>

        <div
          className={`card-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${isVisible ? "visible" : ""}`}
        >
          {badges.map(({ icon: Icon, title, desc, tag }) => (
            <div
              key={title}
              className="glass-card glass-card-hover rounded-2xl p-6 text-center flex flex-col items-center gap-4"
              data-ocid="security.card"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[oklch(var(--primary)/0.12)] border border-[oklch(var(--primary)/0.3)] flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[oklch(var(--primary))]" />
                </div>
                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[oklch(var(--primary))] text-[oklch(var(--primary-foreground))] text-xs font-bold">
                  {tag}
                </div>
              </div>
              <h3 className="text-base font-bold text-[oklch(var(--foreground))]">
                {title}
              </h3>
              <p className="text-sm text-[oklch(var(--muted-foreground))] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
