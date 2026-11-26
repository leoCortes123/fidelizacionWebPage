const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

/**
 * Formatea una fecha ISO corta (`YYYY-MM-DD`) en español colombiano sin depender
 * de desfases de zona horaria del navegador, validando días reales del calendario.
 */
export function formatLegalDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) return isoDate;
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const month = MONTHS_ES[monthIndex];
  if (!month) return isoDate;
  const utc = new Date(Date.UTC(year, monthIndex, day));
  if (
    utc.getUTCFullYear() !== year ||
    utc.getUTCMonth() !== monthIndex ||
    utc.getUTCDate() !== day
  ) {
    return isoDate;
  }
  return `${day} de ${month} de ${year}`;
}
