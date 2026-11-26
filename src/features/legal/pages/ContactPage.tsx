import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/features/landing/SiteLayout";
import { usePageMeta } from "@/features/landing/usePageMeta";
import { LEGAL_CONTACT, LEGAL_OWNER, LEGAL_PATHS } from "@/config/legal.config";
import { LEGAL_NAV_LINKS } from "../content";

type RequestTopic =
  "habeas_consulta" | "habeas_reclamo" | "eliminar_cuenta" | "soporte" | "comercial";

const TOPIC_OPTIONS: Array<{
  value: RequestTopic;
  label: string;
  targetEmail: string;
  subjectPrefix: string;
}> = [
  {
    value: "habeas_consulta",
    label: "Consulta de Habeas Data (conocer mis datos — máx. 10 días hábiles)",
    targetEmail: LEGAL_CONTACT.privacyEmail,
    subjectPrefix: "Consulta Habeas Data",
  },
  {
    value: "habeas_reclamo",
    label: "Reclamo / Rectificación / Revocación de datos (máx. 15 días hábiles)",
    targetEmail: LEGAL_CONTACT.privacyEmail,
    subjectPrefix: "Reclamo Habeas Data",
  },
  {
    value: "eliminar_cuenta",
    label: "Supresión / Eliminación de cuenta sin acceso a la app (máx. 15 días hábiles)",
    targetEmail: LEGAL_CONTACT.privacyEmail,
    subjectPrefix: "Solicitud de eliminación de cuenta",
  },
  {
    value: "soporte",
    label: "Soporte técnico / Reporte de contenido o falla",
    targetEmail: LEGAL_CONTACT.supportEmail,
    subjectPrefix: "Soporte Fideliapp",
  },
  {
    value: "comercial",
    label: "Consulta comercial para comercios",
    targetEmail: LEGAL_CONTACT.supportEmail,
    subjectPrefix: "Consulta comercial Fideliapp",
  },
];

interface MailtoDraft {
  to: string;
  subject: string;
  body: string;
  href: string;
}

type FormFieldEl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function isFormField(target: EventTarget | null): target is FormFieldEl {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement
  );
}

function linkError(el: FormFieldEl, shown: boolean) {
  const errorId = el.dataset.error;
  if (!errorId) return;
  const ids = (el.getAttribute("aria-describedby") || "")
    .split(/\s+/)
    .filter((id) => id && id !== errorId);
  if (shown) ids.push(errorId);
  if (ids.length > 0) {
    el.setAttribute("aria-describedby", ids.join(" "));
  } else {
    el.removeAttribute("aria-describedby");
  }
}

function spokenText(node: HTMLElement): string {
  const copy = node.cloneNode(true) as HTMLElement;
  copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
  copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
    n.replaceWith(`${n.getAttribute("aria-label")}: `);
  });
  return (copy.textContent || "").replace(/\s+/g, " ").trim();
}

