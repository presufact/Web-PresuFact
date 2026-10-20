import type { Metadata, Viewport } from "next";
import { Archivo, Poppins } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

// Misma familia que el logotipo, para los titulares.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PresuFact | Diseño web y automatización para autónomos y pymes",
    template: "%s | PresuFact",
  },
  description: site.description,
  keywords: [
    "diseño web para autónomos",
    "páginas web para pymes",
    "SEO local",
    "automatizar presupuestos",
    "automatizar facturas",
    "inteligencia artificial para pequeñas empresas",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: site.name,
    title: `PresuFact: ${site.slogan}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#144673",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} ${poppins.variable} antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
