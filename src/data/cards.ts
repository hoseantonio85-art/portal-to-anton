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
  },
  {
    id: "hackathon",
    title: "Страница команды",
    description: "на хаккатоне Antro",
    type: "project",
    link: "#",
    image: null,
    icon: null,
    size: "large",
    theme: "custom",
    bgColor: "linear-gradient(135deg, hsl(270,60%,30%), hsl(200,80%,40%))",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: "synthwave",
    title: "SynthWave клип",
    description: "на нейронках",
    type: "project",
    link: "#",
    image: null,
    icon: null,
    size: "large",
    theme: "custom",
    bgColor: "linear-gradient(135deg, hsl(280,60%,25%), hsl(200,90%,50%))",
    colSpan: 2,
    rowSpan: 1,
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
  },
];

export interface ChatMessage {
  id: string;
  text: string;
  from: "anton" | "user";
}

export interface ChatScenario {
  messages: ChatMessage[];
  buttons: { label: string; nextScenario: string }[];
}

export const chatScenarios: Record<string, ChatScenario> = {
  start: {
    messages: [],
    buttons: [
      { label: "Зачем этот сайт?", nextScenario: "why" },
      { label: "Давай про опыт", nextScenario: "experience" },
    ],
  },
  why: {
    messages: [
      { id: "w1", text: "Я собираю на нём web-артефакты, связанные со мной и дорогие моей памяти", from: "anton" },
      { id: "w2", text: "Это моя коллекция идей и всяких всячин", from: "anton" },
      { id: "w3", text: "Справа можно покликать по карточкам — каждая ведёт куда-то интересное ✨", from: "anton" },
    ],
    buttons: [
      { label: "Ясненько…", nextScenario: "understood" },
      { label: "Давай про опыт", nextScenario: "experience" },
    ],
  },
  experience: {
    messages: [
      { id: "e1", text: "Я занимаюсь UX/UI дизайном уже больше 5 лет", from: "anton" },
      { id: "e2", text: "Работал с финтех-продуктами, мобильными приложениями и вебом", from: "anton" },
      { id: "e3", text: "Люблю делать сложное — простым и красивым", from: "anton" },
    ],
    buttons: [
      { label: "Круто!", nextScenario: "cool" },
      { label: "Зачем этот сайт?", nextScenario: "why" },
    ],
  },
  understood: {
    messages: [
      { id: "u1", text: "Ну вот и славно 😊", from: "anton" },
      { id: "u2", text: "Листай карточки справа, там много интересного", from: "anton" },
    ],
    buttons: [
      { label: "Давай про опыт", nextScenario: "experience" },
      { label: "Начать сначала", nextScenario: "start" },
    ],
  },
  cool: {
    messages: [
      { id: "c1", text: "Спасибо! 🙌", from: "anton" },
      { id: "c2", text: "Если хочешь связаться — есть Telegram и WhatsApp в карточках справа", from: "anton" },
    ],
    buttons: [
      { label: "Зачем этот сайт?", nextScenario: "why" },
      { label: "Начать сначала", nextScenario: "start" },
    ],
  },
};
