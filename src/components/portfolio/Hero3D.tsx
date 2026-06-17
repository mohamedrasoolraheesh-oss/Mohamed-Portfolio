import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import portraitAsset from "../../assets/rasool-portrait.jpeg.asset.json";

const slides = [
  {
    kicker: "Hello, I'm",
    title: "Mohamed Rasool",
    speech:
      "I'm an AI & Machine Learning Engineer who loves turning data into decisions and ideas into intelligent products.",
  },
  {
    kicker: "What I do",
    title: "Build AI that ships",
    speech:
      "From predictive models to full-stack ML apps, I design systems that are fast, reliable and genuinely useful.",
  },
  {
    kicker: "How I think",
    title: "Curious. Focused. Relentless.",
    speech:
      "I move between research and engineering — prototyping quickly, measuring honestly, and shipping with intent.",
  },
  {
    kicker: "Let's build",
    title: "Open to opportunities",
    speech:
      "Always up for ambitious teams and hard problems in AI, ML and applied research. Let's make something memorable.",
  },
];

export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  // Portrait 3D transforms driven by scroll
  const rotateY = useTransform(smooth, [0, 1], [-18, 18]);
  const rotateX = useTransform(smooth, [0, 0.5, 1], [8, -2, 10]);
  const scale = useTransform(smooth, [0, 0.5, 1], [1, 1.06, 1]);
  const glow = useTransform(smooth, [0, 0.5, 1], [0.4, 0.8, 0.5]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => {
    const idx = Math.min(slides.length - 1, Math.floor(v * slides.length));
    setActive(idx);
  });

  // mouse parallax
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: py * -10, y: px * 14 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-24 md:grid-cols-2 md:gap-16">
          {/* Left: speech that changes per slide */}
          <div className="relative order-2 md:order-1" style={{ perspective: 1200 }}>
            {slides.map((s, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : 30,
                  rotateX: active === i ? 0 : -20,
                  filter: active === i ? "blur(0px)" : "blur(8px)",
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`${active === i ? "relative" : "absolute inset-0"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
                  {s.kicker}
                </div>
                <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-tight">
                  <span className="gold-text">{s.title}</span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  “{s.speech}”
                </p>
              </motion.div>
            ))}

            {/* progress dots */}
            <div className="mt-10 flex items-center gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-8 bg-[color:var(--gold)]" : "w-3 bg-white/15"
                  }`}
                />
              ))}
              <span className="ml-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Scroll
              </span>
            </div>
          </div>

          {/* Right: 3D portrait card */}
          <div className="order-1 flex justify-center md:order-2" style={{ perspective: 1400 }}>
            <motion.div
              ref={cardRef}
              style={{
                rotateY,
                rotateX,
                scale,
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              <motion.div
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative h-[360px] w-[280px] sm:h-[440px] sm:w-[340px] md:h-[500px] md:w-[380px]"
              >
                {/* glow */}
                <motion.div
                  style={{ opacity: glow }}
                  className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(198,161,91,0.35),transparent_60%)] blur-2xl"
                />
                {/* back panel */}
                <div
                  className="absolute inset-0 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01]"
                  style={{ transform: "translateZ(-40px)" }}
                />
                {/* gold frame */}
                <div
                  className="absolute -inset-3 rounded-[2.3rem] bg-gradient-to-br from-[#e9d8a6]/30 via-transparent to-[#c6a15b]/30 blur-sm"
                  style={{ transform: "translateZ(-20px)" }}
                />
                {/* photo */}
                <div
                  className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <img
                    src={portraitAsset.url}
                    alt="Mohamed Rasool portrait"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] tracking-[0.25em] uppercase text-white/60">
                        AI / ML Engineer
                      </div>
                      <div className="text-sm font-medium text-white">Mohamed Rasool</div>
                    </div>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur text-[10px] font-semibold gold-text">
                      MR
                    </span>
                  </div>
                </div>

                {/* floating chips */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: "translateZ(70px)" }}
                  className="absolute -left-6 top-8 rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-[11px] backdrop-blur"
                >
                  <span className="gold-text font-semibold">Python</span> · TensorFlow
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: "translateZ(60px)" }}
                  className="absolute -right-6 bottom-16 rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-[11px] backdrop-blur"
                >
                  <span className="gold-text font-semibold">LLMs</span> · PyTorch
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
