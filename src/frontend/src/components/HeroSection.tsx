import { BadgeCheck, Globe, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" />;
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 radial-glow-hero" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(var(--background)) 0%, oklch(var(--card)) 100%)",
        }}
      />

      {/* Network canvas */}
      <NetworkCanvas />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(transparent, oklch(var(--background)))",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card">
          <div className="w-1.5 h-1.5 rounded-full bg-[oklch(var(--primary))] animate-pulse" />
          <span className="eyebrow">AI-Native UK Payroll</span>
        </div>

        {/* H1 */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
          <span className="text-[oklch(var(--foreground))]">Payroll. </span>
          <br className="sm:hidden" />
          <span className="gradient-text">Reimagined</span>
          <span className="text-[oklch(var(--foreground))]"> by AI.</span>
        </h1>

        {/* Subhead */}
        <p className="text-lg sm:text-xl text-[oklch(var(--muted-foreground))] max-w-2xl leading-relaxed font-medium">
          UK HMRC-compliant payroll software that{" "}
          <span className="text-[oklch(var(--foreground))] font-semibold">
            prevents errors before they happen
          </span>{" "}
          — not after.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#final-cta"
            className="btn-primary px-8 py-3.5 text-base font-bold"
            data-ocid="hero.primary_button"
          >
            Book a Demo
          </a>
          <a
            href="#video"
            className="btn-outline px-8 py-3.5 text-base font-bold"
            data-ocid="hero.secondary_button"
          >
            See It in Action →
          </a>
        </div>

        {/* Microcopy */}
        <p className="text-sm text-[oklch(var(--muted-foreground))]">
          No commitment · Switch in hours, not months
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          {[
            { icon: BadgeCheck, label: "HMRC Recognised" },
            { icon: ShieldCheck, label: "Secure & Compliant" },
            { icon: Globe, label: "Built for UK Payroll" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-[oklch(var(--muted-foreground))]"
            >
              <Icon className="w-4 h-4 text-[oklch(var(--primary))]" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="w-full max-w-3xl mt-8 glass-card rounded-3xl overflow-hidden shadow-[0_32px_80px_oklch(var(--foreground)/0.12),0_0_60px_oklch(var(--primary)/0.08)]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[oklch(var(--border)/0.5)] bg-[oklch(var(--card)/0.8)]">
            <div className="w-3 h-3 rounded-full bg-[oklch(var(--destructive))]" />
            <div className="w-3 h-3 rounded-full bg-[oklch(0.80_0.15_80)]" />
            <div className="w-3 h-3 rounded-full bg-[oklch(var(--chart-2))]" />
            <div className="ml-4 text-xs text-[oklch(var(--muted-foreground))]">
              app.oceanspay.co.uk — Payroll Dashboard
            </div>
          </div>

          {/* Mockup content */}
          <div className="p-6 bg-[oklch(var(--card)/0.6)] grid grid-cols-3 gap-4">
            {/* Stat cards */}
            {[
              {
                label: "Payrolls Processed",
                value: "1,284",
                color: "oklch(var(--primary))",
                change: "+12%",
              },
              {
                label: "Error Rate",
                value: "0.0%",
                color: "oklch(var(--chart-2))",
                change: "AI Protected",
              },
              {
                label: "Next Pay Run",
                value: "31 Mar",
                color: "oklch(var(--primary))",
                change: "On track",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4 bg-[oklch(var(--card)/0.8)] border border-[oklch(var(--border)/0.5)]"
              >
                <p className="text-xs text-[oklch(var(--muted-foreground))] mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-1" style={{ color: stat.color }}>
                  {stat.change}
                </p>
              </div>
            ))}

            {/* Progress bar section */}
            <div className="col-span-2 rounded-2xl p-4 bg-[oklch(var(--card)/0.8)] border border-[oklch(var(--border)/0.5)]">
              <p className="text-xs text-[oklch(var(--muted-foreground))] mb-3">
                AI Validation Status
              </p>
              {[
                { label: "Tax Calculations", pct: 100 },
                { label: "NI Contributions", pct: 100 },
                { label: "HMRC Submission", pct: 94 },
              ].map((row) => (
                <div key={row.label} className="mb-2">
                  <div className="flex justify-between text-xs text-[oklch(var(--muted-foreground))] mb-1">
                    <span>{row.label}</span>
                    <span className="text-[oklch(var(--primary))]">
                      {row.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[oklch(var(--muted))]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[oklch(var(--primary))] to-[oklch(var(--chart-2))]"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Alert card */}
            <div className="rounded-2xl p-4 bg-[oklch(var(--card)/0.8)] border border-[oklch(var(--border)/0.5)]">
              <p className="text-xs text-[oklch(var(--muted-foreground))] mb-2">
                AI Alerts
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[oklch(var(--chart-2))]" />
                  <span className="text-[oklch(var(--muted-foreground))]">
                    0 errors detected
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[oklch(var(--primary))]" />
                  <span className="text-[oklch(var(--muted-foreground))]">
                    3 auto-fixed
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[oklch(var(--primary))]" />
                  <span className="text-[oklch(var(--muted-foreground))]">
                    Ready to submit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
