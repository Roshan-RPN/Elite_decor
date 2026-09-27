"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Award, UserCircle, ShieldCheck, Zap, Gem } from "lucide-react";
import PageWrapper from "@/components/animations/PageWrapper";
import { MaskLines, ImageReveal, FocusIn } from "@/components/animations/Reveal";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen pt-36 md:pt-40 pb-24 px-6 bg-background text-foreground overflow-x-clip">
        <div className="max-w-6xl mx-auto">
          {/* Premium Header */}
          <div className="mb-20 md:mb-28 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-white transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-[-0.02em] leading-[1] uppercase">
              <MaskLines
                inView={false}
                delay={0.15}
                lines={[
                  <>Our <span className="gold-gradient gold-sheen italic pr-[0.15em]">Legacy</span></>,
                  "of Design",
                ]}
              />
            </h1>
            <FocusIn inView={false} delay={0.5}>
              <p className="text-white/75 max-w-xl text-lg leading-relaxed font-body font-light">
                Elite Decor is a premier interior design studio dedicated to crafting
                extraordinary environments. We believe that every space should be a
                refined reflection of your unique identity.
              </p>
            </FocusIn>
          </div>

          {/* Philosophy Section */}
          <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
            <ImageReveal from="left" className="relative aspect-square max-w-[480px] w-full mx-auto lg:mx-0 rounded-2xl overflow-hidden ring-1 ring-primary/15 bg-black">
              <Image
                src="/assets/logo.png"
                alt="Elite Decor emblem"
                fill
                sizes="480px"
                className="object-contain p-14"
              />
              <div className="absolute inset-0 premium-overlay opacity-60" />
              <div className="absolute bottom-5 left-5 right-5 p-5 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-white">
                <h3 className="text-lg font-heading font-bold mb-1">The Studio</h3>
                <p className="text-sm text-white/70">Where vision meets precision to create timeless masterpieces.</p>
              </div>
            </ImageReveal>

            <div className="space-y-10">
              <div className="space-y-6">
                <FocusIn className="flex items-center gap-3 text-primary">
                  <Gem size={20} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">Our Philosophy</span>
                </FocusIn>
                <h2 className="text-3xl md:text-4xl font-heading font-bold leading-snug">
                  <MaskLines lines={["“Quiet Luxury”", "& The Art of Space"]} />
                </h2>
                <FocusIn delay={0.2}>
                  <p className="text-white/70 text-lg leading-relaxed font-light">
                    We specialize in a design language where quality speaks louder than logos.
                    Our focus is on the meticulous selection of materials and the flawless
                    execution of every detail.
                  </p>
                </FocusIn>
              </div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                transition={{ staggerChildren: 0.07 }}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { icon: <Award size={20} />, title: "Excellence", desc: "Setting global standards." },
                  { icon: <ShieldCheck size={20} />, title: "Precision", desc: "Meticulous execution." },
                  { icon: <Zap size={20} />, title: "Innovation", desc: "Modern tech, timeless art." },
                  { icon: <UserCircle size={20} />, title: "Custom", desc: "Tailored to your life." },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={rise}
                    className="p-4 md:p-5 rounded-xl bg-white/[0.03] border border-white/10 transition-colors duration-500 hover:border-primary/40 hover:bg-white/[0.06] group"
                  >
                    <div className="text-primary mb-3 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:scale-110 origin-left">{item.icon}</div>
                    <h4 className="font-heading font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-white/60 text-xs">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* The Process */}
          <section className="pb-20 md:pb-24">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-heading font-bold">
                <MaskLines lines={["The Journey"]} />
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.2 }}
                className="w-16 h-px bg-primary mx-auto"
              />
            </div>

            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              transition={{ staggerChildren: 0.14 }}
              className="relative grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {/* Connecting thread that draws across the three steps */}
              <motion.span
                aria-hidden
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.6, ease: EASE_OUT_EXPO } } }}
                className="hidden md:block absolute top-1/2 left-6 right-6 h-px origin-left bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0"
              />
              {[
                { step: "01", title: "Discovery", desc: "Exploring your lifestyle and the vision for your extraordinary space." },
                { step: "02", title: "Design", desc: "Translating concepts into precise 3D models and material palettes." },
                { step: "03", title: "Seamless Handover", desc: "Flawless execution from initial concept to your ready-to-live space." },
              ].map((step) => (
                <motion.li
                  key={step.step}
                  variants={rise}
                  className="relative p-7 md:p-8 rounded-2xl bg-secondary border border-white/5 transition-all duration-500 ease-[var(--ease-out-expo)] hover:border-primary/30 hover:-translate-y-1 group"
                >
                  <span className="absolute top-6 right-6 text-5xl font-heading font-bold text-white/5 transition-colors duration-500 group-hover:text-primary/20">
                    {step.step}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 pr-14">{step.title}</h3>
                    <p className="text-white/70 leading-relaxed font-body font-light">{step.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </section>

          {/* Final CTA */}
          <section className="relative py-16 md:py-20 px-6 md:px-8 bg-primary text-background rounded-3xl text-center overflow-hidden flex flex-col items-center">
            <div aria-hidden className="ambient-glow absolute -top-1/2 left-1/4 w-[70%] aspect-square rounded-full bg-white/35 blur-[100px] pointer-events-none" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(184,134,11,0.45),transparent_60%)] pointer-events-none" />
            <div className="relative z-10 space-y-7 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-background">
                <MaskLines lines={["Ready to transform your space?"]} />
              </h2>
              <FocusIn delay={0.2}>
                <p className="text-background/75 max-w-2xl mx-auto text-lg px-4 font-light">
                  Experience the pinnacle of interior design in Kochi.
                </p>
              </FocusIn>
              <FocusIn delay={0.35}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-9 py-4 bg-background text-primary rounded-xl font-bold uppercase tracking-widest shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
                >
                  Get Started <ArrowRight size={20} className="transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </FocusIn>
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
