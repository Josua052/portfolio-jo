// app/api/testimonial/route.ts
import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendTestimonialNotification } from "@/lib/mail";

function makeToken(id: string, action: string) {
  return createHmac("sha256", process.env.TESTIMONIAL_SECRET!)
    .update(`${id}:${action}`)
    .digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, company, relation, message, rating } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Nama dan testimoni wajib diisi." },
        { status: 400 },
      );
    }

    // Insert into Supabase (approved = false by default)
    const { data, error: sbErr } = await supabaseAdmin
      .from("testimonials")
      .insert([
        {
          name,
          role: role || null,
          company: company || null,
          relation: relation || null,
          message,
          rating: rating || null,
          approved: false,
        },
      ])
      .select("id")
      .single();

    if (sbErr || !data) {
      console.error("Supabase insert error:", sbErr);
      return NextResponse.json(
        { error: "Gagal menyimpan testimoni." },
        { status: 500 },
      );
    }

    const id = data.id as string;
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const approveToken = makeToken(id, "approve");
    const rejectToken = makeToken(id, "reject");

    const approveUrl = `${base}/api/testimonial/approve?id=${id}&action=approve&token=${approveToken}`;
    const rejectUrl = `${base}/api/testimonial/approve?id=${id}&action=reject&token=${rejectToken}`;

    // Send email notification (non-blocking — don't fail the request if email fails)
    try {
      await sendTestimonialNotification({
        id,
        name,
        role,
        company,
        relation,
        message,
        rating,
        approveUrl,
        rejectUrl,
      });
    } catch (mailErr) {
      console.error("Email notification failed:", mailErr);
      // Still return success — testimonial was saved
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Testimonial API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
