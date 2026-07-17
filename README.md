# 讲故事

一个隐私优先的个性化儿童成长绘本 MVP。家长上传一张孩子照片，选择年龄和教育主题，孩子会成为《银河星桥》的故事主角。

## 当前能力

- 一张照片代入十页预制绘本
- 四套经过审核的故事：《银河星桥》《星光邮差》《迷雾安全队》《诚实星石》
- 覆盖勇气合作、礼貌感谢、安全求助、诚实担当
- DeepSeek 作为平台主故事模型
- 智谱普通开放平台 API 作为平台备用模型
- 用户可一次性使用自己的 DeepSeek 或智谱 API Key
- 浏览器朗读、键盘翻页和手机轻扫翻页
- Docker Compose 单服务部署

孩子照片只在浏览器中通过临时对象地址裁切和显示，不会发送给本站服务端或故事模型。一次性 API Key 会经过服务端转发给对应模型，但不会保存或记录。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
cp .env.example .env
npm run dev
```

不配置任何模型 Key 时，网站会使用经过审核的本地模板，完整体验仍然可用。

## 模型配置

在 `.env` 中按需填写：

```dotenv
DEEPSEEK_API_KEY=
DEEPSEEK_MODEL=deepseek-v4-flash
ZHIPU_API_KEY=
ZHIPU_MODEL=glm-4.7-flash
```

智谱配置必须使用普通开放平台 API Key。GLM Coding Plan 只用于编码工具，不应作为网站生产接口。

平台模式会先调用 DeepSeek；调用不可用时再尝试智谱。两个平台 Key 都未配置或均不可用时，返回本地模板故事。

## Docker Compose

```bash
cp .env.example .env
docker compose up -d --build
docker compose ps
```

默认监听 VPS 的 `3000` 端口。可以在 `.env` 中修改 `APP_PORT`，再通过 VPS 现有的 Nginx 或 Caddy 反向代理并启用 HTTPS。

更新：

```bash
git pull
docker compose up -d --build
```

## 验证

```bash
npm test
npm run lint
docker compose config
```

## 当前明确边界

这一版是“本地头像代入”，不是身份保持的 AI 图像重绘。照片不会被模型分析，也不会被保存。等确定支持参考图、局部编辑和人物一致性的图像模型后，再增加绘本化处理。
