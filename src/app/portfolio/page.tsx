"use client";

import React, { useEffect, useEffectEvent, useSyncExternalStore, Suspense } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import PageWrapper from "@/components/animations/PageWrapper";
import TiltCard from "@/components/ui/TiltCard";
import { MaskLines, FocusIn } from "@/components/animations/Reveal";
import { lenisRef } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

const categories = ["All", "Kitchen", "Bedroom", "Sitting Room", "Interior", "Office", "Wardrobe"];

type Project = { id: number; title: string; category: string; image: string };

const noopSubscribe = () => () => {};

const projects: Project[] = [
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

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 36, scale: 0.97, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)", transition: { duration: 0.3, ease: EASE_OUT_EXPO } }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 1,
        ease: EASE_OUT_EXPO,
        delay: (index % 3) * 0.08,
        layout: { duration: 0.7, ease: EASE_OUT_EXPO },
      }}
    >
      <TiltCard className="rounded-2xl">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`View ${project.title}`}
          className="group relative block w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-secondary text-left cursor-zoom-in"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 premium-overlay" />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/40" />

          <span className="absolute top-4 right-4 z-20 grid place-items-center w-9 h-9 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm text-white opacity-0 scale-75 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-100 group-hover:scale-100">
            <Maximize2 size={15} />
          </span>

          <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 z-20">
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.25em] block mb-2">
              {project.category}
            </span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white leading-snug md:translate-y-3 md:group-hover:translate-y-0 transition-transform duration-700 ease-[var(--ease-out-expo)]">
              {project.title}
            </h3>
            <span className="mt-3 flex items-center gap-2 text-sm text-white/80 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[var(--ease-out-expo)] delay-75">
              View Details <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </button>
      </TiltCard>
    </motion.div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: Project[];
  index: number | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const open = index !== null;
  const project = open ? items[index] : null;
  // Portal target only exists on the client; the server snapshot keeps hydration clean.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onStep(1);
    if (e.key === "ArrowLeft") onStep(-1);
  });

  useEffect(() => {
    if (!open) return;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => onKey(e);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.documentElement.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center px-4 py-20"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 grid place-items-center w-11 h-11 rounded-full border border-white/20 text-white transition-colors hover:border-primary hover:text-primary"
          >
            <X size={20} />
          </button>

          <div className="relative w-full max-w-5xl flex-1 min-h-0" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="popLayout" initial={true}>
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)", transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="absolute inset-0"
              >
                <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center gap-6 text-white" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous project"
              className="grid place-items-center w-11 h-11 rounded-full border border-white/20 transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="text-center min-w-0 w-56 sm:w-72">
              <div className="text-primary text-[11px] font-bold uppercase tracking-[0.25em]">{project.category}</div>
              <div className="font-heading font-bold text-lg truncate">{project.title}</div>
              <div className="text-white/50 text-xs mt-0.5">
                {index! + 1} / {items.length}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next project"
              className="grid place-items-center w-11 h-11 rounded-full border border-white/20 transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function PortfolioGallery() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const paramCategory = categoryParam && categories.includes(categoryParam) ? categoryParam : "All";
  // A manual pick holds until the URL's ?category changes, then the URL wins again.
  const [selection, setSelection] = React.useState({ param: categoryParam, category: paramCategory });
  const activeCategory = selection.param === categoryParam ? selection.category : paramCategory;
  const setActiveCategory = (category: string) => setSelection({ param: categoryParam, category });
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const close = () => setOpenIndex(null);
  const step = (dir: 1 | -1) =>
    setOpenIndex((i) => (i === null ? i : (i + dir + filteredProjects.length) % filteredProjects.length));

  return (
    <div className="min-h-screen bg-background pt-36 md:pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-14">
          <h1 className="text-[clamp(1.75rem,9vw,6rem)] font-heading font-bold mb-6 leading-[1] tracking-[-0.02em] uppercase">
            <MaskLines
              inView={false}
              delay={0.2}
              lines={[<span key="m" className="gold-gradient gold-sheen px-[0.1em]">Masterpieces</span>]}
            />
          </h1>
          <FocusIn inView={false} delay={0.5}>
            <p className="text-foreground/70 max-w-2xl mx-auto font-body font-light tracking-wide mb-10">
              A curated selection of our most prestigious projects.
            </p>
          </FocusIn>

          <FocusIn inView={false} delay={0.65}>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3" role="group" aria-label="Filter projects">
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={active}
                    className={cn(
                      "relative px-4 md:px-5 py-2 rounded-full border text-xs md:text-sm font-semibold tracking-widest uppercase transition-colors duration-300",
                      active
                        ? "border-transparent text-background"
                        : "border-white/15 text-white/60 hover:border-primary/50 hover:text-white",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                        className="absolute inset-0 rounded-full bg-[image:var(--gold-metal)]"
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </FocusIn>
          <p aria-live="polite" className="mt-6 text-xs uppercase tracking-[0.25em] text-white/50">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpen={() => setOpenIndex(i)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox items={filteredProjects} index={openIndex} onClose={close} onStep={step} />
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
