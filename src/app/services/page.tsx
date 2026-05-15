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
    image: "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/484427189_963514095911769_340482014535653257_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=NsurAQtg5noQ7kNvwFQpARf&_nc_oc=Ado8POT0-hPY9MM2QFinCZSiYt3bRmaC6C-rH0lrcK0ejMzUOb88wuHR4ube2Wh-qQg&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=Vn6mqI-k6iHEImUAvWGL6A&_nc_ss=7b2a8&oh=00_Af5UJ4OxnTF4P5CfJdWfmELp-kJIGn8vcLOfMWND33W1Qg&oe=6A0BD9E7"
  },
  {
    title: "Corporate Interior Architecture",
    category: "Business",
    description: "Designing high-performance workspaces that foster creativity and project professional authority.",
    features: ["Ergonomic Planning", "Brand Integration", "Boardroom Excellence", "Acoustic Optimization"],
    icon: <Building2 size={40} />,
    image: "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/539403562_1082762387320272_2082729292234331129_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=yvR2JcKBoqgQ7kNvwG3y8A5&_nc_oc=Adq0vHhmWPcT57KZlEg1hhftxvKMJs9QUAwzSIKiRjB8N9ns4EJE52mxs5pogMdmq9Y&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=WX-lk3CpedFFznfM2UgVQA&_nc_ss=7b2a8&oh=00_Af5V8FwvtlHDkfZnEYetCr53ifshXZ9g3xP0cL2cLY2sow&oe=6A0BD382"
  },
  {
    title: "Custom Kitchens & Baths",
    category: "Specialized",
    description: "Where culinary art meets engineering. We create kitchens and bathrooms that are as functional as they are beautiful.",
    features: ["Smart Kitchen Tech", "Premium Marble Finish", "Custom Cabinetry", "Efficient Plumbing Flows"],
    icon: <Layers size={40} />,
    image: "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/640111040_1227556366174206_9192253185739710812_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=zrCEVc1iobsQ7kNvwFMXBU1&_nc_oc=AdrrHPQyGYkF6gsiZu_mmkqEuHvT6hP7mWrC5h-hqnQvmMcHlQy4C-Sy_7Z-HQjvz38&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=tfVkWfH8wkbbXIhJaHMnUw&_nc_ss=7b2a8&oh=00_Af5G_qHzy13epD_wrhPFqkvjZXdpa2SyjWVNiev_vUPEaA&oe=6A0BE1A2"
  },
  {
    title: "Artistic Decor & Styling",
    category: "Curation",
    description: "The final touch that defines the space. We source the finest art and accessories to complete your interior's soul.",
    features: ["Art Curation", "Fabric Selection", "Custom Installations", "Seasonal Styling"],
    icon: <Palette size={40} />,
    image: "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/480906495_948342584095587_3438252210585247962_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=1TK5MGwB6EsQ7kNvwHRfFA0&_nc_oc=AdrYd5GyenFEB5lfVoQsJh9JMWRi1g8e2yMv1Mw2PwRtXOmsjcBDohK5f7-KeU2-m6s&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=ZAo3FfxZV9wwi_1AUXfkeA&_nc_ss=7b2a8&oh=00_Af4cB8735O8OtO2NXderzPISVG90YKaUdJW9aBPvVfoCXg&oe=6A0BE063"
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
