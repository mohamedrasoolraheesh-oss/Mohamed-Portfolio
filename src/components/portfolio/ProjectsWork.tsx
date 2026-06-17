import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    tag: "AI • NLP • LLM",
    title: "PolicyGuard AI",
    desc: "AI-powered policy analysis platform that processes documents, extracts risk models, and provides intelligent Q&A using LLMs.",
    stack: ["Python", "LLMs", "NLP", "FastAPI"],
    href: "#",
  },
  {
    tag: "Computer Vision",
    title: "Smart Vision Analytics",
    desc: "Real-time object detection and tracking pipeline with custom CNN models for safety and quality monitoring.",
    stack: ["PyTorch", "OpenCV", "YOLO"],
    href: "#",
  },
  {
    tag: "Generative AI",
    title: "GenAI Content Engine",
    desc: "Production-grade Generative AI system for text and image generation with prompt orchestration and RAG.",
    stack: ["LangChain", "OpenAI", "Pinecone"],
    href: "#",
  },
  {
    tag: "Predictive Modeling",
    title: "Financial Forecasting Model",
    desc: "ML pipeline forecasting financial trends with feature engineering, ensembling and explainability.",
    stack: ["Scikit-learn", "XGBoost", "Pandas"],
    href: "#",
  },
  {
    tag: "MLOps • Cloud",
    title: "MLOps Deployment Stack",
    desc: "End-to-end MLOps workflow with Docker, CI/CD and cloud delivery for reproducible model serving.",
    stack: ["Docker", "AWS", "FastAPI"],
    href: "#",
  },
  {
    tag: "NLP • Chatbot",
    title: "Conversational AI Agent",
    desc: "Domain-specific chatbot using transformers, RAG retrieval and tool-using LLM agents.",
    stack: ["Transformers", "RAG", "Streamlit"],
    href: "#",
  },
];

const repos = [
  { name: "AI Resume Screener", lang: "Python" },
  { name: "Image Caption Generator", lang: "PyTorch" },
  { name: "Sentiment Analysis API", lang: "Python" },
  { name: "RAG Knowledge Base", lang: "Python" },
  { name: "Stock Price Predictor", lang: "Python" },
  { name: "Voice Assistant Bot", lang: "Python" },
];

export function ProjectsWork() {
  return (
    <section id="projects" className="relative bg-white py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-3xl">
          <span className="pill text-ink/70">Featured Work</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[1.05] text-ink">
            Projects That <span className="underline-brand">Define My Journey</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            A curated portfolio of AI models, ML platforms and intelligent systems built
            for scale, speed and real-world impact.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative flex flex-col rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-[0_15px_40px_-25px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_25px_50px_-25px_rgba(255,46,46,0.35)]"
            >
              <span className="absolute right-6 top-5 h-2 w-2 rounded-full bg-ink/20" />
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                {p.tag}
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-[#f7f7f8] px-2.5 py-1 text-[11px] font-medium text-ink/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                <Github className="h-4 w-4" /> Source Code
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* System logs */}
        <div className="mt-20">
          <h3 className="mb-6 font-display text-2xl font-bold text-ink">
            System Logs &amp; Other Repositories
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white px-5 py-4 transition-colors hover:border-brand/30"
              >
                <div>
                  <div className="text-sm font-semibold text-ink">{r.name}</div>
                  <div className="text-xs text-ink/50">Repository Node Engine</div>
                </div>
                <span className="rounded-full bg-[#f7f7f8] px-3 py-1 text-xs font-medium text-ink/70">
                  {r.lang}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center text-base italic text-ink/40">
            Reviewing architecture matrices continuous...
          </div>
        </div>
      </div>
    </section>
  );
}
