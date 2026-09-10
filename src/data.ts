// 简历 / 作品集数据 — 来源：杨运栋 简历 + 5 个 GitHub 开源项目
// 5 个项目各设一个"最强记忆点"，避免同质化

export const profile = {
  name: '杨运栋',
  nickname: '栋',
  github: 'Dongnb66',
  email: '2088417049@qq.com',
  school: '吉首大学 · 张家界学院',
  major: '计算机科学与技术',
  grade: '2024 级 · 大三',
  goal: 'AI Agent 后端开发工程师 · 多智能体 / RAG / LLM 应用工程',
  intro: [
    '吉首大学张家界学院 <span class="tag">2024 级</span> 计算机科学与技术专业在读，大三。',
    '求职方向 <strong>AI Agent 后端开发</strong>。已独立完成 5 个端到端项目，全部 <span class="tag">MIT License</span> 开源在 GitHub。',
    '测试基线：<strong>46 个 pytest</strong>（全 mock 免 API Key）+ <strong>48 个 vitest 覆盖 MCP 工具库</strong>，另有防幻觉评测集挂入 GitHub Actions CI。',
    '对多智能体编排、RAG 防幻觉、LLM 调用工程有完整实战经验。<strong>日常实习可立即到岗</strong>，同时准备 2027 年 3–5 月暑期实习窗口，期望找到能独立交付模块的 AI Agent 实习岗位。',
  ],
};

export const stats = [
  { num: '5', label: 'GitHub Projects', sub: '全 MIT 开源' },
  { num: '10+', label: 'Agents 设计', sub: 'profile/planner/quiz/...' },
  { num: '61', label: 'Tests', sub: '13 pytest + 48 vitest · CI 全绿' },
  { num: '2027', label: '暑期实习窗口', sub: '日常实习亦可 · 可立即到岗' },
];

