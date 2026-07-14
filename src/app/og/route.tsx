import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? SITE_NAME;
  const category = searchParams.get("category") ?? "";
  const type = searchParams.get("type") ?? "page";
  const locale = searchParams.get("locale") ?? "tr";
  const isTr = locale === "tr";

  const typeLabel =
    type === "blog"
      ? isTr ? "Rehber" : "Guide"
      : type === "tool"
        ? isTr ? "Ücretsiz Araç" : "Free Tool"
        : SITE_NAME;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1e3a5f 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a4731 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 900,
              color: "white",
            }}
          >
            T
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "white",
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            marginTop: "16px",
          }}
        >
          {category && (
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  padding: "6px 16px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(59, 130, 246, 0.18)",
                  color: "#93c5fd",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                {category}
              </span>
            </div>
          )}

          <h1
            style={{
              fontSize: title.length > 60 ? "44px" : "56px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              margin: 0,
              maxWidth: "1000px",
            }}
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#94a3b8",
            fontSize: "20px",
          }}
        >
          <span>toolsflow.net</span>
          <span
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid #475569",
              fontSize: "18px",
            }}
          >
            {typeLabel}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
