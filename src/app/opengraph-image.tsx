import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#030712",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(99,102,241,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(139,92,246,0.28), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: "9999px",
              background: "rgba(99,102,241,0.12)",
              border: "2px solid rgba(129,140,248,0.5)",
              color: "#a5b4fc",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            SK
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#a5b4fc", fontWeight: 600, letterSpacing: 2 }}>
            IAMSAIFKHAN.COM
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          Saif Khan
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 600,
            marginTop: 16,
            color: "#c7d2fe",
          }}
        >
          I build things I&apos;m curious about.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 32,
            color: "#94a3b8",
            maxWidth: 900,
          }}
        >
          Web tools, interactive experiences, little experiments, and sometimes entire game worlds.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
