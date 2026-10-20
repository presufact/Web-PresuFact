"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "./Logo";
import { ease } from "./motion";
import { nav, whatsappLink } from "@/lib/site";

// Menú flotante tipo "píldora": cristal sobre la portada, blanco al hacer scroll.
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
    if (v < 300) setActive(null);
  });

  // Marca la sección que se está viendo.
  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;
  const highlight = hovered ?? active;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`relative mx-auto overflow-hidden border backdrop-blur-xl transition-[max-width,background-color,border-color,box-shadow,color,border-radius] duration-500 ${
          open ? "rounded-[28px]" : "rounded-[40px]"
        } ${
          solid
            ? `max-w-5xl border-navy/10 text-navy shadow-[0_12px_40px_-12px_rgba(11,45,77,0.3)] ${open ? "bg-white" : "bg-white/85"}`
            : "max-w-6xl border-white/15 bg-white/[0.07] text-white"
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4 pr-2 pl-5">
          <a href="#inicio" aria-label="PresuFact, ir al inicio" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo light={!solid} priority className="h-8 w-auto sm:h-9" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center" onMouseLeave={() => setHovered(null)}>
              {nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onMouseEnter={() => setHovered(item.href)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative isolate block rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                        isActive || hovered === item.href
                          ? ""
                          : solid
                            ? "text-navy/70"
                            : "text-white/75"
                      }`}
                    >
                      {highlight === item.href && (
                        <motion.span
                          layoutId="nav-pill"
                          className={`absolute inset-0 -z-10 rounded-full ${solid ? "bg-navy/[0.07]" : "bg-white/15"}`}
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contacto"
              className="group hidden items-center gap-2 rounded-full bg-amber py-1.5 pr-1.5 pl-5 text-sm font-bold text-navy-deep shadow-[0_8px_24px_-8px_rgba(242,177,56,0.8)] sm:inline-flex"
            >
              Pide presupuesto
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-deep text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            <button
              type="button"
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors lg:hidden ${
                solid ? "bg-navy/[0.06] hover:bg-navy/10" : "bg-white/10 hover:bg-white/20"
              }`}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="menu-movil"
              aria-label="Menú móvil"
              className="lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="px-3 pb-3">
                <ul className="border-t border-navy/10 pt-2">
                  {[...nav, { href: "#contacto", label: "Contacto" }].map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: 0.08 + i * 0.04 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-semibold transition-colors hover:bg-navy/5"
                      >
                        {item.label}
                        <ArrowUpRight className="h-5 w-5 text-navy/40" aria-hidden="true" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="mt-3 grid gap-2 sm:grid-cols-2"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.35 }}
                >
                  <a
                    href="#contacto"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl bg-amber px-5 py-4 text-center font-bold text-navy-deep"
                  >
                    Pide presupuesto
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-4 font-bold text-white"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <motion.div
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-amber transition-opacity ${scrolled && !open ? "opacity-100" : "opacity-0"}`}
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </header>
  );
}