// 5 个项目差异化：每个项目一个"最强记忆点"
export const projects = [
  {
    id: 'python-learning-agent',
    name: 'python-learning-agent',
    sub: 'BACKEND · AGENT ENGINEERING',
    memory: '主推 · 求职主项目 · 后端工程化',
    desc: '基于 LangGraph 的多智能体学习助手后端，8 节点状态图编排 5 个 LLM 智能体 + 2 个记忆节点 + 1 个 ReAct 自主辅导 Agent，完成"记忆读取—诊断—规划—出题—资源—复盘—自主辅导—记忆沉淀"全流程。<strong>强项不在前端，在于工程化交付</strong>——签名、记忆、测试、部署一气呵成。',
    tags: ['Python', 'LangGraph', 'FastAPI', 'RAG', 'DeepSeek', 'JWT', 'TC3-HMAC', '三层记忆'],
    badges: ['主推 · 求职主项目', '后端工程化'],
    highlights: [
      'LangGraph 8 节点 + 条件边：load_memory → … → review →(有薄弱项) tutor → save_memory',
      '三层记忆：短期上下文 AgentState / 长期画像 profiles 表 / 学情轨迹 learning_sessions 表',
      '自实现腾讯云短信 TC3-HMAC-SHA256 签名，<strong>零 SDK 依赖</strong>',
      'ReAct 自主辅导 Agent：模型自主决定调哪个工具、调几轮、何时停，逐轮留可审计 trace',
      '<strong>防幻觉三道代码级约束</strong>：相关性阈值检索 / 检索为空直接拒答且不调模型 / URL 白名单剔除库外链接',
      '<strong>防幻觉评测集</strong>：零配置可跑（6 用例 / 4 类断言 / JSON 报告），已挂 CI，实测编造链接 0 条',
      '完整 Dockerfile + docker-compose + pytest 46 passed + .env.example',
    ],
    github: 'https://github.com/Dongnb66/python-learning-agent',
    demo: 'README + Dockerfile + docker-compose，clone 即跑',
    cover: 'python',
    feature: true,
  },
  {
    id: 'campus-mutual-aid',
    name: 'campus-mutual-aid',
    sub: 'MULTI-AGENT · PIPELINE · SPA',
    memory: '多智能体工程化 · 流水线',
    desc: '校园互助平台：多智能体流水线处理求助 / 资源 / 失物招领，配合作风评分机制。<strong>最大亮点是多智能体的"工程化"落地</strong>——智能路由、评分反馈、抗滥用，不是 demo 而是能跑。',
    tags: ['Node.js', 'Express', 'node:sqlite', '多智能体', 'SMTP', 'TC3 签名', 'React 18'],
    badges: ['多智能体工程化'],
    highlights: [
      '5 智能体流水线：路由 Router / 发帖引导 PostGuide / 内容审核 Audit / 检索 Search / 撮合 Match',
      '完整账号体系：手机/邮箱/微信/QQ，<strong>首次扫码强校验</strong>',
      '<strong>React 18 + Vite 5 前端</strong>，JWT 双令牌 + RBAC、事务防并发、自实现 TTL+LRU 缓存',
      'Node 单一 runtime，部署 / 学习 / 二次开发都简单',
    ],
    github: 'https://github.com/Dongnb66/campus-mutual-aid',
    demo: 'clone 后 npm i && node server.js 即跑',
    cover: 'campus',
  },
  {
    id: 'mcp-toolkit',
    name: 'mcp-toolkit',
    sub: 'MCP PROTOCOL · TYPESCRIPT · STDIO',
    memory: 'MCP 协议工程 · 工具资产复用 · 48 单测',
    desc: '把散落各项目的手写工具能力，标准化为 8 个即插即用的 MCP 工具服务器。<strong>从 function calling 到 MCP 协议</strong>：travel-rank 的聚合排名、python 项目的 TC3 签名器直接复用为零重构的标准工具。',
    tags: ['TypeScript', 'MCP 协议', 'JSON-RPC', 'zod', 'stdio', '48 单测'],
    badges: ['MCP 协议工程', '工具资产复用', '48 单测'],
    highlights: [
      '官方 MCP SDK + TypeScript：<strong>McpServer + StdioServerTransport（JSON-RPC over stdio）</strong>，任意宿主即插即用',
      '8 工具：热度聚合排名 / TC3 签名 / 只读 SQLite / 网页抽取 / 文本切块 / 日期计算 / JWT 验签 / 探活',
      '<strong>lib/tools 分层铁律</strong>：lib 层纯函数零 MCP 依赖，tools 层只做 zod 校验 + 转发',
      '<strong>48 个 vitest 单测全绿</strong> + GitHub Actions CI（typecheck + build + test）',
    ],
    github: 'https://github.com/Dongnb66/mcp-toolkit',
    demo: 'npm i && npm run dev，接 MCP Inspector 即跑',
    cover: 'mcp',
  },
  {
    id: 'travel-rank',
    name: 'travel-rank · 途见',
    sub: 'AI · FUNCTION CALLING · 百度地图',
    memory: 'Function Calling · 真实截图 · 视觉冲击',
    desc: '旅游口碑聚合 + AI 对话式推荐。<strong>最大亮点是 Function Calling 实战</strong>——AI 主动调用百度地图工具查景点 / 路线 / 周边，口碑榜配桌宠猪猪形象交互。<strong>本作品集唯一有真实运行截图的项目</strong>。',
    tags: ['Express', '百度地图 API', 'Function Calling', 'TC3 签名', 'SMTP', '原生 SPA'],
    badges: ['真实运行截图', 'Function Calling'],
    highlights: [
      '<strong>Function Calling</strong> 实战：AI 主动调百度地图查景点 / 路线',
      '多源口碑聚合 + 权重排序算法',
      '<strong>桌宠猪猪 + 私信通知 + 个人中心抽屉</strong>',
      '<strong>真实运行截图 4 张</strong>：登录 / 口碑榜 / 桌宠对话 / 个人中心',
    ],
    github: 'https://github.com/Dongnb66/travel-rank',
    demo: '本作品集 Hero 区有 4 张真实运行截图',
    cover: 'travel',
  },
  {
    id: 'a3-learning-agent',
    name: 'a3-learning-agent',
    sub: 'COMPETITION · FULL-STACK · DELIVERY',
    memory: '竞赛全栈 · 完整交付 · React 前端',
    desc: '<strong>本项目是 python-learning-agent 的业务原型</strong>：软件杯验证业务闭环后，用 Python 现代栈重写为主项目，两代技术栈演进是一体的故事。中国软件杯 A3 赛道独立参赛作品。<strong>与 python-learning-agent 的最大区别在"前端 + 完整交付"</strong>——React + Vite 前端 + Node + Express 后端，附带完整演示视频、PPT、答辩文档。我的<strong>第一个完整 Agent 项目</strong>。',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'RAG', 'DeepSeek', '多智能体', '软件杯'],
    badges: ['竞赛独立参赛', '完整交付'],
    highlights: [
      '<strong>中国软件杯 A3 赛道</strong> · DOKI 队队长（唯一成员），一人扛全栈',
      '<strong>全栈</strong>：React + Vite 前端（与 python-only 后端版互补）',
      '<strong>完整交付</strong>：演示视频 + PPT + 答辩文档 + 部署文档',
      '我的<strong>第一个 Agent 项目</strong>，从这开始系统化研究多智能体',
      '内置学习效果实证模块：前后测诊断 + 分主题组卷 + 多次测评纵向追踪知识点掌握度变化',
    ],
    github: 'https://github.com/Dongnb66/a3-learning-agent',
    demo: '看 README，竞赛完整文档可现场演示',
    cover: 'a3',
  },
];

