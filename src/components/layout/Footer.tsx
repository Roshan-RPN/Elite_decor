"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, Globe, Share2, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground pt-24 pb-12 px-6 font-body border-t border-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="md:col-span-2 space-y-8">
          <Link href="/" className="text-3xl font-heading font-bold tracking-widest block">
            <span className="gold-gradient">ELITE DECOR</span>
          </Link>
          <p className="text-white/70 leading-relaxed max-w-sm font-light">
            Crafting timeless spaces with a blend of luxury, functionality, and artistic vision. 
            Kerala's premier choice for bespoke interior excellence.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/elite_decor_1992?igsh=YnhjZHpjdWJqdzBj" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary/10 rounded-xl text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=100067595621574" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary/10 rounded-xl text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
 
        <div className="space-y-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Experience</h3>
          <ul className="space-y-4">
            {[
              { name: "Portfolio", href: "/portfolio" },
              { name: "Services", href: "/services" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 group">
                  {link.name} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
 
        <div className="space-y-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Kochi Studio</h3>
          <ul className="space-y-5">
            <li className="flex gap-3 text-white/60 text-sm leading-relaxed">
              <MapPin size={18} className="text-primary shrink-0" />
              <span>
                Elite Decor Interior Company <br />
                Kochi, Kerala, India
              </span>
            </li>
            <li className="flex items-center gap-3 text-white/60 text-sm">
              <Phone size={18} className="text-primary" />
              <a href="tel:+919061486768" className="hover:text-primary">+91 90614 86768</a>
            </li>
            <li className="flex items-center gap-3 text-white/60 text-sm">
              <Mail size={18} className="text-primary" />
              <a href="mailto:elitedecorkochin@gmail.com" className="hover:text-primary">elitedecorkochin@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p>© {new Date().getFullYear()} Elite Decor Interior Company. All rights reserved.</p>
          <span className="hidden md:block opacity-20">|</span>
          <p className="text-primary/60">Created by Nexora Systems</p>
        </div>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
