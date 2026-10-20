import {
  BellRing,
  Bot,
  FileText,
  MonitorSmartphone,
  MousePointerClick,
  Receipt,
  Search,
  Wrench,
} from "lucide-react";

// Datos del negocio. Cambia aquí el contacto real y se actualiza en toda la web.
export const site = {
  name: "PresuFact",
  slogan: "Más clientes, menos tareas.",
  description:
    "Diseño web, SEO y automatización con inteligencia artificial para autónomos y pequeñas empresas. Consigue más clientes y deja que los presupuestos y las facturas se hagan solos.",
  url: "https://presufact.es", // TODO: dominio definitivo
  email: "presufact@gmail.com", // TODO: email real
  phone: "+34 600 000 000", // TODO: teléfono real
  whatsapp: "34600000000", // TODO: número de WhatsApp con prefijo, sin "+" ni espacios
};

export const whatsappLink = (text = "Hola, quiero información sobre PresuFact") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const phoneLink = `tel:${site.phone.replace(/\s/g, "")}`;

export const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#automatizacion", label: "Automatización" },
  { href: "#sectores", label: "Sectores" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#preguntas", label: "Preguntas" },
];

export const serviceLines = [
  {
    id: "web",
    title: "Diseño web y marketing digital",
    intro: "Para que te encuentren, confíen en ti y te escriban.",
    cta: "Quiero una web que traiga clientes",
    items: [
      {
        icon: MonitorSmartphone,
        name: "Páginas web a medida",
        text: "Rápidas, claras y pensadas para el móvil, que es desde donde te buscan tus clientes.",
      },
      {
        icon: Search,
        name: "SEO y posicionamiento local",
        text: "Aparece cuando alguien de tu zona busca lo que ofreces en Google.",
      },
      {
        icon: MousePointerClick,
        name: "Optimización para captar clientes",
        text: "Formularios, llamadas y WhatsApp colocados donde convierten visitas en contactos.",
      },
      {
        icon: Wrench,
        name: "Mantenimiento",
        text: "Actualizaciones, copias de seguridad y cambios de contenido sin que tengas que pelearte con nada.",
      },
    ],
  },
  {
    id: "auto",
    title: "Automatización e inteligencia artificial",
    intro: "Para que el papeleo deje de comerse tus tardes.",
    cta: "Quiero automatizar mi negocio",
    items: [
      {
        icon: FileText,
        name: "Presupuestos automáticos",
        text: "Rellenas lo esencial y el presupuesto sale con tu imagen, calculado y listo para enviar.",
      },
      {
        icon: Receipt,
        name: "Facturación automática",
        text: "Cuando el cliente acepta, la factura se genera a partir del presupuesto. Sin volver a teclear datos.",
      },
      {
        icon: BellRing,
        name: "Tareas administrativas",
        text: "Recordatorios de cobro, confirmaciones de cita y correos repetitivos que se envían solos.",
      },
      {
        icon: Bot,
        name: "Asistentes con IA",
        text: "Responden las consultas de siempre a cualquier hora y te pasan los contactos interesados.",
      },
    ],
  },
];

export const pipeline = ["Visita en tu web", "Nuevo contacto", "Presupuesto enviado", "Factura emitida"];

export const benefits = [
  {
    title: "Precio cerrado",
    text: "Sabes lo que vas a pagar antes de empezar. Sin horas extra ni sorpresas.",
  },
  {
    title: "Sin tecnicismos",
    text: "Te explicamos todo en tu idioma y te dejamos las herramientas listas para usar.",
  },
  {
    title: "A la medida de una pyme",
    text: "Soluciones del tamaño de tu negocio, no software de gran empresa que nunca terminas de usar.",
  },
];

export const beforeAfter = [
  {
    task: "Hacer un presupuesto",
    before: "Abrir la plantilla, copiar datos del cliente, calcular el IVA, exportar a PDF y adjuntarlo a un correo.",
    after: "Rellenas un formulario corto y el cliente lo recibe al momento.",
  },
  {
    task: "Facturar un trabajo terminado",
    before: "Volver a escribir lo mismo que ya pusiste en el presupuesto.",
    after: "La factura sale del presupuesto aceptado con un clic.",
  },
  {
    task: "Reclamar un pago",
    before: "Revisar a mano quién no ha pagado y escribirle uno por uno.",
    after: "Cada cliente recibe un recordatorio cuando vence su factura.",
  },
  {
    task: "Responder las mismas preguntas",
    before: "Contestar horarios, precios orientativos y disponibilidad varias veces al día.",
    after: "Un asistente responde y te avisa solo cuando hay un cliente real.",
  },
];

export const sectors = [
  "Reformas y construcción",
  "Fontanería y electricidad",
  "Instaladores",
  "Talleres mecánicos",
  "Clínicas y fisioterapia",
  "Peluquerías y estética",
  "Restaurantes y cafeterías",
  "Comercio local",
  "Asesorías y gestorías",
  "Academias y formación",
  "Inmobiliarias",
  "Limpieza y mantenimiento",
];

export const steps = [
  {
    title: "Hablamos",
    text: "Por llamada o por email, como prefieras. Sin compromiso, para entender tu negocio y qué te está quitando tiempo o clientes.",
  },
  {
    title: "Te enviamos una propuesta",
    text: "Qué vamos a hacer, en cuánto tiempo y por cuánto. Un precio cerrado, sin sorpresas después.",
  },
  {
    title: "Lo construimos",
    text: "Diseñamos la web o montamos la automatización. Te enseñamos avances y ajustamos contigo.",
  },
  {
    title: "Te acompañamos",
    text: "Lo dejamos funcionando, te explicamos cómo usarlo y seguimos ahí para mejorarlo.",
  },
];

export const faqs = [
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Nosotros nos encargamos de la parte técnica y te lo dejamos todo funcionando. Tú solo tienes que contarnos cómo trabajas.",
  },
  {
    q: "¿Cuánto tarda en estar lista una web?",
    a: "Depende del tamaño del proyecto. En la propuesta te indicamos un plazo concreto antes de empezar.",
  },
  {
    q: "¿Puedo seguir usando mi programa de facturación?",
    a: "En muchos casos sí: conectamos la automatización con las herramientas que ya usas. Lo revisamos en la primera llamada.",
  },
  {
    q: "¿Las facturas automáticas cumplen la normativa?",
    a: "Las configuramos con los datos fiscales obligatorios y adaptadas a la normativa vigente de facturación en España.",
  },
  {
    q: "¿Qué pasa si después necesito cambios?",
    a: "Ofrecemos mantenimiento para que tu web y tus automatizaciones sigan al día. Los cambios pequeños se resuelven rápido.",
  },
];
