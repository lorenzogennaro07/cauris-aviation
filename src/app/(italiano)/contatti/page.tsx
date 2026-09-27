import { pageMetadata } from "@/i18n/metadata";
import { ContactPage } from "@/components/contact-page";

export const metadata = pageMetadata("it", "contact");

export default function Page() { return <ContactPage locale="it" />; }
