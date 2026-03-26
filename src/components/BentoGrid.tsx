import { cards, type CardData } from "@/data/cards";
import { cn } from "@/lib/utils";

/* ── Accent color map ── */

const accentColors: Record<string, string> = {
  dark: "hsl(240 20% 12%)",
  violet: "hsl(270 60% 40%)",
  lime: "hsl(65 100% 50%)",
  red: "hsl(0 80% 55%)",
  green: "hsl(145 70% 40%)",
};

/* ── Theme gradients ── */

const themeGradients: Record<string, string> = {
  twitch: "linear-gradient(135deg, hsl(262 80% 50%), hsl(280 70% 55%))",
  instagram: "linear-gradient(135deg, hsl(35 95% 55%), hsl(330 80% 55%), hsl(280 70% 55%))",
  vk: "linear-gradient(135deg, hsl(220 70% 50%), hsl(210 80% 55%))",
  "picture-filler": "linear-gradient(135deg, hsl(270 60% 30%), hsl(280 70% 55%))",
  antro: "linear-gradient(135deg, hsl(270 60% 30%), hsl(200 80% 40%))",
  synthwave: "linear-gradient(135deg, hsl(280 60% 25%), hsl(200 90% 50%))",
};

/* ── Resolve background style ── */

const getCardStyle = (card: CardData): React.CSSProperties => {
  if (card.theme === "accent" && card.accent) {
    return { backgroundColor: accentColors[card.accent] ?? card.accent };
  }

  if (card.theme === "gradient") {
    const grad = themeGradients[card.id];
    if (grad) return { background: grad };
  }

  if (card.theme === "dark") {
    return { backgroundColor: "hsl(240 20% 12%)" };
  }

  if (card.theme === "light") {
    return { backgroundColor: "hsl(0 0% 96%)" };
  }

  return {};
};

/* ── Size → grid spans ── */

const sizeConfig: Record<string, { col: number; row: number; minH: string }> = {
  large: { col: 2, row: 2, minH: "240px" },
  medium: { col: 2, row: 1, minH: "120px" },
  small: { col: 1, row: 1, minH: "120px" },
};

/* ── Icon registry (fallback when no image) ── */

const iconMap: Record<string, JSX.Element> = {
  behance: <span className="text-6xl font-black text-primary-foreground">Bē</span>,
  twitch: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  coroflot: <span className="text-4xl font-bold" style={{ color: accentColors.lime }}>/**/</span>,
};

/* ── Single bento card ── */

const BentoCard = ({ card }: { card: CardData }) => {
  const handleClick = () => {
    if (card.link) window.open(card.link, "_blank", "noopener");
  };

  const isLight = card.theme === "light";
  const textColor = isLight ? "text-foreground" : "text-primary-foreground";
  const isClickable = !!card.link;
  const showText = card.textMode !== "none";
  const hoverOnly = card.textMode === "hover";
  const { col, row, minH } = sizeConfig[card.size] ?? sizeConfig.medium;

  return (
    <div
      onClick={isClickable ? handleClick : undefined}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl p-5 transition-all duration-300",
        isClickable && "cursor-pointer hover:scale-[1.02] hover:shadow-xl",
        col === 2 ? "col-span-2" : "col-span-1",
        row === 2 ? "row-span-2" : "row-span-1",
      )}
      style={{ ...getCardStyle(card), minHeight: minH }}
    >
      {/* Background image */}
      {card.image && (
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}

      {/* Icon fallback (no image) */}
      {!card.image && iconMap[card.id] && (
        <div className={cn("mb-auto relative z-10", textColor)}>
          {iconMap[card.id]}
        </div>
      )}

      {/* Text layer */}
      {showText && (card.title || card.description) && (
        <div
          className={cn(
            "mt-auto relative z-10 transition-opacity duration-300",
            textColor,
            hoverOnly && "opacity-0 group-hover:opacity-100",
          )}
        >
          {card.title && (
            <h3 className="text-lg font-bold leading-tight">{card.title}</h3>
          )}
          {card.description && (
            <p className="text-sm opacity-80">{card.description}</p>
          )}
          {card.ctaLabel && (
            <span className="mt-2 inline-block text-xs font-medium opacity-70">
              {card.ctaLabel} →
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Grid ── */

const BentoGrid = () => (
  <div className="ml-[40%] min-h-screen p-6 xl:p-10 max-lg:ml-0">
    <div className="grid grid-cols-4 gap-4 auto-rows-[120px]">
      {cards.map((card) => (
        <BentoCard key={card.id} card={card} />
      ))}
    </div>
  </div>
);

export default BentoGrid;
