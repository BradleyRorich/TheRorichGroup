export type PortfolioItem = {
  id: number;
  title: string;
  division: "print" | "web";
  image: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Premium Business Cards",
    division: "print",
    image: "https://picsum.photos/seed/biz1/600/400",
  },
  {
    id: 2,
    title: "Brand Identity Stickers",
    division: "print",
    image: "https://picsum.photos/seed/stk1/600/400",
  },
  {
    id: 3,
    title: "Large-Format Banner",
    division: "print",
    image: "https://picsum.photos/seed/lfp1/600/400",
  },
  {
    id: 4,
    title: "Branded Staff Uniforms",
    division: "print",
    image: "https://picsum.photos/seed/uni1/600/400",
  },
  {
    id: 5,
    title: "Real Estate Portal",
    division: "web",
    image: "https://picsum.photos/seed/web1/600/400",
  },
  {
    id: 6,
    title: "Restaurant Booking App",
    division: "web",
    image: "https://picsum.photos/seed/web2/600/400",
  },
  {
    id: 7,
    title: "Corporate Website Redesign",
    division: "web",
    image: "https://picsum.photos/seed/web3/600/400",
  },
  {
    id: 8,
    title: "Event Flyers & Programmes",
    division: "print",
    image: "https://picsum.photos/seed/evt1/600/400",
  },
];
