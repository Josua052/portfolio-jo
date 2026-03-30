// app/api/testimonial/approve/route.ts
// GET /api/testimonial/approve?id=xxx&action=approve|reject&token=yyy
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";

function verifyToken(id: string, action: string, token: string): boolean {
  const expected = createHmac("sha256", process.env.TESTIMONIAL_SECRET!)
    .update(`${id}:${action}`)
    .digest("hex");
  try {
    return timingSafeEqual(
      Buffer.from(token, "hex"),
      Buffer.from(expected, "hex"),
    );
  } catch {
    return false;
  }
}

function htmlPage(
  title: string,
  emoji: string,
  heading: string,
  body: string,
  color: string,
) {
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{min-height:100vh;display:flex;align-items:center;justify-content:center;
      background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;padding:2rem;}
    .card{background:#fff;border:1px solid #e2e8f0;border-radius:1.5rem;
      padding:3rem 2.5rem;max-width:480px;width:100%;text-align:center;
      box-shadow:0 8px 32px rgba(0,0,0,0.06);}
    .icon{font-size:3.5rem;margin-bottom:1.25rem;line-height:1;}
    .badge{display:inline-block;padding:0.3rem 0.875rem;border-radius:999px;
      font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
      background:${color}18;color:${color};margin-bottom:1rem;}
    h1{font-size:1.5rem;font-weight:800;letter-spacing:-0.03em;color:#0f172a;margin-bottom:0.75rem;}
    p{font-size:0.9rem;color:#64748b;line-height:1.7;margin-bottom:1.5rem;}
    a{display:inline-block;padding:0.75rem 1.75rem;background:#0f172a;color:#f1f5f9;
      font-size:0.875rem;font-weight:700;text-decoration:none;border-radius:10px;
      letter-spacing:0.01em;transition:opacity 0.2s;}
    a:hover{opacity:0.85;}
    .footer{margin-top:2rem;font-size:0.72rem;color:#94a3b8;}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${emoji}</div>
    <div class="badge">${title}</div>
    <h1>${heading}</h1>
    <p>${body}</p>
    <a href="/">← Kembali ke Portfolio</a>
    <p class="footer">Josua Ronaldo Pandiangan · Portfolio</p>
  </div>
</body>
</html>`,
    {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? "";
  const action = searchParams.get("action") ?? "";
  const token = searchParams.get("token") ?? "";

  // Validate params
  if (!id || !token || !["approve", "reject"].includes(action)) {
    return htmlPage(
      "Link Tidak Valid",
      "⚠️",
      "Link Tidak Valid",
      "Parameter yang diberikan tidak lengkap atau tidak dikenali. Pastikan kamu menggunakan link dari email notifikasi.",
      "#f59e0b",
    );
  }

  // Verify HMAC token
  if (!verifyToken(id, action, token)) {
    return htmlPage(
      "Akses Ditolak",
      "🔒",
      "Token Tidak Valid",
      "Link ini tidak valid atau sudah kadaluarsa. Gunakan link terbaru dari email notifikasi.",
      "#ef4444",
    );
  }

  // Check testimonial exists
  const { data: existing, error: fetchErr } = await supabaseAdmin
    .from("testimonials")
    .select("id, approved, name")
    .eq("id", id)
    .single();

  if (fetchErr || !existing) {
    return htmlPage(
      "Tidak Ditemukan",
      "🔍",
      "Testimoni Tidak Ditemukan",
      "Testimoni dengan ID ini tidak ditemukan di database. Mungkin sudah dihapus sebelumnya.",
      "#94a3b8",
    );
  }

  const name = existing.name as string;

  if (action === "approve") {
    const { data: updated, error: updateErr } = await supabaseAdmin
      .from("testimonials")
      .update({ approved: true })
      .eq("id", id)
      .select("id, approved")
      .single();

    if (updateErr) {
      console.error("[approve] Supabase update error:", updateErr);
      return htmlPage(
        "Gagal",
        "❌",
        "Gagal Menyetujui",
        `Error Supabase: ${updateErr.message} (code: ${updateErr.code}). Silakan update manual di Supabase Dashboard.`,
        "#ef4444",
      );
    }

    // Verify the update actually took effect
    if (!updated || updated.approved !== true) {
      console.error("[approve] Update returned no rows or approved still false:", updated);
      return htmlPage(
        "Gagal",
        "❌",
        "Update Tidak Berhasil",
        `Perintah update dikirim tapi kolom 'approved' tidak berubah. Pastikan kolom 'approved' (boolean) ada di tabel 'testimonials' di Supabase, dan SUPABASE_SERVICE_ROLE_KEY sudah benar.`,
        "#ef4444",
      );
    }

    return htmlPage(
      "Disetujui ✓",
      "✅",
      `Testimoni Disetujui!`,
      `Testimoni dari <strong>${name}</strong> berhasil disetujui dan sekarang sudah tampil di halaman portfolio.`,
      "#22c55e",
    );
  }

  // action === "reject"
  const { error: deleteErr } = await supabaseAdmin
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (deleteErr) {
    console.error("[approve] Supabase delete error:", deleteErr);
    return htmlPage(
      "Gagal",
      "❌",
      "Gagal Menolak",
      `Error Supabase: ${deleteErr.message} (code: ${deleteErr.code}). Silakan hapus manual di Supabase Dashboard.`,
      "#ef4444",
    );
  }

  return htmlPage(
    "Ditolak",
    "🗑️",
    "Testimoni Ditolak & Dihapus",
    `Testimoni dari <strong>${name}</strong> telah ditolak dan dihapus dari database.`,
    "#ef4444",
  );
}
