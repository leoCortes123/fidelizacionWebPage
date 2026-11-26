import { afterEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  LEGAL_CONTACT,
  LEGAL_OWNER,
  LEGAL_PATHS,
  LEGAL_TAX,
  LEGAL_VERSIONS,
} from "@/config/legal.config";
import { LEGAL_DOCUMENTS, type LegalDocKey } from "@/features/legal/content";
import { formatLegalDate } from "@/features/legal/formatLegalDate";
import { LegalDocumentPage } from "@/features/legal/pages/LegalDocumentPage";
import { ContactPage } from "@/features/legal/pages/ContactPage";
import { PricingPage } from "@/features/landing/pages/PricingPage";
import { HomePage } from "@/features/landing/pages/HomePage";

describe("Páginas legales, footer legal, precios y SEO", () => {
  afterEach(() => {
    document.getElementById("route-breadcrumb-ld")?.remove();
  });

  const docCases: Array<{
    key: LegalDocKey;
    expectedHeading: RegExp;
    expectedVersion: string;
    mustContain: RegExp[];
  }> = [
    {
      key: "privacyPolicy",
      expectedHeading: /Política de Tratamiento de Datos Personales/i,
      expectedVersion: LEGAL_VERSIONS.privacy_policy,
      mustContain: [
        /Ley Estatutaria 1581 de 2012/i,
        /Responsable del Tratamiento/i,
        /Encargado del Tratamiento/i,
        /Supabase Inc\./i,
        /Vercel Inc\./i,
        /Cloudflare Inc\./i,
        /Google LLC/i,
        /user_agent/i,
        /10 días hábiles/i,
        /15 días hábiles/i,
      ],
    },
    {
      key: "termsCustomer",
      expectedHeading: /Términos y Condiciones de Uso — Clientes/i,
      expectedVersion: LEGAL_VERSIONS.terms_customer,
      mustContain: [
        /NO son dinero/i,
        /Sin valor monetario/i,
        /único responsable/i,
        /18 años/i,
        /FIFO/i,
      ],
    },
    {
      key: "termsBusiness",
      expectedHeading: /Términos y Condiciones del Servicio SaaS — Negocios/i,
      expectedVersion: LEGAL_VERSIONS.terms_business,
      mustContain: [
        /no responsable de IVA/i,
        /hoja de ruta informativa/i,
        /No sustituyen la factura electrónica/i,
        /NO constituyen contabilidad oficial/i,
      ],
    },
    {
      key: "dpa",
      expectedHeading: /Acuerdo de Transmisión y Encargado del Tratamiento de Datos/i,
      expectedVersion: LEGAL_VERSIONS.dpa,
      mustContain: [
        /artículo 25 del Decreto 1377 de 2013/i,
        /Row Level Security/i,
        /Subencargados tecnológicos autorizados/i,
        /Notificación de Incidentes de Seguridad/i,
      ],
    },
    {
      key: "cookies",
      expectedHeading: /Política de Cookies y Almacenamiento Local/i,
      expectedVersion: LEGAL_VERSIONS.cookies,
      mustContain: [
        /no usamos cookies publicitarias/i,
        /fideliapp:theme/i,
        /fideliapp:draft:\*/i,
        /fidelizacion:onboarding:\*/i,
        /fidelizacion:pending-account-type/i,
        /loyalty:token:\*/i,
        /fidelizacion:pending-claim/i,
        /fideliapp:preload-reload/i,
      ],
    },
    {
      key: "accountDeletion",
      expectedHeading: /Eliminación de Cuenta y Datos Personales/i,
      expectedVersion: LEGAL_VERSIONS.privacy_policy,
      mustContain: [
        /ELIMINAR/,
        /ACCOUNT_LAST_ADMIN/,
        /15 días hábiles/i,
        /business-assets/i,
        /anonimizad/i,
      ],
    },
  ];

  it.each(docCases)(
    "renderiza $key con versión, vigencia, índice válido, secciones enfocables y contenido clave",
    ({ key, expectedHeading, expectedVersion, mustContain }) => {
      const doc = LEGAL_DOCUMENTS[key];
      const { container } = render(
        <MemoryRouter initialEntries={[doc.path]}>
          <LegalDocumentPage docKey={key} />
        </MemoryRouter>,
      );

      expect(screen.getByRole("heading", { level: 1, name: expectedHeading })).toBeInTheDocument();
      const metaList = screen.getByRole("list", { name: /Metadatos del documento/i });
      expect(within(metaList).getByText(new RegExp(expectedVersion))).toBeInTheDocument();
      expect(within(metaList).getByText(/25 de noviembre de 2026/i)).toBeInTheDocument();

      // Índice en desktop apunta a secciones reales con tabindex="-1".
      const toc = screen.getByRole("navigation", { name: /^Índice del documento$/i });
      const tocLinks = within(toc).getAllByRole("link");
      expect(tocLinks.length).toBe(doc.sections.length);
      for (const link of tocLinks) {
        const href = link.getAttribute("href");
        expect(href).toMatch(/^#/);
        const section = container.querySelector<HTMLElement>(`section${href}`);
        expect(section).not.toBeNull();
        expect(section).toHaveAttribute("tabindex", "-1");
      }

      // Tablas responsivas accesibles envueltas en contenedor de container-query separado.
      const tableWrappers = container.querySelectorAll<HTMLElement>(".legal-table-wrap");
      tableWrappers.forEach((wrapper) => {
        expect(wrapper.parentElement).toHaveClass("legal-table-container");
        expect(wrapper).toHaveAttribute("tabindex", "0");
        expect(wrapper).toHaveAttribute("role", "region");
        const labelledBy = wrapper.getAttribute("aria-labelledby");
        expect(labelledBy).toBeTruthy();
        expect(document.getElementById(labelledBy!)).not.toBeNull();
      });

      const bodyText = container.textContent ?? "";
      for (const pattern of mustContain) {
        expect(bodyText).toMatch(pattern);
      }
    },
  );

  it("muestra columna Legal, datos del titular, PQR y enlace a la SIC en el footer global", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>,
    );

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getAllByText(new RegExp(LEGAL_OWNER.fullName)).length).toBeGreaterThan(0);
    expect(within(footer).getByText(new RegExp(LEGAL_OWNER.nit))).toBeInTheDocument();

    const legalNav = within(footer).getByRole("navigation", {
      name: /Documentos legales y privacidad/i,
    });
    expect(within(legalNav).getByRole("link", { name: /Política de privacidad/i })).toHaveAttribute(
      "href",
      LEGAL_PATHS.privacyPolicy,
    );
    expect(within(legalNav).getByRole("link", { name: /Términos para clientes/i })).toHaveAttribute(
      "href",
      LEGAL_PATHS.termsCustomer,
    );
    expect(within(legalNav).getByRole("link", { name: /Términos para negocios/i })).toHaveAttribute(
      "href",
      LEGAL_PATHS.termsBusiness,
    );
    expect(within(legalNav).getByRole("link", { name: /Acuerdo de datos/i })).toHaveAttribute(
      "href",
      LEGAL_PATHS.dpa,
    );
    expect(within(legalNav).getByRole("link", { name: /Política de cookies/i })).toHaveAttribute(
      "href",
      LEGAL_PATHS.cookies,
    );
    expect(within(legalNav).getByRole("link", { name: /Eliminar mi cuenta/i })).toHaveAttribute(
      "href",
      LEGAL_PATHS.accountDeletion,
    );

    const sicLink = within(legalNav).getByRole("link", {
      name: /Superintendencia de Industria y Comercio/i,
    });
    expect(sicLink).toHaveAttribute("href", LEGAL_CONTACT.authority.url);
    expect(sicLink).toHaveAttribute("target", "_blank");
    expect(sicLink).toHaveAttribute("rel", expect.stringContaining("noopener"));

    expect(
      within(footer).getByRole("link", { name: new RegExp(LEGAL_CONTACT.privacyEmail) }),
    ).toHaveAttribute("href", `mailto:${LEGAL_CONTACT.privacyEmail}`);
  });

  it("valida y construye enlace mailto accesible en /contacto según el tipo de solicitud", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[LEGAL_PATHS.contact]}>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Contacto, PQR y Ejercicio de Habeas Data/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/10 días hábiles/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/15 días hábiles/i).length).toBeGreaterThan(0);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico de respuesta/i);
    const messageInput = screen.getByLabelText(/Detalle de tu solicitud/i);
    const topicSelect = screen.getByLabelText(/Tipo de solicitud/i);

    // Estado inicial explícito aria-invalid="false" para evitar anuncios prematuros.
    expect(nameInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(messageInput).toHaveAttribute("aria-invalid", "false");

    // Correo inválido tras blur actualiza aria-invalid y enlaza data-error en aria-describedby.
    await user.type(emailInput, "correo-invalido");
    await user.tab();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput.getAttribute("aria-describedby")).toContain("pqr-email-error");

    // Corregir campos y elegir eliminación de cuenta -> dirige a datos.fideliapp@outlook.com.
    await user.clear(emailInput);
    await user.type(emailInput, "ana@ejemplo.com");
    await user.type(nameInput, "Ana Pérez");
    await user.selectOptions(topicSelect, "eliminar_cuenta");
    await user.type(messageInput, "Solicito la eliminación completa de mi cuenta en Fideliapp.");
    await user.click(screen.getByRole("button", { name: /Preparar correo para enviar/i }));

    const mailtoLink = screen.getByRole("link", {
      name: new RegExp(`Abrir correo \\(${LEGAL_CONTACT.privacyEmail}\\)`),
    });
    const href = mailtoLink.getAttribute("href") ?? "";
    expect(href).toMatch(new RegExp(`^mailto:${LEGAL_CONTACT.privacyEmail}\\?subject=`));
    expect(decodeURIComponent(href)).toContain("Solicitud de eliminación de cuenta");
    expect(decodeURIComponent(href)).toContain("Ana Pérez");

    // Cambiar a soporte técnico invalida el borrador previo hasta volver a prepararlo.
    await user.selectOptions(topicSelect, "soporte");
    expect(
      screen.queryByRole("link", {
        name: new RegExp(`Abrir correo \\(${LEGAL_CONTACT.privacyEmail}\\)`),
      }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Preparar correo para enviar/i }));
    const supportLink = screen.getByRole("link", {
      name: new RegExp(`Abrir correo \\(${LEGAL_CONTACT.supportEmail}\\)`),
    });
    expect(supportLink.getAttribute("href")).toMatch(
      new RegExp(`^mailto:${LEGAL_CONTACT.supportEmail}\\?subject=`),
    );
  });

  it("formatea fechas legales válidas y rechaza fechas imposibles de calendario", () => {
    expect(formatLegalDate("2026-11-25")).toBe("25 de noviembre de 2026");
    expect(formatLegalDate("2026-02-31")).toBe("2026-02-31");
    expect(formatLegalDate("2024-02-29")).toBe("29 de febrero de 2024");
    expect(formatLegalDate("2025-02-29")).toBe("2025-02-29");
  });

  it("cumple requisitos legales en Precios: nota de IVA, total anual, sin 'para siempre' y descargo de roadmap", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter initialEntries={["/precios"]}>
        <PricingPage />
      </MemoryRouter>,
    );

    const initialText = container.textContent ?? "";
    expect(initialText).toContain(LEGAL_TAX.pricingNote);
    expect(initialText).not.toMatch(/para siempre/i);
    expect(initialText).not.toMatch(/sin costo adicional dentro de su capa/i);
    expect(initialText).toMatch(/sin costo fijo · 1 local \(sujeto a Términos\)/i);
    expect(initialText).toMatch(/hoja de ruta informativa/i);
    expect(initialText).toMatch(/acceso inicial/i);

    await user.click(screen.getByRole("button", { name: /Pago anual/i }));
    expect(screen.getByText(/Total pago anual: \$?\s*588\.000 COP \/ año/i)).toBeInTheDocument();
    expect(screen.getByText(/Total pago anual: \$?\s*1\.308\.000 COP \/ año/i)).toBeInTheDocument();
  });

  it("mantiene sitemap.xml, llms.txt, JSON-LD Organization.contactPoint y _redirects alineados", () => {
    const root = resolve(__dirname, "../..");
    const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");
    const llms = readFileSync(resolve(root, "public/llms.txt"), "utf8");
    const redirects = readFileSync(resolve(root, "public/_redirects"), "utf8");
    const html = readFileSync(resolve(root, "index.html"), "utf8");

    for (const path of Object.values(LEGAL_PATHS)) {
      expect(sitemap).toContain(`https://fideliapp.pages.dev${path}</loc>`);
      expect(llms).toContain(`https://fideliapp.pages.dev${path}`);
      // Ninguna ruta legal debe ser redirigida a Vercel en _redirects.
      expect(redirects).not.toMatch(new RegExp(`^${path}\\b`, "m"));
    }

    // Sin 404.html en public/ para preservar el fallback SPA HTTP 200 nativo de Cloudflare Pages.
    expect(existsSync(resolve(root, "public/404.html"))).toBe(false);

    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const graph = (
      JSON.parse(match![1]) as {
        "@graph": Array<{
          "@type": string;
          email?: string;
          contactPoint?: Array<{ contactType: string; email: string }>;
        }>;
      }
    )["@graph"];
    const org = graph.find((node) => node["@type"] === "Organization");
    expect(org?.email).toBe(LEGAL_CONTACT.supportEmail);
    expect(org?.contactPoint).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contactType: "customer support",
          email: LEGAL_CONTACT.supportEmail,
        }),
        expect.objectContaining({
          contactType: "privacy",
          email: LEGAL_CONTACT.privacyEmail,
        }),
      ]),
    );
  });
});
