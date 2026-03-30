// src/lib/mail.ts
import nodemailer from "nodemailer";

type SendMailProps = {
  name: string;
  email: string;
  project?: string;
  message: string;
};

export type TestimonialMailProps = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  relation?: string;
  message: string;
  rating?: number;
  approveUrl: string;
  rejectUrl: string;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(data: SendMailProps) {
  const { name, email, project, message } = data;
  const sentAt = new Date().toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Project Request</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0f172a;border-radius:16px 16px 0 0;padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#94a3b8;">
                      Portfolio Contact
                    </p>
                    <h1 style="margin:0;font-size:26px;font-weight:800;color:#f1f5f9;letter-spacing:-0.03em;line-height:1.1;">
                      New Project Request
                    </h1>
                    <p style="margin:8px 0 0;font-size:13px;color:#64748b;">
                      ${sentAt}
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <div style="width:48px;height:48px;border-radius:12px;background:#1e293b;border:1px solid #334155;display:flex;align-items:center;justify-content:center;font-size:22px;line-height:48px;text-align:center;">
                      🚀
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Intro -->
              <p style="margin:0 0 28px;font-size:14px;color:#475569;line-height:1.7;">
                Someone just filled out the contact form on your portfolio.
                Here are the details of their project request:
              </p>

              <!-- Info cards -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">

                <!-- Name -->
                <tr>
                  <td style="padding:0 0 12px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">
                            Full Name
                          </p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#0f172a;">
                            ${name}
                          </p>
                        </td>
                        <td align="right">
                          <span style="font-size:20px;">👤</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding:0 0 12px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">
                            Email Address
                          </p>
                          <a href="mailto:${email}"
                            style="margin:0;font-size:15px;font-weight:600;color:#6366f1;text-decoration:none;">
                            ${email}
                          </a>
                        </td>
                        <td align="right">
                          <span style="font-size:20px;">✉️</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Project type -->
                <tr>
                  <td style="padding:0 0 12px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">
                            Project Type
                          </p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#0f172a;">
                            ${project || "Not specified"}
                          </p>
                        </td>
                        <td align="right">
                          <span style="font-size:20px;">💼</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #6366f1;border-radius:0 12px 12px 0;padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">
                      Message
                    </p>
                    <p style="margin:0;font-size:14px;color:#334155;line-height:1.75;white-space:pre-line;">
                      ${message}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Your Project Request"
                      style="display:inline-block;padding:14px 32px;background:#0f172a;color:#f1f5f9;font-size:14px;font-weight:700;letter-spacing:0.02em;text-decoration:none;border-radius:10px;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                      This email was sent automatically from your portfolio contact form.<br/>
                      <strong style="color:#64748b;">Josua Ronaldo Pandiangan</strong> · Jakarta, Indonesia
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin:0;font-size:20px;font-weight:900;letter-spacing:-0.05em;color:#cbd5e1;">
                      JR
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();

  return await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Project Request from ${name}`,
    html,
  });
}

/* ── Testimonial notification email ── */
export async function sendTestimonialNotification(data: TestimonialMailProps) {
  const {
    name,
    role,
    company,
    relation,
    message,
    rating,
    approveUrl,
    rejectUrl,
  } = data;

  const sentAt = new Date().toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  });

  const stars = rating
    ? "★".repeat(rating) + "☆".repeat(5 - rating)
    : "Tidak dirating";

  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Testimoni Baru</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0f172a;border-radius:16px 16px 0 0;padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#94a3b8;">
                      Portfolio · Testimoni Baru
                    </p>
                    <h1 style="margin:0;font-size:24px;font-weight:800;color:#f1f5f9;letter-spacing:-0.03em;line-height:1.1;">
                      Ada Testimoni Masuk! 🎉
                    </h1>
                    <p style="margin:8px 0 0;font-size:13px;color:#64748b;">${sentAt}</p>
                  </td>
                  <td align="right" valign="top">
                    <div style="width:48px;height:48px;border-radius:12px;background:#1e293b;border:1px solid #334155;font-size:22px;line-height:48px;text-align:center;">
                      💬
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.7;">
                Seseorang baru saja mengirimkan testimoni di portfoliomu.
                Review dan putuskan apakah ingin ditampilkan.
              </p>

              <!-- Info cards -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">

                <!-- Name -->
                <tr>
                  <td style="padding:0 0 10px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 2px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Nama</p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#0f172a;">${name}</p>
                        </td>
                        <td align="right"><span style="font-size:18px;">👤</span></td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Role & Company -->
                ${
                  role || company
                    ? `
                <tr>
                  <td style="padding:0 0 10px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 2px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Jabatan / Perusahaan</p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#0f172a;">
                            ${[role, company].filter(Boolean).join(" · ")}
                          </p>
                        </td>
                        <td align="right"><span style="font-size:18px;">💼</span></td>
                      </tr>
                    </table>
                  </td>
                </tr>`
                    : ""
                }

                <!-- Relation -->
                ${
                  relation
                    ? `
                <tr>
                  <td style="padding:0 0 10px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 2px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Hubungan</p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#0f172a;">${relation}</p>
                        </td>
                        <td align="right"><span style="font-size:18px;">🤝</span></td>
                      </tr>
                    </table>
                  </td>
                </tr>`
                    : ""
                }

                <!-- Rating -->
                <tr>
                  <td style="padding:0 0 10px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 2px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Rating</p>
                          <p style="margin:0;font-size:18px;color:#f59e0b;letter-spacing:2px;">${stars}</p>
                        </td>
                        <td align="right"><span style="font-size:18px;">⭐</span></td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #6366f1;border-radius:0 12px 12px 0;padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Isi Testimoni</p>
                    <p style="margin:0;font-size:14px;color:#334155;line-height:1.75;font-style:italic;white-space:pre-line;">
                      &ldquo;${message}&rdquo;
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Action buttons -->
              <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#0f172a;text-align:center;letter-spacing:0.02em;">
                TINDAKAN CEPAT
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" align="center" style="padding-right:8px;">
                    <a href="${approveUrl}"
                      style="display:block;padding:14px 20px;background:#22c55e;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.02em;text-decoration:none;border-radius:10px;text-align:center;">
                      ✅ Approve Testimoni
                    </a>
                  </td>
                  <td width="48%" align="center" style="padding-left:8px;">
                    <a href="${rejectUrl}"
                      style="display:block;padding:14px 20px;background:#ef4444;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.02em;text-decoration:none;border-radius:10px;text-align:center;">
                      ❌ Tolak Testimoni
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:20px 0 0;font-size:11px;color:#94a3b8;text-align:center;line-height:1.6;">
                Link approve/reject hanya berlaku sekali dan aman.<br/>
                Jika tidak mengenali pengirim ini, abaikan email ini.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                      Email ini dikirim otomatis dari sistem portfolio.<br/>
                      <strong style="color:#64748b;">Josua Ronaldo Pandiangan</strong> · Jakarta, Indonesia
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin:0;font-size:20px;font-weight:900;letter-spacing:-0.05em;color:#cbd5e1;">JR</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();

  return await transporter.sendMail({
    from: `"Portfolio Testimonial" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `[Testimoni Baru] ${name}${role ? ` — ${role}` : ""}`,
    html,
  });
}
