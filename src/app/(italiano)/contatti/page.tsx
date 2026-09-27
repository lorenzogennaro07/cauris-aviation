import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = { title: "Contatti | CAURIS AVIATION", description: "Per informazioni, richieste e collaborazioni: info@caurisaviation.com. Catania, Sicilia.", robots: { index: false, follow: false } };

export default function Page() { return <ContactPage locale="it" />; }
