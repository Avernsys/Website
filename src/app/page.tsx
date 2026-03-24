"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";

/* ── Product cards data ────────────────────── */
const products = [
  {
    name: "ChapterSys",
    tagline: "Community software for alumni and member organizations.",
    description:
      "A private platform where alumni and members discover businesses, build communities, host events, and stay connected in one place.",
    href: "/chaptersys",
    hoverGlow: "from-amber-500/[0.03]",
  },
  {
    name: "PrimeRoute",
    tagline: "Route optimization software for delivery teams.",
    description:
      "Turn orders into optimized last-mile delivery routes in seconds. Fewer miles, lower costs, and more reliable delivery windows.",
    href: "/primeroute",
    hoverGlow: "from-blue-500/[0.03]",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center gradient-mesh grain overflow-hidden">
        {/* Ambient glow — faint cool violet tint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, rgba(140,130,255,0.035) 0%, rgba(255,255,255,0.015) 60%, transparent 100%)" }} />

        <div className="relative z-10 text-center px-6 max-w-[900px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6"
          >
            Avernsys
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-hero"
          >
            B2B software for
            <br />
            connected organizations
            <br />
            and smarter delivery.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-body-large mt-8 max-w-[560px] mx-auto"
          >
            Avernsys builds two focused products: ChapterSys for alumni and
            member communities, and PrimeRoute for last-mile route
            optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Button href="#products">Explore</Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Products ───────────────────────────── */}
      <section id="products" className="py-32 md:py-48">
        <div className="mx-auto max-w-[1200px] px-6">
          <AnimatedSection>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4 text-center">
              Products
            </p>
            <h2 className="text-display text-center mb-20">
              Two products.
              <br />
              Infinite possibilities.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product, i) => (
              <AnimatedSection key={product.name} delay={i * 0.15}>
                <Link href={product.href} className="group block h-full">
                  <div className="relative rounded-3xl glass p-10 md:p-14 h-full overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]">
                    {/* Hover glow — tinted per product */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.hoverGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative z-10">
                      <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                        {product.name}
                      </span>
                      <h3 className="text-headline mt-4 mb-4">
                        {product.tagline}
                      </h3>
                      <p className="text-body-large mb-8">
                        {product.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                        Learn more
                        <svg
                          className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ────────────────────────────── */}
      <div className="divider mx-auto max-w-[400px]" />

      {/* ── Vision strip ───────────────────────── */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <AnimatedSection>
            <h2 className="text-display">
              Focused products.
              <br />
              <span className="text-gray-500">
                Real operational problems.
              </span>
            </h2>
            <p className="text-body-large mt-8 max-w-[620px] mx-auto">
              We build software for organizations that need stronger member
              communities and for delivery teams that need faster, more
              efficient routes.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
