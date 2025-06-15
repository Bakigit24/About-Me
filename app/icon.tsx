import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 40, height: 40 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 50,
                    background: "#000000",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: "bold",
                    borderRadius: 20,
                }}
            >
                ⏓
            </div>
        ),
        {
            ...size,
        }
    );
}