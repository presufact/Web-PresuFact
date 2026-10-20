import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";

// TODO: sustituir por los textos legales definitivos (titular, NIF, domicilio, etc.).
const pages: Record<string, { title: string; body: string }> = {
  "aviso-legal": {
    title: "Aviso legal",
    body: "Aquí irán los datos identificativos del titular de la web (nombre o razón social, NIF, domicilio y email de contacto) y las condiciones de uso del sitio.",
  },
  privacidad: {
    title: "Política de privacidad",
    body: "Aquí se explicará quién trata los datos personales, con qué finalidad, durante cuánto tiempo se conservan y cómo ejercer los derechos de acceso, rectificación y supresión.",
  },
  cookies: {
    title: "Política de cookies",
    body: "Esta web no utiliza cookies de analítica ni publicidad. Si en el futuro se añaden, aquí se detallarán y se pedirá tu consentimiento.",
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: pages[slug]?.title, robots: { index: false } };
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Link href="/" aria-label="Volver al inicio">
        <Logo />
      </Link>
      <h1 className="display mt-12 text-4xl">{page.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">{page.body}</p>
    </main>
  );
}
