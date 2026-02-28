import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

// Input sanitization
function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

// Validation
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const VALID_PURPOSES = [
  "General Inquiry",
  "Legal Consultation",
  "Media/Interview",
  "Collaboration",
];

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, purpose, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name is required and must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !validateEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!purpose || !VALID_PURPOSES.includes(purpose)) {
      return NextResponse.json(
        { error: "Please select a valid purpose." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 20) {
      return NextResponse.json(
        { error: "Message must be at least 20 characters." },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : "Not provided",
      purpose: sanitize(purpose),
      message: sanitize(message),
    };

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: "shashankjha.mail@gmail.com",
        subject: `[Website] ${sanitizedData.purpose} from ${sanitizedData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C41E3A;">New Contact Form Submission</h2>
            <hr style="border: 1px solid #eee;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Name:</td>
                <td style="padding: 8px 0; color: #555;">${sanitizedData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #555;">${sanitizedData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #555;">${sanitizedData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Purpose:</td>
                <td style="padding: 8px 0; color: #555;">${sanitizedData.purpose}</td>
              </tr>
            </table>
            <h3 style="color: #333; margin-top: 20px;">Message:</h3>
            <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; color: #555; line-height: 1.6;">
              ${sanitizedData.message}
            </div>
            <hr style="border: 1px solid #eee; margin-top: 24px;" />
            <p style="color: #999; font-size: 12px;">
              Sent from shashankjha.in contact form
            </p>
          </div>
        `,
      });
    } else {
      // Log to console if no Resend API key (development fallback)
      console.log("Contact form submission (no RESEND_API_KEY set):", sanitizedData);
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
