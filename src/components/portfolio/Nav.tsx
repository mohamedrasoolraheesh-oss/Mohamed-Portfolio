import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Code2 } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { href: "mailto:mohamedrasoolraheesh@gmail.com", label: "Email", icon: Mail },
  { href: "https://linkedin.com/in/rasoolhub", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com/mohamedrasoolraheesh-oss", label: "GitHub", icon: Github },
  { href: "https://leetcode.com", label: "LeetCode", icon: Code2 },
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
      <nav className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <a href="#home" className="group flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] font-display text-sm font-semibold tracking-wider gold-text">
            MR
          </span>
          <span className="hidden text-sm font-medium tracking-wide text-foreground/80 lg:block">
            Mohamed Rasool
          </span>
        </a>

        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
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

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:border-[color:var(--gold)]/35 hover:bg-[color:var(--gold)]/[0.08] hover:text-[color:var(--gold-soft)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}

          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="ml-1 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-foreground lg:hidden"
          >
            <span className="block h-0.5 w-4 bg-current" />
            <span className="mt-1 block h-0.5 w-4 bg-current" />
            <span className="mt-1 block h-0.5 w-4 bg-current" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 px-4 py-3 lg:hidden">
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
