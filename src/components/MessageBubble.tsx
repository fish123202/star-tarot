interface MessageBubbleProps {
  role: "user" | "assistant" | "system";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="block-user max-w-[85%] px-4 py-3 text-right">
          <p className="mb-2 font-serif text-xs font-semibold tracking-widest text-accent">
            所 问
          </p>
          <p className="text-sm leading-relaxed text-foreground">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full">
      <p className="mb-2 font-serif text-xs font-semibold tracking-widest text-accent">
        解 读
      </p>
      <div className="block-inset px-4 py-3">
        <p className="whitespace-pre-wrap font-serif text-sm leading-[1.85] text-foreground/95">
          {content}
        </p>
      </div>
    </div>
  );
}
