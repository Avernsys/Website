"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { TextLines } from "@/components/TextLines";
import { founders } from "@/lib/founders";
import { getDictionary, type Locale } from "@/lib/i18n";

type AboutPageViewProps = {
  locale: Locale;
};

export function AboutPageView({ locale }: AboutPageViewProps) {
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.about;

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center gradient-mesh grain overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-[100px]" />

        <div className="relative z-10 text-center px-6 max-w-[700px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6"
          >
            {page.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-hero"
          >
            <TextLines lines={page.hero.titleLines} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-body-large mt-8 max-w-[480px] mx-auto"
          >
            {page.hero.description}
          </motion.p>
        </div>
      </section>

      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[700px] px-6">
          <AnimatedSection>
            <h2 className="text-display mb-8">{page.story.title}</h2>
            <div className="space-y-6 text-body-large">
              {page.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="divider mx-auto max-w-[400px]" />

      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[1200px] px-6">
          <AnimatedSection>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4 text-center">
              {page.founders.eyebrow}
            </p>
            <h2 className="text-display text-center mb-20">
              {page.founders.title}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {founders.map((founder, index) => {
              const profile = page.founders.people[founder.key];

              return (
                <AnimatedSection key={founder.name} delay={index * 0.15}>
                  <div className="rounded-3xl glass p-10">
                    <div className="w-20 h-20 rounded-full bg-white/[0.06] mb-6 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white/20">
                        {founder.name[0]}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{profile.role}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-[400px]" />

      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[1200px] px-6">
          <AnimatedSection>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4 text-center">
              {page.values.eyebrow}
            </p>
            <h2 className="text-display text-center mb-20">
              {page.values.title}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {page.values.items.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
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
