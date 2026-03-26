export interface CardData {
  id: string;
  title: string | null;
  description: string | null;
  type: "external_link" | "internal_page" | "media" | "project" | "fun";
  link: string | null;
  image: string | null;
  icon: string | null;
  size: "small" | "medium" | "large";
  theme: "dark" | "light" | "gradient-purple" | "gradient-instagram" | "gradient-green" | "custom";
  bgColor?: string;
  colSpan?: number;
  rowSpan?: number;
  order?: number | null;
  publishedAt: string;
  published: boolean;
  slug?: string;
}

export const cards: CardData[] = [
  {
    id: "behance",
    title: "Моё портфолио",
    description: "на Behance",
    type: "external_link",
    link: "https://behance.net",
    image: null,
    icon: "Bē",
    size: "large",
    theme: "dark",
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
    type: "external_link",
    link: "https://twitch.tv",
    image: null,
    icon: "twitch",
    size: "medium",
    theme: "gradient-purple",
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
    type: "external_link",
    link: "https://instagram.com",
    image: null,
    icon: "instagram",
    size: "medium",
    theme: "gradient-instagram",
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
    type: "external_link",
    link: "https://vk.com",
    image: null,
    icon: "vk",
    size: "small",
    theme: "gradient-purple",
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
    type: "external_link",
    link: "https://t.me",
    image: null,
    icon: "telegram",
    size: "small",
    theme: "dark",
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
    type: "external_link",
    link: "https://figma.com",
    image: null,
    icon: "figma",
    size: "small",
    theme: "dark",
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
    type: "external_link",
    link: "https://wa.me",
    image: null,
    icon: "whatsapp",
    size: "small",
    theme: "gradient-green",
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
    link: null,
    image: null,
    icon: null,
    size: "large",
    theme: "custom",
    bgColor: "linear-gradient(135deg, hsl(270, 60%, 30%), hsl(200, 80%, 40%))",
    colSpan: 2,
    rowSpan: 1,
    order: 8,
    publishedAt: "2024-02-01",
    published: true,
    slug: "hackathon-antro",
  },
  {
    id: "synthwave",
    title: "SynthWave клип",
    description: "на нейронках",
    type: "project",
    link: null,
    image: null,
    icon: null,
    size: "large",
    theme: "custom",
    bgColor: "linear-gradient(135deg, hsl(280, 60%, 25%), hsl(200, 90%, 50%))",
    colSpan: 2,
    rowSpan: 1,
    order: 9,
    publishedAt: "2024-02-15",
    published: true,
    slug: "synthwave-clip",
  },
  {
    id: "coroflot",
    title: "Coroflot",
    description: "Предметный дизайн",
    type: "external_link",
    link: "https://coroflot.com",
    image: null,
    icon: "/**/",
    size: "large",
    theme: "dark",
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
    type: "external_link",
    link: "https://hh.ru",
    image: null,
    icon: null,
    size: "medium",
    theme: "custom",
    bgColor: "hsl(0, 80%, 55%)",
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
