import { Link } from "@/i18n/navigation";
import { ICON_REGISTRY } from "@/lib/icons";
import { CATEGORY_STYLES, type ToolCategory } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  id: string;
  icon: string;
  category: ToolCategory;
  name: string;
  description: string;
  cta: string;
  isNew?: boolean;
}

export function ToolCard({
  id,
  icon,
  category,
  name,
  description,
  cta,
  isNew,
}: ToolCardProps) {
  const IconComponent = ICON_REGISTRY[icon];
  const styles = CATEGORY_STYLES[category];

  return (
    <Link
      href={`/tools/${id}` as "/tools/qr-code-generator"}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
    >
      {/* Category badge + New badge */}
      <div className="mb-4 flex items-center justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br",
            styles.gradient,
            styles.text
          )}
        >
          {IconComponent && <IconComponent className="h-6 w-6" />}
        </div>
        <div className="flex items-center gap-1.5">
          {isNew && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
              New
            </span>
          )}
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-gradient-to-r",
              styles.gradient,
              styles.text
            )}
          >
            {category}
          </span>
        </div>
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
