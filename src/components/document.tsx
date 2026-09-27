import localFont from "next/font/local";
import { Footer } from "./footer";
import type {Locale} from "@/i18n/config";
import "@/app/globals.css";
const corporate=localFont({src:"../../public/fonts/InstrumentSans-Variable.ttf",variable:"--font-corporate",display:"swap",weight:"400 600",fallback:["Helvetica Neue","Arial","sans-serif"]});
export function Document({children,locale}:{children:React.ReactNode;locale:Locale}){return <html lang={locale} className={corporate.variable}><body>{children}<Footer locale={locale} /></body></html>;}

