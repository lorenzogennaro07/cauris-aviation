import { pageMetadata } from "@/i18n/metadata";
import { AboutPage } from "@/components/about-page";

export const metadata = pageMetadata("it", "about");

export default function Page() { return <AboutPage locale="it" />; }
