import { FileText, MessageCircle, Phone } from "lucide-react";
import { phoneLink, whatsappLink } from "@/lib/site";

// Barra fija inferior solo en móvil.
export function MobileBar() {
  const item = "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-semibold";
  return (
    <nav
      aria-label="Contacto rápido"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy/10 bg-white/90 pb-[env(safe-area-inset-bottom)] text-navy backdrop-blur-xl md:hidden"
    >
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={item}>
        <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
      </a>
      <a href={phoneLink} className={item}>
        <Phone className="h-5 w-5" aria-hidden="true" /> Llamar
      </a>
      <a href="#contacto" className={`${item} bg-amber text-navy-deep`}>
        <FileText className="h-5 w-5" aria-hidden="true" /> Presupuesto
      </a>
    </nav>
  );
}
