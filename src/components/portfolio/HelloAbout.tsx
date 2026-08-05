import { motion } from "framer-motion";
import portraitAsset from "../../assets/rasool-portrait.jpeg.asset.json";
import { toAssetUrl } from "../../lib/asset-url";
import { Code2, Database, BrainCircuit, FileSearch, Boxes } from "lucide-react";


export function HelloAbout() {
  return (
    <section id="about" className="relative bg-[#ff2e2e] pt-20 pb-32 md:pt-28 md:pb-40">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-10">
        {/* portrait pinned card */}
        <motion.div
          initial={{ opacity: 0, rotate: -8, y: 30 }}
          whileInView={{ opacity: 1, rotate: -4, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xs"
        >
          {/* pin */}
          <div className="absolute left-1/2 top-[-22px] z-10 -translate-x-1/2">
            <div className="h-5 w-1.5 bg-ink/80" />
            <div className="-mt-1 h-4 w-4 rounded-full bg-ink shadow-md" />
          </div>
          <div className="relative rounded-[1.5rem] border-[10px] border-ink bg-ink p-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
            <img
              src={toAssetUrl(portraitAsset)}
              alt="Mohamed Rasool"
              className="aspect-[4/5] w-full rounded-[0.6rem] object-cover"
            />
          </div>
        </motion.div>


        {/* text */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-ink"
          >
            Hello!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/95 md:text-lg"
          >
            Hi, my name is{" "}
            <span className="font-semibold text-ink">MOHAMED RASOOL RAHEESH</span> — a
            motivated AI/ML engineering student from Chennai, currently pursuing B.E. in
            Artificial Intelligence &amp; Machine Learning at Jeppiaar Engineering College
            (2024–2028). I've completed 2 ML internships building real-world solutions in
            classification, regression, NLP and RAG-based assistants, and I'm seeking
            internship roles to deliver impactful, data-driven products.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-ink/90">
            {[
              { Icon: Code2, label: "Python" },
              { Icon: Database, label: "Pandas" },
              { Icon: BrainCircuit, label: "Scikit-learn" },
              { Icon: FileSearch, label: "NLP" },
              { Icon: Boxes, label: "RAG" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                title={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink/20 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* wave divider */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,100 L0,100 Z"
          fill="#ffffff"
        />
      </svg>
    </section>
  );
}
