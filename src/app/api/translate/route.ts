import { NextResponse } from "next/server";

// Server-side proxy for LibreTranslate to avoid CORS and expose a stable endpoint.
// Accepts POST with JSON: { q: string, target: string, source?: string }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const q = body.q;
    const target = body.target || "en";
    const source = body.source || "auto";

    if (!q) {
      return NextResponse.json({ error: "Missing 'q' in request" }, { status: 400 });
    }

    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, source, target, format: "text" }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "Upstream translate error", detail: text }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("/api/translate error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
