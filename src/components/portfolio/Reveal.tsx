import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-[color:var(--gold)]" />
        {eyebrow}
      </div>
      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
        {title.split(" ").map((w, i, arr) =>
          i === arr.length - 1 ? (
            <span key={i} className="gold-text">
              {" "}
              {w}
            </span>
          ) : (
            <span key={i}>{i === 0 ? "" : " "}{w}</span>
          )
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </Reveal>
  );
}
