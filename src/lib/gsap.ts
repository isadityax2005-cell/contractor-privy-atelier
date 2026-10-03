"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
  // Sobha Privy's signature easing: cubic-bezier(.7, 0, .3, 1)
  CustomEase.create("sobha", "0.7,0,0.3,1");
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, useGSAP };
