import { motion } from "framer-motion";

const groups = [
  {
    title: "Languages & Core",
    chips: ["Python", "C++", "Java", "SQL", "JavaScript", "TypeScript"],
  },
  {
    title: "ML & AI Frameworks",
    chips: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Hugging Face", "OpenCV"],
  },
  {
    title: "Generative AI & NLP",
    chips: ["LLMs", "RAG", "LangChain", "Prompt Engineering", "Transformers", "NLTK"],
  },
  {
    title: "Tools & Cloud",
    chips: ["Git", "GitHub", "Docker", "AWS", "MongoDB", "MySQL", "FastAPI", "Streamlit"],
  },
];

export function SkillsStack() {
  return (
    <section id="skills" className="relative bg-white py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-3xl">
          <span className="pill text-ink/70">Technical Stack</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[1.05] text-ink">
            Technologies <span className="underline-brand">I Work With</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            AI / ML expertise across modern data, model training and cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-[1.5rem] border border-ink/10 bg-white p-7 shadow-[0_15px_40px_-25px_rgba(0,0,0,0.2)]"
            >
              <h3 className="font-display text-xl font-bold text-ink">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-ink/10 bg-[#f7f7f8] px-3.5 py-1.5 text-xs font-medium text-ink/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
