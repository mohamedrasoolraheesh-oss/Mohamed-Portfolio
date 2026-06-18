import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import googleML from "../../assets/certs/google-ml.pdf.asset.json";
import jsInt from "../../assets/certs/js-intermediate.pdf.asset.json";
import codecAI from "../../assets/certs/codec-ai.jpeg.asset.json";
import sqlBasic from "../../assets/certs/sql-basic.pdf.asset.json";
import restApi from "../../assets/certs/rest-api.pdf.asset.json";
import sqlInt from "../../assets/certs/sql-intermediate.pdf.asset.json";

type Cert = {
  tag: string;
  n: string;
  title: string;
  issuer: string;
  url: string;
};

const certs: Cert[] = [
  {
    tag: "ML Internship",
    n: "01",
    title: "Artificial Intelligence Internship",
    issuer: "Codec Technologies · AICTE & ICAC · Feb–Mar 2026",
    url: codecAI.url,
  },
  {
    tag: "ML Internship",
    n: "02",
    title: "Machine Learning Internship Completion",
    issuer: "InternPe · Jan 2026",
    url: "https://www.linkedin.com/in/mohamed-rasool-raheesh",
  },

  {
    tag: "Machine Learning",
    n: "03",
    title: "Google Machine Learning Certificate",
    issuer: "Google",
    url: googleML.url,
  },
  {
    tag: "Database",
    n: "04",
    title: "SQL (Intermediate) Certificate",
    issuer: "HackerRank",
    url: sqlInt.url,
  },
  {
    tag: "Database",
    n: "05",
    title: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    url: sqlBasic.url,
  },
  {
    tag: "Backend",
    n: "06",
    title: "REST API (Intermediate) Certificate",
    issuer: "HackerRank",
    url: restApi.url,
  },
  {
    tag: "Programming",
    n: "07",
    title: "JavaScript (Intermediate) Certificate",
    issuer: "HackerRank",
    url: jsInt.url,
  },
];

function Card({ c }: { c: Cert }) {
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-[280px] w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_25px_50px_-25px_rgba(255,46,46,0.35)]"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          {c.tag}
        </span>
        <span className="font-display text-3xl font-bold text-ink/15">{c.n}</span>
      </div>
      <div>
        <FileText className="mb-3 h-6 w-6 text-ink/60" />
        <h3 className="font-display text-lg font-bold leading-snug text-ink">
          {c.title}
        </h3>
        <div className="mt-2 text-xs text-ink/50">Issued by</div>
        <div className="text-sm font-medium text-ink/80">{c.issuer}</div>
      </div>
      <div className="flex items-center justify-between text-[11px] font-medium text-ink/40">
        <span>Verified Credential</span>
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}

export function CertificationsCarousel() {
  // duplicate the list for seamless infinite loop
  const loop = [...certs, ...certs];

  return (
    <section id="certifications" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 max-w-2xl">
          <span className="pill text-ink/70">System Badges</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[1.05] text-ink">
            Professional <span className="underline-brand">Credentials</span>
          </h2>
          <p className="mt-5 text-base text-ink/60 md:text-lg">
            {certs.length} verified certificates across ML, databases, backend & programming.
          </p>
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
          className="flex gap-5 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
          {loop.map((c, i) => (
            <Card key={`${c.n}-${i}`} c={c} />
          ))}
        </motion.div>
      </div>

      <div className="mt-8 text-center text-sm italic text-ink/50">
        Hover to open and verify · {certs.length} credentials and counting.
      </div>
    </section>
  );
}
