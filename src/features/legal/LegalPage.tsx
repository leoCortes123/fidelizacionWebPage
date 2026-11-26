import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/features/landing/SiteLayout";
import { usePageMeta } from "@/features/landing/usePageMeta";
import { LEGAL_CONTACT, LEGAL_OWNER } from "@/config/legal.config";
import { LEGAL_NAV_LINKS } from "./content";
import { formatLegalDate } from "./formatLegalDate";
import type { LegalBlock, LegalDocument, LegalInline } from "./types";

function renderInlines(parts: LegalInline[]) {
  return parts.map((part, idx) => {
    if (typeof part === "string") {
      return <span key={idx}>{part}</span>;
    }
    if ("strong" in part) {
      return <strong key={idx}>{part.strong}</strong>;
    }
    if ("code" in part) {
      return <code key={idx}>{part.code}</code>;
    }
    const { label, to, external } = part.link;
    if (external) {
      const isWebUrl = /^https?:\/\//i.test(to);
      return (
        <a
          key={idx}
          href={to}
          className="legal-inline-link"
          {...(isWebUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      );
    }
    return (
      <Link key={idx} to={to} className="legal-inline-link">
        {label}
      </Link>
    );
  });
}

function renderBlock(block: LegalBlock, idx: number) {
  switch (block.type) {
    case "paragraph":
      return <p key={idx}>{renderInlines(block.content)}</p>;
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          key={idx}
          className={`legal-list ${block.ordered ? "legal-list-ordered" : "legal-list-unordered"}`}
        >
          {block.items.map((item, itemIdx) => (
            <li key={itemIdx}>{renderInlines(item)}</li>
          ))}
        </ListTag>
      );
    }
    case "callout":
      return (
        <div key={idx} className={`legal-callout legal-callout-${block.tone}`}>
          <p className="legal-callout-title">{block.title}</p>
          <p>{renderInlines(block.content)}</p>
        </div>
      );
    case "keyValue":
      return (
        <dl key={idx} className="legal-kv">
          {block.items.map((entry) => (
            <div key={entry.label} className="legal-kv-item">
              <dt>{entry.label}</dt>
              <dd>{renderInlines(entry.value)}</dd>
            </div>
          ))}
        </dl>
      );
    case "table": {
      const captionId = `caption-${block.id}`;
      return (
        <div key={idx} className="legal-table-container">
          <div tabIndex={0} role="region" aria-labelledby={captionId} className="legal-table-wrap">
            <table className="legal-table">
              <caption id={captionId}>{block.caption}</caption>
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.rowHeader}>
                    <th scope="row">{row.rowHeader}</th>
                    {row.cells.map((cell, cellIdx) => {
                      const colHeader = block.headers[cellIdx + 1] ?? "";
                      const cellStyle = {
                        "--col-label": JSON.stringify(colHeader),
                      } as CSSProperties;
                      return (
                        <td key={cellIdx} style={cellStyle}>
                          {renderInlines(cell)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    case "actions":
      return (
        <div key={idx} className="legal-actions no-print">
          {block.items.map((action) =>
            action.external ? (
              <a
                key={action.label}
                href={action.to}
                className={`btn btn-${action.variant} btn-sm`}
                target={/^https?:\/\//i.test(action.to) ? "_blank" : undefined}
                rel={/^https?:\/\//i.test(action.to) ? "noopener noreferrer" : undefined}
              >
                {action.label}
              </a>
            ) : (
              <Link
                key={action.label}
                to={action.to}
                className={`btn btn-${action.variant} btn-sm`}
              >
                {action.label}
              </Link>
            ),
          )}
        </div>
      );
  }
}

export function LegalPage({ doc }: { doc: LegalDocument }) {
  const tocNavRef = useRef<HTMLElement | null>(null);
  const articleRef = useRef<HTMLDivElement | null>(null);

  usePageMeta({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: doc.path,
    breadcrumbLabel: doc.breadcrumbLabel,
  });

  // Scrollspy accesible: usa CSS `scroll-target-group` + `:target-current` sincronizado con
  // `aria-current` cuando está soportado, y cae a IntersectionObserver en navegadores sin soporte.
  useEffect(() => {
    const nav = tocNavRef.current;
    const article = articleRef.current;
    if (!nav || !article) return;

    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const sections = Array.from(article.querySelectorAll<HTMLElement>("section[id]"));
    if (links.length === 0 || sections.length === 0) return;

    const supportsScrollTargetGroup =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("scroll-target-group: auto");

    if (supportsScrollTargetGroup) {
      let rafId = 0;
      const syncAriaCurrent = () => {
        const hashId = window.location.hash.replace(/^#/, "");
        const current =
          nav.querySelector<HTMLAnchorElement>("a:target-current") ??
          (hashId
            ? (links.find((link) => link.getAttribute("href") === `#${hashId}`) ?? null)
            : null);
        links.forEach((link) => {
          link.setAttribute("aria-current", link === current ? "true" : "false");
        });
      };
      const scheduleSync = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(syncAriaCurrent);
      };
      syncAriaCurrent();
      document.addEventListener("scrollend", syncAriaCurrent);
      window.addEventListener("hashchange", scheduleSync);
      nav.addEventListener("click", scheduleSync);
      return () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener("scrollend", syncAriaCurrent);
        window.removeEventListener("hashchange", scheduleSync);
        nav.removeEventListener("click", scheduleSync);
      };
    }

    const markActive = (activeId: string) => {
      links.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("target-current", isActive);
        link.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    const initialHash = window.location.hash.replace(/^#/, "");
    const initialSection = sections.find((section) => section.id === initialHash) ?? sections[0];
    markActive(initialSection.id);

    const onHashChange = () => {
      const targetId = window.location.hash.replace(/^#/, "");
      if (sections.some((section) => section.id === targetId)) {
        markActive(targetId);
      }
    };

    const onScrollBottom = () => {
      const docEl = document.documentElement;
      if (window.innerHeight + window.scrollY >= docEl.scrollHeight - 24) {
        markActive(sections[sections.length - 1].id);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", onScrollBottom, { passive: true });

    if (typeof IntersectionObserver === "undefined") {
      return () => {
        window.removeEventListener("hashchange", onHashChange);
        window.removeEventListener("scroll", onScrollBottom);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          markActive(visible.target.id);
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScrollBottom);
    };
  }, [doc.id]);

  return (
    <SiteLayout>
      <div className="wrap legal-page print-area">
        <header className="legal-header-card">
          <nav className="legal-breadcrumb no-print" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{doc.breadcrumbLabel}</span>
          </nav>

          <div className="legal-header-top">
            <p className="eyebrow">{doc.eyebrow}</p>
            <span className="legal-audience-badge">{doc.audience}</span>
          </div>

          <h1 className="legal-title">{doc.title}</h1>
          <p className="legal-summary">{doc.summary}</p>

          <div className="legal-meta-bar">
            <ul className="legal-meta-list" aria-label="Metadatos del documento">
              <li>
                <strong>Versión:</strong> {doc.version}
              </li>
              <li>
                <strong>Vigente desde:</strong> {formatLegalDate(doc.effectiveDate)}
              </li>
              <li>
                <strong>Responsable:</strong> {LEGAL_OWNER.fullName} ({LEGAL_OWNER.brandName})
              </li>
            </ul>

            <div className="legal-header-actions no-print">
              <button
                type="button"
                className="btn btn-light btn-xs"
                onClick={() => window.print?.()}
              >
                Imprimir / PDF
              </button>
            </div>
          </div>
        </header>

        <details className="legal-toc-mobile no-print">
          <summary>Índice del documento ({doc.sections.length} secciones)</summary>
          <nav className="legal-toc-mobile-list" aria-label="Índice del documento en móvil">
            {doc.sections.map((section, idx) => (
              <a key={section.id} href={`#${section.id}`} className="legal-toc-link">
                <span className="legal-toc-num">{String(idx + 1).padStart(2, "0")}</span>
                <span>{section.title}</span>
              </a>
            ))}
          </nav>
        </details>

        <div className="legal-layout">
          <aside className="legal-toc-aside no-print" aria-label="Tabla de contenidos">
            <div className="legal-toc-box">
              <h2 className="legal-toc-title">Índice</h2>
              <nav ref={tocNavRef} className="legal-toc-nav" aria-label="Índice del documento">
                {doc.sections.map((section, idx) => (
                  <a key={section.id} href={`#${section.id}`} className="legal-toc-link">
                    <span className="legal-toc-num">{String(idx + 1).padStart(2, "0")}</span>
                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div ref={articleRef} className="legal-article">
            {doc.sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                tabIndex={-1}
                className="legal-section"
                aria-labelledby={`heading-${section.id}`}
              >
                <h2 id={`heading-${section.id}`} className="legal-section-heading">
                  <span className="legal-section-num" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{section.title}</span>
                </h2>
                <div className="legal-prose">
                  {section.blocks.map((block, blockIdx) => renderBlock(block, blockIdx))}
                </div>
              </section>
            ))}

            <nav className="legal-cross-nav no-print" aria-label="Otros documentos legales">
              <h2>Centro legal y de privacidad · {LEGAL_OWNER.brandName}</h2>
              <div className="legal-cross-links">
                {LEGAL_NAV_LINKS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="legal-cross-link"
                    aria-current={item.path === doc.path ? "page" : undefined}
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
        </div>
      </div>
    </SiteLayout>
  );
}
