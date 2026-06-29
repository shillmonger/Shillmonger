import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { rating, feedback } = await req.json();

    if (!rating)
      return NextResponse.json({ error: "Missing rating" }, { status: 400 });
      
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error('CONTACT_EMAIL environment variable is not set');
      return NextResponse.json(
        { error: "Contact email configuration error" },
        { status: 500 }
      );
    }

    const ratingEmoji = rating === "great" ? "🎉" : rating === "good" ? "🙏" : "💪";
    const ratingLabel = rating === "great" ? "Perfect port" : rating === "good" ? "Good port" : "Bad port";
    const ratingColor = rating === "great" ? "#22c55e" : rating === "good" ? "#eab308" : "#ef4444";

    // Compose a styled HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .card { background: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1); overflow: hidden; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 40px; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
          .content { padding: 40px; }
          .rating-badge { display: inline-flex; align-items: center; gap: 8px; background: #f8f8f8; padding: 12px 20px; border-radius: 12px; margin-bottom: 24px; }
          .rating-emoji { font-size: 28px; }
          .rating-text { font-size: 16px; font-weight: 600; color: #1a1a1a; }
          .label { color: #666666; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .feedback-box { background: #f8f8f8; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; margin-top: 8px; }
          .feedback-box p { color: #333333; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap; }
          .no-feedback { color: #888888; font-style: italic; font-size: 14px; }
          .footer { padding: 24px 40px; background: #fafafa; border-top: 1px solid #e5e5e5; }
          .footer p { color: #888888; font-size: 12px; margin: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="header">
              <h1>⭐ New Portfolio Rating</h1>
            </div>
            <div class="content">
              <div class="rating-badge">
                <span class="rating-emoji">${ratingEmoji}</span>
                <span class="rating-text">${ratingLabel}</span>
              </div>
              
              ${feedback ? `
                <div class="label">Feedback</div>
                <div class="feedback-box">
                  <p>${feedback}</p>
                </div>
              ` : '<p class="no-feedback">No additional feedback provided</p>'}
            </div>
            <div class="footer">
              <p>Sent from your portfolio rating form</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: "Portfolio Rating <onboarding@resend.dev>",
      to: contactEmail,
      subject: `New portfolio rating: ${ratingLabel}`,
      html: htmlContent,
    });

    return NextResponse.json(
      { message: "Rating submitted successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 }
    );
  }
}
