# Fideliapp — Página Comercial (`fidelizacionWebPage`)

Sitio web comercial y legal estático de **Fideliapp** (`/`, `/como-funciona`, `/funciones`, `/precios`, `/preguntas`, `/privacidad`, `/terminos`, `/terminos-negocios`, `/dpa`, `/cookies`, `/eliminar-cuenta`, `/contacto`), alojado en **Cloudflare Pages** (`https://fideliapp.pages.dev`).

La aplicación operativa (login, PWA, paneles de administrador, encargado y cliente) vive en el repositorio separado `fidelizacionWeb` (`https://fideli-app.vercel.app`). Este sitio no se conecta a Supabase ni maneja sesiones.

## Requisitos

- Node.js 22 (ver `.nvmrc`)

## Variables de entorno

Copia `.env.example` a `.env.local` si necesitas sobrescribir las URLs por defecto:

| Variable              | Por defecto                     | Uso                                                             |
| --------------------- | ------------------------------- | --------------------------------------------------------------- |
| `VITE_BRAND_NAME`     | `Fideliapp`                     | Nombre visible de la marca                                      |
| `VITE_APP_URL`        | `https://fideli-app.vercel.app` | URL base de la app (Ingresar, Crear programa, Descargar app)    |
| `VITE_SITE_URL`       | `https://fideliapp.pages.dev`   | URL pública del sitio (canonical, Open Graph, JSON-LD)          |
| `VITE_LEGAL_SITE_URL` | `https://fideliapp.pages.dev`   | URL base de las páginas legales en `src/config/legal.config.ts` |

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

- **Proyecto:** `fideliapp` (`https://fideliapp.pages.dev`)
- **Rama de producción:** `main`
- **Comando de compilación:** `npm run build`
- **Directorio de salida:** `dist`
- `public/_redirects`: redirige rutas de la app (`/login`, `/admin/*`, `/customer/*`, `/encargado/*`, `/join/*`, `/claim/*`, `/scan/*`, etc.) hacia `https://fideli-app.vercel.app`.
- `public/_headers`: política CSP sin Supabase y cabeceras de seguridad/caché.
