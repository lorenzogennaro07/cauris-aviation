"use client";
import { useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import { enquiryTypes, limits, validateContact, type ContactErrors } from "@/lib/contact";

export function ContactForm({ locale }: { locale: Locale }) {
  const it = locale === "it";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const busy = useRef(false);
  const labels = it ? { name: "Nome e cognome", email: "Email", phone: "Telefono", type: "Tipologia di richiesta", message: "Messaggio" } : { name: "Full name", email: "Email", phone: "Phone", type: "Enquiry type", message: "Message" };
  const options = it ? ["Informazioni generali", "Richiesta privata", "Hospitality", "Collaborazioni", "Altro"] : ["General information", "Private enquiry", "Hospitality", "Partnerships", "Other"];
  const invalid = it ? "Controlla questo campo." : "Please check this field.";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const payload = { ...Object.fromEntries(new FormData(form)), locale };
    const validation = validateContact(payload);
    setErrors(validation.errors);
    if (!validation.data) {
      setStatus("idle");
      (form.elements.namedItem(Object.keys(validation.errors)[0]) as HTMLElement)?.focus();
      return;
    }
    busy.current = true;
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(validation.data), signal: AbortSignal.timeout(15000) });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        if (result.errors) setErrors(result.errors);
        setStatus("error");
      } else { form.reset(); setStatus("success"); }
    } catch { setStatus("error"); }
    finally { busy.current = false; }
  }
  return <form className="contact-form" onSubmit={submit} aria-busy={status === "loading"}>
    <fieldset disabled={status === "loading"}>
      <legend className="contact-sr-only">{it ? "Invia una richiesta generale" : "Send a general enquiry"}</legend>
      {(["name", "email", "phone"] as const).map(key => <div className="contact-field" key={key}>
        <label htmlFor={`contact-${key}`}>{labels[key]} {key === "phone" ? <span>({it ? "facoltativo" : "optional"})</span> : <span aria-hidden="true">*</span>}</label>
        <input id={`contact-${key}`} name={key} type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} autoComplete={key === "phone" ? "tel" : key} required={key !== "phone"} maxLength={limits[key]} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `error-${key}` : undefined} />
        {errors[key] && <p className="contact-field-error" id={`error-${key}`}>{invalid}</p>}
      </div>)}
      <div className="contact-field">
        <label htmlFor="contact-type">{labels.type}</label>
        <select id="contact-type" name="type" defaultValue="general" aria-invalid={!!errors.type} aria-describedby={errors.type ? "error-type" : undefined}>{enquiryTypes.map((type, i) => <option key={type} value={type}>{options[i]}</option>)}</select>
        {errors.type && <p className="contact-field-error" id="error-type">{invalid}</p>}
      </div>
      <div className="contact-field contact-field-wide">
        <label htmlFor="contact-message">{labels.message} <span aria-hidden="true">*</span></label>
        <textarea id="contact-message" name="message" rows={5} required maxLength={limits.message} aria-invalid={!!errors.message} aria-describedby={errors.message ? "error-message" : undefined} />
        {errors.message && <p className="contact-field-error" id="error-message">{invalid}</p>}
      </div>
      <div className="contact-sr-only" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" autoComplete="off" tabIndex={-1} maxLength={200} /></div>
      <button className="contact-submit" type="submit">{status === "loading" ? (it ? "Invio in corso…" : "Sending…") : (it ? "Invia richiesta" : "Send enquiry")}</button>
    </fieldset>
    <div className="contact-status" role="status" aria-live="polite" aria-atomic="true">
      {status === "success" && <p>{it ? "Richiesta inviata. Ti ricontatteremo utilizzando i recapiti indicati." : "Your enquiry has been sent. We will get back to you using the contact details provided."}</p>}
      {status === "error" && <p>{it ? "Non è stato possibile inviare la richiesta. Riprova oppure scrivi a info@caurisaviation.com." : "We couldn't send your enquiry. Please try again or email info@caurisaviation.com."}</p>}
    </div>
  </form>;
}
