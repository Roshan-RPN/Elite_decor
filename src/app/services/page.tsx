"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Palette, Home, Building2, Layers, PenTool, Layout } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function ServiceImage({ image, title }: { image: string, title: string }) {
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.98 }}
      className="w-full lg:w-1/2 aspect-video rounded-[40px] overflow-hidden relative group cursor-pointer shadow-2xl perspective-1000"
    >
      <div style={{ transform: "translateZ(20px)" }} className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-500" />
      </div>
    </motion.div>
  );
}

const services = [
  {
    title: "Bespoke Modular Kitchens",
    category: "Kitchen",
    description: "Where culinary art meets high-end engineering. We create ergonomically optimized kitchens that blend seamless functionality with sophisticated aesthetics.",
    features: ["Custom Cabinetry", "Premium Countertops", "Smart Storage Solutions", "High-End Fittings"],
    icon: <Layout size={40} />,
    image: "/assets/projects/kitchen_mint.png"
  },
  {
    title: "Luxury Wardrobe Solutions",
    category: "Wardrobe",
    description: "Intelligent storage systems and premium walk-in closets tailored to your personal style and spatial requirements.",
    features: ["Sliding & Hinged Systems", "Built-in Organizers", "Premium Mirror Finishes", "Integrated Lighting"],
    icon: <Palette size={40} />,
    image: "/assets/projects/wardrobe_black_gold.png"
  },
  {
    title: "Signature Living Spaces",
    category: "Sitting Room",
    description: "Crafting the social heart of your home. We design sitting rooms and lounges that exude luxury and invite comfort.",
    features: ["Custom Media Units", "Accent Wall Design", "Furniture Curation", "Mood Lighting"],
    icon: <Home size={40} />,
    image: "/assets/projects/sitting_room_black_sofa.png"
  },
  {
    title: "Executive Workspaces",
    category: "Office",
    description: "Designing high-performance professional environments that foster productivity and project corporate authority.",
    features: ["Ergonomic Desks", "Storage Management", "Acoustic Solutions", "Corporate Styling"],
    icon: <Building2 size={40} />,
    image: "/assets/projects/office_wood_desk.png"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 bg-background text-foreground overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tighter leading-[0.9] uppercase px-4">
              Custom Design <span className="gold-gradient italic pr-8 -mr-8 inline-block">Expertise</span>
            </h1>
            <p className="text-white/70 max-w-lg leading-relaxed">
              We offer an end-to-end design journey, ensuring that every detail of your environment is meticulously planned and executed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-20">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className={cn(
                "flex flex-col lg:flex-row gap-12 items-center",
                idx % 2 !== 0 && "lg:flex-row-reverse"
              )}
            >
              <ServiceImage image={service.image} title={service.title} />

              <div className="w-full lg:w-1/2 space-y-6">
                <div className="text-cta mb-2">{service.icon}</div>
                <div className="space-y-2">
                  <span className="text-xs font-medium tracking-widest uppercase text-primary border-b-2 border-primary w-fit pb-1">
                    {service.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold">{service.title}</h2>
                </div>
                <p className="text-white/60 leading-relaxed text-lg">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-sm text-primary font-medium">
                      <CheckCircle2 size={16} className="text-cta" />
                      {feat}
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gold-btn font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  Enquire Now <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
