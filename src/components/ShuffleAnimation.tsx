interface ShuffleAnimationProps {
  cardCount?: number;
}

export function ShuffleAnimation({ cardCount = 3 }: ShuffleAnimationProps) {
  const slots = Math.min(cardCount, 3);

  return (
    <div className="shuffle-container">
      <div className="shuffle-deck" style={{ ["--count" as string]: slots }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="shuffle-card"
            style={{ ["--i" as string]: i }}
          >
            <div className="shuffle-card-back">
              <span className="shuffle-card-star">✦</span>
            </div>
          </div>
        ))}
      </div>
      <p className="shuffle-label">洗牌中…</p>
    </div>
  );
}
