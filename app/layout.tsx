import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const origin = protocol + "://" + host;

  return {
    title: "讲故事｜把孩子写进成长绘本",
    description: "上传一张照片，为孩子制作关于礼貌、勇气、安全与合作的专属成长绘本。",
    openGraph: {
      title: "讲故事｜把孩子写进成长绘本",
      description: "让孩子成为故事主角，在银河星桥的冒险中学习成长。",
      images: [new URL("/og.png", origin).toString()],
    },
    twitter: {
      card: "summary_large_image",
      title: "讲故事｜把孩子写进成长绘本",
      description: "让孩子成为故事主角，在银河星桥的冒险中学习成长。",
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
