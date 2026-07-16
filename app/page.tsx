"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, CSSProperties, FormEvent, TouchEvent } from "react";
import { baseStoryPages, lessonOptions } from "@/lib/story";
import type { StoryPage } from "@/lib/story";

type Provider = "platform" | "deepseek" | "zhipu";

type GenerateResponse = {
  pages: StoryPage[];
  mode: "ai" | "template";
  provider: string;
  notice?: string;
};

function clampPage(value: number, pageCount: number) {
  return Math.max(0, Math.min(pageCount - 1, value));
}

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(6);
  const [lesson, setLesson] = useState("礼貌待人");
  const [provider, setProvider] = useState<Provider>("platform");
  const [apiKey, setApiKey] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoZoom, setPhotoZoom] = useState(1.15);
  const [photoY, setPhotoY] = useState(50);
  const [consent, setConsent] = useState(false);
  const [pages, setPages] = useState<StoryPage[]>(baseStoryPages);
  const [pageIndex, setPageIndex] = useState(0);
  const [view, setView] = useState<"create" | "read">("create");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const photoObjectUrl = useRef<string | null>(null);
  const touchStart = useRef<number | null>(null);
  const page = pages[pageIndex];

  useEffect(
    () => () => {
      if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
    },
    [],
  );

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const goToPage = useCallback(
    (next: number) => {
      stopSpeaking();
      setPageIndex(clampPage(next, pages.length));
    },
    [pages.length, stopSpeaking],
  );

  useEffect(() => {
    if (view !== "read") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") goToPage(pageIndex + 1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") goToPage(pageIndex - 1);
      if (event.key === "Home") goToPage(0);
      if (event.key === "End") goToPage(pages.length - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToPage, pageIndex, pages.length, view]);

  const onPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("请选择 JPG、PNG 或 WebP 图片。");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("照片不能超过 8MB。");
      return;
    }
    if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
    photoObjectUrl.current = URL.createObjectURL(file);
    setPhotoUrl(photoObjectUrl.current);
  };

  const generateStory = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!name.trim()) return setError("先填写孩子的名字或昵称。");
    if (!photoUrl) return setError("请上传一张正面清晰的照片。");
    if (!consent) return setError("请确认你有权使用这张照片。");
    if (provider !== "platform" && !apiKey.trim()) return setError("请填写本次使用的 API Key。");

    setIsGenerating(true);
    try {
      const response = await fetch("/api/story/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          age,
          lesson,
          provider,
          apiKey: provider === "platform" ? undefined : apiKey.trim(),
        }),
      });
      const result = (await response.json()) as GenerateResponse & { error?: string };
      if (!response.ok) throw new Error(result.error || "故事生成失败，请稍后再试。");
      setPages(result.pages);
      setNotice(result.notice || "");
      setApiKey("");
      setPageIndex(0);
      setView("read");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "故事生成失败，请稍后再试。");
    } finally {
      setIsGenerating(false);
    }
  };

  const readPage = () => {
    if (!("speechSynthesis" in window)) return;
    if (isSpeaking) return stopSpeaking();
    const narration = new SpeechSynthesisUtterance(
      [page.title, page.text, page.speaker, page.quote].filter(Boolean).join("。"),
    );
    narration.lang = "zh-CN";
    narration.rate = 0.88;
    narration.onend = () => setIsSpeaking(false);
    narration.onerror = () => setIsSpeaking(false);
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
    if (Math.abs(distance) > 52) goToPage(pageIndex + (distance < 0 ? 1 : -1));
    touchStart.current = null;
  };

  const portraitStyle = {
    "--portrait-zoom": photoZoom,
    "--portrait-y": `${photoY}%`,
  } as CSSProperties;

  if (view === "read") {
    const faceStyle = {
      "--face-x": `${page.face.x}%`,
      "--face-y": `${page.face.y}%`,
      "--face-size": `${page.face.size}%`,
      "--face-rotate": `${page.face.rotate ?? 0}deg`,
      ...portraitStyle,
    } as CSSProperties;

    return (
      <main className="reader-shell">
        <header className="reader-header">
          <button className="brand-button" onClick={() => setView("create")}>
            <span className="brand-mark">讲</span>
            <span><strong>讲故事</strong><small>{name}的成长绘本</small></span>
          </button>
          <div className="reader-actions">
            <span className="privacy-chip">照片仅在本机显示</span>
            <button className="quiet-button" onClick={readPage}>{isSpeaking ? "停止朗读" : "读给我听"}</button>
            <button className="quiet-button" onClick={() => setView("create")}>重新制作</button>
          </div>
        </header>

        {notice && <p className="reader-notice">{notice}</p>}

        <section className="reader-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="reader-picture">
            <Image src={page.image} alt={page.alt} fill priority={pageIndex < 2} sizes="100vw" />
            <div className="reader-shade" />
            {photoUrl && (
              <div className="face-slot" style={faceStyle} aria-label={`${name}的故事角色头像`}>
                <Image src={photoUrl} alt="" fill unoptimized sizes="12vw" />
              </div>
            )}
            <button className="page-button previous" onClick={() => goToPage(pageIndex - 1)} disabled={pageIndex === 0} aria-label="上一页">←</button>
            <button className="page-button next" onClick={() => goToPage(pageIndex + 1)} disabled={pageIndex === pages.length - 1} aria-label="下一页">→</button>
          </div>
          <article className={`reader-card align-${page.align}`}>
            <p className="eyebrow">{page.chapter}</p>
            <h1>{page.title}</h1>
            <p>{page.text}</p>
            {page.quote && (
              <blockquote>“{page.quote}”{page.speaker && <cite>—— {page.speaker}</cite>}</blockquote>
            )}
          </article>
        </section>

        <nav className="reader-progress" aria-label="故事章节">
          {pages.map((item, index) => (
            <button key={item.chapter} className={index === pageIndex ? "active" : ""} onClick={() => goToPage(index)} aria-label={`前往第 ${index + 1} 页`}>
              {index + 1}
            </button>
          ))}
        </nav>
      </main>
    );
  }

  const coverFace = baseStoryPages[0].face;
  const previewFaceStyle = {
    "--face-x": `${coverFace.x}%`,
    "--face-y": `${coverFace.y}%`,
    "--face-size": `${coverFace.size}%`,
    "--face-rotate": "0deg",
    ...portraitStyle,
  } as CSSProperties;

  return (
    <main className="creator-shell">
      <header className="site-header">
        <a className="brand-button" href="#top" aria-label="讲故事首页">
          <span className="brand-mark">讲</span>
          <span><strong>讲故事</strong><small>把孩子写进成长里</small></span>
        </a>
        <span className="privacy-chip">隐私优先 · 照片不上传</span>
      </header>

      <section className="creator-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">孩子是故事里的主角</p>
          <h1>把熟悉的笑脸，<br />放进会成长的故事。</h1>
          <p className="hero-intro">上传一张照片，选择一个成长主题，为孩子制作专属的《银河星桥》。照片只在当前浏览器中裁切显示，不会发送给故事模型。</p>
          <div className="promise-list">
            <span><i>01</i>预先审核的成长主题</span>
            <span><i>02</i>适合年龄的故事表达</span>
            <span><i>03</i>可朗读的十页互动绘本</span>
          </div>

          <div className="cover-preview" aria-label="个性化绘本封面预览">
            <Image src="/story/01-cover.png" alt="银河星桥绘本封面" fill priority sizes="(max-width: 900px) 100vw, 56vw" />
            <div className="cover-vignette" />
            {photoUrl && (
              <div className="face-slot preview-face" style={previewFaceStyle}>
                <Image src={photoUrl} alt="孩子在绘本中的头像预览" fill unoptimized sizes="10vw" />
              </div>
            )}
            <div className="preview-title"><small>银河星桥</small><strong>{name.trim() || "孩子"}的星光冒险</strong></div>
          </div>
        </div>

        <form className="creator-card" onSubmit={generateStory}>
          <div className="form-heading"><span>01</span><div><h2>制作第一本绘本</h2><p>大约需要 1 分钟</p></div></div>

          <label className="field-label" htmlFor="child-name">孩子的名字或昵称</label>
          <input id="child-name" className="text-input" value={name} maxLength={12} onChange={(event) => setName(event.target.value)} placeholder="例如：小满" autoComplete="off" />

          <div className="split-fields">
            <label><span className="field-label">年龄</span><select className="text-input" value={age} onChange={(event) => setAge(Number(event.target.value))}>{Array.from({ length: 10 }, (_, index) => index + 3).map((item) => <option key={item} value={item}>{item} 岁</option>)}</select></label>
            <label><span className="field-label">故事模板</span><select className="text-input" disabled><option>银河星桥</option></select></label>
          </div>

          <fieldset className="lesson-fieldset">
            <legend className="field-label">这次想学会什么？</legend>
            <div className="lesson-grid">
              {lessonOptions.map((item) => (
                <button type="button" key={item.value} className={lesson === item.value ? "selected" : ""} onClick={() => setLesson(item.value)}><small>{item.icon}</small>{item.label}</button>
              ))}
            </div>
          </fieldset>

          <label className={`photo-drop ${photoUrl ? "has-photo" : ""}`}>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onPhotoChange} />
            {photoUrl ? (
              <><span className="portrait-preview" style={portraitStyle}><Image src={photoUrl} alt="已选择的孩子照片" fill unoptimized sizes="72px" /></span><span><strong>照片已在本地打开</strong><small>点击可重新选择，不会上传原图</small></span></>
            ) : (
              <><span className="upload-icon">＋</span><span><strong>上传一张正面照片</strong><small>JPG、PNG 或 WebP，不超过 8MB</small></span></>
            )}
          </label>

          {photoUrl && (
            <div className="photo-controls">
              <label>头像大小<input type="range" min="1" max="2" step="0.05" value={photoZoom} onChange={(event) => setPhotoZoom(Number(event.target.value))} /></label>
              <label>上下位置<input type="range" min="30" max="70" step="1" value={photoY} onChange={(event) => setPhotoY(Number(event.target.value))} /></label>
            </div>
          )}

          <div className="provider-row">
            <label><span className="field-label">故事模型</span><select className="text-input" value={provider} onChange={(event) => { setProvider(event.target.value as Provider); setApiKey(""); }}><option value="platform">平台模型（推荐）</option><option value="deepseek">我的 DeepSeek Key</option><option value="zhipu">我的智谱 API Key</option></select></label>
            {provider !== "platform" && <label><span className="field-label">仅本次使用的 API Key</span><input className="text-input" type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} autoComplete="off" placeholder="不会保存" /></label>}
          </div>

          <label className="consent-row"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>我确认已获得照片使用授权，并同意在当前浏览器中制作绘本。</span></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="generate-button" disabled={isGenerating}>{isGenerating ? "正在编织星光故事…" : "生成孩子的绘本"}<span>→</span></button>
          <p className="form-footnote">当前版本使用本地头像代入；AI 绘本化将在选定图像模型后接入。</p>
        </form>
      </section>
    </main>
  );
}
