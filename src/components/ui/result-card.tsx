import { cn } from "@/lib/utils";

interface ResultCardProps {
  label: string;
  value: string;
  sublabel?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "lg";
}

const variantStyles = {
  default: "bg-card border-border",
  primary: "bg-primary/5 border-primary/20",
  success: "bg-emerald-500/5 border-emerald-500/20",
  warning: "bg-amber-500/5 border-amber-500/20",
  danger: "bg-red-500/5 border-red-500/20",
};

const valueStyles = {
  default: "text-foreground",
  primary: "text-primary",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-red-600 dark:text-red-400",
};

export function ResultCard({
  label,
  value,
  sublabel,
  variant = "default",
  size = "sm",
}: ResultCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all",
        variantStyles[variant]
      )}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-bold",
          size === "lg" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          valueStyles[variant]
        )}
      >
        {value}
      </p>
      {sublabel && (
        <p className="mt-0.5 text-xs text-muted-foreground">{sublabel}</p>
      )}
    </div>
  );
}
