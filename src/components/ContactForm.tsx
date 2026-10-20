"use client";

import { useState } from "react";
import { sectors, site } from "@/lib/site";

const needs = ["Web y marketing", "Facturación automática", "Las dos cosas", "Aún no lo sé"];

const field =
  "mt-1.5 block w-full rounded-lg border border-navy/20 bg-white px-3.5 py-3 text-navy placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-sky";

// Sin servidor de correo todavía: abre el email del usuario con el mensaje ya redactado.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Nombre: ${d.get("nombre")}`,
      `Negocio: ${d.get("negocio") || "-"}`,
      `Sector: ${d.get("sector") || "-"}`,
      `Teléfono: ${d.get("telefono") || "-"}`,
      `Email: ${d.get("email")}`,
      `Necesito: ${d.get("necesidad")}`,
      "",
      `${d.get("mensaje") || ""}`,
    ].join("\n");
    const subject = `Solicitud de presupuesto: ${d.get("negocio") || d.get("nombre")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-semibold">
        Nombre
        <input name="nombre" required autoComplete="name" className={field} />
      </label>
      <label className="text-sm font-semibold">
        Negocio
        <input name="negocio" autoComplete="organization" className={field} />
      </label>
      <label className="text-sm font-semibold">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="text-sm font-semibold">
        Teléfono
        <input name="telefono" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="text-sm font-semibold sm:col-span-2">
        Sector
        <select name="sector" defaultValue="" className={field}>
          <option value="">Elige tu sector</option>
          {sectors.map((s) => (
            <option key={s}>{s}</option>
          ))}
          <option>Otro</option>
        </select>
      </label>

      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-semibold">¿Qué necesitas?</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-nowrap">
          {needs.map((n, i) => (
            <label key={n} className="cursor-pointer">
              <input type="radio" name="necesidad" value={n} defaultChecked={i === 0} className="peer sr-only" />
              <span className="flex h-full items-center justify-center rounded-2xl border border-navy/25 px-3 py-2 text-center text-[13.5px] font-medium transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-amber sm:rounded-full sm:whitespace-nowrap">
                {n}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="text-sm font-semibold sm:col-span-2">
        Cuéntanos un poco más
        <textarea
          name="mensaje"
          rows={4}
          placeholder="Por ejemplo: tardo dos horas al día en hacer presupuestos y mi web no recibe contactos."
          className={field}
        />
      </label>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted" role="status">
          {sent
            ? "Se ha abierto tu correo con el mensaje listo. Solo falta pulsar Enviar."
            : "Al enviar se abrirá tu correo con el mensaje redactado. Solo usamos tus datos para responderte."}
        </p>
        <button
          type="submit"
          className="shrink-0 rounded-full bg-amber px-7 py-3.5 font-bold text-navy-deep transition-colors hover:bg-navy hover:text-white"
        >
          Enviar solicitud
        </button>
      </div>
    </form>
  );
}
