export interface CardData {
  id: string;
  title: string | null;
  description: string | null;
  type: "external" | "media" | "fun" | "project";
  link: string | null;
  image: string | null;
  icon: string | null;
  size: "small" | "medium" | "large";
  theme: "dark" | "light" | "gradient";
  accent?: string;
  gradient?: string;
  tags?: string[];
  ctaLabel?: string;
  textMode: "always" | "hover" | "none";
  colSpan?: number;
  rowSpan?: number;
  order?: number | null;
  publishedAt: string;
  published: boolean;
}

export const cards: CardData[] = [
  {
    id: "behance",
    title: "Моё портфолио",
    description: "на Behance",
    type: "external",
    link: "https://behance.net",
    image: null,
    icon: "Bē",
    size: "large",
    theme: "dark",
    textMode: "always",
    colSpan: 2,
    rowSpan: 2,
    order: 1,
    publishedAt: "2024-01-01",
    published: true,
  },
  {
    id: "twitch",
    title: "Стримлю Tacticool",
    description: "на Twitch",
    type: "external",
    link: "https://twitch.tv",
    image: null,
    icon: "twitch",
    size: "medium",
    theme: "gradient",
    gradient: "linear-gradient(135deg, hsl(262,80%,50%), hsl(280,70%,55%))",
    textMode: "always",
    colSpan: 2,
    rowSpan: 1,
    order: 2,
    publishedAt: "2024-01-02",
    published: true,
  },
  {
    id: "instagram",
    title: "Instagram:",
    description: "Картинки и фоточки",
    type: "external",
    link: "https://instagram.com",
    image: null,
    icon: "instagram",
    size: "medium",
    theme: "gradient",
    gradient: "linear-gradient(135deg, hsl(35,95%,55%), hsl(330,80%,55%), hsl(280,70%,55%))",
    textMode: "always",
    colSpan: 2,
    rowSpan: 1,
    order: 3,
    publishedAt: "2024-01-03",
    published: true,
  },
  {
    id: "vk",
    title: null,
    description: null,
    type: "external",
    link: "https://vk.com",
    image: null,
    icon: "vk",
    size: "small",
    theme: "gradient",
    gradient: "linear-gradient(135deg, hsl(262,80%,50%), hsl(280,70%,55%))",
    textMode: "none",
    colSpan: 1,
    rowSpan: 1,
    order: 4,
    publishedAt: "2024-01-04",
    published: true,
  },
  {
    id: "telegram",
    title: null,
    description: null,
    type: "external",
    link: "https://t.me",
    image: null,
    icon: "telegram",
    size: "small",
    theme: "dark",
    textMode: "none",
    colSpan: 1,
    rowSpan: 1,
    order: 5,
    publishedAt: "2024-01-05",
    published: true,
  },
  {
    id: "figma",
    title: null,
    description: null,
    type: "external",
    link: "https://figma.com",
    image: null,
    icon: "figma",
    size: "small",
    theme: "dark",
    textMode: "none",
    colSpan: 1,
    rowSpan: 1,
    order: 6,
    publishedAt: "2024-01-06",
    published: true,
  },
  {
    id: "whatsapp",
    title: null,
    description: null,
    type: "external",
    link: "https://wa.me",
    image: null,
    icon: "whatsapp",
    size: "small",
    theme: "gradient",
    gradient: "linear-gradient(135deg, hsl(140,70%,42%), hsl(160,60%,45%))",
    textMode: "none",
    colSpan: 1,
    rowSpan: 1,
    order: 7,
    publishedAt: "2024-01-07",
    published: true,
  },
  {
    id: "hackathon",
    title: "Страница команды",
    description: "на хаккатоне Antro",
    type: "project",
    link: "https://example.com/hackathon",
    image: null,
    icon: null,
    size: "large",
    theme: "gradient",
    gradient: "linear-gradient(135deg, hsl(270, 60%, 30%), hsl(200, 80%, 40%))",
    textMode: "always",
    colSpan: 2,
    rowSpan: 1,
    order: 8,
    publishedAt: "2024-02-01",
    published: true,
  },
  {
    id: "synthwave",
    title: "SynthWave клип",
    description: "на нейронках",
    type: "project",
    link: "https://example.com/synthwave",
    image: null,
    icon: null,
    size: "large",
    theme: "gradient",
    gradient: "linear-gradient(135deg, hsl(280, 60%, 25%), hsl(200, 90%, 50%))",
    textMode: "always",
    colSpan: 2,
    rowSpan: 1,
    order: 9,
    publishedAt: "2024-02-15",
    published: true,
  },
  {
    id: "coroflot",
    title: "Coroflot",
    description: "Предметный дизайн",
    type: "external",
    link: "https://coroflot.com",
    image: null,
    icon: "/**/",
    size: "large",
    theme: "dark",
    textMode: "always",
    colSpan: 2,
    rowSpan: 2,
    order: 10,
    publishedAt: "2024-03-01",
    published: true,
  },
  {
    id: "hh",
    title: "Резюме на hh.ru",
    description: null,
    type: "external",
    link: "https://hh.ru",
    image: null,
    icon: null,
    size: "medium",
    theme: "gradient",
    gradient: "hsl(0, 80%, 55%)",
    accent: "hsl(0, 80%, 55%)",
    textMode: "always",
    colSpan: 2,
    rowSpan: 1,
    order: 11,
    publishedAt: "2024-03-15",
    published: true,
  },
];

/** Sort cards: by order first (nulls last), then by publishedAt descending */
export function getSortedCards(data: CardData[]): CardData[] {
  return data
    .filter((c) => c.published)
    .sort((a, b) => {
      const aOrder = a.order ?? Infinity;
      const bOrder = b.order ?? Infinity;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}
