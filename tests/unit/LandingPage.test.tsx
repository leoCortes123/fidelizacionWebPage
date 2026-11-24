import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { HomePage } from "@/features/landing/pages/HomePage";
import { HowItWorksPage } from "@/features/landing/pages/HowItWorksPage";
import { FeaturesPage } from "@/features/landing/pages/FeaturesPage";
import { PricingPage } from "@/features/landing/pages/PricingPage";
import { FaqPage } from "@/features/landing/pages/FaqPage";
import { LOGIN_URL, REGISTER_BUSINESS_URL, REGISTER_CUSTOMER_URL, INSTALL_APP_URL } from "@/lib/config";
import { faqs, manualSteps, roleShowcases } from "@/features/landing/webContent";

describe("Sitio público (mockup multipágina)", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
    localStorage.removeItem("loopoint:theme");
  });

  afterEach(() => {
    document.getElementById("route-breadcrumb-ld")?.remove();
  });

  it("muestra el hero de inicio, CTAs principales, navegación multipágina y botón de descargar app", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Programa de puntos para tu negocio/i }),
    ).toBeInTheDocument();

    const startCta = screen.getByRole("link", { name: /Empezar gratis/i });
    expect(startCta).toHaveAttribute("href", REGISTER_BUSINESS_URL);
    expect(REGISTER_BUSINESS_URL).toBe("https://fidelizacion01.vercel.app/admin/onboarding?new=1");
    expect(startCta).toHaveClass("btn", "btn-start");

    const pricingCta = screen.getByRole("link", { name: /Ver planes y precios/i });
    expect(pricingCta).toHaveAttribute("href", "/precios");
    expect(pricingCta).toHaveClass("btn", "btn-primary");
    expect(startCta.parentElement).toBe(pricingCta.parentElement);

    expect(screen.getByRole("link", { name: /Soy cliente: crear cuenta/i })).toHaveAttribute(
      "href",
      REGISTER_CUSTOMER_URL,
    );
    const downloads = screen.getAllByRole("link", { name: /Descargar app/i });
    expect(downloads.length).toBeGreaterThan(0);
    downloads.forEach((link) => expect(link).toHaveAttribute("href", INSTALL_APP_URL));
    expect(screen.getByRole("link", { name: /^Ingresar$/i })).toHaveAttribute("href", LOGIN_URL);

    const nav = screen.getByRole("navigation", { name: /Navegación principal/i });
    expect(nav.querySelector('a[href="/como-funciona"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="/funciones"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="/precios"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="/preguntas"]')).toBeInTheDocument();
  });

  it("cambia de rol en el explorador interactivo de Inicio y sincroniza con beforematch y teclado", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>,
    );

    const adminTab = screen.getByRole("tab", { name: /Administrador/i });
    expect(adminTab).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("heading", { level: 3, name: roleShowcases[0].headline }),
    ).toBeVisible();

    adminTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /Encargado en caja/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("heading", { level: 3, name: roleShowcases[1].headline }),
    ).toBeVisible();

    const clientPanel = document.getElementById("role-panel-cliente");
    expect(clientPanel).toHaveAttribute("hidden", "until-found");

    act(() => {
      clientPanel?.dispatchEvent(new Event("beforematch", { bubbles: true }));
    });

    expect(screen.getByRole("tab", { name: /Cliente/i })).toHaveAttribute("aria-selected", "true");
    expect(clientPanel).not.toHaveAttribute("hidden");
  });

  it("permite pausar la marquesina y alternar modo oscuro desde la barra superior", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>,
    );

    const pauseTicker = screen.getByRole("button", { name: /Pausar marquesina/i });
    await user.click(pauseTicker);
    expect(screen.getByRole("button", { name: /Reanudar marquesina/i })).toBeInTheDocument();

    const themeBtn = screen.getByRole("button", { name: /Cambiar a modo oscuro/i });
    await user.click(themeBtn);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByRole("button", { name: /Cambiar a modo claro/i })).toBeInTheDocument();
  });

  it("navega por los 5 pasos del manual en Cómo funciona con clics, teclado y beforematch", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/como-funciona"]}>
        <HowItWorksPage />
      </MemoryRouter>,
    );

    const firstTab = screen.getByRole("tab", { name: /Venta/i });
    expect(firstTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { level: 3, name: manualSteps[0].title })).toBeVisible();

    await user.click(screen.getByRole("tab", { name: /Canje/i }));
    expect(screen.getByRole("tab", { name: /Canje/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { level: 3, name: manualSteps[3].title })).toBeVisible();

    await user.click(screen.getByRole("button", { name: /Paso siguiente/i }));
    expect(screen.getByRole("heading", { level: 3, name: manualSteps[4].title })).toBeVisible();
    expect(screen.getByRole("button", { name: /Paso siguiente/i })).toBeDisabled();

    const thirdPanel = document.getElementById("paso-panel-3");
    expect(thirdPanel).toHaveAttribute("hidden", "until-found");

    act(() => {
      thirdPanel?.dispatchEvent(new Event("beforematch", { bubbles: true }));
    });

    expect(screen.getByRole("tab", { name: /Progreso/i })).toHaveAttribute("aria-selected", "true");
    expect(thirdPanel).not.toHaveAttribute("hidden");

    const activeTab = screen.getByRole("tab", { name: /Progreso/i });
    activeTab.focus();
    await user.keyboard("{Home}");
    expect(firstTab).toHaveAttribute("aria-selected", "true");
  });

  it("renderiza Funciones, Precios (toggle mensual/anual y filtro) y Preguntas (búsqueda y categoría)", async () => {
    const user = userEvent.setup();

    const { unmount } = render(
      <MemoryRouter initialEntries={["/funciones"]}>
        <FeaturesPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /Todo lo que .* hace por tu negocio/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Próximas características/i }),
    ).toBeVisible();
    unmount();

    const pricing = render(
      <MemoryRouter initialEntries={["/precios"]}>
        <PricingPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/59\.000/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Pago anual/i }));
    expect(screen.getByText(/49\.000/)).toBeInTheDocument();

    const suiteFilter = screen.getByRole("button", { name: /Modo Arcade · Suite/i });
    await user.click(suiteFilter);
    expect(suiteFilter).toHaveAttribute("aria-pressed", "true");
    pricing.unmount();

    render(
      <MemoryRouter initialEntries={["/preguntas"]}>
        <FaqPage />
      </MemoryRouter>,
    );
    const searchInput = screen.getByRole("searchbox", { name: /Buscar pregunta/i });
    await user.type(searchInput, "mezcla");
    expect(
      screen.getByText(/¿El saldo de un cliente se mezcla entre diferentes negocios\?/i),
    ).toBeVisible();
    expect(screen.queryByText(/¿Qué es Fideliapp\?/i)).not.toBeInTheDocument();
  });

  it("mantiene el JSON-LD FAQPage de index.html sincronizado con las preguntas visibles", () => {
    const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const data = JSON.parse(match![1]) as {
      "@graph": Array<{
        "@type": string;
        mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }>;
      }>;
    };
    const faqPage = data["@graph"].find((node) => node["@type"] === "FAQPage");
    expect(faqPage?.mainEntity?.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(
      faqs.map((f) => [f.question, f.answer]),
    );
  });
});
