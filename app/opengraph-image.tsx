import { ImageResponse } from "next/og";

export const alt = "Matthew Holandez — Systems Design Engineering @ UWaterloo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#111111",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 500 }}>Matthew Holandez</div>
        <div style={{ fontSize: 32, color: "#666666", marginTop: 16 }}>
          Systems Design Engineering @ UWaterloo
        </div>
      </div>
    ),
    { ...size },
  );
}
