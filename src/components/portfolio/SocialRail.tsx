import { Mail, Linkedin, Github, Code2 } from "lucide-react";

const socials = [
  { href: "mailto:mohamedrasoolraheesh@gmail.com", label: "Email", icon: Mail },
  { href: "https://linkedin.com/in/rasoolhub", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com/mohamedrasoolraheesh-oss", label: "GitHub", icon: Github },
  { href: "https://leetcode.com", label: "LeetCode", icon: Code2 },
];

export function SocialRail() {
  return (
    <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 sm:block">
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]">
        {socials.map((s) => {
          const Icon = s.icon;
          const external = s.href.startsWith("http");
          return (
            <a
              key={s.label}
              href={s.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              className="group relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:border-[color:var(--gold)]/40 hover:bg-[color:var(--gold)]/[0.1] hover:text-[color:var(--gold-soft)]"
            >
              <Icon className="h-4 w-4" />
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-white/10 bg-black/80 px-2 py-1 text-[11px] text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                {s.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
