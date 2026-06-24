import { AlertCircle, Clock, Eye, FileWarning } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const painPoints = [
  {
    icon: AlertCircle,
    title: "Manual Errors → Costly Penalties",
    desc: "A single miscalculation triggers HMRC penalties, late filing charges, and hours of manual remediation work.",
  },
  {
    icon: Clock,
    title: "Weeks of Migration Pain",
    desc: "Switching payroll providers takes months of data exports, imports, re-validation, and dual-running at enormous cost.",
  },
  {
    icon: FileWarning,
    title: "Complex Compliance Maze",
    desc: "RTI submissions, auto-enrolment, IR35, NI categories — staying compliant requires constant expert oversight.",
  },
  {
    icon: Eye,
    title: "No Visibility Across Payrolls",
    desc: "Managing multiple employers or payrolls means scattered spreadsheets and zero consolidated reporting.",
  },
];

export function ProblemSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="problem" className="relative py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`section-fade-in text-center mb-16 ${isVisible ? "visible" : ""}`}
        >
          <p className="eyebrow mb-4">The Problem</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[oklch(0.96_0.01_240)] mb-6 tracking-tight">
            Payroll Shouldn't Be This Hard
          </h2>
          <p className="text-lg text-[oklch(0.72_0.04_240)] max-w-xl mx-auto">
            UK employers lose millions each year to avoidable payroll errors,
            slow migrations, and compliance failures.
          </p>
        </div>

        <div
          className={`card-stagger grid grid-cols-1 sm:grid-cols-2 gap-6 ${isVisible ? "visible" : ""}`}
        >
          {painPoints.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card glass-card-hover rounded-2xl p-6 lg:p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.65_0.18_25/0.15)] border border-[oklch(0.65_0.18_25/0.3)] flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-[oklch(0.65_0.18_25)]" />
              </div>
              <h3 className="text-xl font-bold text-[oklch(0.96_0.01_240)] mb-3">
                {title}
              </h3>
              <p className="text-[oklch(0.72_0.04_240)] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
