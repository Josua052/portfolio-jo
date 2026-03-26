import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    return new NextResponse("Invalid file ID", { status: 400 });
  }

  // ✅ Pakai lh3 saja (stabil)
  const url = `https://lh3.googleusercontent.com/d/${id}=w1200`;

  try {
    console.log("Fetching:", url);

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    console.log("Status:", res.status, res.headers.get("content-type"));

    if (!res.ok) {
      throw new Error("Failed to fetch image");
    }

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "image/jpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err) {
    console.error("GDrive Proxy Error:", err);

    // ✅ fallback image (NO REDIRECT)
    const fallback = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64",
    );

    return new NextResponse(fallback, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  }
}
