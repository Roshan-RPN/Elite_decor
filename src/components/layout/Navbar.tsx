"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center"
    >
      <div className="flex items-center justify-between w-full max-w-7xl px-8 py-4 rounded-2xl bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/assets/logo.png" alt="Elite Decor Logo" className="h-10 md:h-12 w-auto object-contain" />
          <span className="text-xl md:text-2xl font-heading font-bold tracking-widest gold-gradient hidden sm:block">ELITE DECOR</span>
        </Link>
 
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest font-body font-semibold text-white hover:text-primary transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <a
            href="https://wa.me/919061486768"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-2.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-widest transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Phone size={14} />
              Inquiry
            </span>
          </a>
        </div>
 
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        className="fixed inset-0 bg-background/95 backdrop-blur-lg z-[-1] flex flex-col items-center justify-center gap-8 md:hidden"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-3xl font-heading font-bold tracking-widest hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <a
          href="https://wa.me/919061486768"
          className="bg-primary text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest"
        >
          WhatsApp Us
        </a>
      </motion.div>
    </motion.nav>
  );
}
