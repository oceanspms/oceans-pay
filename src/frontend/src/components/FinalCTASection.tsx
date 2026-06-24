import { useScrollAnimation } from "../hooks/useScrollAnimation";

export function FinalCTASection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="final-cta"
      className="relative py-32 lg:py-40 px-4 sm:px-6 overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 radial-glow-cta" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[oklch(0.82_0.13_195/0.06)] blur-3xl" />

      {/* Ring ornament */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[oklch(0.82_0.13_195/0.06)] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[oklch(0.82_0.13_195/0.08)] pointer-events-none" />

      <div
        ref={ref}
        className={`section-fade-in relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-8 ${isVisible ? "visible" : ""}`}
      >
        <p className="eyebrow">Get Started Today</p>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[oklch(0.96_0.01_240)] leading-tight tracking-tight">
          Stop Fixing Payroll Errors. <br />
          <span className="gradient-text">Start Preventing Them.</span>
        </h2>

        <p className="text-lg text-[oklch(0.72_0.04_240)] max-w-lg">
          Join hundreds of UK businesses running payroll with confidence. No
          penalties. No stress. No errors.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            className="btn-teal px-10 py-4 text-lg font-bold"
            data-ocid="cta.primary_button"
          >
            Book a Demo
          </button>
          <button
            type="button"
            className="btn-outline px-10 py-4 text-lg font-bold"
            data-ocid="cta.secondary_button"
          >
            Start Free Trial
          </button>
        </div>

        <p className="text-sm text-[oklch(0.62_0.04_240)]">
          No credit card required · Free 30-day trial · Cancel anytime
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-[oklch(0.25_0.05_240/0.4)] w-full">
          {[
            { value: "0%", label: "Error rate" },
            { value: "< 2h", label: "Migration time" },
            { value: "99.99%", label: "Platform uptime" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl lg:text-4xl font-black teal-glow mb-1">
                {value}
              </p>
              <p className="text-sm text-[oklch(0.62_0.04_240)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
