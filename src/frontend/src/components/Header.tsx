import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Platform", href: "#solution" },
    { label: "AI Payroll", href: "#features" },
    { label: "UK Compliance", href: "#security" },
    { label: "Pricing", href: "#comparison" },
    { label: "Resources", href: "#how-it-works" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.08_0.025_240/0.95)] backdrop-blur-xl border-b border-[oklch(0.25_0.05_240/0.5)] shadow-[0_4px_24px_oklch(0_0_0/0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-[oklch(0.96_0.01_240/0.9)] ring-1 ring-[oklch(0.25_0.05_240/0.35)] shadow-[0_0_16px_oklch(0.82_0.13_195/0.2)] flex items-center justify-center">
              <img
                src="/assets/logo.png"
                alt="Oceans Pay logo"
                className="h-6 w-6 object-contain"
              />
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[oklch(0.72_0.04_240)] hover:text-[oklch(0.96_0.01_240)] transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#final-cta"
              className="text-sm font-medium text-[oklch(0.72_0.04_240)] hover:text-[oklch(0.96_0.01_240)] transition-colors"
              data-ocid="nav.link"
            >
              Log in
            </a>
            <a
              href="#final-cta"
              className="btn-teal px-5 py-2.5 text-sm font-bold"
              data-ocid="nav.primary_button"
            >
              Start Free Trial
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-[oklch(0.72_0.04_240)] hover:text-[oklch(0.96_0.01_240)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden glass-card rounded-2xl mb-4 p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[oklch(0.72_0.04_240)] hover:text-[oklch(0.96_0.01_240)] transition-colors"
                onClick={() => setMenuOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[oklch(0.25_0.05_240/0.5)] flex flex-col gap-3">
              <a
                href="#final-cta"
                className="text-sm text-[oklch(0.72_0.04_240)]"
                data-ocid="nav.link"
              >
                Log in
              </a>
              <a
                href="#final-cta"
                className="btn-teal px-5 py-2.5 text-sm font-bold text-center"
                data-ocid="nav.primary_button"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
