"use client";
import {useEffect} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function JourneyMotion(){
 useEffect(()=>{
 const media=gsap.matchMedia();
 media.add("(prefers-reduced-motion: no-preference)",()=>{
 const flight=gsap.timeline({scrollTrigger:{trigger:".flight-sequence",start:"top top",end:"bottom bottom",scrub:.7}});
 flight.to(".hero-copy",{opacity:0,y:-25,duration:.18},0).to(".flight-caption",{opacity:0,duration:.15},0)
 .fromTo(".departure",{opacity:0},{opacity:1,duration:.16},.18)
 .to(".departure",{opacity:0,duration:.22},.48)
 .to(".departure .photo",{scale:1.08,yPercent:4,duration:.55,ease:"none"},.18)
 .to(".helicopter",{xPercent:-5,yPercent:-7,scale:.85,duration:1,ease:"none"},0)
 .to(".marine-photo",{scale:1.12,yPercent:3,duration:1,ease:"none"},0)
 .fromTo(".crossing-message",{opacity:0,y:24},{opacity:1,y:0,duration:.22},.73);
 const revealOrigin=()=>{const point=document.querySelector(".map-destination circle")!.getBoundingClientRect();const stage=document.querySelector(".destination-stage")!.getBoundingClientRect();const x=(point.left+point.width/2-stage.left)/stage.width*100,y=(point.top+point.height/2-stage.top)/stage.height*100;return "polygon("+(x-6)+"% "+(y-7)+"%,"+(x+6)+"% "+(y-7)+"%,"+(x+6)+"% "+(y+7)+"%,"+(x-6)+"% "+(y+7)+"%)";}; const route=gsap.timeline({scrollTrigger:{trigger:".destination-sequence",start:"top top",end:"bottom bottom",scrub:.65,invalidateOnRefresh:true}});
 route.fromTo(".route-line",{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:.4,ease:"none"},0)
 .fromTo(".map-islands,.map-destination",{opacity:0},{opacity:1,duration:.2},.2)
 .fromTo(".arrival-photo",{clipPath:revealOrigin,opacity:0},{opacity:1,duration:.08},.46)
 .to(".arrival-photo",{clipPath:"polygon(0% 0%,100% 0%,100% 100%,0% 100%)",duration:.45,ease:"power2.inOut"},.5)
 .to(".map-composition",{opacity:0,duration:.2},.58)
 .fromTo(".arrival-copy",{opacity:0,y:24},{opacity:1,y:0,duration:.17},.83);
 });
 const header=document.querySelector(".site-header"),onScroll=()=>header?.classList.toggle("scrolled",scrollY>64);
 window.addEventListener("scroll",onScroll,{passive:true});onScroll();
 return()=>{media.revert();window.removeEventListener("scroll",onScroll);};
 },[]);
 return null;
}
