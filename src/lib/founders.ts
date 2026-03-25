type Founder = {
  key: string;
  name: string;
  photo: {
    src: string;
    alt: string;
    objectPosition: string;
  };
};

export const founders = [
  {
    key: "doruk",
    name: "Doruk Yalcin",
    photo: {
      src: "/founders/doruk.jpg",
      alt: "Doruk Yalcin, co-founder of Avernsys",
      objectPosition: "68% 30%",
    },
  },
  {
    key: "murat",
    name: "Murat Baki",
    photo: {
      src: "/founders/murat.jpeg",
      alt: "Murat Baki, co-founder of Avernsys",
      objectPosition: "50% 24%",
    },
  },
] as const satisfies readonly Founder[];
