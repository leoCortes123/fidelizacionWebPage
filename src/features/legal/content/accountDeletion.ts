import { LEGAL_CONTACT, LEGAL_OWNER, LEGAL_PATHS, LEGAL_VERSIONS } from "@/config/legal.config";
import { APP_URL, appUrl } from "@/lib/config";
import type { LegalDocument } from "../types";

export const accountDeletionDoc: LegalDocument = {
  id: "account-deletion",
  path: LEGAL_PATHS.accountDeletion,
  breadcrumbLabel: "Eliminar Cuenta",
  eyebrow: "Derecho de Supresión · Habeas Data",
  title: "Eliminación de Cuenta y Datos Personales",
  audience: "Clientes, Encargados y Administradores",
  summary:
    "Conoce paso a paso cómo eliminar tu cuenta de Fideliapp directamente desde la aplicación (de forma inmediata) o solicitándola sin iniciar sesión, qué datos personales se eliminan y qué registros transaccionales se anonimizan sin información personal.",
  metaTitle: `Eliminación de Cuenta y Datos Personales · ${LEGAL_OWNER.brandName}`,
  metaDescription:
    "Instrucciones públicas para eliminar tu cuenta y datos personales en Fideliapp desde la app o por correo, detalle de borrado inmediato y anonimización contable en Colombia.",
  version: LEGAL_VERSIONS.privacy_policy,
  effectiveDate: LEGAL_VERSIONS.privacy_policy,
  sections: [
    {
      id: "como-eliminar-app",
      title: "Opción 1: Eliminar tu Cuenta Directamente desde la App (Inmediato)",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Si tienes acceso a tu cuenta en ",
            { code: APP_URL },
            ", puedes ejecutar la eliminación y anonimización de forma inmediata siguiendo estos pasos:",
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            [
              "Inicia sesión en ",
              {
                link: {
                  label: "la aplicación de Fideliapp",
                  to: appUrl("/perfil"),
                  external: true,
                },
              },
              " y abre ",
              { strong: "Mi perfil" },
              " (",
              { code: "/customer/perfil" },
              " para clientes, ",
              { code: "/admin/perfil" },
              " para administradores o ",
              { code: "/perfil" },
              " para encargados).",
            ],
            [
              "Desplázate a la sección ",
              { strong: "Privacidad y cuenta" },
              ". Si deseas conservar un respaldo previo, primero haz clic en ",
              { strong: "Descargar mis datos" },
              " para guardar tu archivo JSON.",
            ],
            [
              "Selecciona ",
              { strong: "Eliminar mi cuenta" },
              ", revisa el aviso sobre la pérdida definitiva de monedas acumuladas y escribe la confirmación literal ",
              { code: "ELIMINAR" },
              ".",
            ],
            [
              "Al confirmar, el sistema sobrescribe de forma irreversible tus datos identificativos, revoca sesiones e identidades de inicio de sesión, borra tu foto de perfil del almacenamiento público y limpia los datos locales de tu navegador.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Disponibilidad gradual del autoservicio",
          content: [
            "Si aún no ves el botón «Eliminar mi cuenta» en tu perfil durante el despliegue progresivo de la aplicación, utiliza en cualquier momento la Opción 2 (correo a ",
            {
              link: {
                label: LEGAL_CONTACT.privacyEmail,
                to: `mailto:${LEGAL_CONTACT.privacyEmail}`,
                external: true,
              },
            },
            " o el formulario de ",
            { link: { label: "Contacto y PQR", to: LEGAL_PATHS.contact } },
            "), que ya se encuentra plenamente activa.",
          ],
        },
        {
          type: "actions",
          items: [
            {
              label: "Ir a Mi perfil en la app",
              to: appUrl("/perfil"),
              external: true,
              variant: "primary",
            },
            {
              label: "Solicitar eliminación sin iniciar sesión",
              to: LEGAL_PATHS.contact,
              variant: "light",
            },
          ],
        },
      ],
    },
    {
      id: "como-eliminar-sin-sesion",
      title: "Opción 2: Solicitar la Eliminación sin Iniciar Sesión",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Si perdiste acceso a tu cuenta, no recuerdas tu contraseña o prefieres tramitar tu derecho de supresión por correo electrónico:",
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            [
              "Envía un correo a ",
              {
                link: {
                  label: LEGAL_CONTACT.privacyEmail,
                  to: `mailto:${LEGAL_CONTACT.privacyEmail}?subject=${encodeURIComponent("Solicitud de eliminación de cuenta — Fideliapp")}`,
                  external: true,
                },
              },
              " (idealmente desde la misma dirección registrada en Fideliapp) o usa el formulario de ",
              { link: { label: "Contacto y PQR", to: LEGAL_PATHS.contact } },
              " eligiendo el motivo ",
              { strong: "Supresión / Eliminación de cuenta" },
              ".",
            ],
            [
              "Indica tu nombre completo, el correo electrónico asociado a la cuenta y tu solicitud expresa de supresión.",
            ],
            [
              "Realizaremos una verificación básica de titularidad para evitar borrados no autorizados y completaremos la eliminación en un plazo máximo de ",
              { strong: `${LEGAL_CONTACT.responseTimeBusinessDays.claims} días hábiles` },
              " (artículo 15 de la Ley 1581 de 2012).",
            ],
          ],
        },
      ],
    },
    {
      id: "que-se-borra",
      title: "Qué Datos se Eliminan y Qué se Anonimiza",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Aplicamos una estrategia de ",
            { strong: "supresión + anonimización irreversible" },
            " que elimina toda posibilidad de identificarte, mientras preserva sin datos personales la integridad matemática de los libros de puntos de los comercios donde compraste:",
          ],
        },
        {
          type: "table",
          id: "tabla-eliminacion-datos",
          caption: "Efecto de la eliminación de cuenta sobre cada categoría de información",
          headers: ["Categoría de datos", "Acción aplicada", "Plazo"],
          rows: [
            {
              rowHeader: "Perfil personal (nombre, correo, alias, teléfono, fecha de nacimiento)",
              cells: [
                [
                  "Se sobrescriben de forma irreversible (",
                  { code: "Usuario eliminado" },
                  " y correo técnico anonimizado ",
                  { code: "deleted+<id>@anonymized.invalid" },
                  "; alias, teléfono y fecha de nacimiento quedan en ",
                  { code: "null" },
                  ").",
                ],
                ["Inmediato desde la app (o ≤ 15 días hábiles por correo)."],
              ],
            },
            {
              rowHeader: "Foto de perfil en Storage",
              cells: [
                [
                  "Eliminación definitiva del archivo de imagen en el bucket público ",
                  { code: "business-assets" },
                  ".",
                ],
                ["Inmediato al completar la eliminación."],
              ],
            },
            {
              rowHeader: "Acceso, sesiones y vínculo Google OAuth",
              cells: [
                [
                  "Se eliminan identidades de login, sesiones activas y refresh tokens, se borran metadatos de autenticación y se bloquea de forma permanente el reingreso.",
                ],
                ["Inmediato."],
              ],
            },
            {
              rowHeader: "Membresías, invitaciones, QR pendientes y borradores locales",
              cells: [
                [
                  "Se eliminan membresías (cliente, encargado y co-administrador cuando no seas el último administrador), invitaciones o tokens pendientes y se purgan los borradores en el navegador.",
                ],
                ["Inmediato."],
              ],
            },
            {
              rowHeader: "Auditoría con tu correo (actor_email)",
              cells: [
                [
                  "Se reemplaza tu correo electrónico por el identificador técnico anonimizado en los registros históricos de auditoría.",
                ],
                ["Inmediato."],
              ],
            },
            {
              rowHeader: "Historial transaccional agregado del comercio",
              cells: [
                [
                  "Se conservan únicamente montos, fechas, productos y movimientos del libro de puntos asociados a un UUID técnico ",
                  { strong: "no atribuible a una persona identificable" },
                  ", para mantener la integridad contable y de auditoría de cada comercio.",
                ],
                ["Conservación anonimizada sin PII."],
              ],
            },
            {
              rowHeader: "Prueba de consentimientos y registro de supresión",
              cells: [
                [
                  "Se conserva sin PII la constancia técnica de versiones/fechas aceptadas y la fecha del evento de eliminación (",
                  { code: "account_deletion_log" },
                  ") como deber probatorio legal (Art. 2.2.2.25.2.6 Decreto 1074 de 2015).",
                ],
                ["Conservación probatoria sin PII."],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "efectos-restricciones",
      title: "Efectos Importantes y Regla de Último Administrador",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Acción irreversible — pérdida de monedas",
          content: [
            "Una vez confirmada la eliminación, la cuenta no puede reactivarse ni recuperarse. Todas las monedas o puntos acumulados y recompensas pendientes se pierden definitivamente y no son canjeables por dinero.",
          ],
        },
        {
          type: "list",
          items: [
            [
              { strong: "Si eres el último administrador de un negocio activo: " },
              "el sistema bloqueará temporalmente la eliminación (",
              { code: "ACCOUNT_LAST_ADMIN" },
              ") para evitar dejar un comercio operativo sin responsable. Primero debes asignar a otro administrador desde la gestión de equipo o solicitar el cierre del negocio a ",
              {
                link: {
                  label: LEGAL_CONTACT.supportEmail,
                  to: `mailto:${LEGAL_CONTACT.supportEmail}`,
                  external: true,
                },
              },
              ".",
            ],
            [
              { strong: "Relación con la Política de Privacidad: " },
              "puedes consultar el detalle completo de tus derechos y plazos de reclamo en nuestra ",
              {
                link: {
                  label: "Política de Tratamiento de Datos Personales",
                  to: LEGAL_PATHS.privacyPolicy,
                },
              },
              ".",
            ],
          ],
        },
      ],
    },
  ],
};
