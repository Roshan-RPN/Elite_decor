"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { lenisRef } from "@/components/providers/MotionProvider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// The menu opens as a circle growing out of the toggle button.
const MENU_ORIGIN = "calc(100% - 3.25rem) 3.5rem";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 200);
    setScrolled(latest > 40);
  });

  React.useEffect(() => {
    if (isOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.nav
        initial={{ y: "-130%", opacity: 0 }}
        animate={hidden && !isOpen ? { y: "-130%", opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-6 flex justify-center"
      >
        <div
          className={cn(
            "flex items-center justify-between w-full max-w-7xl rounded-2xl border text-white transition-[padding,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
            scrolled || isOpen
              ? "px-5 md:px-7 py-2.5 bg-[#0A0A0A]/85 backdrop-blur-xl border-primary/15 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.8)]"
              : "px-5 md:px-8 py-3.5 md:py-4 bg-[#0A0A0A]/60 backdrop-blur-md border-white/10 shadow-none",
          )}
        >
          <Link href="/" className="flex items-center gap-3 group" aria-label="Elite Decor home">
            <Image
              src="/assets/logo.png"
              alt=""
              width={96}
              height={88}
              preload
              className="h-10 md:h-11 w-auto object-contain transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[-4deg] group-hover:scale-105"
            />
            <span className="text-xl md:text-2xl font-heading font-bold tracking-widest gold-gradient hidden sm:block">ELITE DECOR</span>
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-xs uppercase tracking-widest font-body font-semibold transition-colors duration-300 group",
                  isActive(link.href) ? "text-primary" : "text-white/85 hover:text-white",
                )}
              >
                {link.name}
                {isActive(link.href) ? (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                  />
                ) : (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-white/50 origin-right scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
                )}
              </Link>
            ))}
            <a
              href="https://wa.me/919061486768"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-widest hover:-translate-y-px"
            >
              <span className="flex items-center gap-2">
                <Phone size={14} />
                Inquiry
              </span>
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="md:hidden relative grid place-items-center w-11 h-11 -mr-2 text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            clipPath: `circle(150% at ${MENU_ORIGIN})`,
            visibility: "visible",
            transition: { duration: 0.9, ease: EASE_OUT_EXPO },
          },
          closed: {
            clipPath: `circle(0% at ${MENU_ORIGIN})`,
            transition: { duration: 0.55, ease: EASE_OUT_EXPO },
            transitionEnd: { visibility: "hidden" },
          },
        }}
        style={{ visibility: "hidden" }}
        className="fixed inset-0 z-40 md:hidden bg-[#0A0A0A]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-7"
        aria-hidden={!isOpen}
      >
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/10 blur-[90px] pointer-events-none"
        />
        {navLinks.map((link, i) => (
          <div key={link.href} className="overflow-hidden">
            <motion.div
              variants={{
                open: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.06 } },
                closed: { y: "100%", opacity: 0, transition: { duration: 0.3 } },
              }}
            >
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
                className={cn(
                  "block text-3xl font-heading font-bold tracking-widest transition-colors",
                  isActive(link.href) ? "text-primary" : "text-white hover:text-primary",
                )}
              >
                {link.name}
              </Link>
            </motion.div>
          </div>
        ))}
        <motion.a
          href="https://wa.me/919061486768"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isOpen ? 0 : -1}
          variants={{
            open: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.5 } },
            closed: { y: 16, opacity: 0, transition: { duration: 0.2 } },
          }}
          className="mt-4 gold-btn px-8 py-4 rounded-full font-bold uppercase tracking-widest"
        >
          WhatsApp Us
        </motion.a>
      </motion.div>
    </>
  );
}
