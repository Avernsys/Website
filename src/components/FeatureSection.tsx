"use client";

import { AnimatedSection } from "./AnimatedSection";

interface FeatureSectionProps {
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  reverse?: boolean;
  tint?: string;
  visual?: React.ReactNode;
}

export function FeatureSection({
  label,
  title,
  description,
  icon,
  reverse = false,
  tint,
  visual,
}: FeatureSectionProps) {
  return (
    <section className="py-32 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <div
          className={`flex flex-col ${
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          } items-center gap-16 md:gap-24`}
        >
          {/* Visual */}
          <AnimatedSection className="flex-1 w-full" delay={0.1}>
            {visual || (
              <div className="relative aspect-square max-w-[480px] mx-auto rounded-3xl glass overflow-hidden flex items-center justify-center">
                <div className="text-white/10 scale-[2]">{icon}</div>
                <div className={`absolute inset-0 bg-gradient-to-br ${tint || "from-white/[0.03]"} to-transparent`} />
              </div>
            )}
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection className="flex-1 w-full" delay={0.2}>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              {label}
            </span>
            <h2 className="text-display mb-6">{title}</h2>
            <p className="text-body-large max-w-[440px]">{description}</p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
