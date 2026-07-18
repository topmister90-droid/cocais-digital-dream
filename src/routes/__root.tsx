import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-5xl text-foreground">Página não encontrada</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-premium">Voltar ao início</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl text-foreground">Algo saiu do prumo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tente novamente em instantes ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-premium"
          >
            Tentar novamente
          </button>
          <a href="/" className="btn-ghost-gold">Ir para o início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tenda dos Cocais — Gastronomia & Natureza em Lago da Pedra, MA" },
      {
        name: "description",
        content:
          "Um refúgio de sabor, natureza e boa música em Lago da Pedra, Maranhão. Peixes regionais, carnes na brasa, drinks autorais, playground coberto e ambiente instagramável para reunir família e amigos.",
      },
      { name: "author", content: "Tenda dos Cocais" },
      { name: "theme-color", content: "#2f4a35" },
      { property: "og:title", content: "Tenda dos Cocais — Gastronomia & Natureza" },
      {
        property: "og:description",
        content:
          "Peixes regionais, carnes na brasa e drinks autorais em meio à natureza de Lago da Pedra. Reserve sua mesa e viva uma experiência inesquecível.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tenda dos Cocais" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tenda dos Cocais" },
      {
        name: "twitter:description",
        content:
          "Gastronomia regional maranhense em meio à natureza. Reserve sua mesa.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Tenda dos Cocais",
          servesCuisine: ["Regional Maranhense", "Peixes", "Carnes na Brasa"],
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lago da Pedra",
            addressRegion: "MA",
            addressCountry: "BR",
          },
          acceptsReservations: "True",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
