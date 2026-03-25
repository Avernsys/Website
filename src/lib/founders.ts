type Founder = {
  key: string;
  name: string;
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
    photo: {
      src: "/founders/doruk.jpg",
      alt: "Doruk Yalcin, co-founder of Avernsys",
      objectPosition: "78% 50%",
      scale: 1.95,
    },
  },
  {
    key: "murat",
    name: "Murat Baki",
    photo: {
      src: "/founders/murat.jpeg",
      alt: "Murat Baki, co-founder of Avernsys",
      objectPosition: "50% 18%",
      scale: 2.1,
    },
  },
] as const satisfies readonly Founder[];
