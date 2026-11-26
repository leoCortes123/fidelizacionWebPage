import { LEGAL_CONTACT, LEGAL_OWNER, LEGAL_PATHS, LEGAL_VERSIONS } from "@/config/legal.config";
import { APP_URL, SITE_URL } from "@/lib/config";
import type { LegalDocument } from "../types";

export const cookiesPolicyDoc: LegalDocument = {
  id: "cookies-policy",
  path: LEGAL_PATHS.cookies,
  breadcrumbLabel: "Política de Cookies",
  eyebrow: "Transparencia técnica",
  title: "Política de Cookies y Almacenamiento Local",
  audience: "Visitantes y usuarios de la aplicación",
  summary:
    "Inventario exacto y honesto de lo que Fideliapp guarda en tu navegador (localStorage, sessionStorage y caché PWA). Hoy NO utilizamos cookies publicitarias ni rastreadores de analítica de terceros.",
  metaTitle: `Política de Cookies y Almacenamiento Local · ${LEGAL_OWNER.brandName}`,
  metaDescription:
    "Detalle transparente del almacenamiento local, sesiones y caché PWA que utiliza Fideliapp en fideliapp.pages.dev y fideli-app.vercel.app. Sin cookies publicitarias ni rastreo.",
  version: LEGAL_VERSIONS.cookies,
  effectiveDate: LEGAL_VERSIONS.cookies,
  sections: [
    {
      id: "sin-rastreo",
      title: "Declaración Transparente sobre Cookies y Rastreo",
      blocks: [
        {
          type: "callout",
          tone: "info",
          title: "Hoy no usamos cookies publicitarias ni de analítica",
          content: [
            "Ni el sitio comercial (",
            { code: SITE_URL },
            ") ni la aplicación web/PWA (",
            { code: APP_URL },
            ") instalan cookies de publicidad, píxeles de redes sociales ni herramientas de analítica de comportamiento de terceros (como Google Analytics, Meta Pixel o Microsoft Clarity).",
          ],
        },
        {
          type: "paragraph",
          content: [
            "Todas las tecnologías de almacenamiento en el navegador utilizadas actualmente son ",
            { strong: "estrictamente necesarias o funcionales/técnicas" },
            " para mantener tu sesión segura, recordar tu tema claro/oscuro, evitar que pierdas borradores o tokens QR al iniciar sesión y permitir que la PWA funcione con rapidez.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "Por ese motivo no mostramos un banner invasivo con botones ficticios de «Rechazar». Si en el futuro incorporamos analítica o herramientas de mercadeo de terceros, implementaremos previamente un gestor real de consentimiento (CMP) que bloquee dichos scripts hasta que los aceptes de forma explícita y actualizaremos esta política.",
          ],
        },
      ],
    },
    {
      id: "inventario-navegador",
      title: "Inventario Exacto de Almacenamiento en el Navegador",
      blocks: [
        {
          type: "paragraph",
          content: [
            "La siguiente tabla refleja exactamente las claves y mecanismos que ejecuta hoy el código fuente de Fideliapp:",
          ],
        },
        {
          type: "table",
          id: "tabla-almacenamiento-navegador",
          caption: "Claves y cachés utilizadas en el navegador por Fideliapp",
          headers: [
            "Recurso / Clave",
            "Aplicación y tecnología",
            "Finalidad y clasificación",
            "Duración y limpieza",
          ],
          rows: [
            {
              rowHeader: "sb-<ref>-auth-token*",
              cells: [
                ["App (", { code: "fidelizacionWeb" }, ") · ", { code: "localStorage" }],
                [
                  "Mantener tu sesión autenticada (JWT y verificador PKCE de Supabase Auth). ",
                  { strong: "Estrictamente necesaria." },
                ],
                ["Hasta cerrar sesión o expiración del token de actualización."],
              ],
            },
            {
              rowHeader: "fideliapp:theme",
              cells: [
                ["App y Sitio comercial · ", { code: "localStorage" }],
                [
                  "Recordar si prefieres modo claro u oscuro sin parpadeos al cargar. ",
                  { strong: "Funcional." },
                  " (Al migrar desde versiones anteriores elimina automáticamente la clave heredada ",
                  { code: "loopoint:theme" },
                  ").",
                ],
                [
                  "Persistente hasta que borres los datos del navegador; no contiene datos personales.",
                ],
              ],
            },
            {
              rowHeader: "fidelizacion:selected-business*",
              cells: [
                ["App (", { code: "fidelizacionWeb" }, ") · ", { code: "localStorage" }],
                [
                  "Recordar el negocio activo seleccionado en tu sesión. ",
                  { strong: "Funcional." },
                ],
                ["Se purga automáticamente al cerrar sesión o cambiar de usuario."],
              ],
            },
            {
              rowHeader: "fidelizacion:pending-claim",
              cells: [
                ["App (", { code: "fidelizacionWeb" }, ") · ", { code: "localStorage" }],
                [
                  "Conservar temporalmente el token de un QR de compra mientras completas el inicio de sesión o Google OAuth. ",
                  { strong: "Estrictamente necesaria." },
                ],
                ["Máximo 2 horas; se elimina al reclamar el QR o al cerrar sesión."],
              ],
            },
            {
              rowHeader: "fideliapp:draft:*",
              cells: [
                ["App (", { code: "fidelizacionWeb" }, ") · ", { code: "localStorage" }],
                [
                  "Guardar borradores locales de formularios (por ejemplo, perfil) para evitar pérdida de datos al cambiar de pestaña. ",
                  { strong: "Funcional." },
                  " (Migra y elimina automáticamente la clave heredada ",
                  { code: "loopoint:draft:*" },
                  ").",
                ],
                [
                  "Máximo 7 días; se purga automáticamente al guardar el formulario o al cerrar sesión (protección en tablets compartidas de caja).",
                ],
              ],
            },
            {
              rowHeader: "fidelizacion:onboarding:*",
              cells: [
                ["App (", { code: "fidelizacionWeb" }, ") · ", { code: "localStorage" }],
                [
                  "Conservar el progreso temporal del asistente de configuración inicial de un negocio. ",
                  { strong: "Funcional." },
                ],
                [
                  "Sin vencimiento por tiempo fijo: persiste hasta completar o reiniciar el asistente, o hasta cerrar sesión (se purga automáticamente al salir).",
                ],
              ],
            },
            {
              rowHeader: "fidelizacion:pending-account-type y loyalty:token:*",
              cells: [
                ["App (", { code: "fidelizacionWeb" }, ") · ", { code: "sessionStorage" }],
                [
                  "Sostener el flujo temporal de tipo de cuenta en registro OAuth (",
                  { code: "fidelizacion:pending-account-type" },
                  ") y mostrar el QR de canje recién generado (",
                  { code: "loyalty:token:*" },
                  "). ",
                  { strong: "Estrictamente necesaria." },
                ],
                ["Solo durante la sesión de la pestaña; se limpia al cerrar sesión."],
              ],
            },
            {
              rowHeader: "fideliapp:preload-reload",
              cells: [
                ["App y Sitio comercial · ", { code: "sessionStorage" }],
                [
                  "Evitar bucles de recarga si un nuevo despliegue invalida un módulo cargado en segundo plano. ",
                  { strong: "Estrictamente necesaria." },
                ],
                ["Sesión de pestaña (ventana de control de 10 segundos)."],
              ],
            },
            {
              rowHeader: "Caché Workbox (Service Worker)",
              cells: [
                ["App (", { code: "fidelizacionWeb" }, ") · Cache API / PWA"],
                [
                  "Precarga de activos estáticos y fuentes para instalación PWA y carga rápida. ",
                  { strong: "Técnica." },
                ],
                [
                  "Hasta la siguiente actualización de la app (caché de fuentes hasta 1 año). El sitio comercial NO registra Service Worker.",
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "terceros-red",
      title: "Servicios Técnicos de Terceros con Intercambio de Red",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Aunque Fideliapp no instala cookies publicitarias, al cargar las páginas o iniciar sesión tu navegador establece conexiones técnicas con nuestros proveedores de infraestructura:",
          ],
        },
        {
          type: "list",
          items: [
            [
              { strong: "Cloudflare Pages: " },
              "entrega del sitio comercial y protección contra tráfico malicioso.",
            ],
            [{ strong: "Vercel: " }, "entrega de la aplicación web/PWA."],
            [
              { strong: "Supabase: " },
              "autenticación, consultas de datos y entrega de imágenes del bucket público.",
            ],
            [
              { strong: "Google LLC (Google Fonts y Google OAuth): " },
              "carga de tipografías web en el navegador y, únicamente si eliges iniciar sesión con Google, el flujo de autenticación OAuth bajo las políticas de Google.",
            ],
          ],
        },
      ],
    },
    {
      id: "gestion-navegador",
      title: "Cómo Gestionar o Borrar el Almacenamiento Local",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Puedes consultar, bloquear o borrar en cualquier momento el almacenamiento local y la caché desde la configuración de privacidad de tu navegador (Chrome, Safari, Firefox o Edge: Configuración → Privacidad y seguridad → Datos de sitios).",
          ],
        },
        {
          type: "paragraph",
          content: [
            "Ten en cuenta que deshabilitar ",
            { code: "localStorage" },
            " o ",
            { code: "sessionStorage" },
            " en ",
            { code: APP_URL },
            " impedirá mantener tu sesión iniciada y completar flujos de autenticación o reclamo de QR. Si tienes dudas técnicas o de privacidad, escríbenos a ",
            {
              link: {
                label: LEGAL_CONTACT.privacyEmail,
                to: `mailto:${LEGAL_CONTACT.privacyEmail}`,
                external: true,
              },
            },
            " o revisa nuestra ",
            { link: { label: "Política de Privacidad", to: LEGAL_PATHS.privacyPolicy } },
            ".",
          ],
        },
      ],
    },
  ],
};
