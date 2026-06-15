import type { SpreadTemplate, SpreadType } from "./types";

export const SPREADS: Record<SpreadType, SpreadTemplate> = {
  single: {
    type: "single",
    name: "单牌指引",
    description: "一张牌回答当下最核心的问题，适合快速指引。",
    positions: ["核心指引"],
  },
  three_ppf: {
    type: "three_ppf",
    name: "三牌 · 过去 / 现在 / 未来",
    description: "经典三牌阵，看清时间线上的能量流动。",
    positions: ["过去", "现在", "未来"],
  },
};

export function getSpread(type: SpreadType): SpreadTemplate {
  return SPREADS[type];
}
