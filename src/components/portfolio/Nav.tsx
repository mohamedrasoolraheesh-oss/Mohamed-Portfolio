import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-1/2 top-4 z-50 w-[min(1180px,calc(100%-1.5rem))] -translate-x-1/2 rounded-2xl border transition-all duration-500 ${
        scrolled
          ? "border-white/10 bg-black/55 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-5 py-3 md:px-6">
        <a href="#home" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] font-display text-sm font-semibold tracking-wider gold-text">
            MR
          </span>
          <span className="hidden text-sm font-medium tracking-wide text-foreground/80 sm:block">
            Mohamed Rasool
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-sm font-medium text-[color:var(--gold-soft)] transition-all hover:bg-[color:var(--gold)]/20 hover:shadow-[0_0_30px_-5px_var(--glow)] md:inline-flex"
        >
          Hire Me
        </a>

        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          className="md:hidden rounded-md border border-white/10 p-2 text-foreground"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1.5 block h-0.5 w-5 bg-current" />
          <span className="mt-1.5 block h-0.5 w-5 bg-current" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 px-5 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  );
}
