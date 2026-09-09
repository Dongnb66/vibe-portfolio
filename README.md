# Vibe Portfolio · 杨运栋 作品集主页

> 个人在线作品集主页 —— AI Agent 后端方向 · 多智能体 / RAG / LLM 应用工程

一个 **Vibe Coding** 风格的个人作品集单页应用：橙红渐变暗色主题、动态桌宠、4 个 GitHub 开源项目的真实运行截图与差异化记忆点展示。

由 React 18 + Vite 5 + TypeScript 构建，纯 CSS 实现全部动效，无 UI 组件库依赖。

## ✨ 特点

- **橙红渐变 Vibe 视觉**：暗色底 + 高饱和橙红主色渐变，突出年轻、有活力的工程师气质
- **动态桌宠「小猪」**：Hero 区纯 SVG 动画桌宠（呼吸 / 摇尾 / 眨眼 / 打瞌睡），呼应 travel 项目里「猪猪旅行助手」的品牌形象
- **4 个项目差异化呈现**：每个项目配一张**真实运行截图** + 一个「最强记忆点」，避免同质化
- **技能地图**：按「真实做过的领域」分类，每个技能都有具体项目背书
- **交互细节**：导航栏滚过 Hero 后磨砂玻璃固定悬浮、按钮 hover 变色、卡片悬停动效

## 🚀 本地运行

```bash
npm install      # 安装依赖
npm run dev      # 开发模式 http://127.0.0.1:5173
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物 http://localhost:3000
```

### 仅静态部署（零依赖）

`dist/` 为构建产物。可用任意静态服务器托管，SPA 需把未知路径回退到 `index.html`。

```bash
npm run build
python3 -m http.server 3000 --bind 0.0.0.0   # 或 node serve.mjs
```

## 📁 目录结构

```
vibe-portfolio/
├── index.html               # Vite 入口
├── src/
│   ├── App.tsx              # 主页面（Hero / 项目 / 技能 / 联系）
│   ├── data.ts              # 作品集数据（profile / stats / projects / skills）
│   ├── styles/global.css    # 全部样式与动效（CSS token）
│   ├── components/
│   │   ├── PetPig.tsx       # 动态桌宠小猪（SVG 动画）
│   │   ├── RobotHead.tsx    # 装饰机器人
│   │   └── ProjectCover.tsx # 项目截图封面
│   └── assets/screenshots/  # 4 个项目的真实运行截图
├── public/screenshots/      # travel 项目 4 张 Hero 区真图
└── serve.mjs                # 零依赖静态服务器（部署用）
```

## 📄 License

[MIT](./LICENSE) © 2026 Dongnb66