export function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const announcerRef = useRef<HTMLDivElement | null>(null);
  const readyRef = useRef<HTMLDivElement | null>(null);

  const [topic, setTopic] = useState<RequestTopic>("habeas_consulta");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState<MailtoDraft | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "unavailable">("idle");

  const invalidateDraft = () => {
    setDraft(null);
    setCopyState("idle");
  };

  usePageMeta({
    title: `Contacto, PQR y Habeas Data · ${LEGAL_OWNER.brandName}`,
    description:
      "Canales oficiales de soporte, PQR y Habeas Data de Fideliapp en Colombia: identificación del responsable, plazos legales de 10 y 15 días hábiles, enlace a la SIC y formulario guiado.",
    path: LEGAL_PATHS.contact,
    breadcrumbLabel: "Contacto y PQR",
  });

  // Sincronización de estado visual (:user-invalid / fallback) y estado programático
  // (aria-invalid, aria-describedby dinámico y región live polite única).
  useEffect(() => {
    const form = formRef.current;
    const announcer = announcerRef.current;
    if (!form || !announcer) return;

    const supportsUserInvalid =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("selector(:user-invalid)");

    const dirtyState = new WeakMap<FormFieldEl, { hasInteracted: boolean; hasBlurred: boolean }>();
    const flagged = new WeakSet<FormFieldEl>();
    const announced = new WeakSet<FormFieldEl>();
    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: FormFieldEl | null = null;

    const announceError = (el: FormFieldEl) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const errorEl = document.getElementById(errorId);
      if (!errorEl) return;
      const labelEl = el.labels?.[0];
      const prefix = labelEl ? `${spokenText(labelEl)}: ` : "";
      clearTimeout(announceTimer);
      announcer.textContent = "";
      announcedField = el;
      announceTimer = setTimeout(() => {
        announcer.textContent = prefix + spokenText(errorEl);
      }, 500);
    };

    const applyState = (el: FormFieldEl, invalid: boolean, shouldAnnounce: boolean) => {
      if (!supportsUserInvalid) {
        el.classList.toggle("user-invalid-fallback", invalid);
        el.classList.toggle("user-valid-fallback", !invalid);
      } else if (!invalid) {
        el.classList.remove("user-invalid-fallback");
      }

      if (invalid) {
        if (shouldAnnounce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute("aria-invalid", "true");
        linkError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
        el.setAttribute("aria-invalid", "false");
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el) {
          clearTimeout(announceTimer);
          announcer.textContent = "";
        }
      }
    };

    const syncNative = (el: FormFieldEl, shouldAnnounce = false) => {
      let invalid = false;
      try {
        invalid = el.matches(":user-invalid") || el.classList.contains("user-invalid-fallback");
        if (invalid && el.validity.valid) {
          invalid = false;
        }
      } catch {
        invalid = !el.validity.valid;
      }
      applyState(el, invalid, shouldAnnounce);
    };

    // Estado inicial explícito: evita anuncios prematuros de "invalid entry" en Firefox y Safari.
    form.querySelectorAll<FormFieldEl>("input, select, textarea").forEach((el) => {
      el.setAttribute("aria-invalid", "false");
    });

    const onBlur = (event: Event) => {
      if (!isFormField(event.target)) return;
      const el = event.target;
      if (supportsUserInvalid) {
        syncNative(el, true);
        return;
      }
      const state = dirtyState.get(el) || { hasInteracted: false, hasBlurred: false };
      state.hasBlurred = true;
      dirtyState.set(el, state);
      if (state.hasInteracted) {
        applyState(el, !el.validity.valid, true);
      }
    };

    const onInput = (event: Event) => {
      if (!isFormField(event.target)) return;
      const el = event.target;
      if (supportsUserInvalid) {
        if (el.hasAttribute("aria-invalid")) syncNative(el, false);
        return;
      }
      const state = dirtyState.get(el) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      dirtyState.set(el, state);
      if (state.hasBlurred) {
        applyState(el, !el.validity.valid, false);
      }
    };

    const onChange = (event: Event) => {
      if (!isFormField(event.target)) return;
      const el = event.target;
      if (supportsUserInvalid) {
        syncNative(el, true);
        return;
      }
      const state = dirtyState.get(el) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      dirtyState.set(el, state);
      if (state.hasBlurred) {
        applyState(el, !el.validity.valid, true);
      }
    };

    const onInvalid = (event: Event) => {
      if (!isFormField(event.target)) return;
      const el = event.target;
      announced.add(el);
      dirtyState.set(el, { hasInteracted: true, hasBlurred: true });
      el.classList.add("user-invalid-fallback");
      applyState(el, true, false);
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("change", onChange, true);
    form.addEventListener("invalid", onInvalid, true);

    return () => {
      clearTimeout(announceTimer);
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onChange, true);
      form.removeEventListener("invalid", onInvalid, true);
    };
  }, []);

  const selectedTopic = TOPIC_OPTIONS.find((item) => item.value === topic) ?? TOPIC_OPTIONS[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const nameEl = form.elements.namedItem("fullName") as HTMLInputElement | null;
    const messageEl = form.elements.namedItem("message") as HTMLTextAreaElement | null;
    if (nameEl) {
      nameEl.setCustomValidity(
        nameEl.value.trim().length < 3 ? "Ingresa tu nombre completo (al menos 3 caracteres)." : "",
      );
    }
    if (messageEl) {
      messageEl.setCustomValidity(
        messageEl.value.trim().length < 15
          ? "Escribe al menos 15 caracteres explicando tu solicitud."
          : "",
      );
    }

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<FormFieldEl>(":invalid");
      firstInvalid?.focus();
      return;
    }

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const subject = `${selectedTopic.subjectPrefix} — ${trimmedName}`;
    const bodyLines = [
      `Tipo de solicitud: ${selectedTopic.label}`,
      `Nombre completo: ${trimmedName}`,
      `Correo de contacto / cuenta: ${trimmedEmail}`,
      "",
      "Detalle de la solicitud:",
      trimmedMessage,
    ];
    const body = bodyLines.join("\r\n");
    const href = `mailto:${selectedTopic.targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setDraft({
      to: selectedTopic.targetEmail,
      subject,
      body,
      href,
    });
    setCopyState("idle");

    requestAnimationFrame(() => {
      readyRef.current?.focus();
    });
  };

  const handleCopyDraft = async () => {
    if (!draft) return;
    if (!navigator.clipboard?.writeText) {
      setCopyState("unavailable");
      return;
    }
    const fullText = `Para: ${draft.to}\nAsunto: ${draft.subject}\n\n${draft.body.replace(/\r\n/g, "\n")}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopyState("copied");
    } catch {
      setCopyState("unavailable");
    }
  };

  return (
    <SiteLayout>
      <div className="wrap legal-page">
        <header className="legal-header-card">
          <nav className="legal-breadcrumb" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contacto y PQR</span>
          </nav>

          <div className="legal-header-top">
            <p className="eyebrow">Canal Oficial · PQR y Habeas Data</p>
            <span className="legal-audience-badge">Atención en Colombia</span>
          </div>

          <h1 className="legal-title">Contacto, PQR y Ejercicio de Habeas Data</h1>
          <p className="legal-summary">
            Comunícate directamente con el responsable de {LEGAL_OWNER.brandName} para soporte
            técnico, peticiones, quejas, reclamos o el ejercicio de tus derechos de protección de
            datos personales (Ley 1581 de 2012 y Ley 1480 de 2011).
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-stack">
            <section className="contact-card" aria-labelledby="owner-info-title">
              <h2 id="owner-info-title">Identificación del Responsable</h2>
              <dl className="legal-kv">
                <div className="legal-kv-item">
                  <dt>Titular</dt>
                  <dd>
                    <strong>{LEGAL_OWNER.fullName}</strong>
                  </dd>
                </div>
                <div className="legal-kv-item">
                  <dt>Tipo y NIT</dt>
                  <dd>
                    {LEGAL_OWNER.personTypeLabel} · NIT {LEGAL_OWNER.nit}
                  </dd>
                </div>
                <div className="legal-kv-item">
                  <dt>Documento</dt>
                  <dd>
                    {LEGAL_OWNER.documentType} {LEGAL_OWNER.documentNumber}
                  </dd>
                </div>
                <div className="legal-kv-item">
                  <dt>Domicilio</dt>
                  <dd>{LEGAL_OWNER.domicile}</dd>
                </div>
                <div className="legal-kv-item">
                  <dt>Dirección de notificación</dt>
                  <dd>{LEGAL_OWNER.notificationAddress}</dd>
                </div>
                <div className="legal-kv-item">
                  <dt>Horario de atención</dt>
                  <dd>{LEGAL_CONTACT.businessHours}</dd>
                </div>
              </dl>
            </section>

            <section className="contact-card" aria-labelledby="channels-title">
              <h2 id="channels-title">Canales Directos y Plazos Legales</h2>
              <dl className="legal-kv">
                <div className="legal-kv-item">
                  <dt>Habeas Data y PQR</dt>
                  <dd>
                    <a className="legal-inline-link" href={`mailto:${LEGAL_CONTACT.privacyEmail}`}>
                      {LEGAL_CONTACT.privacyEmail}
                    </a>
                  </dd>
                </div>
                <div className="legal-kv-item">
                  <dt>Soporte y comercios</dt>
                  <dd>
                    <a className="legal-inline-link" href={`mailto:${LEGAL_CONTACT.supportEmail}`}>
                      {LEGAL_CONTACT.supportEmail}
                    </a>
                  </dd>
                </div>
                <div className="legal-kv-item">
                  <dt>Teléfono</dt>
                  <dd>
                    <a className="legal-inline-link" href={LEGAL_CONTACT.phoneHref}>
                      {LEGAL_CONTACT.phone}
                    </a>
                  </dd>
                </div>
                <div className="legal-kv-item">
                  <dt>Autoridad de control</dt>
                  <dd>
                    <a
                      className="legal-inline-link"
                      href={LEGAL_CONTACT.authority.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {LEGAL_CONTACT.authority.name}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="contact-sla-grid">
                <div className="contact-sla-box">
                  <span className="contact-sla-num">
                    {LEGAL_CONTACT.responseTimeBusinessDays.inquiries} días hábiles
                  </span>
                  <strong>Consultas (Art. 14 Ley 1581)</strong>
                  <p>
                    Prorrogables hasta 5 días hábiles adicionales informando los motivos de la
                    demora.
                  </p>
                </div>
                <div className="contact-sla-box">
                  <span className="contact-sla-num">
                    {LEGAL_CONTACT.responseTimeBusinessDays.claims} días hábiles
                  </span>
                  <strong>Reclamos y supresión (Art. 15 Ley 1581)</strong>
                  <p>
                    Aplica a rectificación, revocación y eliminación de cuenta (prorrogable hasta 8
                    días hábiles con aviso).
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="contact-card" aria-labelledby="pqr-form-title">
            <h2 id="pqr-form-title">Redactar solicitud por correo</h2>
            <p className="contact-form-intro">
              Este sitio es estático y no almacena tus mensajes en un servidor propio. Al completar
              este formulario preparamos un correo dirigido automáticamente a{" "}
              <strong>{selectedTopic.targetEmail}</strong> para que lo envíes desde tu aplicación de
              correo o lo copies en un clic.
            </p>

            <div ref={announcerRef} aria-live="polite" className="sr-only" />

            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="legal-field">
                <label htmlFor="pqr-topic">Tipo de solicitud</label>
                <span id="pqr-topic-hint" className="legal-field-hint">
                  Define el buzón destino ({selectedTopic.targetEmail}) y el asunto sugerido.
                </span>
                <select
                  id="pqr-topic"
                  name="topic"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value as RequestTopic);
                    invalidateDraft();
                  }}
                  aria-describedby="pqr-topic-hint"
                  aria-invalid="false"
                >
                  {TOPIC_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="legal-field">
                <label htmlFor="pqr-name">Nombre completo</label>
                <span id="pqr-name-hint" className="legal-field-hint">
                  Escribe tu nombre y apellido (entre 3 y 120 caracteres).
                </span>
                <input
                  id="pqr-name"
                  name="fullName"
                  type="text"
                  required
                  minLength={3}
                  maxLength={120}
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => {
                    const val = e.target.value;
                    e.currentTarget.setCustomValidity(
                      val.trim().length < 3
                        ? "Ingresa tu nombre completo (al menos 3 caracteres)."
                        : "",
                    );
                    setFullName(val);
                    invalidateDraft();
                  }}
                  aria-describedby="pqr-name-hint"
                  aria-invalid="false"
                  data-error="pqr-name-error"
                />
                <div id="pqr-name-error" className="legal-field-error">
                  <span role="img" aria-label="Error">
                    [!]
                  </span>{" "}
                  Ingresa tu nombre completo (al menos 3 caracteres).
                </div>
              </div>

              <div className="legal-field">
                <label htmlFor="pqr-email">Correo electrónico de respuesta</label>
                <span id="pqr-email-hint" className="legal-field-hint">
                  Formato: nombre@correo.com (si es sobre tu cuenta, usa el correo registrado).
                </span>
                <input
                  id="pqr-email"
                  name="email"
                  type="email"
                  required
                  maxLength={160}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    invalidateDraft();
                  }}
                  aria-describedby="pqr-email-hint"
                  aria-invalid="false"
                  data-error="pqr-email-error"
                />
                <div id="pqr-email-error" className="legal-field-error">
                  <span role="img" aria-label="Error">
                    [!]
                  </span>{" "}
                  Ingresa un correo electrónico válido con formato nombre@correo.com.
                </div>
              </div>

              <div className="legal-field">
                <label htmlFor="pqr-message">Detalle de tu solicitud</label>
                <span id="pqr-message-hint" className="legal-field-hint">
                  Describe claramente tu consulta, reclamo o solicitud de eliminación (entre 15 y
                  1.500 caracteres).
                </span>
                <textarea
                  id="pqr-message"
                  name="message"
                  required
                  minLength={15}
                  maxLength={1500}
                  value={message}
                  onChange={(e) => {
                    const val = e.target.value;
                    e.currentTarget.setCustomValidity(
                      val.trim().length < 15
                        ? "Escribe al menos 15 caracteres explicando tu solicitud."
                        : "",
                    );
                    setMessage(val);
                    invalidateDraft();
                  }}
                  aria-describedby="pqr-message-hint"
                  aria-invalid="false"
                  data-error="pqr-message-error"
                />
                <div id="pqr-message-error" className="legal-field-error">
                  <span role="img" aria-label="Error">
                    [!]
                  </span>{" "}
                  Escribe al menos 15 caracteres explicando tu solicitud.
                </div>
              </div>

              <div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Preparar correo para enviar
                </button>
              </div>
            </form>

            {draft && (
              <div
                ref={readyRef}
                tabIndex={-1}
                role="status"
                className="contact-mailto-ready"
                aria-live="polite"
              >
                <p>
                  <strong>Correo listo para {draft.to}:</strong> haz clic en «Abrir correo» para
                  cargarlo en tu cliente predeterminado o copia el borrador si usas correo web.
                </p>
                <div className="contact-mailto-actions">
                  <a href={draft.href} className="btn btn-start btn-sm">
                    Abrir correo ({draft.to})
                  </a>
                  <button type="button" className="btn btn-light btn-sm" onClick={handleCopyDraft}>
                    {copyState === "copied"
                      ? "Borrador copiado"
                      : copyState === "unavailable"
                        ? "No disponible en este navegador"
                        : "Copiar borrador"}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        <nav className="legal-cross-nav" aria-label="Otros documentos legales">
          <h2>Centro legal y de privacidad · {LEGAL_OWNER.brandName}</h2>
          <div className="legal-cross-links">
            {LEGAL_NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="legal-cross-link"
                aria-current={item.path === LEGAL_PATHS.contact ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={LEGAL_CONTACT.authority.url}
              target="_blank"
              rel="noopener noreferrer"
              className="legal-cross-link"
            >
              {LEGAL_CONTACT.authority.shortName} (Autoridad de control)
            </a>
          </div>
        </nav>
      </div>
    </SiteLayout>
  );
}
