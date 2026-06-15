import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { StarField } from "@/components/StarField";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "星语 Tarot | AI 塔罗解读",
  description: "静心一问，牌面自会作答 — AI 塔罗解读",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} relative min-h-screen antialiased`}
      >
        <StarField />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
