"use client";

import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { SpreadType } from "@/lib/tarot/types";
import { SPREADS } from "@/lib/tarot/spreads";
import { WELCOME_MESSAGE } from "@/lib/prompts/system";
import { DrawnCards } from "@/components/DrawnCards";
import { MessageBubble } from "@/components/MessageBubble";
import { ShuffleAnimation } from "@/components/ShuffleAnimation";

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

  const spreadCardCount = SPREADS[spreadType].positions.length;

  const latestAssistant = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");

  const hasDrawnCardsInLatest =
    latestAssistant?.parts.some(
      (part) =>
        part.type === "tool-draw_cards" && part.state === "output-available",
    ) ?? false;

  const showShuffle = isLoading && !hasDrawnCardsInLatest;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    await sendMessage({ text });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 border-b-2 border-accent-dark/40 pb-5">
        <p className="mb-3 font-serif text-xs tracking-widest text-accent">
          选 牌 阵
        </p>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(SPREADS) as SpreadType[]).map((type) => {
            const spread = SPREADS[type];
            const active = spreadType === type;
            return (
              <button
                key={type}
                type="button"
                disabled={isLoading}
                onClick={() => setSpreadType(type)}
                className={`btn-spread px-5 py-2.5 font-serif text-sm ${
                  active
                    ? "btn-spread-active"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {spread.name}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {SPREADS[spreadType].description}
        </p>
      </div>

      <div className="block-inset flex-1 space-y-5 overflow-y-auto rounded-sm p-4">
        <MessageBubble role="assistant" content={WELCOME_MESSAGE} />

        {messages.map((message) => (
          <div key={message.id} className="space-y-4">
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
                    id: string;
                    name: string;
                    nameEn?: string;
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

        {showShuffle && (
          <ShuffleAnimation cardCount={spreadCardCount} />
        )}

        {isLoading && hasDrawnCardsInLatest && (
          <p className="font-serif text-sm italic text-accent/80">
            解读中…
          </p>
        )}

        {error && (
          <div className="border-2 border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-200 shadow-inner">
            {error.message || "请求失败，请检查 API Key 配置"}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 flex gap-3 border-t-2 border-accent-dark/40 pt-5"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="写下你的问题…"
          disabled={isLoading}
          className="input-inset flex-1 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="btn-submit px-7 py-3.5 font-serif text-sm tracking-widest disabled:cursor-not-allowed disabled:opacity-40"
        >
          求 签
        </button>
      </form>
    </div>
  );
}
