import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import resumeAsset from "@/assets/resume_Rasool.pdf.asset.json";
import { toAssetUrl } from "@/lib/asset-url";

const RESUME_URL = toAssetUrl(resumeAsset);


const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_-15px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-8">
        <a href="#home" className="flex shrink-0 items-baseline gap-0.5 text-[20px] font-bold tracking-tight text-ink">
          Rasool<span className="ml-0.5 inline-block h-2 w-2 translate-y-[-2px] rounded-[2px] bg-brand" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={RESUME_URL}
            download="Mohamed_Rasool_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_6px_20px_-10px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_24px_-8px_rgba(0,0,0,0.4)] transition-all hover:bg-brand hover:shadow-[0_10px_30px_-8px_rgba(255,46,46,0.55)] sm:inline-flex"
          >
            Hire Me
          </a>
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              open
                ? "border-ink bg-ink text-white"
                : "border-ink/10 bg-white text-ink"
            }`}
          >
            <span className="block h-0.5 w-4 bg-current" />
            <span className="mt-1 block h-0.5 w-4 bg-current" />
            <span className="mt-1 block h-0.5 w-4 bg-current" />
          </button>

        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/5 bg-white px-5 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-ink/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={RESUME_URL}
                download="Mohamed_Rasool_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-brand hover:bg-ink/5"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}
