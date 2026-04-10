export interface Car {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
}

export const cars: Car[] = [
  {
    id: "phantom",
    name: "Phantom",
    tagline: "The Pinnacle of Luxury",
    image: "/images/phantom.webp",
    description: "An iconic silhouette with peerless presence. Phantom is the ultimate expression of bespoke craftsmanship."
  },
  {
    id: "ghost",
    name: "Ghost",
    tagline: "Pure Expression",
    image: "/images/ghost.webp",
    description: "Strikingly simple and flawlessly elegant. Ghost represents a minimalist purity combined with effortless power."
  },
  {
    id: "spectre",
    name: "Spectre",
    tagline: "The Electric Super Coupé",
    image: "/images/spectre.webp",
    description: "A bold vision of the future. Spectre delivers classic luxury and silent waftability in a fully electric grand tourer."
  }
];
