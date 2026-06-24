import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeProvider";

function Logo() {
  return (
    <a
      href="#hero"
      className="flex items-center gap-2.5 group"
      data-ocid="nav.link"
    >
      <img
        src="/assets/logo-full.jpeg"
        alt="Oceans Pay"
        className="h-8 w-auto object-contain"
      />
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

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
          ? "bg-[oklch(var(--background)/0.95)] backdrop-blur-xl border-b border-[oklch(var(--border)/0.5)] shadow-[0_4px_24px_oklch(var(--foreground)/0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[oklch(var(--muted-foreground))] hover:text-[oklch(var(--foreground))] transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-[oklch(var(--muted-foreground))] hover:text-[oklch(var(--foreground))] hover:bg-[oklch(var(--muted))] transition-colors"
              aria-label="Toggle theme"
              data-ocid="nav.toggle_theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <a
              href="#final-cta"
              className="text-sm font-medium text-[oklch(var(--muted-foreground))] hover:text-[oklch(var(--foreground))] transition-colors"
              data-ocid="nav.link"
            >
              Log in
            </a>
            <a
              href="#final-cta"
              className="btn-primary px-5 py-2.5 text-sm font-bold"
              data-ocid="nav.primary_button"
            >
              Start Free Trial
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-[oklch(var(--muted-foreground))] hover:text-[oklch(var(--foreground))] transition-colors"
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
                className="text-sm font-medium text-[oklch(var(--muted-foreground))] hover:text-[oklch(var(--foreground))] transition-colors"
                onClick={() => setMenuOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                toggleTheme();
                setMenuOpen(false);
              }}
              className="text-sm font-medium text-[oklch(var(--muted-foreground))] hover:text-[oklch(var(--foreground))] transition-colors flex items-center gap-2"
              data-ocid="nav.toggle_theme"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <Sun className="w-4 h-4" /> Light mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" /> Dark mode
                </>
              )}
            </button>
            <div className="pt-2 border-t border-[oklch(var(--border)/0.5)] flex flex-col gap-3">
              <a
                href="#final-cta"
                className="text-sm text-[oklch(var(--muted-foreground))]"
                data-ocid="nav.link"
              >
                Log in
              </a>
              <a
                href="#final-cta"
                className="btn-primary px-5 py-2.5 text-sm font-bold text-center"
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
