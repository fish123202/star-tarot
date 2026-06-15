import { TAROT_DECK } from "@/lib/tarot/cards";
import { TarotCardArt } from "@/components/TarotCardArt";

interface DrawnCardsProps {
  cards: Array<{
    id?: string;
    name: string;
    nameEn?: string;
    orientation: string;
    position?: string;
    meaning: string;
  }>;
}

export function DrawnCards({ cards }: DrawnCardsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-3">
      {cards.map((card, index) => {
        const reversed = card.orientation !== "upright";
        const cardId =
          card.id ??
          inferCardId(card.name);

        return (
          <div
            key={`${card.name}-${index}`}
            className="flex flex-col items-center animate-card-reveal"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {card.position && (
              <p className="mb-3 font-serif text-xs font-semibold tracking-widest text-accent drop-shadow-sm">
                {card.position}
              </p>
            )}
            <div
              className={`tarot-playing-card ${reversed ? "tarot-playing-card-reversed" : ""}`}
            >
              <TarotCardArt cardId={cardId} />
              <div className="tarot-playing-card-badge">
                {reversed ? "逆位" : "正位"}
              </div>
            </div>
            <p className="mt-3 max-w-[9.5rem] rounded-sm border border-accent-dark/30 bg-black/15 px-2 py-1.5 text-center text-xs leading-relaxed text-muted shadow-inner">
              {card.meaning}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function inferCardId(name: string): string {
  const found = TAROT_DECK.find((card) => card.name === name);
  if (found) return found.id;

  const suitMap: Record<string, string> = {
    权杖: "wands",
    圣杯: "cups",
    宝剑: "swords",
    星币: "pentacles",
  };
  const rankMap: Record<string, string> = {
    Ace: "ace",
    二: "2",
    三: "3",
    四: "4",
    五: "5",
    六: "6",
    七: "7",
    八: "8",
    九: "9",
    十: "10",
    侍从: "page",
    骑士: "knight",
    王后: "queen",
    国王: "king",
  };

  for (const [cn, suit] of Object.entries(suitMap)) {
    if (name.startsWith(cn)) {
      const rank = name.slice(cn.length);
      return `${suit}-${rankMap[rank] ?? rank}`;
    }
  }

  return "major-0";
}
