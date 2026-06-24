import { Linkedin, Twitter, Waves } from "lucide-react";

const links: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Overview", href: "#hero" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#comparison" },
    { label: "Changelog", href: "#hero" },
  ],
  Features: [
    { label: "AI Error Prevention", href: "#features" },
    { label: "Multi-Employer", href: "#features" },
    { label: "Fast Migration", href: "#features" },
    { label: "Payroll Insights", href: "#features" },
  ],
  Compliance: [
    { label: "GDPR Policy", href: "#security" },
    { label: "Security", href: "#security" },
    { label: "Data Processing", href: "#security" },
    { label: "Audit Trail", href: "#security" },
  ],
  Contact: [
    { label: "Get in Touch", href: "#final-cta" },
    { label: "Book a Demo", href: "#final-cta" },
    { label: "Support", href: "#final-cta" },
    { label: "Careers", href: "#final-cta" },
    { label: "Blog", href: "#final-cta" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "oceanspay.co.uk";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="relative border-t border-[oklch(0.22_0.05_240/0.5)] bg-[oklch(0.08_0.025_240)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand + mini CTA */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2.5"
              data-ocid="footer.link"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[oklch(0.82_0.13_195)] to-[oklch(0.73_0.12_200)] flex items-center justify-center">
                <Waves
                  className="w-4 h-4 text-[oklch(0.08_0.025_240)]"
                  strokeWidth={2.5}
                />
              </div>
              <span className="text-[oklch(0.96_0.01_240)] font-bold text-base tracking-tight">
                OCEANS <span className="text-[oklch(0.82_0.13_195)]">PAY</span>
              </span>
            </a>

            <p className="text-sm text-[oklch(0.62_0.04_240)] leading-relaxed max-w-xs">
              AI-native UK payroll software that prevents errors before they
              happen — not after. Built for scale.
            </p>

            {/* Mini CTA */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-sm font-bold text-[oklch(0.96_0.01_240)] mb-3">
                Revolutionize Your Payroll Today.
              </p>
              <a
                href="#final-cta"
                className="btn-teal inline-block px-5 py-2.5 text-sm font-bold w-full text-center"
                data-ocid="footer.primary_button"
              >
                Start Free Trial
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-[oklch(0.72_0.04_240)] hover:text-[oklch(0.82_0.13_195)] hover:border-[oklch(0.82_0.13_195/0.4)] transition-all"
                aria-label="LinkedIn"
                data-ocid="footer.link"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-[oklch(0.72_0.04_240)] hover:text-[oklch(0.82_0.13_195)] hover:border-[oklch(0.82_0.13_195/0.4)] transition-all"
                aria-label="Twitter"
                data-ocid="footer.link"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="lg:col-span-1">
              <p className="text-sm font-bold text-[oklch(0.96_0.01_240)] mb-5 uppercase tracking-wider">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[oklch(0.62_0.04_240)] hover:text-[oklch(0.82_0.13_195)] transition-colors"
                      data-ocid="footer.link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[oklch(0.22_0.05_240/0.4)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[oklch(0.62_0.04_240)]">
          <p>© {year} Oceans Pay Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="#security"
              className="hover:text-[oklch(0.82_0.13_195)] transition-colors"
              data-ocid="footer.link"
            >
              Privacy Policy
            </a>
            <a
              href="#security"
              className="hover:text-[oklch(0.82_0.13_195)] transition-colors"
              data-ocid="footer.link"
            >
              Terms of Service
            </a>
            <a
              href={caffeineUrl}
              className="hover:text-[oklch(0.82_0.13_195)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.link"
            >
              Built with ♥ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
