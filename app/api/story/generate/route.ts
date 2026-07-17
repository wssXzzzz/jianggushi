import { NextResponse } from "next/server";
import { makeDemoStory, storyTemplates } from "@/lib/story";
import type { StoryTemplate } from "@/lib/story";

type Provider = "deepseek" | "zhipu";

type RequestBody = {
  name?: unknown;
  age?: unknown;
  templateId?: unknown;
  provider?: unknown;
  apiKey?: unknown;
};

const providerConfig = {
  deepseek: {
    url: "https://api.deepseek.com/chat/completions",
    model: process.env.DEEPSEEK_MODEL || "deepseek-v4-flash",
  },
  zhipu: {
    url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    model: process.env.ZHIPU_MODEL || "glm-4.7-flash",
  },
} as const;

function validateInput(body: RequestBody) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const age = typeof body.age === "number" ? body.age : Number.NaN;
  const templateId = typeof body.templateId === "string" ? body.templateId : "";
  const provider = body.provider;
  const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
  const template = storyTemplates.find((item) => item.id === templateId);

  if (!name || name.length > 12) throw new Error("孩子名字需要填写，且不能超过 12 个字符。");
  if (!Number.isInteger(age) || age < 3 || age > 12) throw new Error("年龄需要在 3 到 12 岁之间。");
  if (!template) throw new Error("请选择有效的故事模板。");
  if (!new Set(["platform", "deepseek", "zhipu"]).has(String(provider))) throw new Error("请选择有效的故事模型。");
  if (provider !== "platform" && (apiKey.length < 8 || apiKey.length > 512)) throw new Error("API Key 格式不正确。");

  return { name, age, template, provider: provider as "platform" | Provider, apiKey };
}

function makePrompt(name: string, age: number, template: StoryTemplate) {
  const outline = template.pages.map((page, index) => ({
    page: index + 1,
    chapter: page.chapter,
    currentTitle: page.title,
    currentPlot: page.text.replaceAll("{{name}}", name).replaceAll("年糕", name),
  }));

  return {
    system: `你是一位严谨的中文儿童绘本作者。为 ${age} 岁孩子写作，语言温暖、具体、适合亲子朗读。故事《${template.title}》必须自然教会“${template.lesson}”，不说教，不制造恐惧，不含暴力、危险模仿、歧视、隐私追问或成人内容。严格输出 JSON，不要输出 Markdown。`,
    user: `请把孩子“${name}”写成《${template.title}》的主角，沿用下面十页的场景顺序。每页正文 45 到 85 个汉字，对话简短。不要改变页数，也不要新增人物隐私。

场景顺序：${JSON.stringify(outline)}

输出格式：{"pages":[{"title":"章节标题","text":"正文","quote":"一句可选对白","speaker":"可选说话人"}]}`,
  };
}

async function callModel(provider: Provider, apiKey: string, name: string, age: number, template: StoryTemplate) {
  const config = providerConfig[provider];
  const prompt = makePrompt(name, age, template);
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 3200,
      stream: false,
    }),
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) throw new Error(`${provider} request failed with ${response.status}`);
  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error(`${provider} returned an empty story`);
  return content;
}

function parseStory(content: string, name: string, template: StoryTemplate) {
  const cleaned = content.replace(/^```json\s*|\s*```$/g, "").trim();
  const parsed = JSON.parse(cleaned) as {
    pages?: Array<{ title?: unknown; text?: unknown; quote?: unknown; speaker?: unknown }>;
  };
  if (!Array.isArray(parsed.pages) || parsed.pages.length !== template.pages.length) {
    throw new Error("model returned an invalid page count");
  }

  const unsafeWords = ["自杀", "色情", "毒品", "杀死", "血腥"];
  return parsed.pages.map((generated, index) => {
    const base = template.pages[index];
    const title = typeof generated.title === "string" ? generated.title.trim().replaceAll("{{name}}", name).replaceAll("年糕", name) : "";
    const text = typeof generated.text === "string" ? generated.text.trim().replaceAll("{{name}}", name).replaceAll("年糕", name) : "";
    const quote = typeof generated.quote === "string" ? generated.quote.trim().replaceAll("{{name}}", name).replaceAll("年糕", name) : "";
    const speaker = typeof generated.speaker === "string" ? generated.speaker.trim().replaceAll("{{name}}", name).replaceAll("年糕", name) : "";
    if (!title || !text || text.length > 220 || unsafeWords.some((word) => `${title}${text}${quote}`.includes(word))) {
      throw new Error("model returned unsafe or invalid content");
    }
    return {
      ...base,
      title: index === 0 ? `${name}的${template.title}` : title.slice(0, 24),
      text,
      quote: quote ? quote.slice(0, 80) : undefined,
      speaker: speaker ? speaker.slice(0, 12) : undefined,
    };
  });
}

export async function POST(request: Request) {
  try {
    const input = validateInput((await request.json()) as RequestBody);

    if (input.provider !== "platform") {
      try {
        const content = await callModel(input.provider, input.apiKey, input.name, input.age, input.template);
        return NextResponse.json({ pages: parseStory(content, input.name, input.template), mode: "ai", provider: input.provider });
      } catch {
        return NextResponse.json({ error: "模型连接失败，请检查 API Key 和额度后重试。" }, { status: 502 });
      }
    }

    const platformProviders: Array<{ provider: Provider; key: string | undefined }> = [
      { provider: "deepseek", key: process.env.DEEPSEEK_API_KEY },
      { provider: "zhipu", key: process.env.ZHIPU_API_KEY },
    ];

    for (const item of platformProviders) {
      if (!item.key) continue;
      try {
        const content = await callModel(item.provider, item.key, input.name, input.age, input.template);
        return NextResponse.json({ pages: parseStory(content, input.name, input.template), mode: "ai", provider: item.provider });
      } catch {
        continue;
      }
    }

    return NextResponse.json({
      pages: makeDemoStory(input.template.id, input.name, input.age),
      mode: "template",
      provider: "template",
      notice: "当前使用经过审核的模板故事；配置模型密钥后会由大模型重新创作。",
    });
  } catch (caught) {
    return NextResponse.json(
      { error: caught instanceof Error ? caught.message : "请求格式不正确。" },
      { status: 400 },
    );
  }
}
