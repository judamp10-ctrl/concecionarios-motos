import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Phone,
  MapPin,
  Star,
  Menu,
  X,
  ArrowRight,
  Zap,
  ShieldCheck,
  Users,
  Navigation,
  Clock,
} from "lucide-react";
import heroMoto from "@/assets/hero-moto.jpg";
import catAdultos from "@/assets/cat-adultos.jpg";
import catNinos from "@/assets/cat-ninos.jpg";
import catQuad from "@/assets/cat-quad.jpg";
import motoUrbana from "@/assets/moto-urbana.jpg";
import motoTrabajo from "@/assets/moto-trabajo.jpg";
import motoDeportiva from "@/assets/moto-deportiva.jpg";
import ctaFinal from "@/assets/cta-final.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YamaMotors Bucaramanga · Motos, cuatrimotos y asesoría" },
      {
        name: "description",
        content:
          "Concesionario de motos en Bucaramanga. Motos para adultos, niños y cuatrimotos. Asesoría, retiro en tienda y entrega a domicilio. Escríbenos por WhatsApp.",
      },
      { property: "og:title", content: "YamaMotors Bucaramanga" },
      {
        property: "og:description",
        content: "Motos, cuatrimotos y asesoría personalizada en Bucaramanga.",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/573006141546";
const PHONE = "xxxxxxxxx";
const ADDRESS = "Ubicacion";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Cra.+33+%2397-13+Sotomayor+Bucaramanga";

const navLinks = [
  { href: "#motos", label: "Motos" },
  { href: "#cuatrimotos", label: "Cuatrimotos" },
  { href: "#financiacion", label: "Financiación" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#opiniones", label: "Opiniones" },
];

function waLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Index() {
  const containerRef = useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <style>{`
        [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
        .reveal-in { opacity: 1 !important; transform: none !important; }
        .grid-bg {
          background-image:
            linear-gradient(oklch(0.62 0.24 256 / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.62 0.24 256 / 0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
        }
      `}</style>

      {/* NAVBAR */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display font-black tracking-widest text-lg">
            YOUR<span className="text-gradient-brand">MOTORS</span>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground glow-blue hover:scale-105 transition-transform"
          >
            <MessageCircle className="size-4" />
            Cotizar por WhatsApp
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md border border-border"
            aria-label="Menú"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-foreground/90 font-medium"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground"
              >
                <MessageCircle className="size-4" /> Cotizar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[100svh] flex items-center pt-16">
        <img
          src={heroMoto}
          alt="Moto deportiva en showroom con luces neón"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-20 -left-20 size-[420px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 size-[420px] rounded-full bg-accent/25 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 w-full">
          <div className="max-w-3xl" data-reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground mb-6">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              DISTRIBUIDORA CENTRAL DE MOTOS · BUCARAMANGA
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Tu próxima moto
              <br />
              <span className="text-gradient-brand">empieza aquí.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl">
              Motos, cuatrimotos y asesoría personalizada en Bucaramanga.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-semibold bg-primary text-primary-foreground glow-blue hover:scale-[1.03] transition-transform"
              >
                <MessageCircle className="size-5" />
                Cotizar por WhatsApp
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#motos"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold border border-border bg-background/40 backdrop-blur hover:bg-background/70 transition-colors"
              >
                Ver motos disponibles
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-[var(--amber)] text-[var(--amber)]" /> 4.3 en Google
              </span>
              <span className="opacity-40">·</span>
              <span>Compra en tienda</span>
              <span className="opacity-40">·</span>
              <span>Retiro en tienda</span>
              <span className="opacity-40">·</span>
              <span>Entrega a domicilio</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </section>

      {/* CATEGORIAS */}
      <section id="motos" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 bg-[var(--gradient-radial-blue)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-14" data-reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Categorías</p>
            <h2 className="font-display font-black text-4xl sm:text-5xl">
              Encuentra la moto que va contigo.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: catAdultos,
                tag: "Adultos",
                title: "Motos para adultos",
                text: "Modelos para ciudad, trabajo, aventura y movilidad diaria.",
                cta: "Quiero asesoría",
                msg: "Hola, quiero asesoría sobre motos para adultos.",
              },
              {
                img: catNinos,
                tag: "Niños",
                title: "Motos para niños",
                text: "Opciones para empezar la pasión por las motos desde pequeños.",
                cta: "Consultar disponibilidad",
                msg: "Hola, quiero consultar disponibilidad de motos para niños.",
              },
              {
                img: catQuad,
                tag: "Cuatrimotos",
                title: "Cuatrimotos",
                text: "Potencia, diversión y rendimiento para terrenos diferentes.",
                cta: "Ver opciones",
                msg: "Hola, quiero ver opciones de cuatrimotos.",
              },
            ].map((c) => (
              <a
                key={c.title}
                id={c.tag === "Cuatrimotos" ? "cuatrimotos" : undefined}
                href={waLink(c.msg)}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/60 hover:-translate-y-1"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    {c.tag}
                  </span>
                  <h3 className="font-display font-black text-2xl mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-sm">{c.text}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    {c.cta}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-primary/0 group-hover:ring-primary/40 transition" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INVENTARIO DEMO */}
      <section className="relative py-24 sm:py-32 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12" data-reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Catálogo</p>
              <h2 className="font-display font-black text-4xl sm:text-5xl">Motos destacadas</h2>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Algunas referencias para mostrarte el estilo. Escríbenos por WhatsApp y te confirmamos
              disponibilidad real al instante.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: motoUrbana, cat: "Moto urbana", title: "Para la ciudad" },
              { img: motoTrabajo, cat: "Moto de trabajo", title: "Rendimiento diario" },
              { img: motoDeportiva, cat: "Moto deportiva", title: "Potencia y velocidad" },
              { img: catQuad, cat: "Cuatrimoto", title: "Todo terreno" },
              { img: catNinos, cat: "Moto infantil", title: "Para los más pequeños" },
              { img: catAdultos, cat: "Naked", title: "Estilo urbano" },
            ].map((m) => (
              <div
                key={m.title}
                data-reveal
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={m.img}
                    alt={m.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      {m.cat}
                    </span>
                    <span className="text-xs text-muted-foreground">Consulta disponibilidad</span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-4">{m.title}</h3>
                  <a
                    href={waLink(
                      `Hola, vi la demo web y quiero consultar disponibilidad de esta moto (${m.cat} — ${m.title}).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-full px-4 py-2.5 text-sm font-semibold bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <MessageCircle className="size-4" /> Cotizar esta moto
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS WEB */}
      <section className="relative py-24 sm:py-32">
        <div className="absolute inset-0 bg-[var(--gradient-radial-red)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mb-14" data-reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Por qué una web</p>
            <h2 className="font-display font-black text-4xl sm:text-5xl">
              Que tus clientes encuentren la moto antes de llegar al local.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Hoy muchas personas buscan primero en internet. Una web permite mostrar categorías,
              resolver dudas y llevar al cliente directo a WhatsApp o al punto físico.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: "Más confianza",
                text: "Tu negocio se ve más profesional desde Google.",
              },
              {
                icon: MessageCircle,
                title: "Más consultas",
                text: "El cliente puede escribirte con una idea más clara.",
              },
              {
                icon: Zap,
                title: "Menos preguntas repetidas",
                text: "La web responde lo básico antes de que te contacten.",
              },
              {
                icon: Users,
                title: "Más visitas al local",
                text: "Ubicación, horarios y contacto en un solo lugar.",
              },
            ].map((b, i) => (
              <div
                key={b.title}
                data-reveal
                className="relative rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="size-12 rounded-xl grid place-items-center bg-primary/10 text-primary mb-4">
                  <b.icon className="size-6" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.text}</p>
                <span className="absolute top-4 right-5 text-xs font-mono text-muted-foreground/60">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCIACION / ASESORIA */}
      <section id="financiacion" className="relative py-24 sm:py-32 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-start">
          <div data-reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Asesoría</p>
            <h2 className="font-display font-black text-4xl sm:text-5xl">
              Te ayudamos a elegir la mejor opción.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-md">
              ¿No sabes cuál moto escoger? Escríbenos y recibe asesoría según tu presupuesto, uso y
              necesidad.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              {[
                "Asesoría personalizada por WhatsApp",
                "Compra en tienda y retiro inmediato",
                "Entrega a domicilio disponible",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <AsesoriaForm />
        </div>
      </section>

      {/* OPINIONES */}
      <section id="opiniones" className="relative py-24 sm:py-32 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12" data-reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Confianza</p>
              <h2 className="font-display font-black text-4xl sm:text-5xl">
                Clientes que ya conocen el almacén.
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-display font-black text-5xl">4.3</div>
              <div>
                <div className="flex gap-0.5 text-[var(--amber)]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">7 opiniones en Google</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              "Buen lugar y buenas motos.",
              "Empresa que cumple con lo que promete.",
              "Muy buen lugar, deben venir.",
            ].map((q, i) => (
              <figure
                key={i}
                data-reveal
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="flex gap-0.5 text-[var(--amber)] mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg font-medium leading-relaxed">“{q}”</blockquote>
                <figcaption className="mt-4 text-xs text-muted-foreground">
                  Reseña en Google
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 text-center" data-reveal>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <MapPin className="size-4" /> Ver ubicación en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* UBICACION */}
      <section id="ubicacion" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-stretch">
          <div data-reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Ubicación</p>
            <h2 className="font-display font-black text-4xl sm:text-5xl mb-6">
              Visítanos en Bucaramanga.
            </h2>
            <div className="space-y-5 text-base">
              <div className="flex gap-3">
                <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                <p>{ADDRESS}</p>
              </div>
              <div className="flex gap-3">
                <Clock className="size-5 text-primary shrink-0 mt-0.5" />
                <p>
                  <span className="text-[var(--amber)] font-semibold">Abierto</span> · Cierra a las
                  6:00 p.m.
                </p>
              </div>
              <div className="flex gap-3">
                <Phone className="size-5 text-primary shrink-0 mt-0.5" />
                <p>{PHONE}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold bg-primary text-primary-foreground glow-blue hover:scale-105 transition-transform"
              >
                <Navigation className="size-4" /> Cómo llegar
              </a>
              <a
                href={`tel:+57${PHONE.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold border border-border hover:border-primary transition-colors"
              >
                <Phone className="size-4" /> Llamar
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold border border-border hover:border-primary transition-colors"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </div>
          </div>

          <div
            data-reveal
            className="relative rounded-3xl border border-border overflow-hidden min-h-[360px] bg-card"
          >
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" />
            {/* fake "map" pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-primary/40 blur-xl animate-pulse" />
                <div className="relative size-14 rounded-full bg-primary text-primary-foreground grid place-items-center glow-blue">
                  <MapPin className="size-7" />
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-border bg-background/90 backdrop-blur px-4 py-2 text-sm font-medium text-center">
                YourMotors Bucaramanga
                <div className="text-xs text-muted-foreground">Ubicacion</div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-muted-foreground">
              Mapa demostrativo
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <img
          src={ctaFinal}
          alt="Moto recorriendo la ciudad de noche"
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center" data-reveal>
          <h2 className="font-display font-black text-4xl sm:text-6xl leading-tight">
            ¿Listo para encontrar
            <br />
            <span className="text-gradient-brand">tu próxima moto?</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Escríbenos y te ayudamos a elegir la opción ideal.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 text-lg font-bold bg-primary text-primary-foreground glow-blue hover:scale-105 transition-transform"
          >
            <MessageCircle className="size-5" /> Cotizar por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="font-display font-black text-xl tracking-widest">
              YOUR<span className="text-gradient-brand">MOTORS</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              Motos, cuatrimotos y asesoría en Bucaramanga.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{ADDRESS}</p>
            <p className="text-sm text-muted-foreground">WhatsApp: xxx xxx xxxx</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Explorar</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#motos" className="hover:text-primary">
                  Motos
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-primary">
                  Ubicación
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-primary">
                  Opiniones
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Contacto</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground"
            >
              <MessageCircle className="size-4" /> Escríbenos
            </a>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
            <p>
              Demo visual creada para mostrar cómo podría verse una presencia digital profesional
              para el negocio.
            </p>
            <p>© {new Date().getFullYear()} YamaMotors Bucaramanga</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Cotizar por WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-4 py-3 font-bold text-white shadow-2xl hover:scale-110 transition-transform"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 10px 30px rgba(37,211,102,0.5), 0 0 0 0 rgba(37,211,102,0.4)",
          animation: "pulse-glow 2.4s ease-in-out infinite",
        }}
      >
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">Cotizar</span>
      </a>
    </div>
  );
}

function AsesoriaForm() {
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    tipo: "",
    presupuesto: "",
    uso: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola, quiero asesoría para una moto.\n\nNombre: ${form.nombre}\nWhatsApp: ${form.whatsapp}\nTipo de moto: ${form.tipo}\nPresupuesto: ${form.presupuesto}\nUso: ${form.uso}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-xl bg-secondary/60 border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition";

  return (
    <form
      onSubmit={onSubmit}
      data-reveal
      className="relative rounded-3xl border border-border bg-card p-6 sm:p-8"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <h3 className="font-display font-bold text-2xl mb-1">Solicita asesoría</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Te respondemos por WhatsApp con opciones según lo que buscas.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          required
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className={field}
        />
        <input
          required
          placeholder="WhatsApp"
          inputMode="tel"
          value={form.whatsapp}
          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          className={field}
        />
        <select
          required
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          className={field}
        >
          <option value="">Tipo de moto</option>
          <option>Moto para adultos</option>
          <option>Moto para niños</option>
          <option>Cuatrimoto</option>
          <option>No estoy seguro</option>
        </select>
        <input
          placeholder="Presupuesto aproximado"
          value={form.presupuesto}
          onChange={(e) => setForm({ ...form, presupuesto: e.target.value })}
          className={field}
        />
        <select
          required
          value={form.uso}
          onChange={(e) => setForm({ ...form, uso: e.target.value })}
          className={`${field} sm:col-span-2`}
        >
          <option value="">Uso principal</option>
          <option>Trabajo</option>
          <option>Ciudad</option>
          <option>Aventura</option>
          <option>Para niño</option>
          <option>Cuatrimoto</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold bg-primary text-primary-foreground glow-blue hover:scale-[1.02] transition-transform"
      >
        <MessageCircle className="size-5" /> Enviar solicitud por WhatsApp
      </button>

      <p className="mt-3 text-xs text-muted-foreground text-center">
        Al enviar abriremos WhatsApp con tu solicitud lista.
      </p>
    </form>
  );
}
