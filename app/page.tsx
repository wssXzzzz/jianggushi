"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";

type StoryPage = {
  chapter: string;
  title: string;
  text: string;
  quote?: string;
  speaker?: string;
  image: string;
  alt: string;
  align: "left" | "right" | "bottom";
};

const storyPages: StoryPage[] = [
  {
    chapter: "银河星桥",
    title: "年糕与糯米",
    text: "中秋夜，星灯镇的银河突然少了一块。两个小小守护者，踏上了一场关于勇气、理解与回家的星光冒险。",
    quote: "只要我们在一起，黑夜也能找到光。",
    image: "/story/01-cover.png",
    alt: "年糕和糯米站在星灯镇屋顶，仰望断裂的银河星桥",
    align: "right",
  },
  {
    chapter: "第一章",
    title: "星灯熄灭了",
    text: "正当月亮升到屋檐上，整条长街的灯忽然一盏接一盏暗了下来。年糕护住最后一粒微光，糯米用小手替它挡住夜风。",
    quote: "哥哥，它在发抖。我们送它回家吧！",
    speaker: "糯米",
    image: "/story/02-scene.png",
    alt: "年糕和糯米在熄灭的灯笼街上守护最后一粒星光",
    align: "right",
  },
  {
    chapter: "第二章",
    title: "月饼盒里的来信",
    text: "阁楼里的月饼盒突然叮咚一响，一只由星尘变成的月兔跳了出来。它捧着破碎的星石：银河星桥断了，星灯才迷了路。",
    quote: "要修好星桥，必须找回三块星石。",
    speaker: "月兔",
    image: "/story/03-scene.png",
    alt: "月兔从月饼盒中现身，向年糕和糯米展示破碎的星石",
    align: "right",
  },
  {
    chapter: "第三章",
    title: "牵手穿过星光门",
    text: "年糕举起星石，屋顶上便张开一圈蓝金色的星门。风把瓦片吹得沙沙响，他回头握紧糯米的手，两个人一起跑向银河。",
    quote: "抓紧我。三、二、一——出发！",
    speaker: "年糕",
    image: "/story/04-scene.png",
    alt: "年糕牵着糯米穿过屋顶上的星光传送门",
    align: "left",
  },
  {
    chapter: "第四章",
    title: "风谷的第一块星石",
    text: "第一块星石落在浮空风谷的另一端。年糕把银河光连成稳稳的护栏，糯米踩着一圈圈时空涟漪跃过浮石——一个稳住路，一个勇敢向前。",
    quote: "我的光给你铺路，你的勇气带我们过去。",
    speaker: "年糕",
    image: "/story/05-scene.png",
    alt: "年糕用银河光稳住浮石，糯米跨越风谷取得星石",
    align: "left",
  },
  {
    chapter: "第五章",
    title: "时间迷宫",
    text: "银竹林里的路不停重复，连落叶都一遍遍飘回枝头。糯米静下心，把手按在地面；蓝色的时间环散开，唯一真正的路终于亮了起来。",
    quote: "跑得快不算厉害，知道往哪儿跑才厉害！",
    speaker: "糯米",
    image: "/story/06-scene.png",
    alt: "糯米在银色竹林中打开时间环，年糕用星光指出正确道路",
    align: "right",
  },
  {
    chapter: "第六章",
    title: "云背后的哭声",
    text: "最后一块星石，被大家害怕的“无声兽”抱在怀里。可年糕看见的不是怪兽，而是一团孤零零的云。糯米掰开月饼，把更大的一半递了过去。",
    quote: "你不用一个人躲在黑夜里。跟我们回家吧。",
    speaker: "糯米",
    image: "/story/07-scene.png",
    alt: "年糕和糯米用月饼安慰抱着星石哭泣的云团",
    align: "left",
  },
  {
    chapter: "第七章",
    title: "两束光，一座桥",
    text: "云团松开双手，最后的星石飞上天空。年糕的银河光化成万千星线，糯米的时空环让碎片回到原位。两束不同的光，织成了同一座桥。",
    quote: "真正强大的光，是愿意和另一束光并肩。",
    image: "/story/08-scene.png",
    alt: "年糕与糯米合力用银河光和时间环修复星桥",
    align: "bottom",
  },
  {
    chapter: "第八章",
    title: "星灯重新亮起",
    text: "他们沿着新生的星桥奔向故乡。脚步每落下一次，星灯镇就亮起一片金色灯火。河面、窗边和每一双等待的眼睛，都重新装满了星光。",
    quote: "看！我们的家认出我们啦！",
    speaker: "糯米",
    image: "/story/09-scene.png",
    alt: "年糕和糯米沿修复的星桥跑回重新点亮的星灯镇",
    align: "left",
  },
  {
    chapter: "尾声",
    title: "屋顶上的约定",
    text: "月饼还温热，银河已经完整。小云团提着自己的星灯，月兔在兄弟俩中间打起了哈欠。年糕和糯米约好：哪里有人害怕，哪里就会有他们的光。",
    quote: "真正的英雄，是让每一颗心都找到回家的路。",
    image: "/story/10-scene.png",
    alt: "年糕和糯米与月兔、小云团在屋顶分享月饼并仰望银河",
    align: "right",
  },
];

