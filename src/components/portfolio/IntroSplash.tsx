import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroSplash() {
  const [stage, setStage] = useState<"name" | "exit" | "done">("name");

  useEffect(() => {
    // lock scroll while splash is up
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setStage("exit"), 1800);
    const t2 = setTimeout(() => {
      setStage("done");
      document.body.style.overflow = prev;
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          animate={stage === "exit" ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#ff2e2e]"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end font-display font-extrabold tracking-tight text-white text-[clamp(3rem,10vw,8rem)] leading-none"
          >
            <span>Rasool</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="ml-1 inline-block h-[0.18em] w-[0.18em] translate-y-[-0.06em] bg-black"
            />
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
