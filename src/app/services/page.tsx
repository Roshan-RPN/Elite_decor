"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Palette, Home, Building2, Layout } from "lucide-react";
import PageWrapper from "@/components/animations/PageWrapper";
import TiltCard from "@/components/ui/TiltCard";
import { MaskLines, ImageReveal, FocusIn } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

const services = [
  {
    title: "Bespoke Modular Kitchens",
    category: "Kitchen",
    description: "Where culinary art meets high-end engineering. We create ergonomically optimized kitchens that blend seamless functionality with sophisticated aesthetics.",
    features: ["Custom Cabinetry", "Premium Countertops", "Smart Storage Solutions", "High-End Fittings"],
    icon: <Layout size={28} />,
    image: "/assets/projects/kitchen_mint.png"
  },
  {
    title: "Luxury Wardrobe Solutions",
    category: "Wardrobe",
    description: "Intelligent storage systems and premium walk-in closets tailored to your personal style and spatial requirements.",
    features: ["Sliding & Hinged Systems", "Built-in Organizers", "Premium Mirror Finishes", "Integrated Lighting"],
    icon: <Palette size={28} />,
    image: "/assets/projects/wardrobe_black_gold.png"
  },
  {
    title: "Signature Living Spaces",
    category: "Sitting Room",
    description: "Crafting the social heart of your home. We design sitting rooms and lounges that exude luxury and invite comfort.",
    features: ["Custom Media Units", "Accent Wall Design", "Furniture Curation", "Mood Lighting"],
    icon: <Home size={28} />,
    image: "/assets/projects/sitting_room_black_sofa.png"
  },
  {
    title: "Executive Workspaces",
    category: "Office",
    description: "Designing high-performance professional environments that foster productivity and project corporate authority.",
    features: ["Ergonomic Desks", "Storage Management", "Acoustic Solutions", "Corporate Styling"],
    icon: <Building2 size={28} />,
    image: "/assets/projects/office_wood_desk.png"
  }
];

export default function ServicesPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen pt-36 md:pt-40 pb-24 px-6 bg-background text-foreground overflow-x-clip">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24 space-y-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-primary hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-[-0.02em] leading-[1] uppercase">
              <MaskLines
                inView={false}
                delay={0.15}
                lines={["Custom Design", <span key="e" className="gold-gradient gold-sheen italic pr-[0.2em]">Expertise</span>]}
              />
            </h1>
            <FocusIn inView={false} delay={0.5}>
              <p className="text-white/75 max-w-lg leading-relaxed">
                We offer an end-to-end design journey, ensuring that every detail of your environment is meticulously planned and executed.
              </p>
            </FocusIn>
          </div>

          <div className="grid grid-cols-1 gap-20 md:gap-28">
            {services.map((service, idx) => {
              const flipped = idx % 2 !== 0;
              return (
                <div
                  key={service.title}
                  className={cn(
                    "flex flex-col lg:flex-row gap-10 lg:gap-16 items-center",
                    flipped && "lg:flex-row-reverse"
                  )}
                >
                  <TiltCard max={3} className="w-full lg:w-1/2 rounded-2xl">
                    <ImageReveal
                      from={flipped ? "right" : "left"}
                      className="group relative aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)]"
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </ImageReveal>
                  </TiltCard>

                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
                    className="w-full lg:w-1/2 space-y-6"
                  >
                    {[
                      <div key="icon" className="text-cta">{service.icon}</div>,
                      <div key="head" className="space-y-3">
                        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary border-b border-primary pb-1">
                          {service.category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold">{service.title}</h2>
                      </div>,
                      <p key="desc" className="text-white/70 leading-relaxed text-lg max-w-xl">
                        {service.description}
                      </p>,
                    ].map((node) => (
                      <motion.div
                        key={node.key}
                        variants={{
                          hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                          show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
                        }}
                      >
                        {node}
                      </motion.div>
                    ))}

                    <motion.ul
                      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {service.features.map((feat) => (
                        <motion.li
                          key={feat}
                          variants={{
                            hidden: { opacity: 0, x: -12 },
                            show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
                          }}
                          className="flex items-center gap-2 text-sm text-primary font-medium"
                        >
                          <CheckCircle2 size={16} className="text-cta shrink-0" />
                          {feat}
                        </motion.li>
                      ))}
                    </motion.ul>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
                      }}
                      className="pt-2"
                    >
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gold-btn font-bold uppercase tracking-widest hover:-translate-y-0.5"
                      >
                        Enquire Now <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
