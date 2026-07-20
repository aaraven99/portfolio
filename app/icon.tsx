import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111310", color: "#c9ff35", fontSize: 24, fontWeight: 900, letterSpacing: "-2px", border: "4px solid #c9ff35" }}>AS</div>,
    size,
  );
}
