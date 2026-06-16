import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  Code2,
  Cpu,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Reveal, SectionHeader } from "./Reveal";
import resumeAsset from "../../assets/resume_Rasool.pdf.asset.json";

export function Hero() {
  return (
    <section id="home" className="relative pt-40 md:pt-48 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs tracking-[0.18em] text-muted-foreground uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--gold)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
            </span>
            Available for opportunities
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mx-auto max-w-5xl text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight">
            Building AI That
            <br />
            <span className="gold-text">Solves Real Problems.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            AI &amp; Machine Learning Engineer focused on creating intelligent systems,
            predictive solutions, and impactful applications.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#e9d8a6] to-[#c6a15b] px-6 py-3.5 text-sm font-semibold text-black shadow-[0_15px_40px_-15px_rgba(198,161,91,0.65)] transition-all hover:shadow-[0_20px_50px_-10px_rgba(198,161,91,0.8)] hover:-translate-y-0.5"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-all hover:border-white/25 hover:bg-white/[0.06]"
            >
              Let's Connect
            </a>
            <a
              href={resumeAsset.url}
              target="_blank"
              rel="noopener noreferrer"
              download="resume_Rasool.pdf"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mx-auto mt-20 grid max-w-3xl grid-cols-3 divide-x divide-white/5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
            {[
              { k: "4+", v: "Projects Built" },
              { k: "2", v: "AI Internships" },
              { k: "4", v: "Certifications" },
            ].map((s) => (
              <div key={s.v} className="px-4 py-6">
                <div className="font-display text-3xl font-semibold gold-text">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ambient gold gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(198,161,91,0.35), rgba(198,161,91,0) 70%)",
        }}
      />
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="About"
          title="Who I Am"
        />
        <div className="grid items-start gap-8 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-card/60 p-8 backdrop-blur noise">
              <p className="text-lg leading-relaxed text-foreground/85">
                I'm <span className="text-foreground font-medium">M Mohamed Rasool Raheesh</span>,
                a Computer Science (AI &amp; ML) student passionate about developing intelligent
                systems that solve real-world problems. I enjoy building machine learning models,
                AI-powered applications, and predictive solutions that create measurable impact.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Problem Solver", "ML Engineer", "Builder", "AI Enthusiast"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <div className="space-y-4">
              <InfoCard
                icon={<GraduationCap className="h-5 w-5" />}
                label="Education"
                title="Jeppiaar Engineering College"
                sub="B.E Computer Science (AI & ML)"
              />
              <InfoCard
                icon={<MapPin className="h-5 w-5" />}
                label="Location"
                title="Chennai, Tamil Nadu"
                sub="India"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  title,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="hover-lift rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span className="grid h-7 w-7 place-items-center rounded-md border border-[color:var(--gold)]/25 bg-[color:var(--gold)]/10 text-[color:var(--gold-soft)]">
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-4 font-display text-xl font-semibold tracking-tight">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
    </div>
  );
}

const skillGroups = [
  {
    icon: <Brain className="h-4 w-4" />,
    title: "AI / ML Domains",
    items: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Generative AI", "Computer Vision", "NLP"],
  },
  {
    icon: <Code2 className="h-4 w-4" />,
    title: "Programming",
    items: ["Python", "Java", "JavaScript", "SQL"],
  },
  {
    icon: <Cpu className="h-4 w-4" />,
    title: "Frameworks & Libraries",
    items: ["TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    icon: <Wrench className="h-4 w-4" />,
    title: "Tools",
    items: ["Git", "GitHub", "Jupyter", "Google Colab", "REST APIs"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="Skills & Expertise"
          description="A toolkit refined through building real ML systems, internships and continuous practice."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <div className="hover-lift group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-7 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--gold)]/25 bg-[color:var(--gold)]/10 text-[color:var(--gold-soft)]">
                    {g.icon}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{g.title}</h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-sm text-foreground/85 transition-all hover:border-[color:var(--gold)]/35 hover:bg-[color:var(--gold)]/[0.06] hover:text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(closest-side, rgba(198,161,91,0.25), transparent)" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const experiences = [
  {
    role: "AI & ML Intern",
    org: "Internship Program",
    desc: "Worked on machine learning workflows, model training, data preprocessing and AI-based problem solving across multiple datasets.",
    tags: ["Python", "ML Workflows", "Data Preprocessing"],
  },
  {
    role: "Machine Learning Intern",
    org: "CodSoft Internship",
    desc: "Built machine learning projects and predictive systems using Python and Scikit-Learn, delivering working solutions for real datasets.",
    tags: ["Scikit-Learn", "Predictive Modeling", "Python"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow="Journey" title="Experience" />
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/40 to-transparent md:left-1/2"
          />
          <div className="space-y-10">
            {experiences.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.08}>
                <div
                  className={`relative grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-2 md:gap-12 ${
                    i % 2 === 0 ? "md:[&>div:last-child]:order-2" : ""
                  }`}
                >
                  <div className="relative md:hidden">
                    <span className="absolute left-2 top-2 grid h-5 w-5 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-background">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--gold)]" />
                    </span>
                  </div>
                  <div className="hidden md:block" />
                  <div className="relative hover-lift rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur md:col-span-1">
                    <span className="absolute -left-[42px] top-7 hidden h-5 w-5 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-background md:grid">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--gold)]" />
                    </span>
                    <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--gold-soft)]">
                      {e.org}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold">{e.role}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    title: "AI Interview Simulator",
    desc: "AI-powered interview preparation platform with intelligent feedback and performance evaluation.",
    tech: ["Python", "Machine Learning", "NLP"],
    category: "AI",
  },
  {
    title: "Student Performance Predictor",
    desc: "Predicts academic outcomes using machine learning algorithms and historical data.",
    tech: ["Python", "Scikit-Learn", "Pandas"],
    category: "ML",
  },
  {
    title: "AI Resume Analyzer",
    desc: "Analyzes resumes and provides AI-driven insights for improvement.",
    tech: ["Python", "NLP", "Machine Learning"],
    category: "AI",
  },
  {
    title: "Data Analytics Dashboard",
    desc: "Interactive dashboard for business insights and data visualization.",
    tech: ["Python", "Streamlit"],
    category: "Data",
  },
];

