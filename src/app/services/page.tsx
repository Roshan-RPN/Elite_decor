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
    title: "Luxury Residential Design",
    category: "Homes",
    description: "Creating sanctuaries of luxury. From presidential suites to sprawling villas, we design every room to reflect your status and style.",
    features: ["Custom Furniture", "Lighting Design", "Material Sourcing", "Full Turnkey Execution"],
    icon: <Home size={40} />,
    image: "https://images.unsplash.com/photo-1616594084638-30cf7aba077a?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Corporate Interior Architecture",
    category: "Business",
    description: "Designing high-performance workspaces that foster creativity and project professional authority.",
    features: ["Ergonomic Planning", "Brand Integration", "Boardroom Excellence", "Acoustic Optimization"],
    icon: <Building2 size={40} />,
    image: "https://images.unsplash.com/photo-1497366216548-375260702979?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Custom Kitchens & Baths",
    category: "Specialized",
    description: "Where culinary art meets engineering. We create kitchens and bathrooms that are as functional as they are beautiful.",
    features: ["Smart Kitchen Tech", "Premium Marble Finish", "Custom Cabinetry", "Efficient Plumbing Flows"],
    icon: <Layers size={40} />,
    image: "https://images.unsplash.com/photo-1556911220-07639a747f75?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Artistic Decor & Styling",
    category: "Curation",
    description: "The final touch that defines the space. We source the finest art and accessories to complete your interior's soul.",
    features: ["Art Curation", "Fabric Selection", "Custom Installations", "Seasonal Styling"],
    icon: <Palette size={40} />,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
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
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-background font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg shadow-primary/20"
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
