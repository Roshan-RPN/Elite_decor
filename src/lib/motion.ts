"use client";

import { useMemo, useSyncExternalStore } from "react";

// Exponential ease-outs: confident, decelerating, no bounce.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

// Shared scroll-reveal viewport so every section triggers at the same depth.
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

function subscribe(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

// Hydration-safe media query (framer's useReducedMotion mismatches on SSR).
export function useMediaQuery(query: string, serverValue = false) {
  const sub = useMemo(() => subscribe(query), [query]);
  return useSyncExternalStore(
    sub,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");
