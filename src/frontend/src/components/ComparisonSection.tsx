import { Check, X } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const rows = [
  {
    feature: "Setup Time",
    traditional: "Weeks or months",
    oceans: "Hours, not months",
  },
  {
    feature: "Error Rate",
    traditional: "1–5% manual errors",
    oceans: "Near-zero with AI",
  },
  {
    feature: "Automation Level",
    traditional: "Mostly manual",
    oceans: "Fully automated",
  },
  {
    feature: "HMRC Compliance",
    traditional: "Manual updates",
    oceans: "Auto-updated, built-in",
  },
  {
    feature: "Migration",
    traditional: "Dual-running required",
    oceans: "AI-assisted, zero disruption",
  },
  {
    feature: "Multi-Employer",
    traditional: "Separate systems",
    oceans: "Unified dashboard",
  },
  {
    feature: "AI Assistant",
    traditional: "Not available",
    oceans: "24/7 intelligent co-pilot",
  },
];

export function ComparisonSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="comparison" className="relative py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`section-fade-in text-center mb-16 ${isVisible ? "visible" : ""}`}
        >
          <p className="eyebrow mb-4">Why Switch?</p>
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6 tracking-tight">
            Traditional Payroll{" "}
            <span className="gradient-text">vs Oceans Pay</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            The numbers don't lie. See why forward-thinking UK teams are
            switching.
          </p>
        </div>

        <div
          className={`section-fade-in glass-card rounded-3xl overflow-hidden shadow-glass ${isVisible ? "visible" : ""}`}
        >
          {/* Table header */}
          <div className="grid grid-cols-3 border-b border-border/50">
            <div className="p-5 lg:p-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Feature
            </div>
            <div className="p-5 lg:p-6 text-center border-l border-border/50 bg-destructive/5">
              <span className="text-sm font-bold text-destructive">
                Traditional Payroll
              </span>
            </div>
            <div className="p-5 lg:p-6 text-center border-l border-border/50 bg-primary/5">
              <span className="text-sm font-bold text-primary">
                Oceans Pay ✦
              </span>
            </div>
          </div>

          {/* Rows */}
          {rows.map(({ feature, traditional, oceans }, i) => (
            <div
              key={feature}
              className={`grid grid-cols-3 border-b border-border/30 last:border-b-0 ${
                i % 2 === 0 ? "" : "bg-card/30"
              }`}
              data-ocid={`comparison.row.${i + 1}`}
            >
              <div className="p-4 lg:p-5 text-sm font-semibold text-foreground">
                {feature}
              </div>
              <div className="p-4 lg:p-5 border-l border-border/30 flex items-center gap-2">
                <X className="w-4 h-4 shrink-0 text-destructive" />
                <span className="text-sm text-muted-foreground">
                  {traditional}
                </span>
              </div>
              <div className="p-4 lg:p-5 border-l border-border/30 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0 text-chart-2" />
                <span className="text-sm font-medium text-foreground">
                  {oceans}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`section-fade-in mt-10 text-center ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <a
            href="#final-cta"
            className="btn-primary inline-block px-8 py-3.5 text-base font-bold"
            data-ocid="comparison.primary_button"
          >
            Make the Switch Today →
          </a>
        </div>
      </div>
    </section>
  );
}
