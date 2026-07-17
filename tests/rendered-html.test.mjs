import assert from "node:assert/strict";
import test from "node:test";

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

test("renders the personalized storybook creator", async () => {
  const worker = await getWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>讲故事｜把孩子写进成长绘本<\/title>/);
  assert.match(html, /孩子是故事里的主角/);
  assert.match(html, /本机卡通化/);
  assert.match(html, /保留五官的卡通角色/);
  assert.match(html, /不会保存照片/);
  assert.match(html, /平台模型（推荐）/);
  assert.match(html, /星光邮差/);
  assert.match(html, /迷雾安全队/);
  assert.match(html, /诚实星石/);
  assert.match(html, /生成孩子的绘本/);
});

test("returns all four audited templates when platform keys are absent", async () => {
  const worker = await getWorker();
  const templates = [
    ["galaxy-bridge", "小满的银河星桥"],
    ["star-mail", "小满的星光邮差"],
    ["bamboo-safety", "小满的迷雾安全队"],
    ["honest-star", "小满的诚实星石"],
  ];

  for (const [templateId, expectedTitle] of templates) {
    const response = await worker.fetch(
      new Request("http://localhost/api/story/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "小满", age: 6, templateId, provider: "platform" }),
      }),
      env,
      ctx,
    );

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.mode, "template");
    assert.equal(body.pages.length, 10);
    assert.equal(body.pages[0].title, expectedTitle);
    assert.ok(body.pages.every((page) => page.image.startsWith("/story/galaxy/")));
    assert.match(body.pages[0].text, /6岁的.*小满/);
    assert.match(body.notice, /模板故事/);
  }
});

test("rejects malformed personalization input", async () => {
  const worker = await getWorker();
  const response = await worker.fetch(
    new Request("http://localhost/api/story/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "", age: 2, templateId: "unknown", provider: "platform" }),
    }),
    env,
    ctx,
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.match(body.error, /孩子名字/);
});
