import { motion } from "framer-motion";

const cards = [
  {
    n: "01",
    title: "Machine Learning",
    body: "End-to-end ML pipelines for classification & regression using Scikit-learn — EDA, feature engineering, model selection, cross-validation and hyperparameter tuning.",
    rotate: -4,
    bg: "bg-[#fff1f1]",
  },
  {
    n: "02",
    title: "NLP & RAG",
    body: "Building NLP pipelines and RAG-based assistants with TF-IDF, cosine similarity and retrieval + keyword matching to reduce hallucinations.",
    rotate: 3,
    bg: "bg-white",
  },
  {
    n: "03",
    title: "Data Analysis",
    body: "Exploratory data analysis and visualization with Pandas, NumPy, Matplotlib and Seaborn to surface patterns and drive model decisions.",
    rotate: -3,
    bg: "bg-white",
  },
  {
    n: "04",
    title: "Predictive Modeling",
    body: "Regression and time-series forecasting with engineered features (moving averages, RSI, lag) — evaluated using R², RMSE and MAE.",
    rotate: 4,
    bg: "bg-[#fff1f1]",
  },
];


export function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 max-w-3xl">
          <span className="pill text-ink/70">My Expertise</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[1.05] text-ink">
            Building Modern AI Solutions{" "}
            <span className="underline-brand">with Code &amp; Data.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            Combining machine learning, deep learning and cloud engineering to create
            scalable and impactful intelligent experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, y: -6 }}
              className={`relative rounded-[1.5rem] border border-ink/10 ${c.bg} p-7 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.25)]`}
            >
              <span className="absolute right-6 top-5 h-2.5 w-2.5 rounded-full bg-ink/30" />
              <div className="text-sm font-semibold tracking-widest text-ink/40">{c.n}</div>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{c.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm italic text-ink/40">
          Turning ideas into intelligent reality!
        </div>
      </div>
    </section>
  );
}