function clampPage(value: number) {
  return Math.max(0, Math.min(storyPages.length - 1, value));
}

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const touchStart = useRef<number | null>(null);
  const page = storyPages[pageIndex];

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const goToPage = useCallback(
    (next: number) => {
      stopSpeaking();
      setPageIndex(clampPage(next));
    },
    [stopSpeaking],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        goToPage(pageIndex + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        goToPage(pageIndex - 1);
      }
      if (event.key === "Home") goToPage(0);
      if (event.key === "End") goToPage(storyPages.length - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToPage, pageIndex]);

  useEffect(() => stopSpeaking, [stopSpeaking]);

  const readPage = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const narration = new SpeechSynthesisUtterance(
      [page.title, page.text, page.speaker, page.quote].filter(Boolean).join("。"),
    );
    narration.lang = "zh-CN";
    narration.rate = 0.88;
    narration.pitch = 1.02;
    narration.onend = () => setIsSpeaking(false);
    narration.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(narration);
    setIsSpeaking(true);
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStart.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart.current === null) return;
    const end = event.changedTouches[0]?.clientX ?? touchStart.current;
    const distance = end - touchStart.current;
    if (Math.abs(distance) > 52) {
      goToPage(pageIndex + (distance < 0 ? 1 : -1));
    }
    touchStart.current = null;
  };

  return (
    <main className="story-shell">
      <div className="star-field" aria-hidden="true" />

      <header className="story-header">
        <button className="brand" onClick={() => goToPage(0)} aria-label="回到封面">
          <span className="brand-star">✦</span>
          <span>
            <strong>银河星桥</strong>
            <small>年糕 × 糯米</small>
          </span>
        </button>
        <div className="header-actions">
          <span className="page-count" aria-live="polite">
            {String(pageIndex + 1).padStart(2, "0")}
            <i />
            {String(storyPages.length).padStart(2, "0")}
          </span>
          <button
            className={"listen-button" + (isSpeaking ? " is-speaking" : "")}
            onClick={readPage}
            aria-label={isSpeaking ? "停止朗读" : "朗读当前章节"}
          >
            <span aria-hidden="true">{isSpeaking ? "■" : "◖))"}</span>
            {isSpeaking ? "停止" : "读给我听"}
          </button>
        </div>
      </header>

      <section
        className={"book-spread align-" + page.align}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label={"故事第 " + (pageIndex + 1) + " 页"}
      >
        <div className="picture" key={page.image}>
          <Image
            src={page.image}
            alt={page.alt}
            fill
            priority={pageIndex < 2}
            sizes="100vw"
          />
        </div>
        <div className="picture-shade" aria-hidden="true" />

        <article className={"story-card" + (pageIndex === 0 ? " cover-card" : "")}>
          <p className="chapter-label">
            <span>{page.chapter}</span>
            <i />
          </p>
          <h1>{page.title}</h1>
          <p className="narration">{page.text}</p>
          {page.quote && (
            <blockquote>
              “{page.quote}”
              {page.speaker && <cite>—— {page.speaker}</cite>}
            </blockquote>
          )}
          {pageIndex === 0 && (
            <button className="start-button" onClick={() => goToPage(1)}>
              翻开星桥 <span aria-hidden="true">→</span>
            </button>
          )}
          {pageIndex === storyPages.length - 1 && (
            <button className="start-button replay" onClick={() => goToPage(0)}>
              再读一遍 <span aria-hidden="true">↺</span>
            </button>
          )}
        </article>

        <button
          className="page-arrow page-arrow-left"
          onClick={() => goToPage(pageIndex - 1)}
          disabled={pageIndex === 0}
          aria-label="上一页"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          className="page-arrow page-arrow-right"
          onClick={() => goToPage(pageIndex + 1)}
          disabled={pageIndex === storyPages.length - 1}
          aria-label="下一页"
        >
          <span aria-hidden="true">→</span>
        </button>
      </section>

      <nav className="story-progress" aria-label="故事章节">
        {storyPages.map((item, index) => (
          <button
            key={item.title}
            className={index === pageIndex ? "active" : ""}
            onClick={() => goToPage(index)}
            aria-label={"前往第 " + (index + 1) + " 页：" + item.title}
            aria-current={index === pageIndex ? "page" : undefined}
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </nav>

      <p className="reading-hint">← → 翻页 · 轻扫画面 · 点击星点跳转</p>
    </main>
  );
}
