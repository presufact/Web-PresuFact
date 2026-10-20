import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Check, HandCoins, Mail, MessageCircle, Phone, Ruler, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Logo } from "@/components/Logo";
import { MobileBar } from "@/components/MobileBar";
import { Process } from "@/components/Process";
import { Reveal, SpotlightCard, Strike } from "@/components/motion";
import ClickSpark from "@/components/ClickSpark";
import GlareHover from "@/components/GlareHover";
import Particles from "@/components/Particles";
import RotatingText from "@/components/RotatingText";
import { Statement } from "@/components/Statement";
import {
  beforeAfter,
  benefits,
  faqs,
  nav,
  phoneLink,
  pipeline,
  sectors,
  serviceLines,
  site,
  whatsappLink,
} from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: site.name,
      slogan: site.slogan,
      description: site.description,
      url: site.url,
      logo: `${site.url}/brand/logo-azul.png`,
      email: site.email,
      telephone: site.phone,
      areaServed: "ES",
      knowsAbout: ["Diseño web", "SEO", "Marketing digital", "Automatización", "Inteligencia artificial"],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const container = "mx-auto max-w-6xl px-4 sm:px-6";
const h2 = "display text-4xl sm:text-5xl lg:text-[3.4rem]";
const benefitIcons = [HandCoins, Sparkles, Ruler];
const rotatingSectors = ["reformas", "clínicas", "talleres", "peluquerías", "restaurantes", "asesorías", "academias", "comercios"];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ClickSpark sparkColor={["#F2B138", "#66CAF2"]} sparkCount={10} sparkRadius={22} shape="streak">
      <Header />

      <main id="inicio" className="overflow-x-clip pb-16 md:pb-0">
        <Hero />

        {/* Cinta de sectores */}
        <div className="overflow-hidden border-y border-white/10 bg-navy-deep py-5 text-white/80">
          <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-12">
                {sectors.map((s) => (
                  <li key={s} className="flex items-center gap-12 font-display text-lg font-medium whitespace-nowrap">
                    {s}
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Frase que se ilumina al hacer scroll */}
        <section className="pt-24 sm:pt-32">
          <div className={container}>
            <Statement />
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-20 sm:py-28">
          <div className={container}>
            <Reveal className="text-center">
              <h2 className={`${h2} lg:whitespace-nowrap`}>Dos formas de ayudarte a crecer</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                Puedes empezar por una y sumar la otra cuando quieras. Funcionan mejor juntas: la
                web trae los clientes y la automatización te da tiempo para atenderlos.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-6 lg:grid-cols-2">
              {serviceLines.map((line, li) => (
                <Reveal key={line.id} delay={li * 0.12} className="h-full">
                  <SpotlightCard
                    className={`flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-10 ${
                      line.id === "web"
                        ? "bg-paper"
                        : "bg-gradient-to-br from-mist/70 to-mist/30"
                    }`}
                  >
                    <h3 className="display text-3xl sm:text-[2.1rem]">{line.title}</h3>
                    <p className="mt-3 text-lg text-muted">{line.intro}</p>
                    <ul className="mt-8 grid flex-1 gap-3">
                      {line.items.map((item, i) => (
                        <li key={item.name}>
                          <Reveal delay={0.15 + i * 0.08} y={16}>
                            <div className="flex gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-navy/5 backdrop-blur transition-colors hover:bg-white">
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-white">
                                <item.icon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              <span>
                                <span className="block font-display font-semibold">{item.name}</span>
                                <span className="mt-1 block text-[15px] leading-relaxed text-muted">{item.text}</span>
                              </span>
                            </div>
                          </Reveal>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contacto"
                      className="group mt-8 inline-flex items-center gap-2 self-start rounded-full bg-navy px-6 py-3 font-bold text-white transition-colors hover:bg-navy-deep"
                    >
                      {line.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Por qué PresuFact */}
        <section className="pb-24 sm:pb-32">
          <div className={container}>
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-navy p-8 text-white sm:p-12">
                <div aria-hidden="true" className="bg-grid absolute inset-0" />
                <div aria-hidden="true" className="absolute -top-24 right-0 h-72 w-72 animate-drift rounded-full bg-sky/30 blur-[100px]" />
                <div className="relative">
                  <h2 className={`${h2} max-w-2xl`}>Todo conectado, en un mismo equipo</h2>
                  <p className="mt-5 max-w-2xl text-lg text-white/75">
                    La web que te trae clientes y el sistema que gestiona su presupuesto y su
                    factura hablan entre sí. Nada se queda por el camino.
                  </p>

                  <ol className="relative mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    <div aria-hidden="true" className="absolute top-1/2 right-[12%] left-[12%] hidden h-0.5 -translate-y-1/2 bg-white/15 lg:block">
                      <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-travel rounded-full bg-amber shadow-[0_0_16px_4px_rgba(242,177,56,0.7)]" />
                    </div>
                    {pipeline.map((p, i) => (
                      <li key={p} className="relative">
                        <Reveal delay={0.2 + i * 0.12} y={16}>
                          <div className="flex h-full items-center gap-3 rounded-2xl border border-white/15 bg-navy-deep/80 px-4 py-4 backdrop-blur lg:flex-col lg:text-center">
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky font-display text-sm font-bold text-navy-deep">
                              {i + 1}
                            </span>
                            <span className="font-display font-semibold">{p}</span>
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {benefits.map((b, i) => {
                const Icon = benefitIcons[i];
                return (
                  <Reveal key={b.title} delay={i * 0.1} className="h-full">
                    <GlareHover
                      width="100%"
                      height="100%"
                      background="#ffffff"
                      borderRadius="2rem"
                      borderColor="rgba(20,70,115,0.12)"
                      glareColor="#66CAF2"
                      glareOpacity={0.35}
                      variant="sheen"
                      className="!block h-full"
                    >
                      <div className="h-full p-8">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber/20 text-navy">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <h3 className="mt-6 font-display text-xl font-bold">{b.title}</h3>
                        <p className="mt-2 leading-relaxed text-muted">{b.text}</p>
                      </div>
                    </GlareHover>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Antes y después de automatizar */}
        <section id="automatizacion" className="relative overflow-hidden bg-navy-deep py-24 text-white sm:py-32">
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
          <div className={`${container} relative`}>
            <Reveal className="max-w-3xl">
              <h2 className={h2}>Lo que hoy haces a mano, mañana se hace solo</h2>
              <p className="mt-6 text-lg text-white/70">
                Estas son las tareas que más tiempo roban a un pequeño negocio. Así cambian cuando
                las automatizamos.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-4">
              <div className="hidden grid-cols-[1fr_1.4fr_1.4fr] gap-8 px-8 text-sm font-semibold text-white/50 lg:grid">
                <span>Tarea</span>
                <span>Ahora</span>
                <span>Con PresuFact</span>
              </div>
              {beforeAfter.map((row, i) => (
                <Reveal key={row.task} delay={i * 0.08}>
                  <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-sky/40 hover:bg-white/[0.07] sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[1fr_1.4fr_1.4fr] lg:px-8">

                    <p className="font-display text-lg font-semibold sm:col-span-2 lg:col-span-1">{row.task}</p>
                    <p className="text-white/50">
                      <span className="sr-only">Ahora: </span>
                      <Strike delay={0.3 + i * 0.08}>{row.before}</Strike>
                    </p>
                    <p className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber text-navy-deep">
                        <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="sr-only">Con PresuFact: </span>
                        {row.after}
                      </span>
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sectores */}
        <section id="sectores" className="py-24 sm:py-32">
          <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.5fr]`}>
            <Reveal>
              <h2 className={h2}>
                <span className="sr-only">Hecho para negocios como el tuyo</span>
                <span aria-hidden="true">
                  Hecho para
                  <Suspense
                    fallback={
                      <span className="mt-2 block w-fit rounded-2xl bg-amber px-4 pt-1 pb-2 text-navy-deep">
                        {rotatingSectors[0]}
                      </span>
                    }
                  >
                    <RotatingText
                      texts={rotatingSectors}
                      effect="slide"
                      rotationInterval={2200}
                      staggerDuration={0.02}
                      splitBy="characters"
                      mainClassName="mt-2 w-fit overflow-hidden rounded-2xl bg-amber px-4 pt-1 pb-2 text-navy-deep"
                    />
                  </Suspense>
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Cada sector capta clientes y factura de forma distinta. Adaptamos la web y las
                automatizaciones a cómo trabajas tú.
              </p>
            </Reveal>
            <ul className="flex flex-wrap content-start gap-3">
              {sectors.map((s, i) => (
                <li key={s}>
                  <Reveal delay={i * 0.04} y={12}>
                    <span className="inline-block cursor-default rounded-full border border-navy/15 bg-white px-5 py-3 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-navy hover:bg-navy hover:text-white">
                      {s}
                    </span>
                  </Reveal>
                </li>
              ))}
              <li>
                <Reveal delay={sectors.length * 0.04} y={12}>
                  <a href="#contacto" className="inline-block rounded-full bg-amber px-5 py-3 font-bold text-navy-deep transition-transform hover:-translate-y-0.5">
                    ¿No ves el tuyo? Cuéntanos
                  </a>
                </Reveal>
              </li>
            </ul>
          </div>
        </section>

        {/* Proceso */}
        <section id="proceso" className="bg-paper py-24 sm:py-32">
          <div className={container}>
            <Reveal className="max-w-3xl">
              <h2 className={h2}>Cómo trabajamos</h2>
              <p className="mt-6 text-lg text-muted">Cuatro pasos claros, desde el primer contacto hasta que todo funciona.</p>
            </Reveal>
            <Process />
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section id="preguntas" className="py-24 sm:py-32">
          <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.6fr]`}>
            <Reveal>
              <h2 className={h2}>Preguntas frecuentes</h2>
              <p className="mt-6 text-lg text-muted">
                ¿Tienes otra duda?{" "}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline decoration-amber decoration-2 underline-offset-4">
                  Escríbenos por WhatsApp
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="relative overflow-hidden bg-navy py-24 text-white sm:py-32">
          <div aria-hidden="true" className="bg-grid absolute inset-0" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70">
            <Particles
              particleColors={["#66CAF2", "#A2E4F2", "#F2B138"]}
              particleCount={140}
              particleSpread={10}
              speed={0.08}
              particleBaseSize={80}
              alphaParticles
              disableRotation
            />
          </div>
          <div className={`${container} relative grid gap-12 xl:grid-cols-[1fr_1.6fr]`}>
            <Reveal>
              <h2 className={h2}>Cuéntanos qué te quita tiempo</h2>
              <p className="mt-6 text-lg text-white/75">
                Te respondemos con una propuesta adaptada a tu negocio. Sin compromiso.
              </p>
              <ul className="mt-10 grid gap-3">
                {[
                  { href: whatsappLink(), icon: MessageCircle, label: "WhatsApp", value: "Respuesta rápida", ext: true },
                  { href: phoneLink, icon: Phone, label: "Teléfono", value: site.phone },
                  { href: `mailto:${site.email}`, icon: Mail, label: "Email", value: site.email },
                ].map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-navy-deep">
                        <c.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm text-white/60">{c.label}</span>
                        <span className="block font-semibold">{c.value}</span>
                      </span>
                      <ArrowRight className="ml-auto h-5 w-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-[2rem] bg-white p-6 text-navy shadow-[0_40px_80px_-30px_rgba(4,24,44,0.8)] sm:p-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-navy-deep pb-24 text-white md:pb-0">
        <div className={`${container} grid gap-10 py-16 sm:grid-cols-[1.6fr_1fr_1fr]`}>
          <div>
            <Logo light className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-white/70">
              {site.slogan} Diseño web y automatización para autónomos y pymes.
            </p>
          </div>
          <nav aria-label="Pie de página">
            <p className="font-display font-semibold">Navegación</p>
            <ul className="mt-4 space-y-2.5 text-white/70">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-display font-semibold">Legal</p>
            <ul className="mt-4 space-y-2.5 text-white/70">
              <li>
                <Link href="/legal/aviso-legal" className="transition-colors hover:text-white">Aviso legal</Link>
              </li>
              <li>
                <Link href="/legal/privacidad" className="transition-colors hover:text-white">Política de privacidad</Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="transition-colors hover:text-white">Política de cookies</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className={`${container} border-t border-white/10 py-6 text-sm text-white/50`}>
          © 2026 PresuFact. Todos los derechos reservados.
        </p>
      </footer>

      <MobileBar />
      </ClickSpark>
    </>
  );
}
