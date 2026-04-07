"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import QRCode from "qrcode";
import { Download, Copy, Check, RotateCcw } from "lucide-react";

export function QrGenerator() {
  const t = useTranslations("common");
  const [text, setText] = useState("");
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(async () => {
    if (!text.trim()) return;
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      await QRCode.toCanvas(canvas, text, {
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: "M",
      });
      const url = canvas.toDataURL("image/png");
      setDataUrl(url);
    } catch {
      // invalid input
    }
  }, [text, size, fgColor, bgColor]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    try {
      const blob = await new Promise<Blob>((res) =>
        canvasRef.current!.toBlob((b) => res(b!), "image/png")
      );
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  const handleReset = () => {
    setText("");
    setSize(300);
    setFgColor("#000000");
    setBgColor("#ffffff");
    setDataUrl(null);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          URL / Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          rows={3}
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Size: {size}px
          </label>
          <input
            type="range"
            min={128}
            max={512}
            step={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Foreground
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-9 w-12 cursor-pointer rounded border border-input"
            />
            <span className="text-sm text-muted-foreground">{fgColor}</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-9 w-12 cursor-pointer rounded border border-input"
            />
            <span className="text-sm text-muted-foreground">{bgColor}</span>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generate}
        disabled={!text.trim()}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
      >
        {t("generate")}
      </button>

      {/* Result */}
      <div className="flex flex-col items-center gap-4">
        <canvas
          ref={canvasRef}
          className={dataUrl ? "rounded-lg border border-border shadow-sm" : "hidden"}
        />

        {dataUrl && (
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Download className="h-4 w-4" />
              {t("download")}
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? t("copied") : t("copy")}
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <RotateCcw className="h-4 w-4" />
              {t("reset")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
