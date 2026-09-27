"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

// Shared handle so overlays (menu, lightbox) can pause smooth scrolling.
export const lenisRef: { current: Lenis | null } = { current: null };

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B]"
    />
  );
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New route starts at the top, without a smooth glide from the old position.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      {children}
    </MotionConfig>
  );
}
