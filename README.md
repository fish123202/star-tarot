# 星语 Tarot — AI 塔罗解读 Demo
> 线上 Demo：https://star-tarot-late-fish-s-projects.vercel.app  
> GitHub：https://github.com/fish123202/star-tarot
**提问 → 抽牌（Function Calling）→ 流式解读**。

---

## 1. 架构说明

```
┌──────────────────────────────────────────────────────────────┐
│  Browser（React Client Components）                           │
│  ChatPanel · useChat · 流式渲染消息 + 牌面卡片                   │
└────────────────────────────┬─────────────────────────────────┘
                             │ POST /api/chat（UIMessage stream）
                             ▼
┌──────────────────────────────────────────────────────────────┐
│  Next.js 14 App Router                                        │
│  src/app/api/chat/route.ts  ←→  streamText + tools            │
└────────────────────────────┬─────────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
   lib/ai/provider.ts   lib/ai/tools.ts   lib/tarot/*
   DeepSeek / Agnes     draw_cards 等      78 张牌本地牌库
```

### 目录对照

| 路径 | 职责 | 类比 Spring Boot |
|------|------|------------------|
| `src/app/api/chat/route.ts` | 聊天 API 入口 | `@RestController` |
| `src/lib/ai/tools.ts` | Tool 定义与执行 | `@Service` 工具方法 |
| `src/lib/ai/provider.ts` | 模型客户端配置 | 数据源 / Feign Client |
| `src/lib/tarot/cards.ts` | 78 张牌静态数据 | 实体 + 常量库 |
| `src/lib/prompts/system.ts` | System Prompt | 业务规则配置 |
| `src/components/ChatPanel.tsx` | 聊天 UI | 前端页面（Thymeleaf/Vue） |

### 技术栈

- **框架**：Next.js 14（App Router）+ TypeScript
- **UI**：Tailwind CSS
- **AI**：Vercel AI SDK（`ai` + `@ai-sdk/react` + `@ai-sdk/openai`）
- **LLM**：DeepSeek（默认，`deepseek-chat`）/ Agnes（可切换）
- **部署**：Vercel（免费 HTTPS 域名）

---

## 2. 关键 Prompt 与 Vibe 思路

### Vibe 开发流程

1. **先跑通最小链路**：用户输入 → API → 模型返回文字（无 Tool）
2. **再加 Tool**：让模型必须调用 `draw_cards`，避免「幻觉牌面」
3. **迭代 Prompt**：用 10+ 真实问题测试（含健身/感情/事业），调整语气与长度
4. **加边界**：免责声明、禁止医疗/法律/投资建议

### System Prompt 设计要点（见 `src/lib/prompts/system.ts`）

| 要点 | 说明 |
|------|------|
| 角色 | 温和、有画面感的塔罗解读师 |
| 硬约束 | 必须基于 `draw_cards` 返回的真实牌面，不可编造 |
| 结构 | 共情 → 逐牌解读 → 总结建议 → 免责声明 |
| 个性化 | 健身相关问题可结合「力量」「战车」等牌给可执行鼓励 |
| 长度 | 400–600 字，适合流式阅读 |

### 动态上下文注入

每次请求在 System Prompt 末尾追加当前牌阵配置（`route.ts`），确保模型使用正确的 `spreadType` 调用 Tool。

---

## 3. AI 调用逻辑

### 3.1 流式响应（SSE）

使用 Vercel AI SDK 的 `streamText()`，通过 `toUIMessageStreamResponse()` 以 **Server-Sent Events** 推送到前端；前端 `useChat` 逐字渲染，满足 JD「理解流式响应」要求。

```typescript
// src/app/api/chat/route.ts（简化）
const result = streamText({
  model: getLanguageModel(),
  system,
  messages: await convertToModelMessages(messages),
  tools: tarotTools,
  stopWhen: stepCountIs(5),
});
return result.toUIMessageStreamResponse();
```

### 3.2 Function Calling / 自定义 Tool

| Tool | 作用 |
|------|------|
| `draw_cards` | 从 78 张本地牌库随机抽牌 + 正/逆位 |
| `get_spread_template` | 返回牌阵结构（单牌 / 三牌） |
| `log_reading` | 记录占卜元数据（console 埋点演示） |

**调用时序：**

```
用户提问 → 模型收到 system + messages
         → 模型调用 draw_cards(spreadType)
         → 本地 execute() 返回真实牌面 JSON
         → 模型基于 tool result 流式生成解读
         → （可选）调用 log_reading 记录主题
```

### 3.3 上下文管理

- 前端 `useChat` 自动维护 `messages` 数组（多轮对话）
- 每次 POST 将完整 history 传给 API
- Tool 返回的牌面作为 `tool result` 持久在 message parts 中，避免重复抽牌时丢失上下文

### 3.4 Token 成本（DeepSeek 估算）

- 单次解读约 1k–3k tokens（含 system + tools + 回复）
- DeepSeek 价格极低，100 元预算可支撑数千次测试

### 3.5 模型切换

`.env.local` 中设置：

```env
LLM_PROVIDER=deepseek   # 或 agnes
DEEPSEEK_API_KEY=sk-...
AGNES_API_KEY=...
AGNES_BASE_URL=https://...
```

---

## 4. 本地开发

```powershell
cd star-tarot
copy .env.example .env.local
# 编辑 .env.local，填入 DEEPSEEK_API_KEY
npm install
npm run dev
```

浏览器访问 http://localhost:3000

---

## 5. 部署步骤（Vercel + HTTPS）

### 5.1 推送到 GitHub

```powershell
git init
git add .
git commit -m "feat: star-tarot AI demo"
git remote add origin https://github.com/你的用户名/star-tarot.git
git push -u origin main
```

### 5.2 Vercel 部署

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录
2. **Add New Project** → 导入 `star-tarot` 仓库
3. **Environment Variables** 添加：
   - `DEEPSEEK_API_KEY`
   - `LLM_PROVIDER=deepseek`
4. 点击 **Deploy**，约 1–2 分钟完成
5. 获得免费域名：`https://star-tarot-xxx.vercel.app`（自动 HTTPS）

### 5.3 自定义域名 + DNS（可选加分项）

若购买域名（如 `startarot.cn`）：

| 步骤 | 操作 |
|------|------|
| 1 | Vercel 项目 → Settings → Domains → 添加域名 |
| 2 | 按提示在域名 registrar 添加 DNS 记录 |
| 3 | 根域名 `@`：A 记录 → `76.76.21.21` |
| 4 | 子域名 `www`：CNAME → `cname.vercel-dns.com` |
| 5 | 等待 DNS 生效（几分钟~48h），Vercel 自动签发 SSL 证书 |

**无域名也完全可以投递**：使用 `*.vercel.app` 即可，HTTPS 已内置。

---

## 6. 免责声明

本项目仅供 **娱乐与自我反思** 参考，不构成医疗、法律、金融或任何专业建议。

---

