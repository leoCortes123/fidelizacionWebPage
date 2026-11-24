# Fideliapp — Página Comercial (`fidelizacionWebPage`)

Sitio web comercial estático de **Fideliapp** (`/`, `/como-funciona`, `/funciones`, `/precios`, `/preguntas`), alojado en **Cloudflare Pages** (`https://fidelapp.pages.dev`).

La aplicación operativa (login, PWA, paneles de administrador, encargado y cliente) vive en el repositorio separado `fidelizacionWeb` (`https://fidelizacion01.vercel.app`). Este sitio no se conecta a Supabase ni maneja sesiones.

## Requisitos

- Node.js 22 (ver `.nvmrc`)

## Variables de entorno

Copia `.env.example` a `.env.local` si necesitas sobrescribir las URLs por defecto:

| Variable | Por defecto | Uso |
|---|---|---|
| `VITE_BRAND_NAME` | `Fideliapp` | Nombre visible de la marca |
| `VITE_APP_URL` | `https://fidelizacion01.vercel.app` | URL base de la app (Ingresar, Crear programa, Descargar app) |
| `VITE_SITE_URL` | `https://fidelapp.pages.dev` | URL pública del sitio (canonical, Open Graph, JSON-LD) |

## Comandos

```bash
npm install
npm run dev        # Servidor local en http://127.0.0.1:5174
npm run typecheck  # Verificación de tipos TypeScript
npm test           # Pruebas unitarias (Vitest)
npm run test:e2e   # Pruebas E2E (Playwright, puerto 5198)
npm run build      # Compilación de producción en dist/
npm run lint       # ESLint
```

## Despliegue en Cloudflare Pages

- **Proyecto:** `fidelapp` (`https://fidelapp.pages.dev`)
- **Rama de producción:** `main`
- **Comando de compilación:** `npm run build`
- **Directorio de salida:** `dist`
- `public/_redirects`: redirige rutas de la app (`/login`, `/admin/*`, `/customer/*`, `/encargado/*`, `/join/*`, `/claim/*`, `/scan/*`, etc.) hacia `https://fidelizacion01.vercel.app`.
- `public/_headers`: política CSP sin Supabase y cabeceras de seguridad/caché.
