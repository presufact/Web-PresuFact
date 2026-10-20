"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileCheck2,
  Lock,
  MousePointer2,
  Phone,
  PlugZap,
  ShieldCheck,
  Star,
  UserRoundPlus,
  Zap,
} from "lucide-react";
import { ease } from "./motion";

/*
  Escena de la portada (negocio ficticio "Electricidad Ruiz"):
  1. aparece su web  2. un cliente pulsa "Pedir presupuesto gratis"
  3. llega el contacto  4. la factura se rellena sola  5. se envía y se programa el cobro
*/
const t = {
  site: 0.3,
  siteItems: 0.6,
  cursor: 1.3,
  click: 2.3,
  contact: 2.5,
  invoice: 2.9,
  lines: 3.3,
  step: 0.3,
};

const lines = [
  { concept: "Cuadro eléctrico + 4 magnetotérmicos", detail: "1 ud.", amount: 245 },
  { concept: "Diferencial 40 A / 30 mA", detail: "1 ud.", amount: 62 },
  { concept: "Cable 2,5 mm²", detail: "25 m × 1,40 €", amount: 35 },
  { concept: "Mano de obra", detail: "3 h × 38,00 €", amount: 114 },
];

const totalsAt = t.lines + t.step * lines.length;
const stampAt = totalsAt + 0.5;

const eur = (n: number) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const appear = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
});

