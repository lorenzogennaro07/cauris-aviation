import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = { title: "About | CAURIS AVIATION", description: "Between Sicily and its islands: distance, time and a different way across the sea.", robots: { index: false, follow: false } };

export default function Page() { return <AboutPage locale="en" />; }
