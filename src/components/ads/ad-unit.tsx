"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/constants";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
}

export function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      initialized.current ||
      !adRef.current
    ) {
      return;
    }
    try {
      ((window as unknown as Record<string, unknown[]>).adsbygoogle =
        (window as unknown as Record<string, unknown[]>).adsbygoogle || []).push(
        {}
      );
      initialized.current = true;
    } catch {
      // AdSense not loaded
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/50 p-4 text-xs text-muted-foreground ${className ?? ""}`}
      >
        Ad Placeholder ({format})
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
}
