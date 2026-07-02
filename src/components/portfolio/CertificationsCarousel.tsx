import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FileText, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { toAssetUrl } from "../../lib/asset-url";
import googleML from "../../assets/certs/google-ml.pdf.asset.json";
import jsInt from "../../assets/certs/js-intermediate.pdf.asset.json";
import codecAI from "../../assets/certs/codec-ai.jpeg.asset.json";
import sqlBasic from "../../assets/certs/sql-basic.pdf.asset.json";
import restApi from "../../assets/certs/rest-api.pdf.asset.json";
import sqlInt from "../../assets/certs/sql-intermediate.pdf.asset.json";

import thumbCodec from "../../assets/certs/thumb-codec-ai.jpg";
import thumbInternPe from "../../assets/certs/thumb-internpe.jpg";
import thumbGoogle from "../../assets/certs/thumb-google-ml.jpg";
import thumbSqlInt from "../../assets/certs/thumb-sql-int.jpg";
import thumbSqlBasic from "../../assets/certs/thumb-sql-basic.jpg";
import thumbRest from "../../assets/certs/thumb-rest-api.jpg";
import thumbJs from "../../assets/certs/thumb-js-int.jpg";

type Cert = {
  tag: string;
  n: string;
  title: string;
  issuer: string;
  url: string;
  image: string;
};

const certs: Cert[] = [
  {
    tag: "ML Internship",
    n: "01",
    title: "Artificial Intelligence Internship",
    issuer: "Codec Technologies · AICTE & ICAC · Feb–Mar 2026",
    url: toAssetUrl(codecAI),
    image: thumbCodec,
  },
  {
    tag: "ML Internship",
    n: "02",
    title: "Machine Learning Internship Completion",
    issuer: "InternPe · Jan 2026",
    url: "https://www.linkedin.com/in/mohamed-rasool-raheesh",
    image: thumbInternPe,
  },

  {
    tag: "Machine Learning",
    n: "03",
    title: "Google Machine Learning Certificate",
    issuer: "Google",
    url: toAssetUrl(googleML),
    image: thumbGoogle,
  },
  {
    tag: "Database",
    n: "04",
    title: "SQL (Intermediate) Certificate",
    issuer: "HackerRank",
    url: toAssetUrl(sqlInt),
    image: thumbSqlInt,
  },
  {
    tag: "Database",
    n: "05",
    title: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    url: toAssetUrl(sqlBasic),
    image: thumbSqlBasic,
  },
  {
    tag: "Backend",
    n: "06",
    title: "REST API (Intermediate) Certificate",
    issuer: "HackerRank",
    url: toAssetUrl(restApi),
    image: thumbRest,
  },
  {
    tag: "Programming",
    n: "07",
    title: "JavaScript (Intermediate) Certificate",
    issuer: "HackerRank",
    url: toAssetUrl(jsInt),
    image: thumbJs,
  },
];

function Card({ c }: { c: Cert }) {
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-[360px] w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_25px_50px_-25px_rgba(255,46,46,0.35)]"
    >
      {/* Image header */}
      <div className="relative h-[150px] w-full overflow-hidden bg-ink">
        <img
          src={c.image}
          alt=""
          loading="lazy"
          width={768}
          height={512}
          className="h-full w-full object-cover opacity-90 blur-[1.5px] scale-110 transition-transform duration-700 group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-md">
            {c.tag}
          </span>
        </div>
        <span className="absolute right-4 top-3 font-display text-3xl font-bold text-white/30">
          {c.n}
        </span>
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white/90">
          <FileText className="h-4 w-4" />
          <span className="text-[11px] font-medium uppercase tracking-widest">Certificate</span>
        </div>
      </div>

      {/* Body */}
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

export function CertificationsCarousel() {
  // duplicate the list for seamless infinite loop
  const loop = [...certs, ...certs];

  const controls = useAnimationControls();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<number | null>(null);
  const DURATION = 40; // seconds for full -50% loop
  const CARD_STEP = 320; // card width (300) + gap (20)

  const startLoop = (fromPercent: number) => {
    const remaining = ((fromPercent + 50) / 50) * DURATION; // time to reach -50%
    controls.start({
      x: ["0%", "-50%"],
      transition: { duration: DURATION, ease: "linear", repeat: Infinity },
      // initial offset via sequence:
    });
    // simpler: just restart the full loop from current position
    controls.set({ x: `${fromPercent}%` });
    controls.start({
      x: "-50%",
      transition: { duration: Math.max(0.1, remaining), ease: "linear" },
    }).then(() => {
      controls.set({ x: "0%" });
      controls.start({
        x: "-50%",
        transition: { duration: DURATION, ease: "linear", repeat: Infinity },
      });
    });
  };

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: { duration: DURATION, ease: "linear", repeat: Infinity },
    });
    return () => {
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentPercent = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const style = window.getComputedStyle(el);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const width = el.getBoundingClientRect().width || 1;
    return (matrix.m41 / width) * 100;
  };

  const nudge = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    controls.stop();
    setPaused(true);

    const width = el.getBoundingClientRect().width || 1;
    const currentPx = new DOMMatrixReadOnly(window.getComputedStyle(el).transform).m41;
    let nextPx = currentPx + (dir === "next" ? -CARD_STEP : CARD_STEP);
    // wrap within [-width/2, 0]
    const half = width / 2;
    if (nextPx > 0) nextPx -= half;
    if (nextPx < -half) nextPx += half;

    controls.start({
      x: nextPx,
      transition: { duration: 0.5, ease: "easeOut" },
    });

    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => {
      setPaused(false);
      const percent = (nextPx / width) * 100;
      startLoop(percent);
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
              {certs.length} verified certificates across ML, databases, backend & programming.
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <button
              type="button"
              aria-label="Previous certificate"
              onClick={() => nudge("prev")}
              className={btnClass}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next certificate"
              onClick={() => nudge("next")}
              className={btnClass}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="relative mt-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
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
      </div>

      {/* Mobile arrows */}
      <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
        <button
          type="button"
          aria-label="Previous certificate"
          onClick={() => nudge("prev")}
          className={btnClass}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next certificate"
          onClick={() => nudge("next")}
          className={btnClass}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 text-center text-sm italic text-ink/50">
        {paused ? "Paused · resuming shortly…" : "Hover to open and verify"} · {certs.length} credentials and counting.
      </div>
    </section>
  );
}
