import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = { title: "About | CAURIS AVIATION", description: "Tra la Sicilia e le sue isole: distanza, tempo e un modo diverso di attraversare il mare.", robots: { index: false, follow: false } };

export default function Page() { return <AboutPage locale="it" />; }
