"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check, MessageCircle } from "lucide-react";
import Aurora from "./Aurora";
import Magnet from "./Magnet";
import ShinyText from "./ShinyText";
import SplitText from "./SplitText";
import { Showcase } from "./Showcase";
import { ease } from "./motion";
import { whatsappLink } from "@/lib/site";

const trust = ["Propuesta sin compromiso", "Precio cerrado", "Sin tecnicismos"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);

  const splitProps = {
    tag: "span" as const,
    splitType: "chars" as const,
    effect: "rise" as const,
    trigger: "load" as const,
    mask: true,
    duration: 0.9,
    textAlign: "left" as const,
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy text-white">
      {/* Fondo: aurora de React Bits con los colores de la marca + retícula */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Aurora colorStops={["#2A7BC0", "#66CAF2", "#1D5C94"]} amplitude={1} blend={0.5} speed={0.6} opacity={0.55} />
      </div>
      {/* Oscurece la zona del texto para mantener el contraste del titular */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-transparent max-lg:bg-gradient-to-b max-lg:from-navy/30 max-lg:via-navy/75 max-lg:to-navy/90" />
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy/80" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pt-32 lg:pb-28">
        <div className="min-w-0">
          <motion.p
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-amber shadow-[0_0_12px_2px_rgba(242,177,56,0.8)]" />
            <ShinyText text="Diseño web y automatización con IA" color="rgba(255,255,255,0.8)" shineColor="#ffffff" speed={3} />
          </motion.p>

          <h1 className="display mt-7 text-[clamp(2.6rem,11.5vw,3.6rem)] sm:text-7xl lg:text-[clamp(3.6rem,5.6vw,5rem)]">
            <span className="sr-only">Más clientes, menos tareas.</span>
            <span aria-hidden="true" className="block">
              <SplitText {...splitProps} text="Más clientes," delay={30} />
            </span>
            <span aria-hidden="true" className="block text-sky">
              <SplitText {...splitProps} text="menos tareas." delay={30} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
          >
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:mt-7 sm:text-xl">
              Webs que atraen clientes y automatizaciones que hacen tus presupuestos y facturas por
              ti. Para autónomos y pequeñas empresas que quieren crecer sin pasar la tarde delante
              de una hoja de cálculo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <Magnet padding={60} magnetStrength={3} wrapperClassName="w-full sm:w-auto" innerClassName="w-full">
                <a
                  href="#contacto"
                  className="flex w-full items-center justify-center rounded-full bg-amber px-7 py-4 font-bold whitespace-nowrap text-navy-deep shadow-[0_10px_30px_-8px_rgba(242,177,56,0.65)]"
                >
                  Pide tu presupuesto
                </a>
              </Magnet>
              <Magnet padding={60} magnetStrength={4} wrapperClassName="w-full sm:w-auto" innerClassName="w-full">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 font-bold whitespace-nowrap backdrop-blur transition-colors hover:bg-white/15"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> Escríbenos por WhatsApp
                </a>
              </Magnet>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75 sm:mt-10">
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div style={{ y: cardY }} className="relative w-full pb-6 lg:pb-0">
          <Showcase />
        </motion.div>
      </div>
    </section>
  );
}
