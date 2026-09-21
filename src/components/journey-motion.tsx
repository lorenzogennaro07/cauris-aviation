"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function JourneyMotion() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 767px)" }, context => {
      if (!context.conditions?.motion) return;
      const mobile = context.conditions.mobile;
      // Entry uses the image; scroll uses its wrapper, so the two never compete.
      if (window.scrollY < 80) {
        gsap.fromTo(".hero-aircraft img",
          { xPercent: mobile ? -4 : -7, yPercent: 8, rotation: -3, rotationY: -9, scale: .94, transformPerspective: 1600 },
          { xPercent: 0, yPercent: 0, rotation: 0, rotationY: 0, scale: 1, duration: 1.8, ease: "power2.out", clearProps: "transform" });
      }
      const timeline = gsap.timeline({ defaults: { ease: "sine.inOut" }, scrollTrigger: {
        trigger: ".hero-sequence", start: "top top", end: "bottom bottom", scrub: 0.85,
        invalidateOnRefresh: true,
      }});
      // A shallow presentation arc: CSS perspective on the photographic plane only.
      timeline.fromTo(".hero-aircraft",
        { xPercent: mobile ? -2 : -4, yPercent: 3, scale: .97, rotation: -3.5, rotationY: -11, rotationX: 3, transformPerspective: 1600 },
        { xPercent: mobile ? 2 : 5, yPercent: -8, scale: 1.055, rotation: 3, rotationY: 7, rotationX: -2, duration: .6 }, 0)
        .to(".hero-aircraft", { xPercent: mobile ? 3 : 8, yPercent: -2, scale: 1.015, rotation: .6, rotationY: 10, rotationX: 0, duration: .4 }, .6)
        .to(".hero-wordmark", { xPercent: -1.5, yPercent: 7, duration: 1 }, 0)
        .to(".hero-landscape", { scale: 1.04, xPercent: -.5, duration: 1 }, 0)
        .to(".hero-progress span", { scaleX: 1, duration: 1, ease: "none" }, 0);
    });
    return () => media.revert();
  }, []);
  return null;
}
