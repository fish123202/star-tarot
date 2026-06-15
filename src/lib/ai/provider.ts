import { createOpenAI } from "@ai-sdk/openai";

export type LlmProvider = "deepseek" | "agnes";

function resolveProvider(): LlmProvider {
  const value = process.env.LLM_PROVIDER?.toLowerCase();
  if (value === "agnes") return "agnes";
  return "deepseek";
}

export function getLanguageModel() {
  const provider = resolveProvider();

  if (provider === "agnes") {
    const apiKey = process.env.AGNES_API_KEY;
    const baseURL = process.env.AGNES_BASE_URL;

    if (!apiKey || !baseURL) {
      throw new Error("使用 Agnes 时需配置 AGNES_API_KEY 和 AGNES_BASE_URL");
    }

    const agnes = createOpenAI({
      apiKey,
      baseURL,
    });

    const modelId = process.env.AGNES_MODEL ?? "agnes";
    return agnes.chat(modelId);
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("请配置 DEEPSEEK_API_KEY 环境变量");
  }

  const deepseek = createOpenAI({
    apiKey,
    baseURL: process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
  });

  const modelId = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";
  return deepseek.chat(modelId);
}

export function getProviderLabel(): string {
  return resolveProvider() === "agnes" ? "Agnes" : "DeepSeek";
}
