type Founder = {
  key: string;
  name: string;
  slug: string;
  sameAs: readonly string[];
  photo: {
    src: string;
    alt: string;
    objectPosition: string;
    scale: number;
  };
};

export const founders = [
  {
    key: "doruk",
    name: "Doruk Yalcin",
    slug: "doruk-yalcin",
    sameAs: ["https://www.linkedin.com/in/doruk-yalcin/"],
    photo: {
      src: "/founders/doruk-yalcin-avernsys-co-founder.jpg",
      alt: "Doruk Yalcin, co-founder of Avernsys",
      objectPosition: "78% 55%",
      scale: 1.95,
    },
  },
  {
    key: "murat",
    name: "Murat Baki",
    slug: "murat-baki",
    sameAs: ["https://www.linkedin.com/in/murat-baki-mb/"],
    photo: {
      src: "/founders/murat-baki-avernsys-co-founder.jpeg",
      alt: "Murat Baki, co-founder of Avernsys",
      objectPosition: "50% 18%",
      scale: 2.1,
    },
  },
] as const satisfies readonly Founder[];

export type FounderProfile = (typeof founders)[number];

export function getFounderBySlug(slug: string): FounderProfile | undefined {
  return founders.find((founder) => founder.slug === slug);
}
