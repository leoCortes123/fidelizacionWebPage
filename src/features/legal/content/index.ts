import { LEGAL_PATHS } from "@/config/legal.config";
import type { LegalDocument } from "../types";
import { accountDeletionDoc } from "./accountDeletion";
import { cookiesPolicyDoc } from "./cookiesPolicy";
import { dpaDoc } from "./dpa";
import { privacyPolicyDoc } from "./privacyPolicy";
import { termsBusinessDoc } from "./termsBusiness";
import { termsCustomerDoc } from "./termsCustomer";

export type LegalDocKey =
  "privacyPolicy" | "termsCustomer" | "termsBusiness" | "dpa" | "cookies" | "accountDeletion";

export const LEGAL_DOCUMENTS: Record<LegalDocKey, LegalDocument> = {
  privacyPolicy: privacyPolicyDoc,
  termsCustomer: termsCustomerDoc,
  termsBusiness: termsBusinessDoc,
  dpa: dpaDoc,
  cookies: cookiesPolicyDoc,
  accountDeletion: accountDeletionDoc,
};

export const LEGAL_NAV_LINKS = [
  { path: LEGAL_PATHS.privacyPolicy, label: "Política de privacidad" },
  { path: LEGAL_PATHS.termsCustomer, label: "Términos para clientes" },
  { path: LEGAL_PATHS.termsBusiness, label: "Términos para negocios" },
  { path: LEGAL_PATHS.dpa, label: "Acuerdo de datos (DPA)" },
  { path: LEGAL_PATHS.cookies, label: "Política de cookies" },
  { path: LEGAL_PATHS.accountDeletion, label: "Eliminar mi cuenta" },
  { path: LEGAL_PATHS.contact, label: "Contacto y PQR" },
] as const;
