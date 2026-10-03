"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    getLenis();
  }, []);

  return <>{children}</>;
}
