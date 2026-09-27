"use client";

import React from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import PageWrapper from "@/components/animations/PageWrapper";
import { MaskLines, FocusIn } from "@/components/animations/Reveal";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

const STUDIO_EMAIL = "elitedecorkochin@gmail.com";

type Fields = { firstName: string; lastName: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { firstName: "", lastName: "", email: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.firstName.trim()) e.firstName = "Please tell us your first name.";
  if (!f.email.trim()) e.email = "We need an email to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "That email doesn't look right.";
  if (f.message.trim().length < 10) e.message = "A few words about your project (10+ characters).";
  return e;
}

const inputClass =
  "w-full bg-secondary/60 border rounded-xl px-4 py-3.5 outline-none font-body text-white placeholder:text-white/40 transition-[border-color,box-shadow,background-color] duration-300 focus:bg-secondary focus:shadow-[0_0_0_4px_rgba(244,208,63,0.12)]";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-widest text-primary px-1">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="text-sm text-red-300 px-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [fields, setFields] = React.useState<Fields>(empty);
  const [errors, setErrors] = React.useState<Errors>({});
  const [sent, setSent] = React.useState(false);
  const shake = useAnimationControls();

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [key]: e.target.value };
    setFields(next);
    // Once a field has been flagged, re-check it live so the error clears as soon as it's fixed.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      shake.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.45 } });
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }
    const name = `${fields.firstName.trim()} ${fields.lastName.trim()}`.trim();
    const subject = `Project inquiry from ${name}`;
    const body = `${fields.message.trim()}\n\n${name}\n${fields.email.trim()}`;
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const errorProps = (key: keyof Fields) => ({
    id: key,
    name: key,
    value: fields[key],
    onChange: update(key),
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    suppressHydrationWarning: true,
    className: cn(inputClass, errors[key] ? "border-red-400/70" : "border-primary/20 focus:border-primary"),
  });

  return (
    <PageWrapper>
      <div className="pt-36 md:pt-40 pb-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1] tracking-[-0.02em] uppercase">
                <MaskLines
                  inView={false}
                  delay={0.15}
                  lines={["Get in", <span key="t" className="gold-gradient gold-sheen italic pr-[0.2em]">Touch</span>]}
                />
              </h1>
              <FocusIn inView={false} delay={0.45}>
                <p className="text-foreground/70 max-w-md font-body font-light leading-relaxed">
                  Whether you have a specific project in mind or just want to explore possibilities,
                  our design consultants are here to help.
                </p>
              </FocusIn>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.08, delayChildren: 0.6 }}
              className="space-y-6"
            >
              {[
                { icon: <Phone className="text-primary" size={20} />, title: "Phone", value: "+91 90614 86768", href: "tel:+919061486768" },
                { icon: <Mail className="text-primary" size={20} />, title: "Email", value: STUDIO_EMAIL, href: `mailto:${STUDIO_EMAIL}` },
                { icon: <MapPin className="text-primary" size={20} />, title: "Location", value: "Kochi, Kerala, India", href: "https://www.google.com/maps/search/?api=1&query=Elite+Decor+Kochi" },
              ].map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
                  }}
                  className="flex items-center gap-5 group min-w-0"
                >
                  <div className="shrink-0 p-3.5 rounded-xl border border-primary/20 bg-white/[0.03] transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-primary/10 group-hover:border-primary/50 group-hover:-translate-y-0.5">
                    {item.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-foreground/55">{item.title}</div>
                    <div className="text-lg md:text-xl font-body font-medium break-words transition-colors group-hover:text-primary">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.35 }}
            className="relative"
          >
            <motion.div
              animate={shake}
              className="glass-card p-6 md:p-9 rounded-2xl relative overflow-hidden min-h-[520px]"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-mint/5 blur-[100px] pointer-events-none" />

              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                    className="relative z-10 flex flex-col items-center justify-center text-center min-h-[460px] gap-6"
                    role="status"
                  >
                    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" aria-hidden>
                      <motion.circle
                        cx="42" cy="42" r="38" stroke="var(--primary)" strokeWidth="2"
                        initial={{ pathLength: 0, rotate: -90 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
                        style={{ originX: "50%", originY: "50%" }}
                      />
                      <motion.path
                        d="M27 43 L37.5 53 L58 32" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.55 }}
                      />
                    </svg>
                    <div className="space-y-3">
                      <h2 className="text-2xl md:text-3xl font-heading font-bold">Thank you, {fields.firstName.trim()}</h2>
                      <p className="text-white/70 max-w-sm mx-auto leading-relaxed">
                        Your email app should now be open with your message ready. Just press send and our
                        team will get back to you. Prefer to chat right away?
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <a
                        href="https://wa.me/919061486768"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gold-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm"
                      >
                        <MessageCircle size={16} /> WhatsApp Us
                      </a>
                      <button
                        type="button"
                        onClick={() => { setFields(empty); setErrors({}); setSent(false); }}
                        className="px-7 py-3.5 rounded-xl border border-white/20 text-white/85 font-bold uppercase tracking-widest text-sm transition-colors hover:border-primary hover:text-primary"
                      >
                        New Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)", transition: { duration: 0.3 } }}
                    className="relative z-10 space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Field id="firstName" label="First Name" error={errors.firstName}>
                        <input type="text" autoComplete="given-name" placeholder="John" {...errorProps("firstName")} />
                      </Field>
                      <Field id="lastName" label="Last Name" error={errors.lastName}>
                        <input type="text" autoComplete="family-name" placeholder="Doe" {...errorProps("lastName")} />
                      </Field>
                    </div>
                    <Field id="email" label="Email Address" error={errors.email}>
                      <input type="email" autoComplete="email" inputMode="email" placeholder="john@example.com" {...errorProps("email")} />
                    </Field>
                    <Field id="message" label="Message" error={errors.message}>
                      <textarea rows={5} placeholder="Tell us about your project..." {...errorProps("message")} className={cn(errorProps("message").className, "resize-none")} />
                    </Field>
                    <button
                      type="submit"
                      className="group w-full gold-btn py-4 rounded-xl font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:-translate-y-0.5"
                    >
                      Send Inquiry
                      <Send size={18} className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
