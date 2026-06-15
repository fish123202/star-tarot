import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "星语 Tarot | AI 塔罗解读",
  description: "AI 驱动的塔罗占卜 Demo — 流式解读 · Function Calling · Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSans.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
