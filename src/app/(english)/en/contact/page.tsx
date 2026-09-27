import { pageMetadata } from "@/i18n/metadata";
import { ContactPage } from "@/components/contact-page";

export const metadata = pageMetadata("en", "contact");

export default function Page() { return <ContactPage locale="en" />; }
