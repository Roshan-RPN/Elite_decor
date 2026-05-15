"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, UserCircle, Sparkles, ShieldCheck, Zap, Gem } from "lucide-react";
import Link from "next/link";
import PageWrapper from "@/components/animations/PageWrapper";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen pt-40 pb-20 px-6 bg-background text-foreground overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Premium Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="space-y-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-white transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
              </Link>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tighter leading-[0.9] uppercase"
              >
                Our <span className="gold-gradient italic px-8 md:px-12 -mx-8 md:-mx-12 inline-block">Legacy</span> <br /> of Design
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-white/70 max-w-xl text-lg leading-relaxed font-body font-light"
              >
                Elite Decor is a premier interior design studio dedicated to crafting 
                extraordinary environments. We believe that every space should be a 
                refined reflection of your unique identity.
              </motion.p>
            </div>
          </div>

          {/* Philosophy Section - Liquid Glass Split */}
          <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
              className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl cursor-pointer"
            >
              <img
                src="https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/480750678_947939020802610_8475343886349595597_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IpNDfyAmJAQQ7kNvwEr_8FA&_nc_oc=AdqLfqUuO9sHdKkVAA6Nr16tTNyzzewO7twZ6HxUZVpemfWZdc0LxGP_8Hv3A6R3USk&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=EOINXLUnL9RS_8nGdSPzHw&_nc_ss=7b2a8&oh=00_Af45KmxuxePQRiP_wJeyqEYFkXEXXDyjR4QibkNBMX4M2Q&oe=6A0BD7CF"
                alt="Elite Interiors"
                className="w-full h-full object-cover grayscale-[0.1]"
              />
              <div className="absolute inset-0 premium-overlay opacity-60" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 text-white">
                <h3 className="text-xl font-heading font-bold mb-2">The Studio</h3>
                <p className="text-sm text-white/60">Where vision meets precision to create timeless masterpieces.</p>
              </div>
            </motion.div>

            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Gem size={20} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">Our Philosophy</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold leading-snug">
                  "Quiet Luxury" <br /> & The Art of Space
                </h2>
                <p className="text-white/60 text-lg leading-relaxed font-light">
                  We specialize in a design language where quality speaks louder than logos. 
                  Our focus is on the meticulous selection of materials and the flawless 
                  execution of every detail.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Award />, title: "Excellence", desc: "Setting global standards." },
                  { icon: <ShieldCheck />, title: "Precision", desc: "Meticulous execution." },
                  { icon: <Zap />, title: "Innovation", desc: "Modern tech, timeless art." },
                  { icon: <UserCircle />, title: "Custom", desc: "Tailored to your life." },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    viewport={{ once: true }}
                    whileTap={{ scale: 0.95 }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="text-primary mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h4 className="font-heading font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* The Process */}
          <section className="py-20">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-heading font-bold">The Journey</h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Discovery", desc: "Exploring your lifestyle and the vision for your extraordinary space." },
                { step: "02", title: "Design", desc: "Translating concepts into precise 3D models and material palettes." },
                { step: "03", title: "Seamless Handover", desc: "Flawless execution from initial concept to your ready-to-live space." },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileTap={{ scale: 0.98 }}
                  className="p-10 rounded-[40px] bg-secondary border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-xl relative group cursor-pointer"
                >
                  <span className="absolute top-8 right-8 text-6xl font-heading font-bold text-white/5 group-hover:text-primary/10 transition-colors">
                    {step.step}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-heading font-bold mb-4">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed font-body font-light">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="relative py-20 px-8 bg-primary text-background rounded-[60px] text-center overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 premium-overlay opacity-20" />
            <div className="relative z-10 space-y-8 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-background">Ready to transform your space?</h2>
              <p className="text-background/70 max-w-2xl mx-auto text-lg px-4 font-light">
                Experience the pinnacle of interior design in Kochi.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 bg-background text-primary rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Get Started <ArrowRight size={20} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
