import {
  LEGAL_CONTACT,
  LEGAL_OWNER,
  LEGAL_PATHS,
  LEGAL_VERSIONS,
  MIN_AGE,
} from "@/config/legal.config";
import { APP_URL, SITE_URL } from "@/lib/config";
import type { LegalDocument } from "../types";

export const privacyPolicyDoc: LegalDocument = {
  id: "privacy-policy",
  path: LEGAL_PATHS.privacyPolicy,
  breadcrumbLabel: "Política de Privacidad",
  eyebrow: "Habeas Data · Ley 1581 de 2012",
  title: "Política de Tratamiento de Datos Personales",
  audience: "Clientes, Encargados, Administradores y Visitantes",
  summary:
    "Conoce quién trata tus datos personales en Fideliapp, qué información recolectamos realmente, cómo se distinguen los roles de Responsable y Encargado frente a los comercios afiliados, qué proveedores internacionales intervienen y cómo ejercer tus derechos de Habeas Data en Colombia.",
  metaTitle: `Política de Privacidad y Habeas Data · ${LEGAL_OWNER.brandName}`,
  metaDescription:
    "Política de Tratamiento de Datos Personales de Fideliapp conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 en Colombia: inventario de datos, transferencia internacional, derechos y canal PQR.",
  version: LEGAL_VERSIONS.privacy_policy,
  effectiveDate: LEGAL_VERSIONS.privacy_policy,
  sections: [
    {
      id: "responsable",
      title: "Identificación del Responsable y Marco Normativo",
      blocks: [
        {
          type: "paragraph",
          content: [
            "En cumplimiento de la ",
            { strong: "Constitución Política de Colombia (artículo 15)" },
            ", la ",
            { strong: "Ley Estatutaria 1581 de 2012" },
            ", el ",
            { strong: "Decreto 1377 de 2013" },
            " (compilado en el Decreto 1074 de 2015) y demás normas concordantes, se informa que el responsable del tratamiento de los datos personales asociados a la plataforma ",
            { strong: LEGAL_OWNER.brandName },
            " es:",
          ],
        },
        {
          type: "keyValue",
          items: [
            { label: "Titular / Responsable", value: [{ strong: LEGAL_OWNER.fullName }] },
            { label: "Naturaleza", value: [LEGAL_OWNER.personTypeLabel] },
            {
              label: "Identificación y NIT",
              value: [
                `${LEGAL_OWNER.documentType} ${LEGAL_OWNER.documentNumber} · NIT ${LEGAL_OWNER.nit}`,
              ],
            },
            { label: "Domicilio", value: [LEGAL_OWNER.domicile] },
            { label: "Dirección de notificación", value: [LEGAL_OWNER.notificationAddress] },
            {
              label: "Correo de Habeas Data y PQR",
              value: [
                {
                  link: {
                    label: LEGAL_CONTACT.privacyEmail,
                    to: `mailto:${LEGAL_CONTACT.privacyEmail}`,
                    external: true,
                  },
                },
              ],
            },
            {
              label: "Correo de soporte técnico",
              value: [
                {
                  link: {
                    label: LEGAL_CONTACT.supportEmail,
                    to: `mailto:${LEGAL_CONTACT.supportEmail}`,
                    external: true,
                  },
                },
              ],
            },
            {
              label: "Teléfono y horario",
              value: [
                {
                  link: {
                    label: LEGAL_CONTACT.phone,
                    to: LEGAL_CONTACT.phoneHref,
                    external: true,
                  },
                },
                ` · ${LEGAL_CONTACT.businessHours}`,
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            "Esta política aplica al sitio comercial ",
            { code: SITE_URL },
            ", a la aplicación web/PWA ",
            { code: APP_URL },
            " y a cualquier interfaz oficial que se habilite en el futuro bajo la marca ",
            { strong: LEGAL_OWNER.brandName },
            ".",
          ],
        },
      ],
    },
    {
      id: "roles",
      title: "Distinción de Roles: Responsable vs. Encargado",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Fideliapp opera como una plataforma tecnológica multiempresa (B2B2C). Según el tipo de información, los roles legales se dividen con claridad:",
          ],
        },
        {
          type: "list",
          items: [
            [
              { strong: "Fideliapp como Responsable del Tratamiento: " },
              "trata los datos necesarios para crear, autenticar y administrar tu cuenta de usuario (perfil, credenciales, consentimientos legales, soporte técnico, seguridad y prevención de fraude) y la relación con los administradores que registran comercios en el software.",
            ],
            [
              { strong: "Cada Comercio afiliado como Responsable independiente: " },
              "cuando un cliente se une voluntariamente al programa de fidelización de un negocio (por enlace ",
              { code: "/join/:slug" },
              " o escaneando un QR de venta ",
              { code: "/claim/:token" },
              "), ese comercio es el Responsable autónomo de la relación comercial, las compras registradas, las reglas de acumulación/vencimiento de monedas y la entrega de recompensas.",
            ],
            [
              { strong: "Fideliapp como Encargado del Tratamiento frente al Comercio: " },
              "respecto de los datos que el comercio administra dentro de su programa de puntos (historial de compras, canjes, saldos y métricas de frecuencia), Fideliapp actúa como Encargado bajo el ",
              { link: { label: "Acuerdo de Transmisión de Datos (DPA)", to: LEGAL_PATHS.dpa } },
              ".",
            ],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Aislamiento real entre comercios",
          content: [
            "Las billeteras de monedas, compras, recompensas y membresías se aíslan por negocio mediante reglas de seguridad a nivel de fila (RLS) en la base de datos. Un comercio únicamente accede a los datos de personas afiliadas a su propio programa; Fideliapp no comparte ni vende bases de clientes entre negocios.",
          ],
        },
      ],
    },
    {
      id: "inventario-datos",
      title: "Inventario Real de Datos Personales Tratados",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Recolectamos únicamente los datos necesarios para operar cada rol dentro de la plataforma, siguiendo el principio de minimización:",
          ],
        },
        {
          type: "table",
          id: "tabla-inventario-datos",
          caption: "Datos personales tratados por perfil de usuario en Fideliapp",
          headers: ["Perfil", "Datos recolectados", "Carácter", "Origen y visibilidad"],
          rows: [
            {
              rowHeader: "Cliente (cuenta y perfil)",
              cells: [
                [
                  "Nombre completo (",
                  { code: "full_name" },
                  "), correo electrónico (",
                  { code: "email" },
                  "), alias o nickname (",
                  { code: "nickname" },
                  "), teléfono opcional (",
                  { code: "phone" },
                  "), fecha de nacimiento opcional para mayores de ",
                  String(MIN_AGE),
                  " años (",
                  { code: "birth_date" },
                  ") y foto de perfil opcional (",
                  { code: "avatar_url" },
                  ").",
                ],
                [
                  "Obligatorios: nombre y correo. Opcionales o autogenerados: alias (",
                  { code: "nickname" },
                  "), teléfono, cumpleaños y foto.",
                ],
                [
                  "Ingresados por el usuario o recibidos vía Google OAuth. Las fotos se re-codifican en el navegador para eliminar metadatos EXIF/GPS antes de almacenarse en el bucket ",
                  { code: "business-assets" },
                  ".",
                ],
              ],
            },
            {
              rowHeader: "Cliente (actividad en programas)",
              cells: [
                [
                  "Membresías a negocios, historial de compras y productos comprados (",
                  { code: "purchases" },
                  ", ",
                  { code: "purchase_items" },
                  "), libro de movimientos de monedas (",
                  { code: "points_ledger" },
                  "), solicitudes y entregas de canjes, e indicadores calculados de frecuencia de visita (",
                  { code: "is_frequent" },
                  ", ",
                  { code: "is_frequent_active" },
                  ", ",
                  { code: "is_recovering" },
                  ").",
                ],
                ["Generados por el uso del programa de puntos."],
                [
                  "Visibles únicamente para el cliente titular y el comercio específico donde realizó esas transacciones.",
                ],
              ],
            },
            {
              rowHeader: "Administrador y Encargado",
              cells: [
                [
                  "Datos de cuenta personal, roles y permisos asignados en cada negocio, datos públicos del comercio (nombre, dirección, WhatsApp, redes sociales, logo), perfil económico estimado del negocio (",
                  { code: "business_economic_profiles" },
                  ") y registros de auditoría de operaciones (",
                  { code: "actor_email" },
                  " y detalle técnico).",
                ],
                ["Necesarios para operar y auditar la caja y el programa."],
                [
                  "Ingresados por el administrador o generados automáticamente al registrar ventas, campañas y aprobaciones de canje.",
                ],
              ],
            },
            {
              rowHeader: "Consentimientos legales",
              cells: [
                [
                  "Tipo y versión de cada documento aceptado, fecha y hora de aceptación, ruta de origen, agente de navegador (",
                  { code: "user_agent" },
                  ") y, cuando aplique, fecha de revocación (",
                  { code: "user_legal_consents" },
                  ").",
                ],
                ["Obligatorio por deber legal (Art. 8 Decreto 1377 de 2013)."],
                ["Generado automáticamente al aceptar Términos, Política de Privacidad o DPA."],
              ],
            },
            {
              rowHeader: "Visitante del sitio comercial",
              cells: [
                [
                  "Datos técnicos mínimos de conexión procesados por la red CDN (dirección IP, navegador/User-Agent) y preferencia local de tema claro/oscuro (",
                  { code: "fideliapp:theme" },
                  ").",
                ],
                ["Técnico y funcional."],
                [
                  "Ver detalle completo en la ",
                  {
                    link: {
                      label: "Política de Cookies y Almacenamiento Local",
                      to: LEGAL_PATHS.cookies,
                    },
                  },
                  ".",
                ],
              ],
            },
          ],
        },
        {
          type: "callout",
          tone: "legal",
          title: "Datos que NO recolectamos actualmente",
          content: [
            "Fideliapp no solicita ni almacena números de tarjetas bancarias, claves financieras, datos biométricos, historial clínico ni ubicación GPS. Las fotografías subidas se procesan localmente en tu navegador para eliminar metadatos EXIF antes de transmitirse.",
          ],
        },
      ],
    },
    {
      id: "finalidades",
      title: "Finalidades del Tratamiento",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Los datos personales se tratan exclusivamente para las siguientes finalidades legítimas:",
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            [
              { strong: "Gestión de cuentas y autenticación: " },
              "permitir el registro, inicio de sesión con correo/contraseña o Google OAuth, mantenimiento seguro de la sesión y actualización del perfil.",
            ],
            [
              { strong: "Operación del programa de fidelización: " },
              "asociar compras reclamadas mediante QR único, calcular monedas, aplicar campañas o vencimientos FIFO, reservar y aprobar canjes de recompensas y mostrar historial por negocio.",
            ],
            [
              { strong: "Seguridad, idempotencia y auditoría: " },
              "evitar reclamos duplicados de QR, controlar permisos de encargados, registrar trazabilidad de operaciones en caja y prevenir fraude o uso indebido.",
            ],
            [
              { strong: "Gestión administrativa y analítica del negocio: " },
              "calcular indicadores internos de frecuencia de compra y métricas agregadas del panel económico del comercio afiliado.",
            ],
            [
              { strong: "Cumplimiento legal y atención de PQR: " },
              "conservar prueba de autorizaciones otorgadas, atender consultas, reclamos, exportaciones de datos y solicitudes de supresión, y cumplir requerimientos de autoridades competentes.",
            ],
            [
              { strong: "Comunicaciones comerciales futuras (solo con autorización separada): " },
              "cuando se habiliten módulos de difusión por WhatsApp, correo electrónico o notificaciones push, solo se enviarán mensajes a quienes otorguen consentimiento previo, expreso e independiente por canal, respetando siempre los horarios y límites de la Ley 2300 de 2023 y con opción de baja inmediata.",
            ],
          ],
        },
      ],
    },
    {
      id: "menores",
      title: "Política sobre Menores de Edad (Mayores de 18 Años)",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Conforme al ",
            { strong: "artículo 7 de la Ley 1581 de 2012" },
            " y el ",
            { strong: "artículo 12 del Decreto 1377 de 2013" },
            ", el tratamiento de datos personales de niños, niñas y adolescentes está prohibido salvo autorización verificable de sus representantes legales y respeto a su interés superior. Debido a que Fideliapp registra historial de consumo e indicadores de frecuencia comercial, ",
            {
              strong: `el uso y creación de cuentas está restringido exclusivamente a personas mayores de ${MIN_AGE} años.`,
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              "La plataforma valida tanto en la interfaz como en la base de datos que cualquier fecha de nacimiento ingresada corresponda a una persona de al menos ",
              { strong: `${MIN_AGE} años` },
              " (zona horaria ",
              { code: "America/Bogota" },
              ").",
            ],
            [
              "Si un padre, madre, representante legal o usuario detecta una cuenta perteneciente a un menor de edad, puede solicitar su supresión inmediata escribiendo a ",
              {
                link: {
                  label: LEGAL_CONTACT.privacyEmail,
                  to: `mailto:${LEGAL_CONTACT.privacyEmail}`,
                  external: true,
                },
              },
              " o mediante nuestra ",
              { link: { label: "página de contacto", to: LEGAL_PATHS.contact } },
              ".",
            ],
          ],
        },
      ],
    },
    {
      id: "transferencia-internacional",
      title: "Transmisión y Transferencia Internacional de Datos",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Para prestar el servicio con alta disponibilidad y cifrado moderno, Fideliapp se apoya en proveedores tecnológicos de infraestructura ubicados principalmente en los Estados Unidos y redes globales distribuidas. Al autorizar esta Política, el titular autoriza expresamente la transmisión y/o transferencia internacional de sus datos a los siguientes subencargados, bajo garantías contractuales de confidencialidad y seguridad:",
          ],
        },
        {
          type: "table",
          id: "tabla-proveedores-internacionales",
          caption: "Proveedores tecnológicos internacionales que procesan datos de Fideliapp",
          headers: ["Proveedor", "Rol técnico", "Datos procesados", "Ubicación / alcance"],
          rows: [
            {
              rowHeader: "Supabase Inc.",
              cells: [
                ["Base de datos PostgreSQL, autenticación y almacenamiento de imágenes (Storage)."],
                [
                  "Perfil de cuenta, membresías, compras, canjes, consentimientos, auditoría e imágenes del bucket ",
                  { code: "business-assets" },
                  ".",
                ],
                ["Infraestructura en la nube (EE. UU. / regiones gestionadas por Supabase)."],
              ],
            },
            {
              rowHeader: "Vercel Inc.",
              cells: [
                ["Alojamiento web y distribución de la aplicación/PWA (", { code: APP_URL }, ")."],
                ["Registros técnicos de red (dirección IP, cabeceras HTTP, rutas solicitadas)."],
                ["EE. UU. y red Edge global."],
              ],
            },
            {
              rowHeader: "Cloudflare Inc.",
              cells: [
                [
                  "Alojamiento CDN y seguridad perimetral del sitio comercial (",
                  { code: SITE_URL },
                  ").",
                ],
                [
                  "Registros técnicos de red (IP, cabeceras HTTP) necesarios para entrega y protección.",
                ],
                ["EE. UU. y red Edge global."],
              ],
            },
            {
              rowHeader: "Google LLC",
              cells: [
                [
                  "Inicio de sesión opcional con Google OAuth y distribución de tipografías Google Fonts.",
                ],
                [
                  "Si eliges entrar con Google: nombre, correo y foto del perfil de Google. En visitas web: dirección IP y cabeceras técnicas al cargar fuentes tipográficas.",
                ],
                ["EE. UU. / infraestructura global de Google."],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "derechos-titular",
      title: "Derechos de los Titulares (Art. 8 Ley 1581 de 2012)",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Como titular de datos personales tienes derecho a ejercer, de forma gratuita:",
          ],
        },
        {
          type: "list",
          items: [
            [
              { strong: "Conocer, actualizar y rectificar " },
              "tus datos personales frente a Fideliapp o el comercio afiliado.",
            ],
            [
              { strong: "Solicitar prueba de la autorización " },
              "otorgada (también visible en tu perfil junto con la versión y fecha aceptadas).",
            ],
            [
              { strong: "Ser informado " },
              "previa solicitud respecto del uso que se ha dado a tus datos.",
            ],
            [
              { strong: "Obtener una copia portable de tus datos " },
              "en formato JSON directamente desde tu perfil en la aplicación o solicitándola por correo.",
            ],
            [
              { strong: "Revocar la autorización y/o solicitar la supresión " },
              "de tus datos y eliminación de cuenta (ver procedimiento detallado en ",
              { link: { label: "Eliminación de cuenta y datos", to: LEGAL_PATHS.accountDeletion } },
              ").",
            ],
            [
              { strong: "Presentar quejas ante la " },
              {
                link: {
                  label: LEGAL_CONTACT.authority.name,
                  to: LEGAL_CONTACT.authority.url,
                  external: true,
                },
              },
              " por presuntas infracciones a la Ley 1581 de 2012, una vez agotado el trámite de consulta o reclamo ante el Responsable.",
            ],
          ],
        },
      ],
    },
    {
      id: "procedimiento-pqr",
      title: "Procedimiento y Plazos para Consultas y Reclamos (PQR)",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Puedes radicar consultas o reclamos de Habeas Data escribiendo a ",
            {
              link: {
                label: LEGAL_CONTACT.privacyEmail,
                to: `mailto:${LEGAL_CONTACT.privacyEmail}`,
                external: true,
              },
            },
            " o utilizando nuestra ",
            { link: { label: "página de Contacto y PQR", to: LEGAL_PATHS.contact } },
            ". Para agilizar la atención, indica tu nombre completo, el correo registrado en Fideliapp, la descripción clara de tu solicitud y los documentos de soporte si aplican.",
          ],
        },
        {
          type: "list",
          items: [
            [
              {
                strong: `Consultas (Art. 14 Ley 1581) — Máximo ${LEGAL_CONTACT.responseTimeBusinessDays.inquiries} días hábiles: `,
              },
              "si no fuese posible atenderla dentro de ese término, te informaremos los motivos de la demora y la nueva fecha de respuesta, que no superará los cinco (5) días hábiles siguientes al vencimiento del primer término.",
            ],
            [
              {
                strong: `Reclamos, rectificación, revocación o supresión (Art. 15 Ley 1581) — Máximo ${LEGAL_CONTACT.responseTimeBusinessDays.claims} días hábiles: `,
              },
              "contados desde el día siguiente a su recibo completo. Si el reclamo está incompleto, te requeriremos dentro de los cinco (5) días hábiles siguientes para subsanarlo. Cuando no sea posible atenderlo en quince (15) días hábiles, te informaremos los motivos y la nueva fecha, sin exceder ocho (8) días hábiles adicionales.",
            ],
          ],
        },
      ],
    },
    {
      id: "seguridad-conservacion",
      title: "Seguridad de la Información y Plazos de Conservación",
      blocks: [
        {
          type: "list",
          items: [
            [
              { strong: "Medidas de seguridad aplicadas: " },
              "cifrado HTTPS/TLS en tránsito y cifrado en reposo provisto por la infraestructura, aislamiento multiempresa con Row Level Security (RLS) en PostgreSQL, operaciones sensibles mediante funciones ",
              { code: "SECURITY DEFINER" },
              " con validación estricta de permisos, eliminación de metadatos EXIF en imágenes, borrado automático de archivos anteriores en Storage y limpieza de borradores locales al cerrar sesión.",
            ],
            [
              { strong: "Conservación mientras la cuenta esté activa: " },
              "los datos personales se conservan mientras mantengas tu cuenta activa o exista una finalidad vigente vinculada al servicio.",
            ],
            [
              { strong: "Supresión y anonimización irreversible: " },
              "cuando eliminas tu cuenta, tus datos identificativos (nombre, correo, alias, teléfono, fecha de nacimiento, foto en Storage, credenciales e identidades de inicio de sesión) se eliminan o sobrescriben de forma irreversible. Para preservar la integridad contable y de auditoría del libro de movimientos de los comercios, se conservan únicamente registros transaccionales anonimizados (montos, fechas y productos sin atribución personal), junto con la prueba sin PII de consentimientos y del evento de supresión conforme al artículo 2.2.2.25.2.6 del Decreto 1074 de 2015.",
            ],
          ],
        },
      ],
    },
    {
      id: "vigencia",
      title: "Vigencia y Modificaciones de esta Política",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Esta Política entra en vigencia a partir de la fecha indicada en el encabezado (versión ",
            { code: LEGAL_VERSIONS.privacy_policy },
            "). Cualquier cambio sustancial que afecte la identificación del Responsable o las finalidades del tratamiento será informado oportunamente a través del sitio web y la aplicación antes de su entrada en vigor, solicitando nueva autorización expresa cuando la ley lo exija.",
          ],
        },
      ],
    },
  ],
};
