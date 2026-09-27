"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

/**
 * Masked line reveal: the text rises out of an invisible slot.
 * Used for section headings, one line per child.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  inView = true,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  inView?: boolean;
}) {
  const trigger = inView
    ? { initial: "hidden", whileInView: "show", viewport: VIEWPORT }
    : { initial: "hidden", animate: "show" };
  return (
    <motion.span
      {...trigger}
      transition={{ staggerChildren: 0.12, delayChildren: delay }}
      className={cn("block", className)}
    >
      {lines.map((line, i) => (
        // Vertical padding keeps descenders and italic overhang inside the mask.
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            variants={{
              hidden: { y: "110%", rotate: 2 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
            }}
            className={cn("block origin-bottom-left", lineClassName)}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Image wipe: the frame opens from the bottom edge while the photo settles
 * from a slight zoom. Reads like a curtain lifting rather than a fade.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const closed = {
    bottom: "inset(100% 0% 0% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[from];
  return (
    <motion.div
      initial={{ clipPath: closed }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1.3, ease: EASE_OUT_EXPO, delay }}
      className={className}
    >
      <motion.div
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Soft focus-pull for supporting copy: blur resolves as it rises a few pixels. */
export function FocusIn({
  children,
  className,
  delay = 0,
  inView = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const hidden = { opacity: 0, y: 14, filter: "blur(8px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  return (
    <motion.div
      initial={hidden}
      {...(inView ? { whileInView: shown, viewport: VIEWPORT } : { animate: shown })}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Gold hairline that draws itself from the left. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay }}
      className={cn("block h-px origin-left bg-gradient-to-r from-primary via-primary/60 to-transparent", className)}
    />
  );
}
