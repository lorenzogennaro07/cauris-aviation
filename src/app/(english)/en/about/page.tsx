import { pageMetadata } from "@/i18n/metadata";
import { AboutPage } from "@/components/about-page";

export const metadata = pageMetadata("en", "about");

export default function Page() { return <AboutPage locale="en" />; }
