/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "D:CRT - 기사의 본질을 꿰뚫다, 데카르트";
export const contentType = "image/png";

export default async function OG() {
  // Font
  const interSemiBold = await fetch(
    new URL("./fonts/Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage:
            "linear-gradient(90deg, rgba(50,205,50,1) 0%, rgba(255,255,0,1) 34%, rgba(255,192,203,1) 66%, rgba(128,0,128,1) 100%)",
        }}
      >
        <img
          src={new URL(
            "../public/apple-touch-icon.png",
            import.meta.url
          ).toString()}
          alt="THE REVIEW"
          tw="w-20 h-20 mb-4 opacity-95"
        />
        <h1
          style={{
            fontSize: "100px",
            background:
              "linear-gradient(to bottom right, #1E2B3A 21.66%, #78716c 86.47%)",
            backgroundClip: "text",
            color: "white",
            lineHeight: "5rem",
            letterSpacing: "-0.02em",
          }}
        >
          THE REVIEW
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: interSemiBold,
        },
      ],
    }
  );
}
