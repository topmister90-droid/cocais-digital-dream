import { useEffect } from "react";

/**
 * Adds `reveal-in` class to any `.reveal` element when it enters viewport.
 * Uses IntersectionObserver once and observes lazily-added nodes too.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.reveal-in)").forEach((el) => io.observe(el));
    };
    observeAll();

    // Re-scan periodically in case of dynamic content
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
