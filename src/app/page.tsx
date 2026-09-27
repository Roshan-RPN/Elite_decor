"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Home, Palette, Layout, Star } from "lucide-react";
import PageWrapper from "@/components/animations/PageWrapper";
import TiltCard from "@/components/ui/TiltCard";
import { MaskLines, ImageReveal, FocusIn, DrawLine } from "@/components/animations/Reveal";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

type Service = {
  title: string;
  image: string;
  desc: string;
  icon: React.ReactNode;
  category: string;
};

const services: Service[] = [
  {
    title: "Kitchen Cabinets",
    image: "/assets/kitchen.png",
    desc: "Custom-designed modular kitchens that combine ergonomic perfection with high-end aesthetics.",
    icon: <Layout className="text-primary" size={22} />,
    category: "Kitchen",
  },
  {
    title: "Luxury Wardrobes",
    image: "/assets/wardrobe.png",
    desc: "Intelligent storage solutions and premium walk-in closets tailored to your lifestyle.",
    icon: <Palette className="text-primary" size={22} />,
    category: "Wardrobe",
  },
  {
    title: "Designer TV Units",
    image: "/assets/hero.png",
    desc: "Sophisticated entertainment hubs that serve as the focal point of your modern living space.",
    icon: <Home className="text-primary" size={22} />,
    category: "Interior",
  },
];

const showcase = [
  { title: "The Culinary Hub", label: "View Kitchen", image: "/assets/projects/kitchen_mint.png", category: "Kitchen", place: "Kochi, Kerala" },
  { title: "Office Suites", label: "View Office", image: "/assets/projects/office_wood_desk.png", category: "Office" },
  { title: "Wardrobe Mastery", label: "View Wardrobes", image: "/assets/projects/wardrobe_black_gold.png", category: "Wardrobe" },
];

function ServiceCard({ service, idx }: { service: Service; idx: number }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0% round 16px)", y: 40 }}
      // Release the clip once open so the tilted card's corners aren't shaved.
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)", y: 0, transitionEnd: { clipPath: "none" } }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: idx * 0.12 }}
    >
      <TiltCard className="rounded-2xl">
        <Link
          href={`/portfolio?category=${service.category}`}
          className="group relative block h-[340px] sm:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-secondary"
        >
          <motion.div
            initial={{ scale: 1.3 }}
            whileInView={{ scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: idx * 0.12 }}
            className="absolute inset-0"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
            />
          </motion.div>
          <div className="absolute inset-0 premium-overlay" />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-700 ease-[var(--ease-out-expo)] group-hover:bg-black/45" />

          <span className="absolute top-5 right-5 z-20 grid place-items-center w-10 h-10 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm text-white transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-primary group-hover:border-primary group-hover:text-background group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>

          <div className="absolute bottom-0 left-0 w-full p-6 lg:p-7 z-20">
            <div className="mb-3">{service.icon}</div>
            <h4 className="text-xl lg:text-2xl font-heading font-bold text-white">{service.title}</h4>
            {/* Description unfolds on hover (desktop); grid-rows animates to its natural height. */}
            <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)]">
              <div className="overflow-hidden">
                <p className="pt-2 text-white/80 text-sm leading-relaxed max-w-xs lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {service.desc}
                </p>
              </div>
            </div>
            <div className="mt-5 h-px w-10 bg-primary origin-left transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-[8]" />
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}

