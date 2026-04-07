"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Upload, Download, RotateCcw, ImageDown } from "lucide-react";

interface CompressedImage {
  original: { name: string; size: number; url: string };
  compressed: { size: number; url: string; blob: Blob };
  ratio: number;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImageCompressor() {
  const t = useTranslations("common");
  const locale = useLocale();
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">("image/webp");
  const [results, setResults] = useState<CompressedImage[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback(
    (file: File): Promise<CompressedImage> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const originalUrl = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error("Compression failed"));
              const compressedUrl = URL.createObjectURL(blob);
              resolve({
                original: { name: file.name, size: file.size, url: originalUrl },
                compressed: { size: blob.size, url: compressedUrl, blob },
                ratio: Math.round((1 - blob.size / file.size) * 100),
              });
            },
            format,
            quality
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = originalUrl;
      });
    },
    [quality, format]
  );

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const imageFiles = Array.from(files).filter((f) =>
        f.type.startsWith("image/")
      );
      const compressed = await Promise.all(imageFiles.map(compressImage));
      setResults((prev) => [...prev, ...compressed]);
    },
    [compressImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDownload = (result: CompressedImage) => {
    const ext = format === "image/webp" ? "webp" : "jpg";
    const name = result.original.name.replace(/\.[^.]+$/, `.${ext}`);
    const a = document.createElement("a");
    a.href = result.compressed.url;
    a.download = name;
    a.click();
  };

  const handleReset = () => {
    results.forEach((r) => {
      URL.revokeObjectURL(r.original.url);
      URL.revokeObjectURL(r.compressed.url);
    });
    setResults([]);
  };

  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            {locale === "tr" ? "Kalite" : "Quality"}: {Math.round(quality * 100)}%
          </label>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            {locale === "tr" ? "Format" : "Format"}
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as typeof format)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="image/webp">WebP</option>
            <option value="image/jpeg">JPEG</option>
          </select>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-accent/50"
        }`}
      >
        <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
        <p className="text-sm font-medium">
          {locale === "tr"
            ? "Resimleri sürükleyip bırakın veya tıklayın"
            : "Drag & drop images or click to browse"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          JPEG, PNG, WebP
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{t("result")}</h3>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-accent"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t("reset")}
            </button>
          </div>

          {results.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <ImageDown className="h-8 w-8 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {r.original.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(r.original.size)} → {formatSize(r.compressed.size)}
                  <span
                    className={`ml-2 font-semibold ${r.ratio > 0 ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {r.ratio > 0 ? `-${r.ratio}%` : `+${Math.abs(r.ratio)}%`}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleDownload(r)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Download className="h-3.5 w-3.5" />
                {t("download")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
