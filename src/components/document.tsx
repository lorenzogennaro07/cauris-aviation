import localFont from "next/font/local";
import type {Locale} from "@/i18n/config";
import "@/app/globals.css";
const corporate=localFont({src:"../../public/fonts/InterTight-Variable.ttf",variable:"--font-corporate",display:"swap",weight:"100 900"});
export function Document({children,locale}:{children:React.ReactNode;locale:Locale}){return <html lang={locale} className={corporate.variable}><body>{children}</body></html>;}
