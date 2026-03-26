export interface ChatMessage {
  id: string;
  text: string;
  from: "anton" | "user";
}

export interface ChatScenario {
  messages: ChatMessage[];
  buttons: { label: string; nextScenario: string }[];
}

export const IDLE_HINTS = [
  "Можешь просто покликать карточки, это тоже план",
  "Тут не обязательно идти по порядку",
  "Иногда самое интересное находится случайно",
];

export const chatScenarios: Record<string, ChatScenario> = {
  start: {
    messages: [
      { id: "i1", text: "Привет 👋", from: "anton" },
      { id: "i2", text: "Я Антон. Дизайнер.", from: "anton" },
      { id: "i3", text: "Это не совсем обычный сайт", from: "anton" },
      { id: "i4", text: "Тут можно не только посмотреть, но и немного понять, чем я вообще живу", from: "anton" },
    ],
    buttons: [
      { label: "Зачем это всё?", nextScenario: "why" },
      { label: "Давай про опыт", nextScenario: "experience" },
    ],
  },
  why: {
    messages: [
      { id: "w1", text: "Я давно хотел собрать всё это в одном месте", from: "anton" },
      { id: "w2", text: "Не как классическое портфолио", from: "anton" },
      { id: "w3", text: "Скорее как личный цифровой архив", from: "anton" },
      { id: "w4", text: "Тут есть проекты, мысли, визуальные штуки и иногда что-то просто по приколу", from: "anton" },
      { id: "w5", text: "Короче, это больше про человека, чем про витрину 😄", from: "anton" },
    ],
    buttons: [
      { label: "Что тут есть?", nextScenario: "what_is_here" },
      { label: "Давай про опыт", nextScenario: "experience" },
      { label: "Начать сначала", nextScenario: "start" },
    ],
  },
  what_is_here: {
    messages: [
      { id: "wh1", text: "Здесь всё собрано в карточки", from: "anton" },
      { id: "wh2", text: "Каждая — это отдельная штука: проект, ссылка, заметка, идея или просто фан", from: "anton" },
      { id: "wh3", text: "Можно просто исследовать в своём темпе", from: "anton" },
      { id: "wh4", text: "Я не очень люблю слишком линейные сайты", from: "anton" },
      { id: "wh5", text: "Иногда интересное находится не там, где ты ожидал", from: "anton" },
    ],
    buttons: [
      { label: "Ок, а ты кто?", nextScenario: "experience" },
      { label: "Где посмотреть работы?", nextScenario: "portfolio" },
      { label: "Начать сначала", nextScenario: "start" },
    ],
  },
  experience: {
    messages: [
      { id: "e1", text: "Я UX/UI дизайнер и уже давно в профессии", from: "anton" },
      { id: "e2", text: "По образованию у меня тоже дизайн, но путь был довольно широкий", from: "anton" },
      { id: "e3", text: "Было всё: полиграфия, упаковка, брендинг, digital, интерфейсы", from: "anton" },
      { id: "e4", text: "Сейчас мне особенно близки сложные продукты, где много логики, ролей и состояний", from: "anton" },
      { id: "e5", text: "Если где-то нужно распутать сложность и собрать это в понятный интерфейс — мне обычно туда", from: "anton" },
    ],
    buttons: [
      { label: "А конкретнее?", nextScenario: "experience_details" },
      { label: "Где посмотреть работы?", nextScenario: "portfolio" },
      { label: "Связаться", nextScenario: "contact" },
      { label: "Начать сначала", nextScenario: "start" },
    ],
  },
  experience_details: {
    messages: [
      { id: "ed1", text: "В последние годы я много работал в финтехе", from: "anton" },
      { id: "ed2", text: "Делал UX/UI для больших систем, где важно не только красиво, но и очень точно", from: "anton" },
      { id: "ed3", text: "Мне нравится упрощать сложное и искать чистую структуру", from: "anton" },
      { id: "ed4", text: "Плюс я люблю, когда в интерфейсе есть вкус, а не только логика", from: "anton" },
      { id: "ed5", text: "То есть мне одинаково важны и смысл, и аккуратность", from: "anton" },
    ],
    buttons: [
      { label: "Что тебе интересно в работе?", nextScenario: "interests" },
      { label: "Где посмотреть работы?", nextScenario: "portfolio" },
      { label: "Начать сначала", nextScenario: "start" },
    ],
  },
  interests: {
    messages: [
      { id: "in1", text: "Больше всего мне нравится делать интерфейсы, в которых сложная система ощущается простой", from: "anton" },
      { id: "in2", text: "Ещё мне близки AI-продукты, интерактивность и всякие новые инструменты", from: "anton" },
      { id: "in3", text: "Я люблю разбираться, как штука работает изнутри, а не просто красить экраны", from: "anton" },
      { id: "in4", text: "Хотя и красить экраны красиво — тоже норм 😄", from: "anton" },
    ],
    buttons: [
      { label: "Где посмотреть работы?", nextScenario: "portfolio" },
      { label: "Связаться", nextScenario: "contact" },
      { label: "Начать сначала", nextScenario: "start" },
    ],
  },
  portfolio: {
    messages: [
      { id: "p1", text: "Самый очевидный путь — Behance", from: "anton" },
      { id: "p2", text: "Но он показывает не всё", from: "anton" },
      { id: "p3", text: "Часть вещей живёт в карточках, ссылках и внутренних страницах", from: "anton" },
      { id: "p4", text: "Так что тут лучше не только смотреть, но и немного исследовать", from: "anton" },
    ],
    buttons: [
      { label: "Ок, пойду смотреть", nextScenario: "start" },
      { label: "Связаться", nextScenario: "contact" },
      { label: "Начать сначала", nextScenario: "start" },
    ],
  },
  contact: {
    messages: [
      { id: "ct1", text: "Если захочешь написать — лучше всего через Telegram или WhatsApp", from: "anton" },
      { id: "ct2", text: "Обычно отвечаю довольно быстро", from: "anton" },
      { id: "ct3", text: "Если не сплю, не работаю или не залип во что-нибудь визуальное 😄", from: "anton" },
    ],
    buttons: [
      { label: "Написать", nextScenario: "start" },
      { label: "Начать сначала", nextScenario: "start" },
    ],
  },
};
