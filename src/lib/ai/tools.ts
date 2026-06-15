import { tool } from "ai";
import { z } from "zod";
import { drawCards, formatDrawnCards } from "@/lib/tarot/draw";
import { getSpread } from "@/lib/tarot/spreads";
import type { SpreadType } from "@/lib/tarot/types";

export const tarotTools = {
  get_spread_template: tool({
    description: "获取牌阵模板信息，包括每个位置的含义。在用户选定牌阵后、抽牌前可调用。",
    inputSchema: z.object({
      spreadType: z
        .enum(["single", "three_ppf"])
        .describe("牌阵类型：single=单牌，three_ppf=过去现在未来三牌阵"),
    }),
    execute: async ({ spreadType }) => {
      const spread = getSpread(spreadType as SpreadType);
      return {
        name: spread.name,
        description: spread.description,
        positions: spread.positions,
      };
    },
  }),

  draw_cards: tool({
    description:
      "从78张塔罗牌中随机抽牌并决定正逆位。用户提出问题时必须调用此工具获取真实牌面，不可自行编造。",
    inputSchema: z.object({
      spreadType: z
        .enum(["single", "three_ppf"])
        .describe("牌阵类型，需与用户选择一致"),
    }),
    execute: async ({ spreadType }) => {
      const cards = drawCards(spreadType as SpreadType);
      return {
        spreadType,
        cards: cards.map(({ card, orientation, position }) => ({
          id: card.id,
          name: card.name,
          nameEn: card.nameEn,
          arcana: card.arcana,
          suit: card.suit,
          orientation,
          position,
          meaning:
            orientation === "upright" ? card.upright : card.reversed,
        })),
        summary: formatDrawnCards(cards),
      };
    },
  }),

  log_reading: tool({
    description: "记录本次占卜元数据，用于统计与复盘。解读完成后可选调用。",
    inputSchema: z.object({
      spreadType: z.enum(["single", "three_ppf"]),
      questionTopic: z
        .string()
        .describe("用户问题的主题关键词，如：感情、事业、日常决策"),
    }),
    execute: async ({ spreadType, questionTopic }) => {
      const entry = {
        spreadType,
        questionTopic,
        timestamp: new Date().toISOString(),
      };
      console.info("[tarot-analytics]", JSON.stringify(entry));
      return { logged: true, ...entry };
    },
  }),
};
