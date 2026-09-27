"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(6px)" }}
      // Clear the filter once settled: any filter value traps position:fixed descendants.
      animate={{ opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
