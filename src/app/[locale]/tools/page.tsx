"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ToolCard } from "@/components/tools/tool-card";
import { AdUnit } from "@/components/ads/ad-unit";
import { TOOLS, CATEGORY_STYLES, type ToolCategory } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CATEGORIES: (ToolCategory | "all")[] = ["all", "finance", "health", "converter", "generator"];

export default function ToolsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [filter, setFilter] = useState<ToolCategory | "all">("all");

  const filteredTools =
    filter === "all"
      ? [...TOOLS].sort((a, b) => a.priority - b.priority)
      : TOOLS.filter((t) => t.category === filter).sort((a, b) => a.priority - b.priority);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">{t("tools.title")}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {t("tools.description")}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const label =
            cat === "all"
              ? locale === "tr"
                ? "Tümü"
                : "All"
              : CATEGORY_STYLES[cat].label[locale as "tr" | "en"];
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {label}
              <span className="ml-1.5 text-xs opacity-60">
                {cat === "all"
                  ? TOOLS.length
                  : TOOLS.filter((t) => t.category === cat).length}
              </span>
            </button>
          );
        })}
      </div>

      <AdUnit slot="tools-top" format="horizontal" className="mb-8" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            id={tool.id}
            icon={tool.icon}
            category={tool.category}
            name={t(`tools.${tool.id}.name`)}
            description={t(`tools.${tool.id}.description`)}
            cta={t("tools.useNow")}
            isNew={tool.isNew}
          />
        ))}
      </div>

      <AdUnit slot="tools-bottom" format="horizontal" className="mt-8" />
    </div>
  );
}
