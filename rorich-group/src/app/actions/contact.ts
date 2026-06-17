"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(formData: unknown) {
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  const { name, email, phone, division, message } = parsed.data;

  const divisionLabel =
    division === "paper-printers"
      ? "Rorich Paper Printers"
      : division === "web-dev"
        ? "Rorich Web Dev"
        : "General";

  try {
    await resend.emails.send({
      from: "Contact Form <noreply@rorichgroup.co.za>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone ?? "Not provided"}`,
        `Division: ${divisionLabel}`,
        `\nMessage:\n${message}`,
      ].join("\n"),
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
