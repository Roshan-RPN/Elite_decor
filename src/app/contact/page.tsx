"use client";

import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/animations/PageWrapper";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <PageWrapper>
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold leading-[0.9] tracking-tighter uppercase">Get in <br /><span className="gold-gradient italic">Touch</span></h1>
              <p className="text-foreground/60 max-w-md font-body font-light leading-relaxed">
                Whether you have a specific project in mind or just want to explore possibilities, 
                our design consultants are here to help.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: <Phone className="text-primary" />, title: "Phone", value: "+91 90614 86768", href: "tel:+919061486768" },
                { icon: <Mail className="text-primary" />, title: "Email", value: "elitedecorkochin@gmail.com", href: "mailto:elitedecorkochin@gmail.com" },
                { icon: <MapPin className="text-primary" />, title: "Location", value: "Kochi, Kerala, India", href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex gap-6 group">
                  <div className="p-4 glass-card rounded-2xl group-hover:bg-primary/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{item.title}</div>
                    <div className="text-xl font-body font-medium group-hover:text-primary transition-colors">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 rounded-[40px] space-y-8 relative overflow-hidden"
          >
            {/* Subtle glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-mint/5 blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-2">First Name</label>
                <input type="text" className="w-full bg-secondary/50 border border-primary/20 rounded-2xl p-4 focus:border-primary outline-none transition-all duration-300 font-body text-white placeholder:text-white/20 shadow-inner" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-2">Last Name</label>
                <input type="text" className="w-full bg-secondary/50 border border-primary/20 rounded-2xl p-4 focus:border-primary outline-none transition-all duration-300 font-body text-white placeholder:text-white/20 shadow-inner" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2 relative z-10">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-2">Email Address</label>
              <input type="email" className="w-full bg-secondary/50 border border-primary/20 rounded-2xl p-4 focus:border-primary outline-none transition-all duration-300 font-body text-white placeholder:text-white/20 shadow-inner" placeholder="john@example.com" />
            </div>
            <div className="space-y-2 relative z-10">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary px-2">Message</label>
              <textarea rows={4} className="w-full bg-secondary/50 border border-primary/20 rounded-2xl p-4 focus:border-primary outline-none transition-all duration-300 font-body text-white placeholder:text-white/20 resize-none shadow-inner" placeholder="Tell us about your project..." />
            </div>
            <button className="w-full gold-btn py-5 rounded-2xl font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-[0.98] shadow-lg shadow-primary/20 relative z-10">
              Send Inquiry <Send size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
