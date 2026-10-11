import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/queries";

export const alt = "Academic portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function OpenGraphImage() {
  const p = await getProfile();
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 84px",
          background: "#12284a",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 4, color: "#d4ae60" }}>ACADEMIC PORTFOLIO</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700 }}>{p.fullName}</div>
          <div style={{ fontSize: 34, marginTop: 12, color: "#d4ae60" }}>{p.title}</div>
          <div style={{ fontSize: 28, marginTop: 8, color: "#c4d0e6" }}>{p.university}</div>
        </div>
      </div>
    ),
    size,
  );
}