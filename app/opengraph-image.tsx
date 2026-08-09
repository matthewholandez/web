import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Matthew Holandez — Systems Design Engineering @ UWaterloo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const neueRegular = await readFile(
    join(process.cwd(), "app/fonts/PPNeueMontreal-Regular.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#f5f6f4",
          color: "#151716",
          padding: "0 96px",
          fontFamily: "Neue Montreal",
        }}
      >
        <div style={{ fontSize: 42, fontWeight: 400, letterSpacing: "-0.02em" }}>
          Matthew Holandez
        </div>
        <div style={{ fontSize: 28, fontWeight: 400, color: "#6e7470", marginTop: 14 }}>
          Systems Design Engineering @ UWaterloo
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Neue Montreal", data: neueRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
