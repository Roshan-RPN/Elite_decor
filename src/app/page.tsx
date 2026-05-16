"use client";

import React from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Home, Building2, Palette, Layout, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import PageWrapper from "@/components/animations/PageWrapper";

function ServiceCard({ service, idx }: { service: any, idx: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-[450px] md:h-[500px] rounded-3xl overflow-hidden glass-card cursor-pointer"
      onClick={() => window.location.href = `/portfolio?category=${service.category}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="absolute inset-0">
        <img 
          src={service.image} 
          alt={service.title} 
          className="absolute inset-0 w-full h-full object-cover brightness-100 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-500 z-10" />
        <div className="absolute inset-0 premium-overlay opacity-40 pointer-events-none" />
      </div>
      
      <div style={{ transform: "translateZ(50px)" }} className="absolute bottom-0 left-0 w-full p-8 z-20 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500">
        <div className="mb-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
          {service.icon}
        </div>
        <h4 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">{service.title}</h4>
        <p className="text-white/60 text-sm leading-relaxed md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
          {service.desc}
        </p>
        <div className="mt-6 w-10 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <PageWrapper>
      <div className="flex flex-col overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
          <motion.div 
            style={{ y: y1, opacity }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/70 z-10" />
            <img 
              src="/assets/hero.png" 
              alt="Elite Luxury Interior" 
              className="w-full h-full object-cover scale-105"
            />
          </motion.div>

          <div className="relative z-20 max-w-7xl mx-auto text-center space-y-6 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold leading-[1.1] md:leading-[0.9] tracking-tighter text-white uppercase flex flex-col items-center">
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="block"
                >
                  CRAFTING
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="gold-gradient italic px-6 -mx-6 inline-block"
                >
                  LEGACIES
                </motion.span>
              </h1>
            </motion.div>
 
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-2xl text-white/80 max-w-2xl mx-auto font-body font-light leading-relaxed tracking-wide px-4"
            >
              Transforming spaces into extraordinary environments with a focus on 
              sophisticated design and flawless execution. Based in Kochi.
            </motion.p>
 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4"
            >
              <Link
                href="/portfolio"
                className="group relative px-10 py-5 bg-primary text-background rounded-xl font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a
                href="https://wa.me/919061486768"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-xl font-bold uppercase tracking-widest border border-white/20 hover:bg-white/10 transition-all duration-300 text-white w-full sm:w-auto text-center"
              >
                WhatsApp Inquiry
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent"
            />
          </motion.div>
        </section>

        {/* Art of Living Section */}
        <section className="py-32 px-6 bg-secondary relative overflow-hidden text-center lg:text-left">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary">The Vision</h2>
                <h3 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                  The Art of <br />
                  <span className="gold-gradient italic pr-8 -mr-8 inline-block">Modern Living</span>
                </h3>
              </div>
              <p className="text-foreground/70 text-lg leading-relaxed font-light mx-auto lg:mx-0 max-w-2xl">
                Elite Decor is a premier home interior company in Ernakulam with over 20 years of expertise. 
                We specialize in blending architectural precision with artistic flair to create 
                interiors that are both luxurious and deeply personal.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6 max-w-md mx-auto lg:mx-0">
                {[
                  { label: "Design Philosophy", value: "Premium" },
                  { label: "Execution", value: "Flawless" },
                  { label: "Focus", value: "Client" },
                  { label: "Quality", value: "Elite" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-foreground/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden glass-card p-2 shadow-2xl"
            >
              <img 
                src="/assets/kitchen.png" 
                alt="Elite Kitchen" 
                className="w-full h-full object-cover rounded-2xl brightness-100"
              />
              <div className="absolute inset-0 premium-overlay pointer-events-none" />
              <div className="absolute bottom-8 left-8 p-6 glass-card rounded-2xl max-w-xs text-left hidden sm:block">
                <Star className="text-primary mb-2" size={20} fill="currentColor" />
                <p className="text-sm italic text-foreground/90 font-light">
                  "Detail is the difference between good and extraordinary."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-32 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary">Specializations</h2>
              <h3 className="text-4xl md:text-6xl font-heading font-bold">Design Excellence</h3>
              <div className="w-20 h-[1px] bg-primary mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { 
                  title: "Kitchen Cabinets", 
                  image: "/assets/kitchen.png",
                  desc: "Custom-designed modular kitchens that combine ergonomic perfection with high-end aesthetics.",
                  icon: <Layout className="text-primary" size={24} />,
                  category: "Kitchen"
                },
                { 
                  title: "Luxury Wardrobes", 
                  image: "/assets/wardrobe.png",
                  desc: "Intelligent storage solutions and premium walk-in closets tailored to your lifestyle.",
                  icon: <Palette className="text-primary" size={24} />,
                  category: "Interior"
                },
                { 
                  title: "Designer TV Units", 
                  image: "/assets/hero.png",
                  desc: "Sophisticated entertainment hubs that serve as the focal point of your modern living space.",
                  icon: <Home className="text-primary" size={24} />,
                  category: "Interior"
                },
              ].map((service, idx) => (
                <ServiceCard key={idx} service={service} idx={idx} />
              ))}
            </div>
          </div>
        </section>
 
        {/* Portfolio Preview Section */}
        <section className="py-32 px-6 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary">Showcase</h2>
                <h3 className="text-4xl md:text-6xl font-heading font-bold leading-tight">Elite <span className="gold-gradient italic pr-8 -mr-8 inline-block">Masterpieces</span></h3>
              </div>
              <Link 
                href="/portfolio" 
                className="group flex items-center justify-center md:justify-start gap-3 text-primary font-bold uppercase tracking-widest hover:gap-5 transition-all duration-300"
              >
                View Collection <ArrowRight size={20} />
              </Link>
            </div>
  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileTap={{ scale: 0.98 }}
                className="relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden group cursor-pointer shadow-2xl"
              >
                  <img src="/assets/projects/kitchen_mint.png" alt="Culinary Hub" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-500" />
                <div className="absolute inset-0 premium-overlay opacity-30 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Link href="/portfolio?category=Kitchen" className="px-10 py-4 bg-white text-black font-bold rounded-full uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-transform">View Kitchen</Link>
                </div>
                <div className="absolute bottom-10 left-10 space-y-2 md:group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-[10px] text-primary uppercase tracking-widest font-bold">Kochi, Kerala</span>
                  <h4 className="text-2xl md:text-3xl font-heading font-bold text-white">The Culinary Hub</h4>
                </div>
              </motion.div>
  
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-[240px] md:h-[280px] rounded-[30px] overflow-hidden group shadow-xl cursor-pointer"
                >
                  <img src="/assets/projects/office_wood_desk.png" alt="Office Suites" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-500" />
                  <div className="absolute inset-0 premium-overlay opacity-30 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link href="/portfolio?category=Office" className="px-10 py-4 bg-white text-black font-bold rounded-full uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-transform">View Office</Link>
                  </div>
                  <div className="absolute bottom-8 left-8 md:group-hover:opacity-0 transition-opacity duration-300">
                    <h4 className="text-xl font-heading font-bold text-white">Office Suites</h4>
                  </div>
                </motion.div>
  
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-[240px] md:h-[280px] rounded-[30px] overflow-hidden group shadow-xl cursor-pointer"
                >
                  <img src="/assets/projects/wardrobe_black_gold.png" alt="Wardrobes" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-500" />
                  <div className="absolute inset-0 premium-overlay opacity-30 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link href="/portfolio?category=Interior" className="px-10 py-4 bg-white text-black font-bold rounded-full uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-transform">View Wardrobes</Link>
                  </div>
                  <div className="absolute bottom-8 left-8 md:group-hover:opacity-0 transition-opacity duration-300">
                    <h4 className="text-xl font-heading font-bold text-white">Wardrobe Mastery</h4>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 bg-background">
          <div className="max-w-7xl mx-auto rounded-[40px] bg-primary relative overflow-hidden px-8 py-20 text-center flex flex-col items-center shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-10 flex flex-col items-center"
            >
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-background leading-tight">
                Ready to Elevate <br /> Your Vision?
              </h2>
              <p className="text-background/70 text-lg max-w-xl mx-auto font-body font-light px-4">
                Let's discuss how we can transform your space into a masterpiece. 
                Our experts are ready to bring your dreams to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
                <Link
                  href="/contact"
                  className="bg-background text-primary px-12 py-5 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center shadow-xl"
                >
                  Start a Project
                </Link>
                <a
                  href="tel:+919061486768"
                  className="bg-transparent text-background font-bold uppercase tracking-widest border-2 border-background px-12 py-5 rounded-xl hover:bg-background/10 transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Call +91 90614 86768
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
