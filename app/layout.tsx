import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const origin = protocol + "://" + host;

  return {
    title: "年糕与糯米：银河星桥",
    description: "两个小小光之守护者，修复银河星桥、帮助孤独云团找到回家的中秋绘本故事。",
    openGraph: {
      title: "年糕与糯米：银河星桥",
      description: "一场关于勇气、理解与回家的星光冒险。",
      images: [new URL("/og.png", origin).toString()],
    },
    twitter: {
      card: "summary_large_image",
      title: "年糕与糯米：银河星桥",
      description: "一场关于勇气、理解与回家的星光冒险。",
      images: [new URL("/og.png", origin).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
