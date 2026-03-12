"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center gradient-mesh grain overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-[100px]" />

        <div className="relative z-10 text-center px-6 max-w-[600px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6"
          >
            Contact
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-hero"
          >
            Let&apos;s talk.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-body-large mt-8 max-w-[420px] mx-auto"
          >
            Have a question, want a demo, or just want to say hello?
            We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* ── Form ───────────────────────────────── */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[560px] px-6">
          <AnimatedSection>
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-white/[0.06] mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-headline mb-3">Message sent.</h3>
                <p className="text-body-large">
                  We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium uppercase tracking-[0.15em] text-gray-500 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-white/[0.1] py-3 text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium uppercase tracking-[0.15em] text-gray-500 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-white/[0.1] py-3 text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-colors duration-300"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-medium uppercase tracking-[0.15em] text-gray-500 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full bg-transparent border-b border-white/[0.1] py-3 text-white focus:border-white/30 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled className="bg-black">
                      Select a topic
                    </option>
                    <option value="chaptersys" className="bg-black">
                      ChapterSys
                    </option>
                    <option value="primeroute" className="bg-black">
                      PrimeRoute
                    </option>
                    <option value="general" className="bg-black">
                      General Inquiry
                    </option>
                    <option value="partnership" className="bg-black">
                      Partnership
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium uppercase tracking-[0.15em] text-gray-500 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent border-b border-white/[0.1] py-3 text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us what you're looking for..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black rounded-full py-4 text-[14px] font-medium hover:bg-gray-200 transition-all duration-300 hover:scale-[1.01] mt-4"
                >
                  Send Message
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
