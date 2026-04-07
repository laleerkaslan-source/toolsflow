import { Link } from "@/i18n/navigation";
import { QrCode, Heart, ImageDown, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  QrCode,
  Heart,
  ImageDown,
  ArrowLeftRight,
} as const;

const colorMap = {
  "qr-code-generator": "from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400",
  "bmi-calculator": "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400",
  "image-compressor": "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
  "currency-converter": "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400",
} as const;

interface ToolCardProps {
  id: keyof typeof colorMap;
  icon: keyof typeof iconMap;
  name: string;
  description: string;
  cta: string;
}

export function ToolCard({ id, icon, name, description, cta }: ToolCardProps) {
  const IconComponent = iconMap[icon];
  const colors = colorMap[id];

  return (
    <Link
      href={`/tools/${id}` as "/tools/qr-code-generator"}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br",
          colors
        )}
      >
        <IconComponent className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      <span className="inline-flex items-center text-sm font-medium text-primary">
        {cta}
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
