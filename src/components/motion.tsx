"use client";

import { motion, useReducedMotion } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

// Aparece suavemente al entrar en pantalla (una sola vez).
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

// Tarjeta que se eleva al pasar el ratón y tiene un brillo que sigue al cursor.
export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`spotlight ${className}`}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </motion.div>
  );
}

// Línea que tacha un texto al entrar en pantalla.
export function Strike({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="relative">
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute top-1/2 left-0 h-[2px] w-full origin-left bg-white/40"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease, delay }}
      />
    </span>
  );
}
