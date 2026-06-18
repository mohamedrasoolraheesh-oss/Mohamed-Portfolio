import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";

const certs = [
  {
    tag: "ML Internship",
    n: "01",
    title: "Machine Learning Internship Completion",
    issuer: "Codec Technologies India · Feb – Mar 2026",
  },
  {
    tag: "ML Internship",
    n: "02",
    title: "Machine Learning Internship Completion",
    issuer: "InternPe · Jan 2026",
  },
];


export function CertificationsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="certifications" className="relative bg-white py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="pill text-ink/70">System Badges</span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[1.05] text-ink">
              Professional <span className="underline-brand">Credentials</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-brand hover:text-brand"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-brand hover:text-brand"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 scrollbar-thin"
          style={{ scrollbarWidth: "thin" }}
        >
          {certs.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="relative h-[300px] w-[300px] shrink-0 snap-start"
              style={{ perspective: 1200 }}
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
            >
              <motion.div
                animate={{ rotateY: flipped === i ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* front */}
                <div
                  className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                      {c.tag}
                    </span>
                    <span className="font-display text-3xl font-bold text-ink/15">
                      {c.n}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug text-ink">
                      {c.title}
                    </h3>
                    <div className="mt-2 text-xs text-ink/50">Issued by</div>
                    <div className="text-sm font-medium text-ink/80">{c.issuer}</div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-medium text-ink/40">
                    <span>Secured Node</span>
                    <span>SYS ID: #{c.n}VERIFIED</span>
                  </div>
                </div>

                {/* back */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-ink p-6 text-white shadow-xl"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <FileText className="h-10 w-10 text-brand" />
                  <div className="text-center font-display text-lg font-bold">
                    {c.title}
                  </div>
                  <a
                    href="#"
                    className="rounded-full bg-brand px-5 py-2 text-xs font-semibold text-white"
                  >
                    View Certificate
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm italic text-ink/50">
          Hover a card to flip and verify · {certs.length} verified credentials.
        </div>

      </div>
    </section>
  );
}
