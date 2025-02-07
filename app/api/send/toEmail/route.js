import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});

export async function POST(req) {
  try {
    const { fullname, email, contact, message, subject } = await req.json();

    if (!fullname || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const mailOptions = {
      from: `${fullname} <${email}>`,
      to: "c.iyac123@gmail.com",
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">${subject}</h2>
          <p style="font-size: 16px; color: #555; line-height: 1.5;">
            ${message}
          </p>
          <footer style="margin-top: 20px; text-align: center; color: #888; font-size: 14px;">
            <p>Best Regards,</p>
            <p><strong>${fullname}</strong></p>
            <p style="font-size: 12px;">${contact}</p>
          </footer>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email" }),
      { status: 500 }
    );
  }
}
