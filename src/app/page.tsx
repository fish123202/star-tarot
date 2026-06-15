import { Sparkles } from "lucide-react";
import { ChatPanel } from "@/components/ChatPanel";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8 sm:px-6">
      <header className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1 text-sm text-violet-200">
          <Sparkles className="h-4 w-4" />
          AI 塔罗 · 仅供娱乐参考
        </div>
        <h1 className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
          星语 Tarot
        </h1>
        <p className="mt-3 text-sm text-violet-300/70">
          提问 → 抽牌 → 流式解读 · DeepSeek Function Calling Demo
        </p>
      </header>

      <section className="flex min-h-[620px] flex-1 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-violet-950/50 sm:p-6">
        <ChatPanel />
      </section>
    </main>
  );
}
