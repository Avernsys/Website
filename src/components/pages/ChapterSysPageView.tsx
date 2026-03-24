"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FeatureSection } from "@/components/FeatureSection";
import { Button } from "@/components/Button";
import { ChapterSysHeroAnimation } from "@/components/ChapterSysHeroAnimation";
import {
  CreateVisual,
  InviteVisual,
  CommunityVisual,
} from "@/components/ChapterSysStepVisuals";
import {
  DiscoveryVisual,
  CommunityHubVisual,
  EventsVisual,
  ProfileVisual,
} from "@/components/ChapterSysFeatureVisuals";
import { TextLines } from "@/components/TextLines";
import { getDictionary, getPagePath, type Locale } from "@/lib/i18n";

const MapIcon = (
  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const ChatIcon = (
  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>
);

const CalendarIcon = (
  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
  </svg>
);

const BriefcaseIcon = (
  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const stepVisuals = [
  <CreateVisual key="create" />,
  <InviteVisual key="invite" />,
  <CommunityVisual key="community" />,
];

const featureVisuals = [
  <DiscoveryVisual key="discovery" />,
  <CommunityHubVisual key="community-hub" />,
  <EventsVisual key="events" />,
  <ProfileVisual key="profile" />,
];

const featureIcons = [MapIcon, ChatIcon, CalendarIcon, BriefcaseIcon];

type ChapterSysPageViewProps = {
  locale: Locale;
};

export function ChapterSysPageView({ locale }: ChapterSysPageViewProps) {
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.chaptersys;

  return (
    <>
      <section className="relative min-h-[85vh] flex items-center justify-center gradient-mesh grain overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,180,100,0.03) 0%, rgba(255,255,255,0.01) 60%, transparent 100%)",
          }}
        />

        <ChapterSysHeroAnimation />

        <div className="relative z-10 text-center px-6 max-w-[800px]">
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
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-hero"
          >
            <TextLines lines={page.hero.titleLines} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-body-large mt-8 max-w-[520px] mx-auto"
          >
            {page.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10"
          >
            <Button href={getPagePath(locale, "contact")}>
              {page.hero.primaryCta}
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[1200px] px-6">
          <AnimatedSection>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4 text-center">
              {page.steps.eyebrow}
            </p>
            <h2 className="text-display text-center mb-20">
              <TextLines lines={page.steps.titleLines} />
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {page.steps.items.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.1}>
                <div className="rounded-3xl glass p-10 h-full">
                  {stepVisuals[index]}
                  <span className="text-4xl font-bold text-amber-400/40 block mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-[400px]" />

      {page.features.map((feature, index) => (
        <div key={feature.title}>
          <FeatureSection
            label={feature.label}
            title={feature.title}
            description={feature.description}
            icon={featureIcons[index]}
            tint="from-amber-500/[0.04]"
            visual={featureVisuals[index]}
            reverse={index % 2 === 1}
          />
          {index < page.features.length - 1 ? (
            <div className="divider mx-auto max-w-[400px]" />
          ) : null}
        </div>
      ))}

      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <AnimatedSection>
            <h2 className="text-display mb-6">
              <TextLines lines={page.cta.titleLines} />
            </h2>
            <p className="text-body-large mb-10 max-w-[480px] mx-auto">
              {page.cta.description}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button href={getPagePath(locale, "contact")}>
                {page.cta.primaryCta}
              </Button>
              <Button href={getPagePath(locale, "contact")} variant="secondary">
                {page.cta.secondaryCta}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
