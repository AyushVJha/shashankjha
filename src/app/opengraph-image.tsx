import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Advocate Shashank Shekhar Jha — Supreme Court of India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0F1724 0%, #1B2438 60%, #263152 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 44, height: 2, background: "#C9A84C" }} />
          <div
            style={{
              fontSize: 24,
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#C9A84C",
            }}
          >
            Advocate · Supreme Court of India
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#FAF9F6",
            lineHeight: 1.05,
          }}
        >
          Shashank Shekhar Jha
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            fontFamily: "sans-serif",
            color: "rgba(250,249,246,0.7)",
          }}
        >
          Constitutional Lawyer · PIL Advocate · The Chambers of SSJ
        </div>
      </div>
    ),
    { ...size }
  );
}
