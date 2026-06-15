export type Arcana = "major" | "minor";
export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type Orientation = "upright" | "reversed";

export interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  arcana: Arcana;
  suit?: Suit;
  number?: number;
  upright: string;
  reversed: string;
}

export interface DrawnCard {
  card: TarotCard;
  orientation: Orientation;
  position?: string;
}

export type SpreadType = "single" | "three_ppf";

export interface SpreadTemplate {
  type: SpreadType;
  name: string;
  description: string;
  positions: string[];
}
