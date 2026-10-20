import Image from "next/image";
import blanco from "../../public/brand/logo-blanco.png";
import azul from "../../public/brand/logo-azul.png";

type Props = { light?: boolean; className?: string; priority?: boolean };

// Logo oficial de PresuFact: versión blanca para fondos oscuros, azul para claros.
export function Logo({ light = false, className = "h-11 w-auto", priority = false }: Props) {
  return (
    <Image
      src={light ? blanco : azul}
      alt="PresuFact"
      className={className}
      sizes="180px"
      priority={priority}
    />
  );
}
