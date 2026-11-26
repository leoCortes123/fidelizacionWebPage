import {
  LEGAL_CONTACT,
  LEGAL_OWNER,
  LEGAL_PATHS,
  LEGAL_TAX,
  LEGAL_VERSIONS,
  MIN_AGE,
} from "@/config/legal.config";
import type { LegalDocument } from "../types";

export const termsBusinessDoc: LegalDocument = {
  id: "terms-business",
  path: LEGAL_PATHS.termsBusiness,
  breadcrumbLabel: "Términos para Negocios",
  eyebrow: "Servicio SaaS · B2B",
  title: "Términos y Condiciones del Servicio SaaS — Negocios",
  audience: "Comercios, propietarios y administradores",
  summary:
    "Condiciones contractuales aplicables a los comercios que crean y administran programas de fidelización en Fideliapp: licencia SaaS, planes y tratamiento tributario en COP, obligaciones legales bajo Ley 1480 y Ley 1581, gestión de encargados y descargo sobre el panel económico.",
  metaTitle: `Términos y Condiciones para Negocios (SaaS B2B) · ${LEGAL_OWNER.brandName}`,
  metaDescription:
    "Términos y Condiciones B2B de Fideliapp para comercios en Colombia: licencia SaaS, planes en COP sin IVA, hoja de ruta, obligaciones frente a clientes y descargo del panel económico.",
  version: LEGAL_VERSIONS.terms_business,
  effectiveDate: LEGAL_VERSIONS.terms_business,
  sections: [
    {
      id: "partes-representacion",
      title: "Partes, Facultad de Representación y Aceptación",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Estos Términos regulan la prestación del software como servicio (SaaS) ",
            { strong: LEGAL_OWNER.brandName },
            ", ofrecido por ",
            { strong: LEGAL_OWNER.fullName },
            ` (${LEGAL_OWNER.personTypeLabel}, NIT ${LEGAL_OWNER.nit}, ${LEGAL_OWNER.domicile}), a favor de la persona natural comerciante o persona jurídica (el `,
            { strong: "«Comercio»" },
            ") que registra uno o más negocios en la plataforma.",
          ],
        },
        {
          type: "paragraph",
          content: [
            `Quien crea el negocio declara ser mayor de ${MIN_AGE} años y contar con facultades suficientes para obligar al Comercio. La activación de un negocio requiere aceptar expresamente estos Términos y el `,
            { link: { label: "Acuerdo de Transmisión de Datos (DPA)", to: LEGAL_PATHS.dpa } },
            ", el cual forma parte integral de este contrato.",
          ],
        },
      ],
    },
    {
      id: "licencia-saas",
      title: "Licencia de Uso SaaS",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Durante la vigencia de tu cuenta, te concedemos una licencia limitada, no exclusiva, intransferible y revocable para acceder y operar los módulos habilitados de Fideliapp con el fin de gestionar tu programa de fidelización, tu carta, tus recompensas, tu equipo de encargados y tus métricas operativas.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "No está permitido revender el acceso a la plataforma como servicio propio, realizar ingeniería inversa del código, ni usar Fideliapp para actividades ilícitas o ajenas a un comercio real.",
          ],
        },
      ],
    },
    {
      id: "planes-precios-roadmap",
      title: "Planes, Precios en COP, Régimen de IVA y Hoja de Ruta",
      blocks: [
        {
          type: "list",
          items: [
            [
              { strong: "Plan Player 1 · Gratis: " },
              "ofrece operación sin costo fijo para un (1) local con las funcionalidades base de acumulación con QR y redención de recompensas, sujeto a estos Términos y a políticas de uso razonable. Fideliapp podrá ajustar límites técnicos o condiciones con aviso previo razonable por motivos legales, técnicos o de sostenibilidad.",
            ],
            [
              { strong: "Planes Level Up · Pro y Modo Arcade · Suite (etapa actual): " },
              "los valores publicados en la ",
              { link: { label: "página de Precios", to: "/precios" } },
              " se expresan en pesos colombianos (COP) como referencia comercial. Mientras no se habilite la pasarela de cobros recurrentes, los comercios que se registren desde los enlaces de planes ingresan en acceso inicial bajo el plan gratuito, sin cobros automáticos ni captura de medios de pago.",
            ],
            [
              { strong: "Tratamiento tributario (IVA): " },
              LEGAL_TAX.pricingNote,
              ` (${LEGAL_TAX.legalBasis}). Si en el futuro el prestador cambia de régimen tributario o se obliga a recaudar IVA, los nuevos valores y condiciones fiscales se informarán oportunamente antes de cualquier cobro.`,
            ],
            [
              { strong: "Funciones etiquetadas como «Próximamente» o «En diseño»: " },
              "hacen parte de nuestra hoja de ruta informativa y no están activas actualmente. Su publicación describe la visión del producto, pero no constituye compromiso vinculante de fecha de entrega ni oferta en firme. Cuando se activen cobros recurrentes se publicará la política específica de pagos, facturación, cancelación, derecho de retracto (Ley 1480) y reversión del pago (Decreto 587 de 2016).",
            ],
          ],
        },
      ],
    },
    {
      id: "obligaciones-comercio",
      title: "Obligaciones del Comercio (Ley 1480, Ley 1581 y DIAN)",
      blocks: [
        {
          type: "list",
          items: [
            [
              { strong: "Estatuto del Consumidor (Ley 1480 de 2011): " },
              "el Comercio es el único responsable de comunicar de forma clara, veraz y suficiente las reglas de su programa (monedas por compra, recompensas disponibles, límites y vencimiento FIFO), honrar los premios canjeados y abstenerse de publicidad engañosa.",
            ],
            [
              { strong: "Protección de Datos (Ley 1581 de 2012 y Ley 2300 de 2023): " },
              "el Comercio actúa como Responsable independiente frente a los datos de sus clientes vinculados a su programa. Se obliga a utilizarlos únicamente para finalidades autorizadas, no comercializar ni extraer bases de datos para fines indebidos, atender reclamaciones de sus clientes y, cuando existan herramientas de difusión, respetar el consentimiento por canal y los horarios permitidos por la Ley 2300 de 2023.",
            ],
            [
              { strong: "Facturación legal ante la DIAN: " },
              "los registros de compras y códigos QR generados en Fideliapp sirven únicamente para calcular puntos y control interno del programa. ",
              {
                strong:
                  "No sustituyen la factura electrónica de venta ni el documento equivalente POS",
              },
              " exigidos por la DIAN, cuya emisión corresponde exclusivamente al Comercio en su sistema contable o POS.",
            ],
          ],
        },
      ],
    },
    {
      id: "encargados-contenido",
      title: "Equipo de Encargados y Contenido del Comercio",
      blocks: [
        {
          type: "list",
          items: [
            [
              { strong: "Gestión de encargados: " },
              "el Comercio es responsable de las personas a quienes invita como administradores o encargados, de configurar correctamente sus permisos (registro de ventas y/o aprobación de canjes) y de revocar su acceso inmediatamente cuando dejen de trabajar en el local.",
            ],
            [
              { strong: "Logos, carta e imágenes (UGC): " },
              "el Comercio garantiza que posee los derechos necesarios sobre marcas, logotipos, fotografías de productos y recompensas cargados en ",
              { code: "business-assets" },
              ", y otorga a Fideliapp una licencia no exclusiva y gratuita para alojarlos y mostrarlos a sus clientes dentro de la plataforma. Está prohibido subir contenido ilícito, engañoso o que infrinja derechos de terceros.",
            ],
          ],
        },
      ],
    },
    {
      id: "panel-economico",
      title: "Descargo sobre el Panel Económico y Simuladores",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Información estimada de apoyo operativo",
          content: [
            "El panel económico, las alertas de presupuesto, los márgenes estimados y los snapshots mensuales se calculan con base en los datos y costos ingresados por el Comercio (excluyendo productos sin costo registrado). Estas cifras son orientativas para apoyar decisiones de fidelización y NO constituyen contabilidad oficial, auditoría financiera ni asesoría tributaria o legal.",
          ],
        },
      ],
    },
    {
      id: "propiedad-datos-terminacion",
      title: "Propiedad de Datos, Disponibilidad y Terminación",
      blocks: [
        {
          type: "list",
          items: [
            [
              { strong: "Propiedad de datos del negocio: " },
              "los datos de tu carta, configuración, ventas registradas y reportes pertenecen al Comercio. Antes de cerrar tu negocio o finalizar el uso de la plataforma, puedes solicitar exportación razonable de tu información operativa a través de ",
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
              { strong: "Regla de último administrador: " },
              "para proteger la continuidad del negocio, el último administrador activo no puede eliminar su cuenta personal sin antes asignar otro administrador o dar de baja el negocio.",
            ],
            [
              { strong: "Disponibilidad y limitación de responsabilidad: " },
              "Fideliapp se presta bajo un estándar de diligencia técnica razonable sin acuerdo de nivel de servicio (SLA) garantizado para planes gratuitos o acceso inicial. En la máxima medida permitida por la ley colombiana, el prestador no responde por lucro cesante, fallas de conectividad del local o pérdidas indirectas derivadas de configuraciones erróneas realizadas por el Comercio.",
            ],
          ],
        },
      ],
    },
    {
      id: "ley-aplicable-b2b",
      title: "Modificaciones, Ley Aplicable y Jurisdicción",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Estos Términos se rigen por las leyes de la ",
            { strong: "República de Colombia" },
            ". Los cambios sustanciales se informarán en la aplicación y podrán requerir nueva aceptación del administrador. Toda controversia se procurará resolver primero por arreglo directo a través de ",
            { link: { label: "nuestro canal de contacto", to: LEGAL_PATHS.contact } },
            " y, en su defecto, ante la jurisdicción ordinaria de Bogotá D.C.",
          ],
        },
      ],
    },
  ],
};
