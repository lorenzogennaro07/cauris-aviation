import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = { title: "Contact | CAURIS AVIATION", description: "For information, enquiries and collaborations: info@caurisaviation.com. Catania, Sicily.", robots: { index: false, follow: false } };

export default function Page() { return <ContactPage locale="en" />; }
