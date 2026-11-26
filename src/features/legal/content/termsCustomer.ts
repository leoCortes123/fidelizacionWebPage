import {
  LEGAL_CONTACT,
  LEGAL_OWNER,
  LEGAL_PATHS,
  LEGAL_VERSIONS,
  MIN_AGE,
} from "@/config/legal.config";
import type { LegalDocument } from "../types";

export const termsCustomerDoc: LegalDocument = {
  id: "terms-customer",
  path: LEGAL_PATHS.termsCustomer,
  breadcrumbLabel: "Términos para Clientes",
  eyebrow: "Términos de Uso · B2C",
  title: "Términos y Condiciones de Uso — Clientes",
  audience: "Consumidores y clientes finales",
  summary:
    "Reglas que rigen tu cuenta personal en Fideliapp: mayoría de edad, naturaleza jurídica de las monedas o puntos, funcionamiento de los códigos QR, deslinde de responsabilidad frente a los comercios y reglas de uso aceptable.",
  metaTitle: `Términos y Condiciones para Clientes · ${LEGAL_OWNER.brandName}`,
  metaDescription:
    "Términos y Condiciones de uso para clientes finales de Fideliapp en Colombia: naturaleza de las monedas, deslinde frente a comercios afiliados, uso de QR, edad mínima y ley aplicable.",
  version: LEGAL_VERSIONS.terms_customer,
  effectiveDate: LEGAL_VERSIONS.terms_customer,
  sections: [
    {
      id: "objeto-aceptacion",
      title: "Objeto y Aceptación",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Los presentes Términos y Condiciones regulan el acceso y uso de la aplicación ",
            { strong: LEGAL_OWNER.brandName },
            ", operada por ",
            { strong: LEGAL_OWNER.fullName },
            ` (${LEGAL_OWNER.personTypeLabel}, NIT ${LEGAL_OWNER.nit}, domiciliado en ${LEGAL_OWNER.domicile}), por parte de personas naturales que participan como `,
            { strong: "Clientes" },
            " en los programas de fidelización de comercios afiliados.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "Al crear una cuenta o aceptar expresamente estos Términos mediante medios digitales (válidos conforme a la ",
            { strong: "Ley 527 de 1999" },
            "), declaras haberlos leído, comprendido y aceptado en su totalidad junto con nuestra ",
            {
              link: {
                label: "Política de Tratamiento de Datos Personales",
                to: LEGAL_PATHS.privacyPolicy,
              },
            },
            ". Si eres propietario o administrador de un negocio, te aplican además los ",
            {
              link: {
                label: "Términos y Condiciones para Negocios (B2B)",
                to: LEGAL_PATHS.termsBusiness,
              },
            },
            ".",
          ],
        },
      ],
    },
    {
      id: "edad-cuenta",
      title: "Requisitos de Edad y Uso de la Cuenta",
      blocks: [
        {
          type: "list",
          items: [
            [
              { strong: `Mayores de ${MIN_AGE} años: ` },
              `para registrarte y mantener una cuenta en ${LEGAL_OWNER.brandName} debes tener al menos ${MIN_AGE} años de edad y capacidad legal para obligarte en Colombia.`,
            ],
            [
              { strong: "Veracidad de la información: " },
              "te comprometes a proporcionar datos reales y mantenerlos actualizados, así como a utilizar una cuenta personal e intransferible.",
            ],
            [
              { strong: "Custodia de credenciales: " },
              "eres responsable de la confidencialidad de tu contraseña y del dispositivo desde el cual mantienes sesión abierta.",
            ],
          ],
        },
      ],
    },
    {
      id: "naturaleza-monedas",
      title: "Naturaleza Jurídica de las Monedas / Puntos",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Las monedas NO son dinero ni medio de pago",
          content: [
            "Las monedas o puntos visibles en Fideliapp son unidades promocionales digitales otorgadas exclusivamente por cada comercio afiliado dentro de su programa de fidelización.",
          ],
        },
        {
          type: "list",
          items: [
            [
              { strong: "Sin valor monetario: " },
              "no constituyen moneda de curso legal, dinero electrónico, depósito financiero, bono regulado, valor negociable ni criptoactivo.",
            ],
            [
              { strong: "No canjeables por efectivo: " },
              "las monedas no pueden cambiarse por dinero en efectivo ni generan derecho a reembolso monetario en caso de no utilizarse, vencer o cerrar la cuenta.",
            ],
            [
              { strong: "Intransferibles e independientes por comercio: " },
              "no pueden transferirse, venderse ni cederse a otros usuarios. El saldo acumulado en un comercio es independiente y no puede trasladarse ni mezclarse con el saldo de otro negocio.",
            ],
            [
              { strong: "Vencimiento FIFO (cuando aplique): " },
              "cada comercio decide si sus monedas vencen y en qué plazo. Cuando existe vencimiento, se consumen y vencen primero las monedas más antiguas (regla FIFO), según las condiciones informadas por el comercio.",
            ],
          ],
        },
      ],
    },
    {
      id: "deslinde-comercios",
      title: "Deslinde de Responsabilidad frente a los Comercios",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              strong: `${LEGAL_OWNER.brandName} actúa únicamente como proveedor de software (SaaS)`,
            },
            " que facilita a los comercios locales administrar su programa de puntos y recompensas. Fideliapp no vende los productos de los comercios, no interviene en el cobro de tus compras ni garantiza la operación comercial de terceros.",
          ],
        },
        {
          type: "list",
          items: [
            [
              "Cada comercio afiliado es el ",
              { strong: "único responsable" },
              " de la calidad, precio, disponibilidad, garantías y facturación legal de sus productos y servicios.",
            ],
            [
              "Cada comercio define de forma autónoma sus reglas de acumulación, el catálogo de recompensas, los límites por periodo, la entrega efectiva de los premios y cualquier cambio o terminación de su programa.",
            ],
            [
              "En caso de cierre del local, modificación de catálogo o desacuerdo sobre una compra o premio, deberás dirigir tu reclamación directamente al comercio correspondiente, sin perjuicio de tus derechos como consumidor ante la ",
              {
                link: {
                  label: LEGAL_CONTACT.authority.name,
                  to: LEGAL_CONTACT.authority.url,
                  external: true,
                },
              },
              ".",
            ],
          ],
        },
      ],
    },
    {
      id: "qr-canjes",
      title: "Reglas de Códigos QR, Acumulación y Canjes",
      blocks: [
        {
          type: "list",
          items: [
            [
              { strong: "QR de compra de un solo uso: " },
              "cada código QR de venta corresponde a una única compra elegible y solo puede reclamarse una vez antes de su expiración.",
            ],
            [
              { strong: "QR de canje como credencial portadora temporal: " },
              "al solicitar una recompensa, las monedas requeridas quedan reservadas y se genera un código QR temporal. Quien presente dicho código válido en caja podrá completar el canje; cuida la privacidad de tu pantalla hasta que el encargado lo valide.",
            ],
            [
              { strong: "Cancelación o vencimiento del canje: " },
              "si una solicitud de canje se rechaza, se cancela o vence sin entregarse, las monedas reservadas regresan automáticamente a tu saldo disponible, siempre que no hayan expirado según la regla del comercio.",
            ],
          ],
        },
      ],
    },
    {
      id: "uso-aceptable-antifraude",
      title: "Uso Aceptable, Contenido de Usuario y Antifraude",
      blocks: [
        {
          type: "paragraph",
          content: ["Para mantener un ecosistema seguro para clientes y negocios, está prohibido:"],
        },
        {
          type: "list",
          items: [
            [
              "Crear múltiples cuentas con fines fraudulentos, suplantar a terceros o manipular códigos QR, enlaces de afiliación o solicitudes de canje.",
            ],
            [
              "Intentar eludir controles de seguridad, realizar raspado automatizado (scraping) o interferir con la disponibilidad del servicio.",
            ],
            [
              { strong: "Contenido subido por usuarios (avatares y alias): " },
              "no puedes subir fotografías ni usar alias ilícitos, difamatorios, discriminatorios, sexualmente explícitos o que infrinjan derechos de autor, imagen o marcas de terceros. Al subir una foto de perfil otorgas a Fideliapp una licencia gratuita, limitada y revocable únicamente para alojarla y mostrarla dentro de tu cuenta y ante los comercios a los que te afilies.",
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            "Fideliapp podrá retirar contenido infractor y suspender o cancelar cuentas ante indicios razonables de fraude o incumplimiento grave. Puedes reportar contenido o conductas indebidas en ",
            {
              link: {
                label: LEGAL_CONTACT.supportEmail,
                to: `mailto:${LEGAL_CONTACT.supportEmail}`,
                external: true,
              },
            },
            ".",
          ],
        },
      ],
    },
    {
      id: "propiedad-disponibilidad",
      title: "Propiedad Intelectual, Disponibilidad y Responsabilidad",
      blocks: [
        {
          type: "paragraph",
          content: [
            "El software, diseño visual, textos, código fuente y signos distintivos de ",
            { strong: LEGAL_OWNER.brandName },
            ` pertenecen a ${LEGAL_OWNER.fullName} o a sus respectivos licenciantes. No se concede licencia distinta al uso personal de la aplicación conforme a estos Términos.`,
          ],
        },
        {
          type: "paragraph",
          content: [
            "El servicio se ofrece bajo un esquema de mejor esfuerzo razonable («tal cual» y «según disponibilidad»). Aunque aplicamos buenas prácticas de ingeniería y copias de seguridad, no garantizamos ausencia absoluta de interrupciones por mantenimientos, fallas de red o incidentes de terceros proveedores.",
          ],
        },
      ],
    },
    {
      id: "datos-eliminacion",
      title: "Protección de Datos y Eliminación de Cuenta",
      blocks: [
        {
          type: "paragraph",
          content: [
            "El tratamiento de tus datos personales se rige por nuestra ",
            { link: { label: "Política de Privacidad", to: LEGAL_PATHS.privacyPolicy } },
            " y la ",
            { link: { label: "Política de Cookies", to: LEGAL_PATHS.cookies } },
            ". Puedes dejar de usar el servicio y eliminar tu cuenta en cualquier momento siguiendo las instrucciones de ",
            { link: { label: "Eliminación de cuenta y datos", to: LEGAL_PATHS.accountDeletion } },
            ". Recuerda que eliminar tu cuenta implica la pérdida irreversible de las monedas acumuladas.",
          ],
        },
      ],
    },
    {
      id: "ley-modificaciones",
      title: "Modificaciones, Ley Aplicable y Jurisdicción",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Podemos actualizar estos Términos cuando cambien las funcionalidades o la normativa aplicable. Cuando haya cambios relevantes, te solicitaremos nueva aceptación dentro de la plataforma.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "Estos Términos se rigen por las leyes de la ",
            { strong: "República de Colombia" },
            " (incluyendo la Ley 1480 de 2011 — Estatuto del Consumidor). Cualquier controversia que no se resuelva de manera directa se someterá a las autoridades y jueces competentes de Bogotá D.C., sin perjuicio de las competencias de la ",
            {
              link: {
                label: LEGAL_CONTACT.authority.name,
                to: LEGAL_CONTACT.authority.url,
                external: true,
              },
            },
            ".",
          ],
        },
      ],
    },
  ],
};
