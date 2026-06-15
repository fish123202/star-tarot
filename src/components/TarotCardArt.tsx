import type { Suit } from "@/lib/tarot/types";
import { TAROT_DECK } from "@/lib/tarot/cards";

const SUIT_COLORS: Record<Suit, { bg: string; fg: string; label: string }> = {
  wands: { bg: "#4a2818", fg: "#e8924a", label: "权杖" },
  cups: { bg: "#1a2848", fg: "#6aabde", label: "圣杯" },
  swords: { bg: "#2a2a32", fg: "#aab0bc", label: "宝剑" },
  pentacles: { bg: "#3a3018", fg: "#d4af37", label: "星币" },
};

const MAJOR_GLYPHS: Record<number, string> = {
  0: "○",
  1: "∞",
  2: "☽",
  3: "♀",
  4: "♂",
  5: "✦",
  6: "♥",
  7: "→",
  8: "♛",
  9: "⌂",
  10: "☸",
  11: "⚖",
  12: "↻",
  13: "†",
  14: "☯",
  15: "♦",
  16: "▲",
  17: "✦",
  18: "☾",
  19: "☀",
  20: "♫",
  21: "◉",
};

function SuitIcon({ suit }: { suit: Suit }) {
  const c = SUIT_COLORS[suit].fg;
  if (suit === "wands") {
    return (
      <g fill={c} stroke={c} strokeWidth="1.5">
        <rect x="46" y="28" width="8" height="44" rx="2" />
        <circle cx="50" cy="24" r="6" fill="none" strokeWidth="2" />
        <path d="M50 18 L50 12 M44 20 L38 16 M56 20 L62 16" strokeLinecap="round" />
      </g>
    );
  }
  if (suit === "cups") {
    return (
      <g fill="none" stroke={c} strokeWidth="2">
        <path d="M34 36 Q50 58 66 36 L62 32 Q50 42 38 32 Z" />
        <line x1="50" y1="58" x2="50" y2="68" />
        <line x1="42" y1="68" x2="58" y2="68" />
      </g>
    );
  }
  if (suit === "swords") {
    return (
      <g fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <line x1="50" y1="22" x2="50" y2="62" />
        <polygon points="50,18 44,28 56,28" fill={c} />
        <line x1="38" y1="58" x2="62" y2="58" />
      </g>
    );
  }
  return (
    <g fill="none" stroke={c} strokeWidth="2">
      <circle cx="50" cy="42" r="22" />
      <polygon
        points="50,28 56,38 50,48 44,38"
        fill={c}
        stroke="none"
        opacity="0.8"
      />
    </g>
  );
}

interface TarotCardArtProps {
  cardId: string;
}

export function TarotCardArt({ cardId }: TarotCardArtProps) {
  const card = TAROT_DECK.find((c) => c.id === cardId);
  if (!card) {
    return (
      <div className="tarot-card-art tarot-card-art-fallback">
        <span className="text-2xl text-accent">✦</span>
      </div>
    );
  }

  const isMajor = card.arcana === "major";
  const suitStyle = card.suit ? SUIT_COLORS[card.suit] : null;

  return (
    <div
      className="tarot-card-art"
      style={{
        background: isMajor
          ? "linear-gradient(165deg, #2a1840 0%, #1a1028 50%, #2a2040 100%)"
          : `linear-gradient(165deg, ${suitStyle?.bg} 0%, #1a1810 100%)`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="tarot-card-art-svg"
        aria-hidden
      >
        <rect
          x="8"
          y="8"
          width="84"
          height="84"
          rx="4"
          fill="none"
          stroke="rgba(212,175,55,0.45)"
          strokeWidth="1"
        />
        <rect
          x="12"
          y="12"
          width="76"
          height="76"
          rx="2"
          fill="none"
          stroke="rgba(212,175,55,0.2)"
          strokeWidth="0.5"
        />

        {isMajor ? (
          <>
            <text
              x="50"
              y="22"
              textAnchor="middle"
              fill="#d4af37"
              fontSize="8"
              fontFamily="serif"
            >
              {card.number}
            </text>
            <text
              x="50"
              y="52"
              textAnchor="middle"
              fill="#f0ebe0"
              fontSize="22"
            >
              {MAJOR_GLYPHS[card.number ?? 0] ?? "✦"}
            </text>
          </>
        ) : (
          <>
            <text
              x="50"
              y="18"
              textAnchor="middle"
              fill={suitStyle?.fg}
              fontSize="7"
              fontFamily="serif"
            >
              {suitStyle?.label}
            </text>
            <SuitIcon suit={card.suit!} />
          </>
        )}
      </svg>

      <div className="tarot-card-art-footer">
        <p className="tarot-card-art-name">{card.name}</p>
        <p className="tarot-card-art-en">{card.nameEn}</p>
      </div>
    </div>
  );
}
