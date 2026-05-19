import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendVerificationEmail(
  to: string,
  verificationCode: string
) {
  const info = await transporter.sendMail({
    from: `"Buildit Team" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Your verification code',
    text: `Your verification code is ${verificationCode}`,
    html: `
<div style="max-width:500px;margin:auto;font-family:Arial,sans-serif;padding:20px;border:1px solid #e5e7eb;border-radius:8px;background:#ffffff;">

  <div style="font-size:16px;font-weight:600;color:#111827;margin-bottom:6px;">
    Buildit
  </div>

  <div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:10px;">
    Email Verification
  </div>

  <div style="font-size:13px;color:#6b7280;margin-bottom:16px;">
    Use this code to verify your email address.
  </div>

  <div style="text-align:center;font-size:20px;font-weight:700;letter-spacing:4px;padding:10px;background:#f3f4f6;border-radius:6px;color:#111827;">
    ${verificationCode}
  </div>

  <div style="font-size:12px;color:#6b7280;margin-top:14px;">
    This code expires in 10 minutes. Do not share it with anyone.
  </div>

</div>
    `,
  });

  return info;
}
