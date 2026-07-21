import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";
import {
  Leaf,
  Utensils,
  Music2,
  Camera,
  Baby,
  HeartHandshake,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ChevronDown,
  Quote,
  Star,
  ArrowUpRight,
  Phone,
} from "lucide-react";

import { useReveal } from "@/hooks/use-reveal";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import dishFish from "@/assets/dish-fish.jpg";
import dishMeat from "@/assets/dish-meat.jpg";
import dishDrink from "@/assets/dish-drink.jpg";
import dishRegional from "@/assets/dish-regional.jpg";
import familyImg from "@/assets/family.jpg";
import playgroundImg from "@/assets/playground.jpg";
import ambienceImg from "@/assets/ambience.jpg";
import musicImg from "@/assets/music.jpg";
import selfieImg from "@/assets/selfie.jpg";
import ctaDusk from "@/assets/cta-dusk.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const WHATSAPP_URL =
  "https://wa.me/5599000000000?text=Ol%C3%A1%21%20Gostaria%20de%20reservar%20uma%20mesa%20na%20Tenda%20dos%20Cocais.";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

/* ============================================================ */

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

/* ============================================================ */

function Navbar() {
  const scrolled = useScrolled(60);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#experiencia", label: "Experiência" },
    { href: "#especialidades", label: "Cardápio" },
    { href: "#galeria", label: "Galeria" },
    { href: "#avaliacoes", label: "Avaliações" },
    { href: "#localizacao", label: "Visite-nos" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav-solid" : "glass-nav"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <a
          href="#top"
          className={`flex items-center gap-3 transition-colors ${
            scrolled ? "text-cream" : "text-forest-deep"
          }`}
          aria-label="Tenda dos Cocais - início"
        >
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border"
            style={{ borderColor: "var(--gold)" }}
          >
            <Leaf className="h-5 w-5" style={{ color: "var(--gold)" }} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-display text-lg tracking-wide">Tenda dos Cocais</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.28em] opacity-70">
              Lago da Pedra · MA
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`story-link text-sm font-medium tracking-wide transition-colors ${
                  scrolled ? "text-cream/85 hover:text-cream" : "text-forest-deep/80 hover:text-forest-deep"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-premium hidden sm:inline-flex">
            Reservar
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full border lg:hidden ${
              scrolled ? "border-cream/30 text-cream" : "border-forest-deep/20 text-forest-deep"
            }`}
            aria-label="Abrir menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="glass-nav-solid space-y-1 px-6 pb-6 pt-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                onClick={() => setOpen(false)}
                href={l.href}
                className="block rounded-lg px-3 py-3 text-cream/90 hover:bg-white/5"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-premium mt-3 w-full"
              onClick={() => setOpen(false)}
            >
              Reservar sua mesa
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

/* ============================================================ */

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.pause();

    let duration = 0;
    let targetTime = 0;
    let currentTime = 0;
    let raf = 0;
    let running = false;

    const onMeta = () => {
      duration = video.duration || 0;
      if (duration > 0) {
        try { video.currentTime = 0; } catch {}
        setReady(true);
      }
    };

    if (video.readyState >= 1 && video.duration) {
      onMeta();
    } else {
      video.addEventListener("loadedmetadata", onMeta, { once: true });
    }

    const compute = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // total scrollable distance inside the pinned section
      const total = section.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      targetTime = progress * (duration || 0);
      if (!running) tick();
    };

    const tick = () => {
      running = true;
      // Lerp for buttery smoothness (Apple/Polestar feel)
      const diff = targetTime - currentTime;
      if (Math.abs(diff) < 0.003) {
        currentTime = targetTime;
      } else {
        currentTime += diff * 0.12;
      }
      if (duration > 0) {
        try {
          video.currentTime = Math.min(Math.max(currentTime, 0), duration - 0.001);
        } catch {}
      }
      if (Math.abs(targetTime - currentTime) > 0.003) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onScroll = () => compute();
    const onResize = () => compute();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      video.removeEventListener("loadedmetadata", onMeta);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative w-full"
      style={{ height: "350vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-screen overflow-hidden">
        <video
          ref={videoRef}
          src={heroVideoAsset.url}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          {...({ "webkit-playsinline": "true" } as Record<string, string>)}
          disablePictureInPicture
          disableRemotePlayback
          poster={heroImg}
          aria-hidden="true"
        />
        {!ready && (
          <img
            src={heroImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
        )}
      </div>

    </section>
  );
}

/* ============================================================ */

function Stat({ target, suffix, label, active }: { target: number; suffix?: string; label: string; active: boolean }) {
  const value = useCountUp(target, active);
  return (
    <div>
      <div className="text-display flex items-baseline gap-1 text-5xl text-forest-deep lg:text-6xl">
        <span>{value.toLocaleString("pt-BR")}</span>
        {suffix && <span style={{ color: "var(--gold)" }}>{suffix}</span>}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
    </div>
  );
}

function About() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = document.getElementById("about-stats");
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="sobre" className="relative overflow-hidden bg-background py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-24 lg:px-10">
        <div className="reveal img-zoom relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-premium)]">
          <img
            src={aboutImg}
            alt="Momento de acolhimento em uma mesa da Tenda dos Cocais"
            className="h-[540px] w-full object-cover lg:h-[680px]"
            width={1200}
            height={1400}
            loading="lazy"
          />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/70 p-5 backdrop-blur-md">
            <p className="text-display text-2xl leading-tight text-forest-deep">
              “Terroir do Maranhão, servido debaixo dos coqueiros.”
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="eyebrow reveal">Nossa Casa</span>
          <h2
            className="text-display reveal mt-4 text-forest-deep"
            style={{ fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)" }}
          >
            Uma tradição maranhense enraizada na natureza.
          </h2>
          <div className="reveal mt-6 space-y-5 text-[15px] leading-relaxed text-muted-foreground lg:text-base">
            <p>
              A Tenda dos Cocais nasceu de uma inquietação simples: reunir, num mesmo lugar, o melhor
              do que a terra maranhense oferece — o frescor dos rios, o fogo da brasa, o sombreado
              dos coqueiros e a alegria de quem chega para ficar.
            </p>
            <p>
              Aqui, cada prato é preparado na hora, cada mesa é pensada para o encontro e cada canto
              guarda um convite: fique um pouco mais. Este é o lugar em que a gente do Lago da Pedra
              recebe os seus, e onde os seus se tornam nossa gente também.
            </p>
          </div>

          <div id="about-stats" className="reveal mt-12 grid grid-cols-3 gap-8 border-t border-border pt-10">
            <Stat target={15} suffix="k+" label="Seguidores no Instagram" active={active} />
            <Stat target={12} suffix="+" label="Anos recebendo famílias" active={active} />
            <Stat target={80} suffix="k" label="Momentos servidos" active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */

const experiences = [
  {
    tag: "Ambiente",
    title: "Amplo espaço natural entre coqueiros centenários.",
    body:
      "Metros e metros de área verde para respirar fundo, brincar descalço e deixar o dia desacelerar entre a sombra das árvores e o vento morno de Maranhão.",
    img: ambienceImg,
  },
  {
    tag: "Para os pequenos",
    title: "Playground coberto: escorregador, balanço e pula-pula.",
    body:
      "Uma área dedicada, protegida do sol e da chuva, para as crianças brincarem com segurança enquanto os adultos se entregam ao almoço sem pressa.",
    img: playgroundImg,
  },
  {
    tag: "Trilha sonora",
    title: "Música ambiente ao vivo, ao entardecer.",
    body:
      "Violão, MPB, sertanejo raiz e voz suave que combina com o crepúsculo. A trilha certa para conversas longas e brindes demorados.",
    img: musicImg,
  },
  {
    tag: "Cenário",
    title: "Cantos instagramáveis a cada olhar.",
    body:
      "Balanços, plantas suspensas, luzes penduradas e madeira crua compõem cenários que pedem foto — e ainda mais, memórias.",
    img: selfieImg,
  },
];

function Experience() {
  return (
    <section id="experiencia" className="relative overflow-hidden bg-secondary/60 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">A Experiência</span>
          <h2
            className="text-display mt-4 text-forest-deep"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)" }}
          >
            Um dia inteiro em uma única visita.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Da chegada, com o cheiro de brasa no ar, ao entardecer com música ao vivo — cada
            passagem pela Tenda é uma pequena imersão em vida boa.
          </p>
        </div>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {experiences.map((e, i) => (
            <article
              key={e.title}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="reveal img-zoom relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-elegant)]">
                <img
                  src={e.img}
                  alt={e.title}
                  className="h-[380px] w-full object-cover md:h-[480px]"
                  loading="lazy"
                />
              </div>
              <div className="reveal">
                <span className="eyebrow">{`0${i + 1} · ${e.tag}`}</span>
                <h3
                  className="text-display mt-3 text-forest-deep"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                >
                  {e.title}
                </h3>
                <p className="mt-5 max-w-lg text-muted-foreground">{e.body}</p>
                <span className="gold-rule mt-6 inline-flex">
                  <span className="gold-rule-line" />
                  <Leaf className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */

const highlights = [
  { icon: Leaf, title: "Amplo espaço natural", desc: "Área verde generosa, sombreada por árvores maduras." },
  { icon: Baby, title: "Playground coberto", desc: "Escorregador, balanço e pula-pula para os pequenos." },
  { icon: HeartHandshake, title: "Atendimento excepcional", desc: "Hospitalidade calorosa, do primeiro sorriso ao brinde final." },
  { icon: Utensils, title: "Preparados na hora", desc: "Cada prato começa quando você chega. Sem pressa, com técnica." },
  { icon: Music2, title: "Música ambiente ao vivo", desc: "Trilha suave para acompanhar conversas e entardeceres." },
  { icon: Camera, title: "Ambiente instagramável", desc: "Cenários pensados para memórias que valem a pena guardar." },
];

function Highlights() {
  return (
    <section className="relative bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow gold-rule justify-center">
            <span className="gold-rule-line" />
            Destaques
            <span className="gold-rule-line" />
          </span>
          <h2
            className="text-display mt-4 text-forest-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Pequenos detalhes, grandes lembranças.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-premium reveal group p-8">
              <span
                className="grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                style={{ background: "var(--gradient-forest)", color: "var(--gold-soft)" }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-display mt-6 text-2xl text-forest-deep">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */

const specialties = [
  {
    name: "Peixe na Brasa dos Cocais",
    img: dishFish,
    desc: "Tucunaré grelhado no ponto, finalizado com limão-taiti e ervas frescas do horto.",
    price: "R$ 128",
  },
  {
    name: "Picanha na Chapa da Casa",
    img: dishMeat,
    desc: "Corte generoso, selado no fogo alto, servido com farofa de coco e vinagrete de manga.",
    price: "R$ 149",
  },
  {
    name: "Caldeirada Maranhense",
    img: dishRegional,
    desc: "Um mergulho no terroir: peixe, camarão, banana-da-terra e leite de coco em fogo brando.",
    price: "R$ 138",
  },
  {
    name: "Drink Cocais",
    img: dishDrink,
    desc: "Cachaça envelhecida, manga espada, hortelã e um toque de mel silvestre do sertão.",
    price: "R$ 32",
  },
];

function Specialties() {
  return (
    <section id="especialidades" className="relative overflow-hidden py-24 lg:py-36" style={{ background: "var(--gradient-nature)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">Especialidades</span>
            <h2
              className="text-display mt-4 text-forest-deep"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}
            >
              Sabores que só a terra <em className="italic" style={{ color: "var(--wood)" }}>daqui</em> sabe fazer.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Uma pequena mostra do que espera por você. Cada prato é uma versão nossa da tradição
            maranhense — servido no tempo certo, sem atalhos.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {specialties.map((s) => (
            <article key={s.name} className="reveal card-premium img-zoom group overflow-hidden !p-0">
              <div className="relative">
                <img
                  src={s.img}
                  alt={s.name}
                  className="h-[360px] w-full object-cover md:h-[420px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="flex items-start justify-between gap-6 p-8">
                <div>
                  <h3 className="text-display text-3xl text-forest-deep">{s.name}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
                <span
                  className="mt-1 shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium tracking-widest"
                  style={{ borderColor: "var(--gold)", color: "var(--wood-dark)" }}
                >
                  {s.price}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-16 flex justify-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-ghost-gold">
            Ver cardápio completo
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */

const galleryItems = [
  { src: heroImg, alt: "Salão principal ao entardecer", span: "md:col-span-2 md:row-span-2" },
  { src: gallery1, alt: "Amigos brindando à mesa" },
  { src: gallery2, alt: "Peixe grelhado defumando" },
  { src: playgroundImg, alt: "Playground coberto", span: "md:col-span-2" },
  { src: gallery3, alt: "Crianças no pula-pula" },
  { src: ambienceImg, alt: "Luzes penduradas nas árvores" },
  { src: gallery4, alt: "Detalhes das luzes entre as folhas" },
  { src: familyImg, alt: "Família rindo à mesa", span: "md:col-span-2" },
];

function Gallery() {
  return (
    <section id="galeria" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow gold-rule justify-center">
            <span className="gold-rule-line" />
            Galeria
            <span className="gold-rule-line" />
          </span>
          <h2
            className="text-display mt-4 text-forest-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Um passeio pelos nossos dias.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Comida, gente, natureza e a luz certa de sempre.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {galleryItems.map((g, i) => (
            <div
              key={i}
              className={`reveal img-zoom group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ${
                g.span ?? ""
              }`}
            >
              <img src={g.src} alt={g.alt} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs uppercase tracking-[0.22em] text-cream/90">{g.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */

const testimonials = [
  {
    name: "Marina",
    initials: "MR",
    stars: 5,
    text:
      "O ambiente é maravilhoso, sombra por todo lado e uma paz que a gente sente ao chegar. A comida chegou quentinha, preparada na hora — e o atendimento, um espetáculo à parte.",
  },
  {
    name: "João Vitor",
    initials: "JV",
    stars: 5,
    text:
      "Trouxe os meus meninos e não queriam mais ir embora. O playground coberto é perfeito: escorregador, balanço, pula-pula. Enquanto isso, eu e minha esposa curtimos com calma.",
  },
  {
    name: "Camila",
    initials: "CS",
    stars: 5,
    text:
      "Fui pelas fotos que via no Instagram — e o lugar é ainda mais bonito ao vivo. Cada canto pede uma foto. Voltei três vezes só esse mês.",
  },
  {
    name: "Rodrigo",
    initials: "RA",
    stars: 5,
    text:
      "Ambiente harmonioso, música ambiente na medida, comida muito saborosa. Ideal pra reunir família e amigos sem pressa. Recomendo demais.",
  },
  {
    name: "Larissa",
    initials: "LP",
    stars: 5,
    text:
      "Já é o nosso lugar preferido em Lago da Pedra. A qualidade do peixe é impressionante e o drink autoral virou vício. Não conhecia nada parecido por aqui.",
  },
];

function Testimonials() {
  return (
    <section id="avaliacoes" className="relative overflow-hidden bg-secondary/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Avaliações Reais</span>
          <h2
            className="text-display mt-4 text-forest-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Quem vem, volta. Quem volta, traz alguém.
          </h2>
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden">
        <div
          className="flex gap-6 px-6 lg:px-10"
          style={{
            width: "max-content",
            animation: "marquee 55s linear infinite",
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <article
              key={i}
              className="card-premium flex w-[340px] shrink-0 flex-col p-8 md:w-[420px]"
            >
              <Quote className="h-8 w-8" style={{ color: "var(--gold)" }} />
              <p className="text-display mt-4 text-xl leading-snug text-forest-deep md:text-2xl">
                “{t.text}”
              </p>
              <div className="mt-auto flex items-center gap-4 pt-8">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-medium"
                  style={{ background: "var(--gradient-forest)", color: "var(--gold-soft)" }}
                >
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-medium text-forest-deep">{t.name}</div>
                  <div className="mt-0.5 flex items-center gap-0.5">
                    {Array.from({ length: t.stars }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-current" style={{ color: "var(--gold)" }} />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */

function InstagramSection() {
  const feed = [gallery1, dishFish, playgroundImg, gallery4, dishDrink, ambienceImg, selfieImg, gallery2];
  return (
    <section id="instagram" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="eyebrow">@tendadoscocais</span>
            <h2
              className="text-display mt-4 text-forest-deep"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              15 mil pessoas já seguem nossos dias.
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Acompanhe pratos novos, música ao vivo, momentos de família e as luzes da tenda no
              fim de tarde.
            </p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="btn-premium animate-gold-shimmer self-start md:self-end"
          >
            <Instagram className="h-4 w-4" />
            Siga no Instagram
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {feed.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="reveal img-zoom group relative aspect-square overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
            >
              <img src={src} alt={`Post ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center bg-forest-deep/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Instagram className="h-7 w-7 text-cream" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */

function Location() {
  return (
    <section id="localizacao" className="relative overflow-hidden bg-secondary/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal max-w-xl">
          <span className="eyebrow">Como Chegar</span>
          <h2
            className="text-display mt-4 text-forest-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            A gente te espera em Lago da Pedra.
          </h2>
        </div>

        <div className="reveal mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-elegant)]">
            <iframe
              title="Mapa Tenda dos Cocais"
              src="https://www.google.com/maps?q=Lago+da+Pedra+Maranh%C3%A3o&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, filter: "grayscale(0.25) sepia(0.15) hue-rotate(60deg)" }}
              className="block h-[420px] w-full md:h-[540px]"
            />
          </div>

          <div className="card-premium flex flex-col justify-between gap-8 p-10">
            <div>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: "var(--gradient-forest)", color: "var(--gold-soft)" }}>
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Endereço</div>
                  <p className="text-display mt-1 text-2xl text-forest-deep">Lago da Pedra, MA</p>
                  <p className="mt-1 text-sm text-muted-foreground">Zona rural — de fácil acesso.</p>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: "var(--gradient-forest)", color: "var(--gold-soft)" }}>
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Horário</div>
                  <p className="mt-1 text-sm text-forest-deep">Quarta a Domingo</p>
                  <p className="text-sm text-muted-foreground">11h30 — 23h00</p>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: "var(--gradient-forest)", color: "var(--gold-soft)" }}>
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Reservas</div>
                  <p className="mt-1 text-sm text-forest-deep">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Resposta em minutos</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Lago+da+Pedra+Maranh%C3%A3o"
              target="_blank"
              rel="noreferrer"
              className="btn-premium w-full"
            >
              Como chegar
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={ctaDusk}
        alt="Entardecer sobre a Tenda dos Cocais"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        width={1920}
        height={1200}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, oklch(0.15 0.03 150 / 0.55), oklch(0.15 0.03 150 / 0.9))" }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center lg:py-44">
        <span className="eyebrow gold-rule reveal">
          <span className="gold-rule-line" />
          Um convite
          <span className="gold-rule-line" />
        </span>
        <h2
          className="text-display reveal mt-6 text-cream"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Pare de rolar. <em className="italic" style={{ color: "var(--gold-soft)" }}>Comece a viver</em> a Tenda.
        </h2>
        <p className="reveal mt-6 max-w-xl text-cream/85">
          As melhores memórias não estão na tela — estão à mesa, sob nossas luzes, com aquela
          gente que a gente ama. Reserve sua mesa e venha ficar.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-premium reveal mt-10 animate-glow-pulse !px-10 !py-5 text-base"
        >
          Reserve sua mesa agora
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

/* ============================================================ */

function Footer() {
  return (
    <footer style={{ background: "var(--gradient-forest)" }} className="text-cream/85">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: "var(--gold)" }}>
                <Leaf className="h-5 w-5" style={{ color: "var(--gold)" }} />
              </span>
              <span className="text-display text-xl text-cream">Tenda dos Cocais</span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-cream/70">
              Gastronomia regional, natureza e hospitalidade maranhense — reunidas debaixo de uma
              mesma tenda.
            </p>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "var(--gold-soft)" }}>Explore</div>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["#sobre", "Sobre"],
                ["#experiencia", "Experiência"],
                ["#especialidades", "Cardápio"],
                ["#galeria", "Galeria"],
                ["#localizacao", "Visite-nos"],
              ].map(([h, l]) => (
                <li key={h}><a href={h} className="story-link">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "var(--gold-soft)" }}>Contato</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Lago da Pedra, MA</li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" /> Qua–Dom · 11h30–23h00</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> Reservas via WhatsApp</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "var(--gold-soft)" }}>Siga-nos</div>
            <div className="mt-5 flex items-center gap-3">
              {[
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { Icon: Phone, href: WHATSAPP_URL, label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 transition-all hover:border-[var(--gold)] hover:text-[var(--gold-soft)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-16 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />
        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-cream/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Tenda dos Cocais. Todos os direitos reservados.</p>
          <p className="italic" style={{ fontFamily: "var(--font-display)" }}>
            Feito com carinho, entre coqueiros e brasas.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================ */

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="whatsapp-float animate-glow-pulse"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.64 6.05L0 24l6.16-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12a11.94 11.94 0 0 0-3.48-8.52ZM12 21.82a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.66.96.98-3.56-.24-.37A9.82 9.82 0 1 1 21.82 12 9.83 9.83 0 0 1 12 21.82Zm5.37-7.35c-.29-.15-1.73-.85-2-.95s-.46-.15-.66.15-.75.95-.92 1.15-.34.22-.63.07a8.05 8.05 0 0 1-2.37-1.46 8.94 8.94 0 0 1-1.64-2.05c-.17-.29 0-.44.13-.59s.29-.34.44-.51a2 2 0 0 0 .29-.49.55.55 0 0 0 0-.51c-.07-.15-.66-1.58-.9-2.17s-.48-.5-.66-.5h-.56a1.06 1.06 0 0 0-.78.36 3.26 3.26 0 0 0-1 2.42 5.66 5.66 0 0 0 1.18 3 12.94 12.94 0 0 0 4.94 4.36c.69.29 1.23.47 1.65.6a4 4 0 0 0 1.82.11 3 3 0 0 0 2-1.4 2.47 2.47 0 0 0 .17-1.4c-.07-.13-.26-.2-.55-.35Z" />
      </svg>
    </a>
  );
}

/* ============================================================ */

function Home() {
  useReveal();
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HeroContent />

      <About />
      <Experience />
      <Highlights />
      <Specialties />
      <Gallery />
      <Testimonials />
      <InstagramSection />
      <Location />
      <FinalCta />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
