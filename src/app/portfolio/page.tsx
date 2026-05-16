"use client";

import React, { useEffect, Suspense, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import PageWrapper from "@/components/animations/PageWrapper";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const categories = ["All", "Kitchen", "Bedroom", "Sitting Room", "Interior", "Office", "Wardrobe"];

const projects = [
  // Kitchen
  { id: 1, title: "Modern Culinary Hub", category: "Kitchen", image: "/assets/projects/kitchen_mint.png" },
  { id: 2, title: "Contemporary Kitchen Design", category: "Kitchen", image: "/assets/projects/kitchen_wood_white.png" },
  { id: 3, title: "Custom Culinary Space", category: "Kitchen", image: "/assets/projects/kitchen_full_view.png" },
  
  // Bedroom
  { id: 4, title: "Royal Suite", category: "Bedroom", image: "/assets/projects/bedroom_world_map.png" },
  { id: 5, title: "Minimalist Sanctuary", category: "Bedroom", image: "/assets/projects/bedroom_minimalist.png" },
  
  // Sitting Room
  { id: 6, title: "The Grand Lounge", category: "Sitting Room", image: "/assets/projects/sitting_room_black_sofa.png" },
  { id: 7, title: "Contemporary Living", category: "Sitting Room", image: "/assets/projects/sitting_room_beige_chairs.png" },
  { id: 17, title: "Modern Living Flow", category: "Sitting Room", image: "/assets/projects/living_room_grey_sofa.png" },
  
  // Office
  { id: 8, title: "Modern Corporate Workspace", category: "Office", image: "/assets/projects/office_wood_desk.png" },
  { id: 9, title: "Executive Suite", category: "Office", image: "/assets/projects/office_grey_desk.png" },
  
  // Wardrobe
  { id: 10, title: "Premium Sliding Wardrobe", category: "Wardrobe", image: "/assets/projects/wardrobe_mirror.png" },
  { id: 11, title: "Bespoke Wardrobe Ensemble", category: "Wardrobe", image: "/assets/projects/wardrobe_light_wood.png" },
  { id: 13, title: "Luxury Storage Solution", category: "Wardrobe", image: "/assets/projects/wardrobe_full_wood.png" },
  { id: 14, title: "Elegant Master Wardrobe", category: "Wardrobe", image: "/assets/projects/wardrobe_black_gold.png" },
  
  // Interior
  { id: 12, title: "Functional Study Space", category: "Interior", image: "/assets/projects/study_unit_light_wood.png" },
  { id: 18, title: "Integrated Living & Dining", category: "Interior", image: "/assets/projects/living_dining_partition.png" },
  { id: 19, title: "Contemporary Wash Area", category: "Interior", image: "/assets/projects/wash_basin_modern.png" },
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
          className="absolute inset-0 w-full h-full object-cover brightness-100 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-all duration-500 z-10" />
        <div className="absolute inset-0 premium-overlay opacity-40 pointer-events-none" />
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
