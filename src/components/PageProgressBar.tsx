"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function PageProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({ 
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.08
    });

    // We can't directly hook into Next.js 13+ router events like before,
    // so we stop progress whenever the URL changes.
    NProgress.done();
    
    return () => {
      NProgress.done();
    };
  }, [pathname, searchParams]);

  // To show progress on link clicks, we have to intercept clicks or 
  // wait for Next.js to provide a native solution. 
  // For now, we'll also add a global click listener for anchor tags.
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        if (anchor.href !== window.location.href && !anchor.target) {
          NProgress.start();
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}
