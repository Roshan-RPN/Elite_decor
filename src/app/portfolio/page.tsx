"use client";

import React, { useEffect, Suspense, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import PageWrapper from "@/components/animations/PageWrapper";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const categories = ["All", "Kitchen", "Bedroom", "Sitting Room", "Interior", "Office", "Exterior"];

const projects = [
  // Kitchen
  { id: 1, title: "Modern Culinary Hub", category: "Kitchen", image: "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/640111040_1227556366174206_9192253185739710812_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=zrCEVc1iobsQ7kNvwFMXBU1&_nc_oc=AdrrHPQyGYkF6gsiZu_mmkqEuHvT6hP7mWrC5h-hqnQvmMcHlQy4C-Sy_7Z-HQjvz38&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=tfVkWfH8wkbbXIhJaHMnUw&_nc_ss=7b2a8&oh=00_Af5G_qHzy13epD_wrhPFqkvjZXdpa2SyjWVNiev_vUPEaA&oe=6A0BE1A2" },
  { id: 2, title: "Contemporary Kitchen Design", category: "Kitchen", image: "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/485039791_966051028991409_1605017411252857178_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BciscAPVim0Q7kNvwGfczsY&_nc_oc=AdrjvCdq6ChhPdwluSakB9Uj-60K1p61a8zbrN7i--oa1Ev8vfARu3ziCtmlMCogYRU&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=vstWq8n5o_Fg1mASGzySsw&_nc_ss=7b2a8&oh=00_Af6GSWrUskQ2hG3bAH53LPBUM8rF377vV2JTKRXtw8j2dg&oe=6A0BE9AC" },
  { id: 3, title: "Custom Culinary Space", category: "Kitchen", image: "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/481056339_947734527489726_4725817330014701814_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=w1xFB3XKQI4Q7kNvwEIoEcE&_nc_oc=AdqkZd01JPS-CT-301RwBjC33WZtQmn4AxsFP7y23qNj1_yz-IhfE0p23vuzSE5dCSY&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=GSA0DtpWPev3_bSYWaJjiA&_nc_ss=7b2a8&oh=00_Af6hHkvOXhjdgB5uASpcrW-ODv5_CuQVoZm7t1tAhyAZiw&oe=6A0BE7ED" },
  
  // Bedroom
  { id: 4, title: "Royal Suite", category: "Bedroom", image: "https://images.unsplash.com/photo-1616594084638-30cf7aba077a?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Minimalist Sanctuary", category: "Bedroom", image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80" },
  
  // Sitting Room
  { id: 6, title: "The Grand Lounge", category: "Sitting Room", image: "https://images.unsplash.com/photo-1618221195710-2f77122a3b34?auto=format&fit=crop&w=800&q=80" },
  { id: 7, title: "Contemporary Living", category: "Sitting Room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" },
  
  // Office
  { id: 8, title: "Modern Corporate Workspace", category: "Office", image: "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/539403562_1082762387320272_2082729292234331129_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=yvR2JcKBoqgQ7kNvwG3y8A5&_nc_oc=Adq0vHhmWPcT57KZlEg1hhftxvKMJs9QUAwzSIKiRjB8N9ns4EJE52mxs5pogMdmq9Y&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=WX-lk3CpedFFznfM2UgVQA&_nc_ss=7b2a8&oh=00_Af5V8FwvtlHDkfZnEYetCr53ifshXZ9g3xP0cL2cLY2sow&oe=6A0BD382" },
  { id: 9, title: "Executive Suite", category: "Office", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80" },
  
  // Exterior
  { id: 10, title: "Coastal Villa Exterior", category: "Exterior", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80" },
  { id: 11, title: "Urban Architectural Marvel", category: "Exterior", image: "https://images.unsplash.com/photo-1600607687920-4833d9c75f76?auto=format&fit=crop&w=800&q=80" },
  
  // Interior
  { id: 12, title: "Artistic Interior Flow", category: "Interior", image: "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/480906495_948342584095587_3438252210585247962_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=1TK5MGwB6EsQ7kNvwHRfFA0&_nc_oc=AdrYd5GyenFEB5lfVoQsJh9JMWRi1g8e2yMv1Mw2PwRtXOmsjcBDohK5f7-KeU2-m6s&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=ZAo3FfxZV9wwi_1AUXfkeA&_nc_ss=7b2a8&oh=00_Af4cB8735O8OtO2NXderzPISVG90YKaUdJW9aBPvVfoCXg&oe=6A0BE063" },
];

function ProjectCard({ project }: { project: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[400px] md:h-[600px] rounded-[40px] overflow-hidden glass-card shadow-2xl cursor-pointer perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] brightness-90 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/20 group-hover:bg-black/70 transition-all duration-500 z-10" />
        <div className="absolute inset-0 premium-overlay opacity-60 pointer-events-none" />
      </div>

      <div 
        style={{ transform: "translateZ(100px)" }}
        className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20"
      >
        <motion.span 
          initial={{ opacity: 0.8 }}
          className="text-primary text-xs font-bold uppercase tracking-[0.3em] block mb-2"
        >
          {project.category}
        </motion.span>
        <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-6 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
          View Details <ArrowRight size={18} />
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioGallery() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = React.useState("All");

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }
  }, [categoryParam]);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-heading font-bold mb-6 leading-[0.9] tracking-tighter uppercase px-4">Masterpieces</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto font-body font-light tracking-wide mb-12">
            A curated selection of our most prestigious projects.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full border transition-all duration-300 text-sm font-medium tracking-widest uppercase",
                  activeCategory === cat 
                    ? "bg-primary border-primary text-background" 
                    : "bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <PageWrapper>
      <Suspense fallback={<div className="min-h-screen bg-background pt-40 px-6 text-center text-white">Loading...</div>}>
        <PortfolioGallery />
      </Suspense>
    </PageWrapper>
  );
}