const categories = ["All", "AI", "ML", "Data"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured Projects"
          description="A glimpse of intelligent systems and tools I've engineered end-to-end."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-1.5 text-xs tracking-wide uppercase transition-all ${
                  filter === c
                    ? "border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 text-[color:var(--gold-soft)]"
                    : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-7 backdrop-blur transition-colors hover:border-[color:var(--gold)]/35"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(198,161,91,0.10), transparent 40%)",
                  }}
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-md border border-[color:var(--gold)]/25 bg-[color:var(--gold)]/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--gold-soft)]">
                    {p.category}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--gold-soft)]" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-foreground/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const certs = [
  {
    title: "Artificial Intelligence Internship",
    by: "AICTE & ICAC Approved",
  },
  {
    title: "Internship Completion Certificate",
    by: "CodSoft",
  },
  {
    title: "AI / ML Internship Certificate",
    by: "InternPe",
  },
  {
    title: "Deep Learning Specialization",
    by: "DeepLearning.AI",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Credentials" title="Certifications" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="hover-lift relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-7 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--gold)]/25 bg-[color:var(--gold)]/10 text-[color:var(--gold-soft)]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.18em] text-[color:var(--gold-soft)]">
                  {c.by}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
                  {c.title}
                </h3>
                <div
                  aria-hidden
                  className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-40 blur-3xl"
                  style={{ background: "radial-gradient(closest-side, rgba(198,161,91,0.18), transparent)" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const contacts = [
    { icon: <Mail className="h-4 w-4" />, label: "Email", value: "mohamedrasoolraheesh@gmail.com", href: "mailto:mohamedrasoolraheesh@gmail.com" },
    { icon: <Phone className="h-4 w-4" />, label: "Phone", value: "+91 90435 07714", href: "tel:+919043507714" },
    { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", value: "linkedin.com/in/rasoolhub", href: "https://linkedin.com/in/rasoolhub" },
    { icon: <Github className="h-4 w-4" />, label: "GitHub", value: "github.com/mohamedrasoolraheesh-oss", href: "https://github.com/mohamedrasoolraheesh-oss" },
    { icon: <Code2 className="h-4 w-4" />, label: "LeetCode", value: "leetcode.com", href: "https://leetcode.com" },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Get in touch"
          title="Let's Build Something Intelligent"
          description="Open to roles, collaborations, and ambitious AI projects."
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#141414] to-[#0c0c0c] p-8 md:p-12 noise">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(198,161,91,0.25), transparent)" }}
            />
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="font-display text-3xl font-semibold leading-tight">
                  Have an idea worth <span className="gold-text">engineering</span>?
                </h3>
                <p className="mt-3 text-muted-foreground">
                  The fastest way to reach me is email. I respond within 24 hours.
                </p>
                <a
                  href="mailto:mohamedrasoolraheesh@gmail.com"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#e9d8a6] to-[#c6a15b] px-5 py-3 text-sm font-semibold text-black shadow-[0_15px_40px_-15px_rgba(198,161,91,0.6)] transition-all hover:-translate-y-0.5"
                >
                  <Send className="h-4 w-4" /> Send Email
                </a>
              </div>
              <div className="space-y-2">
                {contacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all hover:border-[color:var(--gold)]/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[color:var(--gold)]/25 bg-[color:var(--gold)]/10 text-[color:var(--gold-soft)]">
                        {c.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {c.label}
                        </div>
                        <div className="truncate text-sm text-foreground/90">{c.value}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--gold-soft)]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative pb-10 pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div
          aria-hidden
          className="mx-auto mb-8 h-px w-full max-w-lg bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent"
        />
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <div>
            Designed &amp; Developed by{" "}
            <span className="text-foreground">M Mohamed Rasool Raheesh</span>
          </div>
          <div className="text-xs uppercase tracking-[0.18em]">
            © {new Date().getFullYear()} — All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