// 技能地图：按"做了哪些事"分类，每个领域都有真实项目背书
export const skills = [
  {
    icon: '🧠',
    name: '多智能体编排',
    desc: '规划智能体调度子智能体协同，而非单一 prompt 硬编流程',
    list: ['LangGraph', 'LangChain', 'planner/profile/quiz/review', '状态机'],
  },
  {
    icon: '🔍',
    name: 'RAG 防幻觉',
    desc: '检索增强生成 + 引用溯源，让回答可查证、可回落',
    list: ['RAG', 'BM25 稀疏检索', 'context 压缩', '引用标注'],
  },
  {
    icon: '🛡️',
    name: '账号 / 鉴权体系',
    desc: '从零实现完整账号闭环：注册到第三方扫码，安全可审计',
    list: ['JWT', 'bcrypt', '微信/QQ OAuth', '手机/邮箱验证码'],
  },
  {
    icon: '📨',
    name: '短信 / 邮件集成',
    desc: '自实现厂商签名协议，零官方 SDK 依赖，可控可测',
    list: ['腾讯云 TC3-HMAC-SHA256', 'SMTP', '验证码限流', '模板'],
  },
  {
    icon: '⚙️',
    name: '后端工程化',
    desc: 'FastAPI / Express 分层，配置、中间件、错误处理齐全',
    list: ['FastAPI', 'Express', 'SQLAlchemy', 'node:sqlite'],
  },
  {
    icon: '🧪',
    name: '测试驱动交付',
    desc: '端到端管线 + 官方签名测试向量 + 跨会话记忆，交付前可自动验证',
    list: ['pytest', '端到端管线', '官方测试向量', 'ReAct 循环', '防幻觉评测集', '46 passed'],
  },
  {
    icon: '🚀',
    name: '容器化部署',
    desc: '一键 clone 即跑，降低面试官上手成本',
    list: ['Docker', 'docker-compose', '.env.example', 'README 中英双语'],
  },
  {
    icon: '⚛️',
    name: '前端（全栈互补）',
    desc: '能独立做交互前端，用原生或框架按场景取舍',
    list: ['React', 'Vite', '原生 SPA', 'CSS 动效'],
  },
  {
    icon: '🌐',
    name: 'Function Calling',
    desc: '让 AI 主动调用外部工具（地图/查询）完成任务',
    list: ['工具调用', '百度地图 API', '参数校验', '结果回填'],
  },
  {
    icon: '🧩',
    name: 'MCP 协议开发',
    desc: '把 function calling 工具标准化为 MCP 协议工具服务器，任意宿主跨项目复用',
    list: ['TypeScript', 'JSON-RPC', 'zod', 'stdio transport'],
  },
];