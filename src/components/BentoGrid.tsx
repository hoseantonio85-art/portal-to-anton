import { useState } from "react";
import { getCardsSync, type CardData } from "@/services/cardService";
import { cn } from "@/lib/utils";

/* ── Accent color map ── */

const accentColors: Record<string, string> = {
  dark: "hsl(240 20% 12%)",
  violet: "hsl(270 60% 40%)",
  lime: "hsl(65 100% 50%)",
  coral: "hsl(12 60% 48%)",
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

/* ── Icon registry ── */

const iconMap: Record<string, JSX.Element> = {
  behance: <span className="text-6xl font-black tracking-tight" style={{ color: "hsl(0 0% 100%)" }}>Bē</span>,
  "picture-filler": (
    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="2" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  coroflot: <span className="text-4xl font-bold" style={{ color: accentColors.lime }}>/**/</span>,
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
  antro: (
    <span className="text-3xl font-black tracking-tighter" style={{ color: "hsl(0 0% 100%)" }}>A</span>
  ),
  synthwave: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  hh: <span className="text-2xl font-black tracking-tight" style={{ color: "hsl(0 0% 100%)" }}>hh</span>,
  vk: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.456 2.27 4.608 2.862 4.608.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.405 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.746.847 1.322 1.558 1.474 2.05.17.491-.085.745-.576.745z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.564v4.49c0 2.476-2.014 4.49-4.564 4.49zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019c1.665 0 3.093-1.355 3.093-3.019v-3.019H8.172zM15.852 17.49c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.355-3.019-3.019-3.019z" />
    </svg>
  ),
  max: (
    <span className="text-xl font-bold tracking-tight" style={{ color: "hsl(0 0% 100%)" }}>M</span>
  ),
};

/* ── Single bento card ── */

const BentoCard = ({ card }: { card: CardData }) => {
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    if (card.link) window.open(card.link, "_blank", "noopener");
  };

  const isLight = card.theme === "light";
  const textColor = isLight ? "text-foreground" : "text-primary-foreground";
  const isClickable = !!card.link;
  const showText = card.textMode !== "none";
  const hoverOnly = card.textMode === "hover";
  const { col, row, minH } = sizeConfig[card.size] ?? sizeConfig.medium;
  const hasValidImage = card.image && !imgError;

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
      {/* Background image (with error handling) */}
      {card.image && !imgError && (
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}

      {/* Icon fallback (no valid image) */}
      {!hasValidImage && iconMap[card.id] && (
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