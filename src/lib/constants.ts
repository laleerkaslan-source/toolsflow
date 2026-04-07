export const SITE_NAME = "ToolsFlow";
export const SITE_URL = "https://toolsflow.net";
export const ADSENSE_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX"; // Replace with real ID

export type ToolCategory =
  | "finance"
  | "health"
  | "converter"
  | "generator";

export interface ToolDefinition {
  id: string;
  icon: string;
  category: ToolCategory;
  isNew?: boolean;
  priority: number;
}

export const CATEGORY_STYLES: Record<
  ToolCategory,
  { gradient: string; text: string; label: { tr: string; en: string } }
> = {
  finance: {
    gradient: "from-emerald-500/10 to-teal-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    label: { tr: "Finans", en: "Finance" },
  },
  health: {
    gradient: "from-rose-500/10 to-pink-500/10",
    text: "text-rose-600 dark:text-rose-400",
    label: { tr: "Sağlık", en: "Health" },
  },
  converter: {
    gradient: "from-amber-500/10 to-orange-500/10",
    text: "text-amber-600 dark:text-amber-400",
    label: { tr: "Çevirici", en: "Converter" },
  },
  generator: {
    gradient: "from-violet-500/10 to-purple-500/10",
    text: "text-violet-600 dark:text-violet-400",
    label: { tr: "Oluşturucu", en: "Generator" },
  },
};

export const TOOLS: ToolDefinition[] = [
  // Finance — High CPC
  { id: "salary-calculator", icon: "Banknote", category: "finance", isNew: true, priority: 1 },
  { id: "loan-calculator", icon: "CreditCard", category: "finance", isNew: true, priority: 2 },
  { id: "vat-calculator", icon: "Receipt", category: "finance", isNew: true, priority: 3 },
  { id: "severance-calculator", icon: "Scale", category: "finance", isNew: true, priority: 4 },
  { id: "investment-calculator", icon: "TrendingUp", category: "finance", isNew: true, priority: 5 },
  { id: "currency-converter", icon: "ArrowLeftRight", category: "finance", priority: 6 },

  // Health
  { id: "bmi-calculator", icon: "Heart", category: "health", priority: 10 },

  // Converters
  { id: "image-compressor", icon: "ImageDown", category: "converter", priority: 20 },

  // Generators
  { id: "qr-code-generator", icon: "QrCode", category: "generator", priority: 30 },
];