function ShowcaseCard({
  item,
  className,
  from,
  delay = 0,
  large = false,
}: {
  item: (typeof showcase)[number];
  className: string;
  from: "left" | "right";
  delay?: number;
  large?: boolean;
}) {
  return (
    <ImageReveal from={from} delay={delay} className={`relative rounded-2xl overflow-hidden ${className}`}>
      <Link href={`/portfolio?category=${item.category}`} className="group absolute inset-0 block">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={large ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 premium-overlay" />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/35" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 space-y-1.5">
          {item.place && (
            <span className="block text-[11px] text-primary uppercase tracking-widest font-bold">{item.place}</span>
          )}
          <h4 className={`${large ? "text-2xl md:text-3xl" : "text-xl"} font-heading font-bold text-white transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1`}>
            {item.title}
          </h4>
          <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[var(--ease-out-expo)]">
            {item.label} <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </ImageReveal>
  );
}

const heroLetters = "CRAFTING".split("");

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const heroFade = useTransform(scrollY, [0, 500], [1, 0.2]);
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);
  const contentFade = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <PageWrapper>
      <div className="flex flex-col overflow-x-clip">
        {/* Hero Section */}
        <section className="relative h-[100svh] min-h-[640px] flex items-center justify-center px-6 overflow-hidden">
          <motion.div style={{ y: heroY, scale: heroScale, opacity: heroFade }} className="absolute inset-0 z-0">
            <motion.div
              initial={{ scale: 1.22, filter: "blur(14px) brightness(0.4)" }}
              animate={{ scale: 1.04, filter: "blur(0px) brightness(1)", transitionEnd: { filter: "none" } }}
              transition={{ duration: 2.2, ease: EASE_OUT_EXPO }}
              className="absolute inset-0"
            >
              <Image src="/assets/hero.png" alt="Elite luxury interior by Elite Decor" fill preload sizes="100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
          </motion.div>

          <motion.div
            style={{ y: contentY, opacity: contentFade }}
            className="relative z-20 max-w-5xl mx-auto text-center pt-20 md:pt-28"
          >
            <h1 className="font-heading font-bold uppercase text-white leading-[1.02] tracking-[-0.02em] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl flex flex-col items-center">
              <span className="sr-only">Crafting Legacies</span>
              <motion.span
                aria-hidden
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.05, delayChildren: 0.45 }}
                className="flex overflow-hidden pb-[0.08em]"
              >
                {heroLetters.map((ch, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: "115%", rotate: 8 },
                      show: { y: "0%", rotate: 0, transition: { duration: 1.2, ease: EASE_OUT_EXPO } },
                    }}
                    className="inline-block origin-bottom-left"
                  >
                    {ch}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span
                aria-hidden
                initial={{ clipPath: "inset(0% 100% 0% 0%)", x: -12 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", x: 0 }}
                transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay: 1.0 }}
                className="gold-gradient gold-sheen italic px-[0.15em] -mx-[0.15em] pb-[0.08em]"
              >
                LEGACIES
              </motion.span>
            </h1>

            <motion.span
              aria-hidden
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 1.4 }}
              className="block mx-auto mt-7 md:mt-9 h-px w-28 bg-gradient-to-r from-transparent via-primary to-transparent"
            />

            <FocusIn inView={false} delay={1.55}>
              <p className="mt-7 md:mt-9 text-base md:text-xl text-white/80 max-w-2xl mx-auto font-body font-light leading-relaxed tracking-wide px-2">
                Transforming spaces into extraordinary environments with a focus on
                sophisticated design and flawless execution. Based in Kochi.
              </p>
            </FocusIn>

            <motion.div
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 1.75 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-9"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } } }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/portfolio"
                  className="group gold-btn flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold uppercase tracking-widest hover:-translate-y-0.5"
                >
                  Explore Projects <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } } }}
                className="w-full sm:w-auto"
              >
                <a
                  href="https://wa.me/919061486768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-9 py-4 rounded-xl font-bold uppercase tracking-widest border border-primary/40 text-white text-center bg-black/20 backdrop-blur-sm transition-all duration-500 ease-[var(--ease-out-expo)] hover:border-primary hover:bg-primary/10 hover:-translate-y-0.5"
                >
                  WhatsApp Inquiry
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-white/50"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <span className="relative block h-12 w-px overflow-hidden bg-white/15">
              <motion.span
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
              />
            </span>
          </motion.div>
        </section>

        {/* Art of Living Section */}
        <section className="py-24 md:py-32 px-6 bg-secondary relative overflow-hidden text-center lg:text-left">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <FocusIn>
                  <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary">The Vision</h2>
                </FocusIn>
                <h3 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                  <MaskLines
                    lines={["The Art of", <span key="g" className="gold-gradient italic pr-[0.2em]">Modern Living</span>]}
                  />
                </h3>
              </div>
              <FocusIn delay={0.2}>
                <p className="text-foreground/75 text-lg leading-relaxed font-light mx-auto lg:mx-0 max-w-xl">
                  Elite Decor is a premier home interior company in Ernakulam with over 20 years of expertise.
                  We specialize in blending architectural precision with artistic flair to create
                  interiors that are both luxurious and deeply personal.
                </p>
              </FocusIn>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                transition={{ staggerChildren: 0.08, delayChildren: 0.3 }}
                className="grid grid-cols-2 gap-x-8 gap-y-6 pt-2 max-w-md mx-auto lg:mx-0 text-left"
              >
                {[
                  { label: "Design Philosophy", value: "Premium" },
                  { label: "Execution", value: "Flawless" },
                  { label: "Focus", value: "Client" },
                  { label: "Quality", value: "Elite" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
                    }}
                    className="space-y-1.5 border-t border-primary/20 pt-3"
                  >
                    <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                    <div className="text-[11px] uppercase tracking-widest text-foreground/60">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="relative">
              <ImageReveal from="right" className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-primary/15 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)]">
                <Image src="/assets/kitchen.png" alt="Elite Decor modular kitchen" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
                <div className="absolute inset-0 premium-overlay pointer-events-none" />
              </ImageReveal>
              <FocusIn delay={0.7} className="absolute bottom-6 left-6 hidden sm:block">
                <div className="p-5 glass-card rounded-xl max-w-[260px] text-left">
                  <Star className="text-primary mb-2" size={18} fill="currentColor" />
                  <p className="text-sm italic text-foreground/90 font-light">
                    &ldquo;Detail is the difference between good and extraordinary.&rdquo;
                  </p>
                </div>
              </FocusIn>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 md:py-32 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 md:mb-20 space-y-4">
              <FocusIn>
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary">Specializations</h2>
              </FocusIn>
              <h3 className="text-4xl md:text-6xl font-heading font-bold">
                <MaskLines lines={["Design Excellence"]} />
              </h3>
              <div className="flex justify-center pt-4">
                <DrawLine className="w-20 bg-gradient-to-r from-transparent via-primary to-transparent origin-center" delay={0.3} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <ServiceCard key={service.title} service={service} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Preview Section */}
        <section className="py-24 md:py-32 px-6 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-14 gap-6 text-center md:text-left">
              <div className="space-y-4">
                <FocusIn>
                  <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary">Showcase</h2>
                </FocusIn>
                <h3 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                  <MaskLines lines={[<>Elite <span className="gold-gradient italic pr-[0.2em]">Masterpieces</span></>]} />
                </h3>
              </div>
              <FocusIn delay={0.2}>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center justify-center gap-3 text-primary font-bold uppercase tracking-widest"
                >
                  View Collection
                  <ArrowRight size={20} className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2" />
                </Link>
              </FocusIn>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
              <ShowcaseCard item={showcase[0]} large from="left" className="h-[360px] sm:h-[440px] lg:h-[480px]" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6">
                <ShowcaseCard item={showcase[1]} from="right" delay={0.12} className="h-[240px] lg:h-[228px]" />
                <ShowcaseCard item={showcase[2]} from="right" delay={0.24} className="h-[240px] lg:h-[228px]" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 px-6 bg-background">
          <div className="max-w-6xl mx-auto rounded-3xl bg-primary relative overflow-hidden px-6 md:px-8 py-16 md:py-20 text-center flex flex-col items-center">
            <div aria-hidden className="ambient-glow absolute -top-1/2 left-1/4 w-[70%] aspect-square rounded-full bg-white/35 blur-[100px] pointer-events-none" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(184,134,11,0.45),transparent_60%)] pointer-events-none" />

            <div className="relative z-10 space-y-8 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-background leading-tight">
                <MaskLines lines={["Ready to Elevate", "Your Vision?"]} />
              </h2>
              <FocusIn delay={0.25}>
                <p className="text-background/75 text-lg max-w-xl mx-auto font-body font-light px-2">
                  Let&apos;s discuss how we can transform your space into a masterpiece.
                  Our experts are ready to bring your dreams to life.
                </p>
              </FocusIn>
              <FocusIn delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto whitespace-nowrap">
                <Link
                  href="/contact"
                  className="group bg-background text-primary px-10 py-4 rounded-xl font-bold uppercase tracking-widest w-full sm:w-auto text-center shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(0,0,0,0.7)]"
                >
                  Start a Project
                </Link>
                <a
                  href="tel:+919061486768"
                  className="text-background font-bold uppercase tracking-widest border-2 border-background/80 px-8 py-4 rounded-xl w-full sm:w-auto text-center transition-all duration-500 ease-[var(--ease-out-expo)] hover:bg-background hover:text-primary hover:-translate-y-0.5"
                >
                  Call +91 90614 86768
                </a>
              </FocusIn>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
