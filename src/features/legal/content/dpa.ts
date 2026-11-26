import { LEGAL_CONTACT, LEGAL_OWNER, LEGAL_PATHS, LEGAL_VERSIONS } from "@/config/legal.config";
import type { LegalDocument } from "../types";

export const dpaDoc: LegalDocument = {
  id: "dpa",
  path: LEGAL_PATHS.dpa,
  breadcrumbLabel: "Acuerdo de Datos (DPA)",
  eyebrow: "Art. 25 Decreto 1377 de 2013",
  title: "Acuerdo de Transmisión y Encargado del Tratamiento de Datos (DPA)",
  audience: "Comercios afiliados (Anexo B2B)",
  summary:
    "Contrato de transmisión nacional e internacional de datos entre cada Comercio (Responsable del Tratamiento frente a sus clientes) y Fideliapp (Encargado del Tratamiento), con obligaciones de seguridad, subencargados autorizados, atención de incidentes y supresión al finalizar.",
  metaTitle: `Acuerdo de Transmisión de Datos (DPA) · ${LEGAL_OWNER.brandName}`,
  metaDescription:
    "Acuerdo de Transmisión y Encargado del Tratamiento de Datos (DPA) de Fideliapp conforme al artículo 25 del Decreto 1377 de 2013 en Colombia.",
  version: LEGAL_VERSIONS.dpa,
  effectiveDate: LEGAL_VERSIONS.dpa,
  sections: [
    {
      id: "partes-objeto",
      title: "Partes, Objeto y Alcance del Tratamiento",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Este Acuerdo de Transmisión de Datos Personales (en adelante, el ",
            { strong: "«DPA»" },
            ") se celebra en cumplimiento del ",
            { strong: "artículo 25 del Decreto 1377 de 2013" },
            " (compilado en el artículo 2.2.2.25.5.2 del Decreto 1074 de 2015) entre:",
          ],
        },
        {
          type: "list",
          items: [
            [
              { strong: "El Comercio (Responsable del Tratamiento): " },
              "la persona natural comerciante o persona jurídica que registra su negocio y administra su programa de fidelización en la plataforma.",
            ],
            [
              {
                strong: `${LEGAL_OWNER.brandName} / ${LEGAL_OWNER.fullName} (Encargado del Tratamiento): `,
              },
              `${LEGAL_OWNER.personTypeLabel}, NIT ${LEGAL_OWNER.nit}, domiciliado en ${LEGAL_OWNER.domicile}, en lo concerniente a los datos de clientes y operación del programa gestionados por cuenta del Comercio.`,
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            "El objeto del DPA es regular el tratamiento automatizado que realiza el Encargado exclusivamente para prestar los servicios contratados bajo los ",
            {
              link: {
                label: "Términos y Condiciones para Negocios (B2B)",
                to: LEGAL_PATHS.termsBusiness,
              },
            },
            ": afiliación de clientes al negocio, registro de compras con QR, cálculo y vencimiento FIFO de monedas, gestión de recompensas y canjes, control de permisos de encargados, métricas del negocio y auditoría.",
          ],
        },
      ],
    },
    {
      id: "datos-titulares",
      title: "Categorías de Titulares, Datos y Duración",
      blocks: [
        {
          type: "list",
          items: [
            [
              { strong: "Titulares: " },
              "clientes mayores de edad afiliados al programa del Comercio, administradores y encargados de caja designados por el Comercio.",
            ],
            [
              { strong: "Datos personales tratados por cuenta del Comercio: " },
              "identificación de perfil visible para el negocio (nombre completo, alias, correo, teléfono y fecha de nacimiento si el titular los suministró, foto de perfil), membresías, historial de compras y productos comprados en ese local, saldos y movimientos de monedas, solicitudes y entregas de canjes, indicadores de frecuencia y registros de auditoría operativa.",
            ],
            [
              { strong: "Duración: " },
              "el presente DPA permanece vigente mientras el Comercio mantenga activo su negocio en Fideliapp y hasta que concluya la devolución, supresión o anonimización segura de los datos tras la terminación.",
            ],
          ],
        },
      ],
    },
    {
      id: "obligaciones-encargado",
      title: "Obligaciones de Fideliapp como Encargado",
      blocks: [
        {
          type: "paragraph",
          content: [
            "En observancia del artículo 18 de la Ley 1581 de 2012 y el artículo 25 del Decreto 1377 de 2013, el Encargado se obliga a:",
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            [
              { strong: "Tratamiento conforme a instrucciones y finalidades: " },
              "dar tratamiento a los datos personales únicamente para operar las funciones del programa de fidelización configuradas por el Comercio y nunca para vender bases de datos ni compartirlas con otros comercios.",
            ],
            [
              { strong: "Seguridad técnica y organizativa: " },
              "mantener controles efectivos, incluyendo aislamiento estricto multiempresa mediante ",
              { strong: "Row Level Security (RLS)" },
              " en PostgreSQL, validación de roles y permisos en funciones ",
              { code: "SECURITY DEFINER" },
              ", cifrado en tránsito (HTTPS/TLS) y en reposo en la infraestructura, eliminación de metadatos EXIF en imágenes cargadas, limpieza de archivos huérfanos en Storage, limitación de búsquedas de perfiles y registro de auditoría.",
            ],
            [
              { strong: "Confidencialidad: " },
              "guardar reserva sobre los datos tratados, incluso después de finalizada la relación contractual, y restringir el acceso administrativo únicamente a tareas estrictamente necesarias de soporte o mantenimiento.",
            ],
            [
              { strong: "Actualización y rectificación oportuna: " },
              "habilitar los mecanismos técnicos para que clientes y comercios actualicen, rectifiquen o supriman datos dentro de los plazos legales.",
            ],
          ],
        },
      ],
    },
    {
      id: "obligaciones-responsable",
      title: "Obligaciones del Comercio como Responsable",
      blocks: [
        {
          type: "list",
          items: [
            [
              "Informar en su punto de venta y canales propios las reglas del programa de puntos, incluyendo vigencia o vencimiento FIFO de monedas.",
            ],
            [
              "Utilizar los datos de sus clientes exclusivamente dentro del marco de la Ley 1581 de 2012 y las autorizaciones vigentes.",
            ],
            [
              "Gestionar responsablemente las cuentas de sus administradores y encargados, revocando accesos al finalizar relaciones laborales o de servicio.",
            ],
            [
              "No cargar en campos libres ni imágenes información sensible innecesaria (como datos de salud, información financiera de clientes o datos de menores de edad).",
            ],
          ],
        },
      ],
    },
    {
      id: "subencargados",
      title: "Subencargados Autorizados y Transmisión Internacional",
      blocks: [
        {
          type: "paragraph",
          content: [
            "El Comercio autoriza expresamente al Encargado a apoyarse en los siguientes subencargados de infraestructura tecnológica (incluyendo transmisión internacional de datos), quienes operan bajo sus respectivos acuerdos de procesamiento de datos y estándares de seguridad:",
          ],
        },
        {
          type: "table",
          id: "tabla-subencargados-dpa",
          caption: "Subencargados tecnológicos autorizados bajo este DPA",
          headers: [
            "Subencargado",
            "Servicio prestado",
            "Datos involucrados",
            "Jurisdicción / cobertura",
          ],
          rows: [
            {
              rowHeader: "Supabase Inc.",
              cells: [
                [
                  "Base de datos PostgreSQL gestionada, autenticación y Storage (",
                  { code: "business-assets" },
                  ").",
                ],
                ["Datos del programa, perfiles, compras, canjes, auditoría e imágenes."],
                ["EE. UU. / nube gestionada."],
              ],
            },
            {
              rowHeader: "Vercel Inc.",
              cells: [
                ["Alojamiento y ejecución de la aplicación web/PWA."],
                ["Tráfico HTTPS y registros técnicos de red."],
                ["EE. UU. / red Edge global."],
              ],
            },
            {
              rowHeader: "Cloudflare Inc.",
              cells: [
                ["Alojamiento CDN y seguridad perimetral del sitio informativo y legal."],
                ["Registros técnicos de red del sitio público."],
                ["EE. UU. / red Edge global."],
              ],
            },
            {
              rowHeader: "Google LLC",
              cells: [
                ["Autenticación OAuth opcional y carga de fuentes Google Fonts."],
                [
                  "Credenciales de perfil Google OAuth (solo si el usuario lo elige) y solicitudes HTTP de tipografía.",
                ],
                ["EE. UU. / red global."],
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            "Antes de incorporar un nuevo subencargado que procese datos personales de clientes del Comercio (por ejemplo, proveedores de mensajería o modelos de IA en módulos futuros), Fideliapp actualizará esta lista y notificará oportunamente a los administradores.",
          ],
        },
      ],
    },
    {
      id: "incidentes-seguridad",
      title: "Notificación de Incidentes de Seguridad",
      blocks: [
        {
          type: "paragraph",
          content: [
            "En caso de confirmarse un incidente de seguridad que comprometa la confidencialidad, integridad o disponibilidad de los datos personales tratados por cuenta del Comercio, Fideliapp:",
          ],
        },
        {
          type: "list",
          items: [
            [
              "Notificará al correo registrado del administrador del Comercio sin dilación indebida, describiendo la naturaleza del incidente, los datos potencialmente afectados y las medidas de contención adoptadas.",
            ],
            [
              "Cooperará con el Comercio en la investigación técnica y suministrará la información necesaria para que el Comercio evalúe y realice los reportes pertinentes ante la Superintendencia de Industria y Comercio (SIC) cuando aplique.",
            ],
          ],
        },
      ],
    },
    {
      id: "asistencia-pqr",
      title: "Asistencia frente a Derechos de los Titulares (PQR)",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Fideliapp provee herramientas directas para que los titulares descarguen sus datos en formato JSON y soliciten la eliminación de su cuenta. Cuando un cliente ejerza el derecho de supresión, Fideliapp anonimizará de forma irreversible su identidad personal y conservará únicamente registros transaccionales sin PII para que el libro de puntos y las métricas históricas del Comercio mantengan coherencia contable.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "Si el Comercio recibe una consulta o reclamo de Habeas Data que requiera soporte técnico del Encargado, podrá canalizarlo a ",
            {
              link: {
                label: LEGAL_CONTACT.privacyEmail,
                to: `mailto:${LEGAL_CONTACT.privacyEmail}`,
                external: true,
              },
            },
            " para coordinar respuesta dentro de los plazos de la Ley 1581 de 2012 (10 y 15 días hábiles).",
          ],
        },
      ],
    },
    {
      id: "devolucion-supresion",
      title: "Devolución y Supresión al Terminar el Servicio",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Al finalizar la relación con el Comercio, y previa solicitud dirigida a ",
            {
              link: {
                label: LEGAL_CONTACT.privacyEmail,
                to: `mailto:${LEGAL_CONTACT.privacyEmail}`,
                external: true,
              },
            },
            " antes del cierre definitivo, el Encargado entregará una copia estructurada de los datos operativos del negocio y procederá a la supresión o anonimización segura de la información vinculada al Comercio, salvo aquella que deba conservarse por obligación legal o prueba de autorizaciones.",
          ],
        },
      ],
    },
  ],
};
