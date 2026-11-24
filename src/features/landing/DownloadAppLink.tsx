import { PixelDownloadIcon } from "@/features/landing/PixelIcons";
import { INSTALL_APP_URL } from "@/lib/config";

/**
 * El navegador solo permite instalar una PWA desde su propio dominio, así que
 * este sitio abre la app (Vercel) con `?install=1` para mostrar allí el aviso.
 */
export function DownloadAppLink({
  className = "btn btn-download",
  label = "Descargar app",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a className={className} href={INSTALL_APP_URL}>
      <PixelDownloadIcon size={16} className="shrink-0" />
      <span>{label}</span>
    </a>
  );
}
