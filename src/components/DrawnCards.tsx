interface DrawnCardsProps {
  cards: Array<{
    name: string;
    orientation: string;
    position?: string;
    meaning: string;
  }>;
}

export function DrawnCards({ cards }: DrawnCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={`${card.name}-${index}`}
          className="rounded-xl border border-violet-400/20 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/5 p-4"
        >
          {card.position && (
            <p className="mb-1 text-xs uppercase tracking-wider text-violet-300/70">
              {card.position}
            </p>
          )}
          <p className="text-lg font-semibold text-white">{card.name}</p>
          <p className="mt-1 text-xs text-fuchsia-300">
            {card.orientation === "upright" ? "正位" : "逆位"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-violet-100/80">
            {card.meaning}
          </p>
        </div>
      ))}
    </div>
  );
}
