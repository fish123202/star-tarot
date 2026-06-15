import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { getLanguageModel, getProviderLabel } from "@/lib/ai/provider";
import { tarotTools } from "@/lib/ai/tools";
import { SYSTEM_PROMPT } from "@/lib/prompts/system";
import { getSpread } from "@/lib/tarot/spreads";
import type { SpreadType } from "@/lib/tarot/types";

export const maxDuration = 60;

interface ChatRequestBody {
  messages: UIMessage[];
  spreadType?: SpreadType;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const { messages, spreadType = "single" } = body;

    if (!messages?.length) {
      return Response.json({ error: "messages 不能为空" }, { status: 400 });
    }

    const spread = getSpread(spreadType);
    const system = `${SYSTEM_PROMPT}

## 当前会话配置
- 牌阵：${spread.name}（${spread.type}）
- 位置：${spread.positions.join(" → ")}
- 模型提供方：${getProviderLabel()}

请先调用 draw_cards 工具（spreadType="${spreadType}"）获取牌面，再进行解读。`;

    const result = streamText({
      model: getLanguageModel(),
      system,
      messages: await convertToModelMessages(messages),
      tools: tarotTools,
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[chat-api]", error);
    const message =
      error instanceof Error ? error.message : "服务器内部错误";
    return Response.json({ error: message }, { status: 500 });
  }
}
