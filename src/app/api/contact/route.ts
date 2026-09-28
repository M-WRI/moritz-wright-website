import { contact, site } from "@/lib/content";
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  company?: string;
};

const allowedTopics = new Set<string>(contact.topics);

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured yet." },
      { status: 503 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const topic = body.topic?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (!allowedTopics.has(topic)) {
    return NextResponse.json({ error: "Please choose a topic." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Message should be at least 10 characters." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_TO ?? site.email;
  const from =
    process.env.RESEND_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Contact — ${name} (${topic})`,
      text: `From: ${name} <${email}>\nTopic: ${topic}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Could not send your message. Try email directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
