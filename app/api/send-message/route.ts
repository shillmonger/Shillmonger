// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { fullname, email, message } = await req.json();

//     if (!fullname || !email || !message) {
//       return NextResponse.json(
//         { success: false, error: "All fields are required." },
//         { status: 400 }
//       );
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const htmlTemplate = `
//       <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px;">
//         <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
//           <div style="background-color: #111827; color: #ffffff; padding: 20px 30px; text-align: center;">
//             <h2 style="margin: 0;">New Message Received</h2>
//           </div>
//           <div style="padding: 30px;">
//             <p style="font-size: 16px; color: #333333;">
//               <strong>From:</strong> ${fullname} <br />
//               <strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
//             </p>
//             <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #2563eb;">
//               <p style="font-size: 15px; color: #111827; white-space: pre-wrap;">${message}</p>
//             </div>
//             <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
//               Sent from your website contact form.
//             </p>
//           </div>
//           <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 13px; color: #6b7280;">
//             <p>© ${new Date().getFullYear()} Shillmonger. All rights reserved.</p>
//           </div>
//         </div>
//       </div>
//     `;

//     await transporter.sendMail({
//       from: `"${fullname}" <${email}>`,
//       to: "shillmonger0@gmail.com",
//       subject: `New message from ${fullname}`,
//       html: htmlTemplate,
//     });

//     return NextResponse.json(
//       { success: true, message: "Message sent successfully!" },
//       { status: 200 }
//     );

//   } catch (err) {
//     console.error("Email error:", err);
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to send message. Please try again later.",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { fullname, email, message } = await req.json();

    if (!fullname || !email || !message)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

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
      to: "shillmonger0@gmail.com",
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

