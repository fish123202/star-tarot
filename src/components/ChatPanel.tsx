"use client";

import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Loader2 } from "lucide-react";
import type { SpreadType } from "@/lib/tarot/types";
import { SPREADS } from "@/lib/tarot/spreads";
import { WELCOME_MESSAGE } from "@/lib/prompts/system";
import { DrawnCards } from "@/components/DrawnCards";
import { MessageBubble } from "@/components/MessageBubble";

export function ChatPanel() {
  const [spreadType, setSpreadType] = useState<SpreadType>("single");
  const [input, setInput] = useState("");

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { spreadType },
      }),
    [spreadType],
  );

  const { messages, sendMessage, status, error } = useChat({
    transport,
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    await sendMessage({ text });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(SPREADS) as SpreadType[]).map((type) => {
          const spread = SPREADS[type];
          const active = spreadType === type;
          return (
            <button
              key={type}
              type="button"
              disabled={isLoading}
              onClick={() => setSpreadType(type)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                  : "bg-white/5 text-violet-200 hover:bg-white/10"
              }`}
            >
              {spread.name}
            </button>
          );
        })}
      </div>

      <p className="mb-4 text-sm text-violet-300/70">
        {SPREADS[spreadType].description}
      </p>

      <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
        <MessageBubble role="assistant" content={WELCOME_MESSAGE} />

        {messages.map((message) => (
          <div key={message.id} className="space-y-3">
            {message.parts.map((part, index) => {
              if (part.type === "text" && part.text.trim()) {
                return (
                  <MessageBubble
                    key={`${message.id}-text-${index}`}
                    role={message.role}
                    content={part.text}
                  />
                );
              }

              if (
                part.type === "tool-draw_cards" &&
                part.state === "output-available"
              ) {
                const output = part.output as {
                  cards?: Array<{
                    name: string;
                    orientation: string;
                    position?: string;
                    meaning: string;
                  }>;
                };
                if (output?.cards?.length) {
                  return (
                    <DrawnCards
                      key={`${message.id}-cards-${index}`}
                      cards={output.cards}
                    />
                  );
                }
              }

              return null;
            })}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-violet-300/80">
            <Loader2 className="h-4 w-4 animate-spin" />
            正在抽牌与解读…
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error.message || "请求失败，请检查 API Key 配置"}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="例如：最近健身计划总坚持不下去，我该怎么调整？"
          disabled={isLoading}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-violet-300/40 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          发送
        </button>
      </form>
    </div>
  );
}
