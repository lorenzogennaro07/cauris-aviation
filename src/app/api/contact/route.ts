import { validateContact } from "../../../lib/contact";

export const runtime = "nodejs";
const recipient = "info@caurisaviation.com";
export async function POST(request: Request) {
  const fail = (status: number) => Response.json({ ok: false }, { status });
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) return fail(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return fail(415);
  if (Number(request.headers.get("content-length")) > 24000) return fail(413);
  let payload: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail(400);
    const chunks: Uint8Array[] = []; let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 24000) { await reader.cancel(); return fail(413); }
      chunks.push(value);
    }
    payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return fail(400); }
  const { data, errors } = validateContact(payload);
  if (!data) return Response.json({ ok: false, errors }, { status: 400 });
  if (data.website) return fail(400);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return fail(503);
  const types: Record<string, string> = { general: "Informazioni generali", private: "Richiesta privata", hospitality: "Hospitality", partnerships: "Collaborazioni", other: "Altro" };
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [recipient], reply_to: data.email,
        subject: `CAURIS — ${types[data.type]}`,
        text: `Nome e cognome: ${data.name}\nEmail: ${data.email}\n${data.phone ? `Telefono: ${data.phone}\n` : ""}Tipologia: ${types[data.type]}\nLingua: ${data.locale}\n\nMessaggio:\n${data.message}` }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return fail(502);
    const result = await response.json();
    if (!result.id) return fail(502);
    return Response.json({ ok: true });
  } catch { return fail(502); }
}
