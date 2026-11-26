import { LEGAL_DOCUMENTS, type LegalDocKey } from "../content";
import { LegalPage } from "../LegalPage";

export function LegalDocumentPage({ docKey }: { docKey: LegalDocKey }) {
  return <LegalPage doc={LEGAL_DOCUMENTS[docKey]} />;
}

export function PrivacyPolicyPage() {
  return <LegalDocumentPage docKey="privacyPolicy" />;
}

export function TermsCustomerPage() {
  return <LegalDocumentPage docKey="termsCustomer" />;
}

export function TermsBusinessPage() {
  return <LegalDocumentPage docKey="termsBusiness" />;
}

export function DpaPage() {
  return <LegalDocumentPage docKey="dpa" />;
}

export function CookiesPolicyPage() {
  return <LegalDocumentPage docKey="cookies" />;
}

export function AccountDeletionPage() {
  return <LegalDocumentPage docKey="accountDeletion" />;
}
