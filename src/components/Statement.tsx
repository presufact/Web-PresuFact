"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const problem = "Tu negocio no crece por las horas que pasas haciendo papeleo.";
const solution = "Crece cuando tienes";
const highlight = "tiempo para tus clientes.";

// Palabra que se enciende según el progreso del scroll.
function Word({ children, progress, range, className = "" }: { children: string; progress: MotionValue<number>; range: [number, number]; className?: string }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  );
}

// Frase de transición: el problema en tono suave y la solución resaltada con subrayador amarillo.
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const markerSize = useTransform(scrollYProgress, [0.78, 1], ["0% 100%", "100% 100%"]);

  const words = [
    ...problem.split(" ").map((w) => ({ w, tone: "problem" as const })),
    ...solution.split(" ").map((w) => ({ w, tone: "solution" as const })),
  ];
  const total = words.length + highlight.split(" ").length;
  const range = (i: number): [number, number] => {
    const start = (i / total) * 0.75;
    return [start, start + 0.08];
  };

  if (reduce) {
    return (
      <p className="display mx-auto max-w-4xl text-center text-[clamp(1.85rem,4.4vw,3.2rem)] leading-[1.18] font-semibold">
        <span className="text-muted">{problem}</span> {solution}{" "}
        <span className="rounded-md bg-amber px-[0.15em] text-navy-deep [box-decoration-break:clone]">{highlight}</span>
      </p>
    );
  }

  return (
    <p
      ref={ref}
      className="display mx-auto max-w-4xl text-center text-[clamp(1.85rem,4.4vw,3.2rem)] leading-[1.18] font-semibold"
    >
      <span className="sr-only">
        {problem} {solution} {highlight}
      </span>
      <span aria-hidden="true">
        {words.map(({ w, tone }, i) => (
          <span key={i}>
            <Word progress={scrollYProgress} range={range(i)} className={tone === "problem" ? "text-muted" : "text-navy"}>
              {w}
            </Word>{" "}
          </span>
        ))}
        <motion.span
          className="rounded-md px-[0.15em] text-navy-deep [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
          style={{
            backgroundImage: "linear-gradient(#f2b138, #f2b138)",
            backgroundRepeat: "no-repeat",
            backgroundSize: markerSize,
          }}
        >
          {highlight.split(" ").map((w, j) => (
            <span key={j}>
              <Word progress={scrollYProgress} range={range(words.length + j)}>
                {w}
              </Word>
              {j < highlight.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </motion.span>
      </span>
    </p>
  );
}
