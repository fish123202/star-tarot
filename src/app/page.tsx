import { ChatPanel } from "@/components/ChatPanel";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-10 sm:px-8">
      <header className="mb-10 text-center">
        <p className="mb-2 font-serif text-xs tracking-[0.35em] text-accent uppercase drop-shadow-sm">
          Star Whisper
        </p>
        <h1 className="font-serif text-5xl font-semibold tracking-widest text-foreground drop-shadow-md sm:text-6xl">
          星语
        </h1>
        <div className="divider-gold mx-auto mt-5 w-24" />
        <p className="mt-5 font-serif text-sm text-muted">
          静心一问，牌面自会作答
        </p>
        <p className="mt-1 text-xs text-muted/70">仅供娱乐参考</p>
      </header>

      <section className="panel-raised flex min-h-[600px] flex-1 flex-col p-5 sm:p-7">
        <ChatPanel />
      </section>
    </main>
  );
}
