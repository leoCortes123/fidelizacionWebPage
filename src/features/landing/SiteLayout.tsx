import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DownloadAppLink } from "@/features/landing/DownloadAppLink";
import { EatersBackground } from "@/features/landing/EatersBackground";
import { PixelCloseIcon, PixelMenuIcon } from "@/features/landing/PixelIcons";
import { ThemeToggleButton } from "@/features/landing/ThemeToggleButton";
import { LEGAL_CONTACT, LEGAL_OWNER, LEGAL_PATHS } from "@/config/legal.config";
import { LOGIN_URL, REGISTER_BUSINESS_URL, REGISTER_CUSTOMER_URL, brandName } from "@/lib/config";
import "./LandingPage.css";
import "@/features/legal/LegalPage.css";

export function Brand({ brand, size = 26 }: { brand: string; size?: number }) {
  return (
    <Link className="brand" to="/" aria-label={`${brand}, ir al inicio`}>
      <span className="brand-mark" aria-hidden="true">
        <img src="/fideliapp-coin.png" alt="" width={size} height={size} className="brand-coin" />
      </span>
      <span className="brand-text">
        {brand.toLowerCase()}
        <span className="brand-dot">.</span>
      </span>
    </Link>
  );
}

const navItems = [
  { to: "/", label: "Inicio", end: true },
  { to: "/como-funciona", label: "Cómo funciona" },
  { to: "/funciones", label: "Funciones" },
  { to: "/precios", label: "Precios" },
  { to: "/preguntas", label: "Preguntas" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const brand = brandName || "Fideliapp";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    if (!hash && typeof window !== "undefined") {
      window.scrollTo?.({ top: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div className="retro-landing">
      <EatersBackground />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="retro-header">
        <div className="wrap nav">
          <Brand brand={brand} size={34} />

          <nav className="navlinks" aria-label="Navegación principal">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? "navlink-active" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <ThemeToggleButton />
            <DownloadAppLink className="btn btn-download btn-xs nav-download" />
            <a className="btn btn-light btn-xs" href={LOGIN_URL}>
              Ingresar
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              className="btn btn-light btn-xs nav-menu-btn"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <PixelCloseIcon size={16} /> : <PixelMenuIcon size={16} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-nav-drawer" className="mobile-nav-drawer" aria-label="Menú móvil">
            <div className="wrap mobile-nav-list">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `mobile-nav-item ${isActive ? "mobile-nav-active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mobile-nav-ctas">
                <a
                  className="btn btn-primary btn-sm"
                  href={REGISTER_BUSINESS_URL}
                  onClick={() => setMenuOpen(false)}
                >
                  Crear mi programa
                </a>
                <a
                  className="btn btn-light btn-sm"
                  href={REGISTER_CUSTOMER_URL}
                  onClick={() => setMenuOpen(false)}
                >
                  Soy cliente
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main id="contenido">{children}</main>

      <footer className="retro-footer">
        <div className="wrap footer-grid footer-grid-legal">
          <div className="footer-brand-col">
            <Brand brand={brand} size={26} />
            <p className="footer-desc">
              Software de fidelización y programa de puntos con QR para negocios locales en
              Colombia.
            </p>
            <div className="footer-owner-meta">
              <span>
                Titular: <strong>{LEGAL_OWNER.fullName}</strong> · NIT {LEGAL_OWNER.nit}
              </span>
              <span>{LEGAL_OWNER.domicile}</span>
              <span>{LEGAL_CONTACT.businessHours}</span>
            </div>
            <p className="footer-cookie-note">
              Solo usamos almacenamiento local necesario y funcional (sin cookies publicitarias).{" "}
              <Link to={LEGAL_PATHS.cookies}>Ver política de cookies</Link>.
            </p>
          </div>

          <nav className="footer-col" aria-label="Páginas del sitio">
            <h2 className="footer-heading">Explorar</h2>
            <Link to="/">Inicio</Link>
            <Link to="/como-funciona">Cómo funciona</Link>
            <Link to="/funciones">Funciones y roadmap</Link>
            <Link to="/precios">Planes y precios</Link>
            <Link to="/preguntas">Preguntas frecuentes</Link>
          </nav>

          <nav className="footer-col" aria-label="Accesos a la aplicación">
            <h2 className="footer-heading">Plataforma</h2>
            <a href={REGISTER_BUSINESS_URL}>Registrar negocio</a>
            <a href={LOGIN_URL}>Iniciar sesión</a>
            <a href={REGISTER_CUSTOMER_URL}>Crear cuenta de cliente</a>
            <Link to={LEGAL_PATHS.contact}>Contacto y PQR</Link>
          </nav>

          <nav className="footer-col" aria-label="Documentos legales y privacidad">
            <h2 className="footer-heading">Legal</h2>
            <Link to={LEGAL_PATHS.privacyPolicy}>Política de privacidad</Link>
            <Link to={LEGAL_PATHS.termsCustomer}>Términos para clientes</Link>
            <Link to={LEGAL_PATHS.termsBusiness}>Términos para negocios</Link>
            <Link to={LEGAL_PATHS.dpa}>Acuerdo de datos (DPA)</Link>
            <Link to={LEGAL_PATHS.cookies}>Política de cookies</Link>
            <Link to={LEGAL_PATHS.accountDeletion}>Eliminar mi cuenta</Link>
            <a href={LEGAL_CONTACT.authority.url} target="_blank" rel="noopener noreferrer">
              {LEGAL_CONTACT.authority.name}
            </a>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          <div className="footer-bottom-inner">
            <span>
              © 2026 {brand.toUpperCase()} · {LEGAL_OWNER.fullName} · {LEGAL_OWNER.domicile}
            </span>
            <span className="footer-bottom-links">
              <a href={`mailto:${LEGAL_CONTACT.privacyEmail}`}>
                Habeas Data / PQR: {LEGAL_CONTACT.privacyEmail}
              </a>
              <a href={`mailto:${LEGAL_CONTACT.supportEmail}`}>
                Soporte: {LEGAL_CONTACT.supportEmail}
              </a>
              <a href={LEGAL_CONTACT.phoneHref}>Tel. {LEGAL_CONTACT.phone}</a>
            </span>
          </div>
        </div>
      </footer>

      <div className="mobile-cta" role="region" aria-label="Acciones rápidas">
        <DownloadAppLink />
        <a className="btn btn-primary" href={REGISTER_BUSINESS_URL}>
          Crear programa
        </a>
      </div>
    </div>
  );
}
