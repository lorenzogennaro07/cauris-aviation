"use client";
import {useEffect,useRef,useState} from "react";
import Image from "next/image";
export function Helicopter({label}:{label:string}){
 const host=useRef<HTMLDivElement>(null),[ready,setReady]=useState(false);
 useEffect(()=>{let cancelled=false,dispose:(()=>void)|undefined;const target=host.current;if(!target)return;
 const timer=setTimeout(async()=>{try{const {mountHelicopter}=await import("./helicopter-scene");if(cancelled)return;const cleanup=await mountHelicopter(target,()=>{if(!cancelled)setReady(true);});if(cancelled)cleanup();else dispose=cleanup;}catch{target.dataset.failed="true";}},160);
 return()=>{cancelled=true;clearTimeout(timer);dispose?.();};},[]);
 return <div className="helicopter" role="img" aria-label={label} data-ready={ready}><Image className="helicopter-poster" src="/images/elicotteri/helicopter-poster.webp" alt="" fill sizes="(max-width:767px) 100vw,72vw" priority/><div className="helicopter-canvas" ref={host}/></div>;
}
