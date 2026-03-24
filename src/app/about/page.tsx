"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { founders } from "@/lib/founders";

const values = [
  {
    title: "Craft over compromise",
    description:
      "Every detail matters. We obsess over the experience because our users deserve software that feels considered, not just functional.",
  },
  {
    title: "Ship what matters",
    description:
      "We solve real problems for real people. If it doesn't serve the user, it doesn't ship.",
  },
  {
    title: "Stay lean, move fast",
    description:
      "Two founders. No bureaucracy. We make decisions quickly, iterate constantly, and let the work speak for itself.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center gradient-mesh grain overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-[100px]" />

        <div className="relative z-10 text-center px-6 max-w-[700px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6"
          >
            About Avernsys
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-hero"
          >
            About
            <br />
            Avernsys.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-body-large mt-8 max-w-[480px] mx-auto"
          >
            Avernsys builds B2B software for member organizations and last-mile
            delivery teams with two focused products: ChapterSys and PrimeRoute.
          </motion.p>
        </div>
      </section>

      {/* ── Story ──────────────────────────────── */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[700px] px-6">
          <AnimatedSection>
            <h2 className="text-display mb-8">Our story</h2>
            <div className="space-y-6 text-body-large">
              <p>
                Avernsys started with two people who saw gaps in how
                organizations connect their members and how businesses handle
                last-mile logistics.
              </p>
              <p>
                Instead of waiting for someone else to solve these problems, we
                built the solutions ourselves. ChapterSys reimagines how alumni
                networks and organizations stay connected. PrimeRoute makes
                delivery operations effortless.
              </p>
              <p>
                We&apos;re a company that believes in doing fewer things
                exceptionally well. Two products, built with care, designed to
                last.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="divider mx-auto max-w-[400px]" />

      {/* ── Founders ───────────────────────────── */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[1200px] px-6">
          <AnimatedSection>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4 text-center">
              Team
            </p>
            <h2 className="text-display text-center mb-20">The founders</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {founders.map((founder, i) => (
              <AnimatedSection key={founder.name} delay={i * 0.15}>
                <div className="rounded-3xl glass p-10">
                  {/* Photo placeholder */}
                  <div className="w-20 h-20 rounded-full bg-white/[0.06] mb-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white/20">
                      {founder.name[0]}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{founder.role}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-[400px]" />

      {/* ── Values ─────────────────────────────── */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[1200px] px-6">
          <AnimatedSection>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4 text-center">
              Values
            </p>
            <h2 className="text-display text-center mb-20">
              What drives us
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="rounded-3xl glass p-10 h-full">
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
