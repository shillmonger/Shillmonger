import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { fullname, email, message } = await req.json();

    if (!fullname || !email || !message)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
      
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error('CONTACT_EMAIL environment variable is not set');
      return NextResponse.json(
        { error: "Contact email configuration error" },
        { status: 500 }
      );
    }

    // Compose a styled HTML email
    const htmlContent = `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 10px;
        color: #333;
      ">
        <h2 style="color: #0070f3;">New Contact Message</h2>
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <div style="
          background: #fff;
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 6px;
          margin-top: 10px;
        ">
          <p>${message}</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: `${fullname} <onboarding@resend.dev>`, // you can customize this later
      to: contactEmail,
      subject: `New message from ${fullname}`,
      html: htmlContent,
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

