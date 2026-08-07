import { motion } from "framer-motion";
import { ArrowUpRight, Volume2, VolumeX, Code2, BarChart3, BrainCircuit, Linkedin } from "lucide-react";
import { useState } from "react";
import heroVideoAsset from "../../assets/hero.mp4.asset.json";
import { toAssetUrl } from "../../lib/asset-url";

// Cloud-hosted hero video. Prefer a Cloudinary URL via env var so it works
// identically in local dev and on Vercel production. Falls back to the
// Lovable CDN copy (also globally distributed) when no override is set.
const HERO_VIDEO_URL =
  (import.meta.env.VITE_HERO_VIDEO_URL as string | undefined) ?? toAssetUrl(heroVideoAsset);

export function HeroRed() {
  const [muted, setMuted] = useState(true);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#ff2e2e] pt-24 pb-16 md:pt-36 md:pb-28"
    >
      {/* subtle diagonal light streaks */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-32 top-0 h-[140%] w-[60%] rotate-12 bg-gradient-to-r from-white/15 to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[80%] w-[40%] -rotate-12 bg-gradient-to-l from-white/10 to-transparent blur-3xl" />
      </div>



      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-10">
        {/* Left content */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80"
          >
            Mohamed Rasool Raheesh
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-[clamp(2.5rem,6.4vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-white"
          >
            Hi, I'm an
            <br />
            <span className="italic font-medium">AI / ML Engineer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg"
          >
            3rd-year CSE student at Jeppiaar Engineering College, Chennai. I build
            end-to-end ML pipelines with Python, Scikit-learn, Pandas &amp; NumPy —
            with hands-on experience across <span className="font-semibold">2 ML internships</span>,
            NLP, RAG and predictive modeling. Open to internship opportunities.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-[0_12px_30px_-12px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-0.5"
            >
              View My Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-ink"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[18rem] px-2 sm:max-w-sm md:max-w-md md:px-0"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]">
            <video
              src={HERO_VIDEO_URL}
              autoPlay
              loop
              muted={muted}
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#ff2e2e]/40 via-transparent to-transparent mix-blend-multiply" />
          </div>

          {/* floating tech badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-6 flex items-center gap-1.5 rounded-2xl bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-xl sm:-left-6 sm:top-10 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <Code2 className="h-3.5 w-3.5 text-brand sm:h-4 sm:w-4" />
            Python
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-1/3 flex items-center gap-1.5 rounded-2xl bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-xl sm:-right-4 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <BarChart3 className="h-3.5 w-3.5 text-brand sm:h-4 sm:w-4" />
            Scikit-learn
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 bottom-8 flex items-center gap-1.5 rounded-2xl bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-xl sm:-left-4 sm:bottom-12 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <BrainCircuit className="h-3.5 w-3.5 text-brand sm:h-4 sm:w-4" />
            NLP &amp; RAG
          </motion.div>
        </motion.div>
      </div>

      {/* Volume control pill (right side) */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-2 md:right-6 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-col items-center gap-1 md:gap-2 cursor-pointer group z-10"
      >
        <span className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:bg-white/25">
          {muted ? <VolumeX className="h-4 w-4 md:h-5 md:w-5" /> : <Volume2 className="h-4 w-4 md:h-5 md:w-5" />}
        </span>
        <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.25em] text-white/80 transition group-hover:text-white">

          {muted ? "UNMUTE" : "MUTE"}
        </span>
      </button>

    </section>
  );
}
