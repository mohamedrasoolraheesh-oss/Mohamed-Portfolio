import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FileText, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Cert = {
  tag: string;
  n: string;
  title: string;
  issuer: string;
  url: string;
  image: string;
};

function Card({ c }: { c: Cert }) {
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-[360px] w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_25px_50px_-25px_rgba(255,46,46,0.35)]"
    >
      <div className="relative h-[180px] w-full overflow-hidden bg-ink/5">
        <img
          src={c.image}
          alt={`${c.title} certificate preview`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink/55 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-md">
            {c.tag}
          </span>
        </div>
        <span className="absolute right-3 top-2 font-display text-2xl font-bold text-white/80 drop-shadow">
          {c.n}
        </span>
        <div className="absolute bottom-2 left-3 flex items-center gap-1.5 rounded-full bg-white/85 px-2 py-1 text-ink backdrop-blur-sm">
          <FileText className="h-3 w-3" />
          <span className="text-[10px] font-semibold uppercase tracking-widest">Certificate</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-display text-[15px] font-bold leading-snug text-ink line-clamp-2">
            {c.title}
          </h3>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-ink/40">Issued by</div>
          <div className="text-xs font-medium text-ink/80 line-clamp-1">{c.issuer}</div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-ink/40">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Verified Credential
          </span>
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}

type DriveItem = {
  id: string;
  title: string;
  url: string;
  image: string;
  modifiedTime?: string;
};

const DURATION = 40; // seconds for a full -50% loop
const CARD_STEP = 320; // card width (300) + gap (20)

export function CertificationsCarousel() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("drive-certificates");
        if (cancelled) return;
        if (error) {
          setLoading(false);
          return;
        }
        const items: DriveItem[] = data?.items ?? [];
        setCerts(
          items.map((it, i) => ({
            tag: "Credential",
            n: String(i + 1).padStart(2, "0"),
            title: it.title || "Certificate",
            issuer: it.modifiedTime
              ? new Date(it.modifiedTime).toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                })
              : "Google Drive",
            url: it.url,
            image: it.image,
          })),
        );
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const loop = [...certs, ...certs];

  const controls = useAnimationControls();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<number | null>(null);

  const currentPx = () => {
    const el = trackRef.current;
    if (!el) return 0;
    return new DOMMatrixReadOnly(window.getComputedStyle(el).transform).m41;
  };

  // Resume the marquee from wherever the track currently sits
  const resume = () => {
    const el = trackRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width || 1;
    const half = width / 2;
    const px = currentPx();
    const remaining = Math.max(0.1, ((half + px) / half) * DURATION);
    controls.set({ x: px });
    controls
      .start({ x: -half, transition: { duration: remaining, ease: "linear" } })
      .then(() => {
        controls.set({ x: 0 });
        controls.start({
          x: "-50%",
          transition: { duration: DURATION, ease: "linear", repeat: Infinity },
        });
      });
  };

  const pause = () => {
    if (pauseTimer.current) {
      window.clearTimeout(pauseTimer.current);
      pauseTimer.current = null;
    }
    controls.stop();
    setPaused(true);
  };

  const unpause = () => {
    setPaused(false);
    resume();
  };

  // Start the loop once cards are available
  useEffect(() => {
    if (!certs.length) return;
    controls.set({ x: "0%" });
    controls.start({
      x: "-50%",
      transition: { duration: DURATION, ease: "linear", repeat: Infinity },
    });
    return () => {
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certs.length]);

  const nudge = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    pause();

    const width = el.getBoundingClientRect().width || 1;
    const half = width / 2;
    let nextPx = currentPx() + (dir === "next" ? -CARD_STEP : CARD_STEP);
    if (nextPx > 0) nextPx -= half;
    if (nextPx < -half) nextPx += half;

    controls.start({ x: nextPx, transition: { duration: 0.5, ease: "easeOut" } });

    pauseTimer.current = window.setTimeout(() => {
      setPaused(false);
      resume();
    }, 5000);
  };

  const btnClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 bg-white text-brand shadow-[0_10px_25px_-15px_rgba(255,46,46,0.6)] transition hover:bg-brand hover:text-white hover:border-brand disabled:opacity-40";

  return (
    <section id="certifications" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="pill text-ink/70">System Badges</span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[1.05] text-ink">
              Professional <span className="underline-brand">Credentials</span>
            </h2>
            <p className="mt-5 text-base text-ink/60 md:text-lg">
              {loading
                ? "Loading certificates…"
                : `${certs.length} verified certificates, synced live from Google Drive.`}
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <button type="button" aria-label="Previous certificate" onClick={() => nudge("prev")} className={btnClass}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next certificate" onClick={() => nudge("next")} className={btnClass}>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="relative mt-4"
        onMouseEnter={pause}
        onMouseLeave={unpause}
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-5 py-4"
          animate={controls}
          initial={{ x: "0%" }}
          style={{ width: "max-content" }}
        >
          {loop.map((c, i) => (
            <Card key={`${c.n}-${i}`} c={c} />
          ))}
        </motion.div>
        {!loading && certs.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-ink/50">
            No certificates found in the connected Google Drive folder yet.
          </div>
        )}
      </div>

      {/* Mobile arrows */}
      <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
        <button type="button" aria-label="Previous certificate" onClick={() => nudge("prev")} className={btnClass}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Next certificate" onClick={() => nudge("next")} className={btnClass}>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 text-center text-sm italic text-ink/50">
        {paused ? "Paused · move your cursor away to resume" : "Hover to pause · click a card to verify"}
      </div>
    </section>
  );
}
