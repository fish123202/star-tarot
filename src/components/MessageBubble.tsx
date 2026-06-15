interface MessageBubbleProps {
  role: "user" | "assistant" | "system";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-violet-500/30 text-white"
            : "bg-white/5 text-violet-50"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
