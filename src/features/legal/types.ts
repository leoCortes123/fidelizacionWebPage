export type LegalInline =
  | string
  | { strong: string }
  | { code: string }
  | { link: { label: string; to: string; external?: boolean } };

export type LegalBlock =
  | {
      type: "paragraph";
      content: LegalInline[];
    }
  | {
      type: "list";
      ordered?: boolean;
      items: LegalInline[][];
    }
  | {
      type: "callout";
      tone: "info" | "warning" | "legal";
      title: string;
      content: LegalInline[];
    }
  | {
      type: "keyValue";
      items: Array<{ label: string; value: LegalInline[] }>;
    }
  | {
      type: "table";
      id: string;
      caption: string;
      headers: string[];
      rows: Array<{
        rowHeader: string;
        cells: LegalInline[][];
      }>;
    }
  | {
      type: "actions";
      items: Array<{
        label: string;
        to: string;
        external?: boolean;
        variant: "primary" | "start" | "light";
      }>;
    };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  id: string;
  path: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  audience: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  version: string;
  effectiveDate: string;
  sections: LegalSection[];
}
