import { expect, test } from "@playwright/test";

const LEGAL_ROUTES = [
  { path: "/privacidad", heading: /Política de Tratamiento de Datos Personales/i },
  { path: "/terminos", heading: /Términos y Condiciones de Uso — Clientes/i },
  { path: "/terminos-negocios", heading: /Términos y Condiciones del Servicio SaaS — Negocios/i },
  { path: "/dpa", heading: /Acuerdo de Transmisión y Encargado del Tratamiento de Datos/i },
  { path: "/cookies", heading: /Política de Cookies y Almacenamiento Local/i },
  { path: "/eliminar-cuenta", heading: /Eliminación de Cuenta y Datos Personales/i },
  { path: "/contacto", heading: /Contacto, PQR y Ejercicio de Habeas Data/i },
];

test("todas las rutas legales cargan directo (SPA), sin errores de página ni desbordamiento", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const route of LEGAL_ROUTES) {
    await page.goto(route.path);
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `overflow en desktop para ${route.path}`).toBeLessThanOrEqual(0);
  }

  // Modo oscuro en /privacidad mantiene contraste y sin errores.
  await page.goto("/privacidad");
  await page.getByRole("button", { name: /Cambiar a modo oscuro/i }).click();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await expect(page.locator(".legal-toc-nav")).toBeVisible();

  // Formulario PQR en /contacto prepara correo mailto hacia datos.fideliapp@outlook.com.
  await page.goto("/contacto");
  await page.getByLabel(/Nombre completo/i).fill("Carlos Gómez");
  await page.getByLabel(/Correo electrónico de respuesta/i).fill("carlos@ejemplo.com");
  await page.getByLabel(/Tipo de solicitud/i).selectOption("habeas_reclamo");
  await page
    .getByLabel(/Detalle de tu solicitud/i)
    .fill("Solicito actualizar el número de teléfono registrado en mi perfil.");
  await page.getByRole("button", { name: /Preparar correo para enviar/i }).click();
  await expect(
    page.getByRole("link", { name: /Abrir correo \(datos\.fideliapp@outlook\.com\)/i }),
  ).toBeVisible();

  // Precios: nota de no responsable de IVA y total anual.
  await page.goto("/precios");
  await expect(page.getByText(/no responsable de IVA/i)).toBeVisible();
  await page.getByRole("button", { name: /Pago anual/i }).click();
  await expect(page.getByText(/588\.000 COP \/ año/i)).toBeVisible();
  await expect(page.getByText(/1\.308\.000 COP \/ año/i)).toBeVisible();

  // Móvil 360px en páginas legales con tablas responsivas y /contacto sin desbordamiento.
  await page.setViewportSize({ width: 360, height: 780 });
  for (const path of ["/privacidad", "/cookies", "/eliminar-cuenta", "/contacto"]) {
    await page.goto(path);
    const mobileOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(mobileOverflow, `overflow en móvil 360px para ${path}`).toBeLessThanOrEqual(0);
  }

  expect(pageErrors).toEqual([]);
});
