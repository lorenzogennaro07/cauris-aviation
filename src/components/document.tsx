import localFont from "next/font/local";
import { Footer } from "./footer";
import type {Locale} from "@/i18n/config";
import "@/app/globals.css";
const corporate=localFont({src:"../../public/fonts/Manrope-Variable.ttf",variable:"--font-corporate",display:"swap",weight:"200 800"});
export function Document({children,locale}:{children:React.ReactNode;locale:Locale}){return <html lang={locale} className={corporate.variable}><body>{children}<Footer /></body></html>;}

