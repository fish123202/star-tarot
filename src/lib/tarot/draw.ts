import { TAROT_DECK } from "./cards";
import type { DrawnCard, Orientation, SpreadType } from "./types";
import { getSpread } from "./spreads";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomOrientation(): Orientation {
  return Math.random() > 0.5 ? "upright" : "reversed";
}

export function drawCards(spreadType: SpreadType): DrawnCard[] {
  const spread = getSpread(spreadType);
  const shuffled = shuffle(TAROT_DECK);

  return spread.positions.map((position, index) => ({
    card: shuffled[index],
    orientation: randomOrientation(),
    position,
  }));
}

export function formatDrawnCards(cards: DrawnCard[]): string {
  return cards
    .map(({ card, orientation, position }) => {
      const meaning =
        orientation === "upright" ? card.upright : card.reversed;
      const positionLabel = position ? `【${position}】` : "";
      const orientationLabel = orientation === "upright" ? "正位" : "逆位";
      return `${positionLabel}${card.name}（${orientationLabel}）— ${meaning}`;
    })
    .join("\n");
}
