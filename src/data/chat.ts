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
