"use client";

interface AdUnitProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
}

export function AdUnit({
  format = "auto",
  className,
}: AdUnitProps) {
  // Auto Ads is enabled in AdSense dashboard.
  // Google automatically places ads on the page.
  // This component renders an empty spacer in development only.
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/50 p-4 text-xs text-muted-foreground ${className ?? ""}`}
      >
        Ad Placeholder ({format})
      </div>
    );
  }

  // In production, render nothing — Auto Ads handles placement
  return null;
}
