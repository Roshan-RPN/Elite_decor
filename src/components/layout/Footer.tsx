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
            Kerala's premier choice for bespoke interior excellence for over 30 years.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <Globe size={20} />, href: "https://www.instagram.com/elite_decor_1992" },
              { icon: <Share2 size={20} />, href: "https://www.facebook.com/share/18HYJb8QHS/" },
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary/10 rounded-xl text-primary hover:bg-primary hover:text-background transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
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
        <p>© {new Date().getFullYear()} Elite Decor Interior Company. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
