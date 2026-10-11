import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "74px 84px",
        background: "#f5f4ef",
        color: "#20231f",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 22,
          color: "#777a72",
        }}
      >
        <span
          style={{
            display: "flex",
            width: 45,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            background: "#20231f",
            color: "#f5f4ef",
            fontSize: 21,
            fontFamily: "serif",
          }}
        >
          yn.
        </span>
        DEVELOPER · PORTFOLIO
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 74, fontWeight: 600, letterSpacing: -4 }}>
          {profile.name}
        </span>
        <span
          style={{
            marginTop: 16,
            maxWidth: 900,
            color: "#777a72",
            fontSize: 32,
            lineHeight: 1.3,
          }}
        >
          {profile.headline}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#ca6246",
          fontSize: 20,
        }}
      >
        <span>{profile.role}</span>
        <span>{profile.siteUrl.replace(/^https?:\/\//, "")}</span>
      </div>
    </div>,
    size,
  );
}
