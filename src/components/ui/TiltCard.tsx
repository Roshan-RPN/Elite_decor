"use client";

import { ReactNode, PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/motion";

const SPRING = { stiffness: 160, damping: 22, mass: 0.6 };

/**
 * Card with a restrained 3D tilt and a gold spotlight that follows the cursor.
 * Tilt and glare only run for a fine pointer with motion allowed.
 */
export default function TiltCard({
  children,
  className,
  max = 4,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = finePointer && !reduced;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glare = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const glareOpacity = useSpring(glare, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const background = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(255, 215, 0, 0.16), transparent 55%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    glare.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glare.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={active ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      className={cn("relative isolate", className)}
    >
      {children}
      {active && (
        <motion.div
          aria-hidden
          style={{ background, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-screen"
        />
      )}
    </motion.div>
  );
}
