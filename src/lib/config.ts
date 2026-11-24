const trimSlash = (url: string) => url.replace(/\/+$/, "");

function safeHttpUrl(raw: string | undefined, fallback: string): string {
  const candidate = raw?.trim();
  if (!candidate || !/^https?:\/\//i.test(candidate)) return trimSlash(fallback);
  return trimSlash(candidate);
}

export const brandName = import.meta.env.VITE_BRAND_NAME?.trim() || "Fideliapp";

/** App web (login, paneles, PWA) alojada en Vercel. */
export const APP_URL = safeHttpUrl(
  import.meta.env.VITE_APP_URL,
  "https://fidelizacion01.vercel.app",
);

/** URL pública de este sitio comercial (canonical, Open Graph, sitemap). */
export const SITE_URL = safeHttpUrl(import.meta.env.VITE_SITE_URL, "https://fidelapp.pages.dev");

/** Construye un enlace absoluto hacia la app. */
export const appUrl = (path: string) => `${APP_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const LOGIN_URL = appUrl("/login");
export const REGISTER_CUSTOMER_URL = appUrl("/login?mode=register");
export const REGISTER_BUSINESS_URL = appUrl("/admin/onboarding?new=1");
/** El navegador solo instala una PWA desde su propio dominio: se abre la app con el aviso. */
export const INSTALL_APP_URL = appUrl("/login?install=1");
