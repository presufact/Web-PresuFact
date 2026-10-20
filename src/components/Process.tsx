"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal } from "./motion";
import { steps } from "@/lib/site";

// Pasos con una línea de progreso que se rellena al hacer scroll.
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
      {/* Línea horizontal (escritorio) */}
      <div aria-hidden="true" className="absolute top-6 right-0 left-0 hidden h-[3px] rounded-full bg-navy/10 lg:block">
        <motion.div className="h-full origin-left rounded-full bg-amber" style={{ scaleX: progress }} />
      </div>
      {/* Línea vertical (móvil) */}
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-6 w-[3px] rounded-full bg-navy/10 lg:hidden">
        <motion.div className="h-full w-full origin-top rounded-full bg-amber" style={{ scaleY: progress }} />
      </div>

      {steps.map((step, i) => (
        <li key={step.title}>
          <Reveal delay={i * 0.12} className="relative pl-20 lg:pl-0">
            <span className="absolute top-0 left-0 grid h-12 w-12 place-items-center rounded-full bg-navy font-display text-lg font-bold text-white ring-8 ring-paper lg:relative">
              {i + 1}
            </span>
            <h3 className="mt-0 font-display text-xl font-bold lg:mt-7">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