function Toast({ icon, title, text, className, delay }: { icon: React.ReactNode; title: string; text: string; className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute z-30 ${className}`}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <div className="flex animate-float items-center gap-3 rounded-2xl bg-white/95 py-2.5 pr-4 pl-2.5 text-navy shadow-[0_20px_40px_-15px_rgba(4,24,44,0.6)] backdrop-blur">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mist text-navy">{icon}</span>
        <span className="whitespace-nowrap">
          <span className="block text-sm font-bold">{title}</span>
          <span className="block text-xs text-muted">{text}</span>
        </span>
      </div>
    </motion.div>
  );
}

// Dibuja su contenido a tamaño de escritorio y lo reduce para que quepa: parece una web real en miniatura.
function Scaled({ width, ratio, children }: { width: number; ratio: string; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 0, height: 0 });

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const update = () => {
      const scale = o.clientWidth / width;
      setBox({ scale, height: i.offsetHeight * scale });
    };
    const ro = new ResizeObserver(update);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={outer}
      className="relative overflow-hidden"
      style={box.height ? { height: box.height } : { aspectRatio: ratio }}
    >
      <div
        ref={inner}
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, transform: `scale(${box.scale})`, visibility: box.scale ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}

const reviewers = [
  { initials: "MG", bg: "#f97316" },
  { initials: "AL", bg: "#22c55e" },
  { initials: "CS", bg: "#3b82f6" },
];

// Web de ejemplo del electricista, diseñada a 820 px de ancho.
function ElectricSite() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden bg-[#0b1120] text-white">
      {/* Fondo: brillo eléctrico y retícula */}
      <div aria-hidden="true" className="absolute -top-32 right-10 h-96 w-96 rounded-full bg-[#facc15]/20 blur-[100px]" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#3b82f6]/15 blur-[100px]" />
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />

      {/* Menú de la web */}
      <div className="relative flex items-center justify-between px-10 py-5">
        <span className="flex items-center gap-2.5 font-display text-[19px] font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#fde047] to-[#f59e0b] text-[#0b1120] shadow-[0_0_24px_rgba(250,204,21,0.45)]">
            <Zap className="h-5 w-5" fill="currentColor" aria-hidden="true" />
          </span>
          Electricidad Ruiz
        </span>
        <span className="flex items-center gap-7 text-[14px] text-white/65">
          <span>Servicios</span>
          <span>Opiniones</span>
          <span>Zonas</span>
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white">
            <Phone className="h-4 w-4" aria-hidden="true" /> Llamar ahora
          </span>
        </span>
      </div>

      {/* Portada de la web */}
      <div className="relative grid grid-cols-[1.2fr_1fr] gap-7 px-10 pt-6 pb-10">
        <div>
          <motion.span
            {...appear(t.siteItems)}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-[13px] font-medium text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponibles hoy, también urgencias
          </motion.span>

          <motion.p {...appear(t.siteItems + 0.1)} className="mt-5 font-display text-[48px] leading-[1.02] font-bold tracking-[-0.035em]">
            Instalaciones seguras,{" "}
            <span className="bg-gradient-to-r from-[#fde047] to-[#f59e0b] bg-clip-text text-transparent">sin sorpresas en la factura.</span>
          </motion.p>

          <motion.p {...appear(t.siteItems + 0.2)} className="mt-4 max-w-[36ch] text-[16px] leading-relaxed text-white/65">
            Electricistas autorizados para tu casa o tu negocio. Presupuesto gratis en menos de 24 horas.
          </motion.p>

          <motion.div {...appear(t.siteItems + 0.3)} className="mt-7 flex items-center gap-3">
            <span className="relative">
              <motion.span
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#fde047] to-[#facc15] px-6 py-3.5 text-[15px] font-bold whitespace-nowrap text-[#0b1120] shadow-[0_10px_30px_-6px_rgba(250,204,21,0.6)]"
                animate={reduce ? undefined : { scale: [1, 1, 0.93, 1] }}
                transition={{ duration: 0.4, delay: t.click, times: [0, 0.2, 0.5, 1] }}
              >
                Pedir presupuesto gratis <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.span>
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute top-6 left-36 z-10"
                  initial={{ opacity: 0, x: 170, y: 110 }}
                  animate={{ opacity: [0, 1, 1, 0], x: [170, 170, 0, 0], y: [110, 110, 0, 0] }}
                  transition={{ duration: 1.8, delay: t.cursor, times: [0, 0.15, 0.55, 1], ease: "easeInOut" }}
                >
                  <MousePointer2 className="h-8 w-8 fill-white text-[#0b1120] drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]" />
                </motion.span>
              )}
            </span>
            <span className="rounded-full border border-white/15 px-5 py-3.5 text-[15px] font-semibold whitespace-nowrap text-white/90">
              Ver servicios
            </span>
          </motion.div>

          <motion.div {...appear(t.siteItems + 0.4)} className="mt-7 flex items-center gap-3">
            <span className="flex -space-x-2.5">
              {reviewers.map((r) => (
                <span
                  key={r.initials}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#0b1120] text-[11px] font-bold"
                  style={{ background: r.bg }}
                >
                  {r.initials}
                </span>
              ))}
            </span>
            <span>
              <span className="flex gap-0.5 text-[#facc15]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
                ))}
              </span>
              <span className="text-[13px] text-white/65">
                <b className="text-white">4,9</b> de 128 reseñas en Google
              </span>
            </span>
          </motion.div>
        </div>

        {/* Visual: rayo con pulsos y tarjetas flotantes */}
        <motion.div
          {...appear(t.siteItems + 0.15)}
          className="relative min-h-[330px] rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02]"
        >
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            {!reduce &&
              [0, 1].map((i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border-2 border-[#facc15]/60"
                  animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
                />
              ))}
            <span className="relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-[#fde047] to-[#f59e0b] text-[#0b1120] shadow-[0_0_60px_10px_rgba(250,204,21,0.35)]">
              <Zap className="h-12 w-12" fill="currentColor" aria-hidden="true" />
            </span>
          </div>

          <motion.div {...appear(t.siteItems + 0.5)} className="absolute top-5 left-5 right-5">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1120]/80 p-3 backdrop-blur">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#3b82f6] text-[13px] font-bold">JR</span>
              <span className="flex-1">
                <span className="block text-[13px] font-semibold">Técnico en camino</span>
                <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-[#fde047] to-[#f59e0b]"
                    initial={{ width: "15%" }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 3, ease: "easeInOut", delay: t.siteItems + 0.8 }}
                  />
                </span>
              </span>
              <span className="text-[13px] font-bold text-[#facc15]">25 min</span>
            </div>
          </motion.div>

          <motion.span
            {...appear(t.siteItems + 0.7)}
            className="absolute bottom-16 left-5 flex animate-float items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-[12.5px] font-medium backdrop-blur"
          >
            <PlugZap className="h-4 w-4 text-[#facc15]" aria-hidden="true" /> Cargadores de coche eléctrico
          </motion.span>
          <motion.span
            {...appear(t.siteItems + 0.85)}
            className="absolute right-5 bottom-28 flex animate-float items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-[12.5px] font-medium backdrop-blur [animation-delay:-3s]"
          >
            <FileCheck2 className="h-4 w-4 text-[#facc15]" aria-hidden="true" /> Boletín eléctrico
          </motion.span>
        </motion.div>
      </div>

      {/* Franja de garantías */}
      <div className="relative flex justify-between border-t border-white/10 bg-white/[0.03] px-10 py-4 text-[13.5px] text-white/75">
        {[
          { icon: ShieldCheck, label: "Instalador autorizado" },
          { icon: BadgeCheck, label: "Garantía de 2 años" },
          { icon: Clock, label: "Respuesta en el día" },
        ].map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-[#facc15]" aria-hidden="true" /> {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Ventana de navegador con la web dentro.
function BrowserFrame() {
  return (
    <motion.div
      className="overflow-hidden rounded-2xl bg-[#0b1120] shadow-[0_40px_80px_-24px_rgba(4,24,44,0.75)] ring-1 ring-white/20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: t.site }}
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#1a2235] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="hidden gap-1 text-white/30 sm:flex" aria-hidden="true">
          <ChevronLeft className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-white/10 px-3 py-1 text-[11px] text-white/70 sm:px-6">
          <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="truncate">electricidadruiz.es</span>
        </span>
        <span className="w-10" aria-hidden="true" />
      </div>
      <Scaled width={820} ratio="820 / 520">
        <ElectricSite />
      </Scaled>
    </motion.div>
  );
}

// Factura del electricista que se rellena sola (animación con CSS).
function InvoiceDemo() {
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const iva = subtotal * 0.21;

  return (
    <motion.div
      className="relative rounded-2xl bg-white p-4 text-navy shadow-[0_40px_80px_-20px_rgba(4,24,44,0.75)] ring-1 ring-navy/5"
      initial={{ opacity: 0, y: 40, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.7, ease, delay: t.invoice }}
    >
      <div className="flex items-start justify-between gap-3 border-b border-navy/10 pb-2.5">
        <div>
          <p className="text-[11px] font-semibold text-muted">Factura del 20/10/2026</p>
          <p className="font-display text-base font-bold">F-2026-0148</p>
        </div>
        <div className="text-right text-[11px] leading-snug text-muted">
          <p className="flex items-center justify-end gap-1.5 font-semibold text-navy">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-[#fde047] to-[#f59e0b] text-[#0b1120]">
              <Zap className="h-3 w-3" fill="currentColor" aria-hidden="true" />
            </span>
            Electricidad Ruiz
          </p>
          <p className="mt-0.5">Cliente: Laura Gómez</p>
        </div>
      </div>

      <ul className="divide-y divide-navy/10 text-[12.5px]">
        {lines.map((l, i) => (
          <li
            key={l.concept}
            className="q-line flex items-baseline justify-between gap-3 py-1.5"
            style={{ "--d": `${t.lines + t.step * i}s` } as React.CSSProperties}
          >
            <span className="min-w-0">
              <span className="block leading-snug">{l.concept}</span>
              <span className="block text-[11px] text-muted">{l.detail}</span>
            </span>
            <span className="shrink-0 font-semibold tabular-nums">{eur(l.amount)}</span>
          </li>
        ))}
      </ul>

      <dl
        className="q-line mt-1 space-y-1 rounded-xl bg-paper p-3 text-[12.5px]"
        style={{ "--d": `${totalsAt}s` } as React.CSSProperties}
      >
        <div className="flex justify-between text-muted">
          <dt>Base imponible</dt>
          <dd className="tabular-nums">{eur(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-muted">
          <dt>IVA 21 %</dt>
          <dd className="tabular-nums">{eur(iva)}</dd>
        </div>
        <div className="flex justify-between border-t border-navy/15 pt-1.5 font-display text-[15px] font-bold">
          <dt>Total</dt>
          <dd className="tabular-nums">{eur(subtotal + iva)}</dd>
        </div>
      </dl>

      <p
        className="q-stamp absolute -top-4 -right-2 rounded-xl border-[3px] border-amber bg-white px-3 py-1 font-display text-sm font-bold text-navy shadow-lg sm:-right-4"
        style={{ "--d": `${stampAt}s` } as React.CSSProperties}
      >
        Enviada al cliente
      </p>
    </motion.div>
  );
}

export function Showcase() {
  return (
    <figure className="relative mx-auto w-full max-w-[36rem]">
      <figcaption className="sr-only">
        Ejemplo: la web de un electricista recibe un contacto y la factura del trabajo se genera y
        se envía automáticamente.
      </figcaption>

      <BrowserFrame />

      <div className="relative z-20 -mt-10 ml-auto w-[90%] sm:-mt-36 sm:w-[60%]">
        <InvoiceDemo />
      </div>

      <Toast
        icon={<UserRoundPlus className="h-5 w-5" aria-hidden="true" />}
        title="Nuevo contacto"
        text="Desde electricidadruiz.es"
        className="-top-7 right-2 sm:-right-4"
        delay={t.contact}
      />
      <Toast
        icon={<BellRing className="h-5 w-5" aria-hidden="true" />}
        title="Cobro programado"
        text="Recordatorio al vencimiento"
        className="-bottom-8 left-0 hidden sm:block lg:-left-10"
        delay={stampAt + 0.5}
      />
    </figure>
  );
}
