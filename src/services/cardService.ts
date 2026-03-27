import localCards, { type CardData } from "@/data/cards";

/**
 * Returns sorted, published cards.
 * Currently reads from a local dataset.
 * Replace the body with a Supabase fetch when ready — the rest of the app stays unchanged.
 */
export async function getCards(): Promise<CardData[]> {
  return sortCards(localCards.filter((c) => c.published !== false));
}

/** Synchronous variant for initial render (avoids waterfall before Supabase). */
export function getCardsSync(): CardData[] {
  return sortCards(localCards.filter((c) => c.published !== false));
}

function sortCards(cards: CardData[]): CardData[] {
  return [...cards].sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.order != null) return -1;
    if (b.order != null) return 1;

    const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return db - da; // newer first
  });
}

export type { CardData };
