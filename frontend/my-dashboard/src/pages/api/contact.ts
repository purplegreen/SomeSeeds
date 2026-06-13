import type { APIRoute } from "astro"
import { Resend } from "resend"
import { sanityClient } from "../../lib/sanity"

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null)
  if (!body?.fields || typeof body.fields !== "object") {
    return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400 })
  }

  const page = await sanityClient.fetch<{ destinationEmail?: string }>(
    `*[_type == "contact_page" && _id == "contact_page"][0]{ destinationEmail }`,
  )

  if (!page?.destinationEmail) {
    return new Response(JSON.stringify({ error: "No destination email configured." }), { status: 500 })
  }

  const rows = Object.entries(body.fields as Record<string, string>)
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">${key}</td><td style="padding:4px 0">${value}</td></tr>`)
    .join("")

  const html = `<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">${rows}</table>`

  const resend = new Resend(import.meta.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: "SomeSeeds <onboarding@resend.dev>",
    to: page.destinationEmail,
    subject: "New contact form submission",
    html,
  })

  if (error) {
    return new Response(JSON.stringify({ error: "Failed to send email." }), { status: 500 })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
