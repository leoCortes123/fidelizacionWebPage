# AGENTS.md — `fidelizacionWebPage`

Sitio comercial estático de Fideliapp (React 19 + Vite + TypeScript + Tailwind), desplegado en Cloudflare Pages (`https://fidelapp.pages.dev`).

## Alcance
- **Solo** páginas comerciales públicas: `/`, `/como-funciona`, `/funciones`, `/precios`, `/preguntas`.
- **No** usa Supabase, React Query, autenticación ni Service Worker/PWA.
- Todos los accesos a la app apuntan de forma absoluta a `APP_URL` (`src/lib/config.ts`, por defecto `https://fidelizacion01.vercel.app`).
- "Descargar app" enlaza a `${APP_URL}/login?install=1` porque el navegador solo instala la PWA desde el origen de la app.

## Comandos
- Tipos: `npm run typecheck`
- Unit: `npm test`
- E2E: `npm run test:e2e` (puerto 5198)
- Build: `npm run build`
- Lint: `npm run lint`

## Convenciones
- Mantener sincronizados los FAQs de `src/features/landing/webContent.ts` con el JSON-LD `FAQPage` de `index.html` (lo verifica `tests/unit/LandingPage.test.tsx`).
- Si cambia el dominio del sitio o de la app, actualizar: `src/lib/config.ts`, `index.html`, `public/_redirects`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` y `.env.example`.
