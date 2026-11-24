import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
