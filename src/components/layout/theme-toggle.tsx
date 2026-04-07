"use client";

import { useTheme } from "@/lib/theme-provider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolved, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
      className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolved === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
