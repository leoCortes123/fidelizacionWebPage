import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LEGAL_PATHS } from "@/config/legal.config";
import { HomePage } from "@/features/landing/pages/HomePage";

const HowItWorksPage = lazy(() =>
  import("@/features/landing/pages/HowItWorksPage").then((m) => ({ default: m.HowItWorksPage })),
);
const FeaturesPage = lazy(() =>
  import("@/features/landing/pages/FeaturesPage").then((m) => ({ default: m.FeaturesPage })),
);
const PricingPage = lazy(() =>
  import("@/features/landing/pages/PricingPage").then((m) => ({ default: m.PricingPage })),
);
const FaqPage = lazy(() =>
  import("@/features/landing/pages/FaqPage").then((m) => ({ default: m.FaqPage })),
);
const PrivacyPolicyPage = lazy(() =>
  import("@/features/legal/pages/LegalDocumentPage").then((m) => ({
    default: m.PrivacyPolicyPage,
  })),
);
const TermsCustomerPage = lazy(() =>
  import("@/features/legal/pages/LegalDocumentPage").then((m) => ({
    default: m.TermsCustomerPage,
  })),
);
const TermsBusinessPage = lazy(() =>
  import("@/features/legal/pages/LegalDocumentPage").then((m) => ({
    default: m.TermsBusinessPage,
  })),
);
const DpaPage = lazy(() =>
  import("@/features/legal/pages/LegalDocumentPage").then((m) => ({ default: m.DpaPage })),
);
const CookiesPolicyPage = lazy(() =>
  import("@/features/legal/pages/LegalDocumentPage").then((m) => ({
    default: m.CookiesPolicyPage,
  })),
);
const AccountDeletionPage = lazy(() =>
  import("@/features/legal/pages/LegalDocumentPage").then((m) => ({
    default: m.AccountDeletionPage,
  })),
);
const ContactPage = lazy(() =>
  import("@/features/legal/pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-dvh" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/como-funciona" element={<HowItWorksPage />} />
            <Route path="/funciones" element={<FeaturesPage />} />
            <Route path="/precios" element={<PricingPage />} />
            <Route path="/preguntas" element={<FaqPage />} />
            <Route path={LEGAL_PATHS.privacyPolicy} element={<PrivacyPolicyPage />} />
            <Route path={LEGAL_PATHS.termsCustomer} element={<TermsCustomerPage />} />
            <Route path={LEGAL_PATHS.termsBusiness} element={<TermsBusinessPage />} />
            <Route path={LEGAL_PATHS.dpa} element={<DpaPage />} />
            <Route path={LEGAL_PATHS.cookies} element={<CookiesPolicyPage />} />
            <Route path={LEGAL_PATHS.accountDeletion} element={<AccountDeletionPage />} />
            <Route path={LEGAL_PATHS.contact} element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
