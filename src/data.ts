// 简历 / 作品集数据 — 来源：杨运栋 简历 + 4 个 GitHub 开源项目
// 4 个项目各设一个"最强记忆点"，避免同质化

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
    '求职方向 <strong>AI Agent 后端开发</strong>。已独立完成 4 个端到端项目，全部 <span class="tag">MIT License</span> 开源在 GitHub。',
    '对多智能体编排、RAG 防幻觉、LLM 调用工程有完整实战经验。正在为 2027 年暑期实习做准备，期望能找到初级 AI 后端实习岗位，能立即到岗、独立交付。',
  ],
};

export const stats = [
  { num: '4', label: 'GitHub Projects', sub: '全 MIT 开源' },
  { num: '15+', label: 'Agents 设计', sub: 'planner/profile/quiz/...' },
  { num: '20+', label: 'Test Cases', sub: 'auth/TC3 sig/RAG' },
  { num: '2027', label: '求职窗口', sub: '3–5 月暑期实习' },
];

// 4 个项目差异化：每个项目一个"最强记忆点"
export const projects = [
  {
    id: 'python-learning-agent',
    name: 'python-learning-agent',
    sub: 'BACKEND · AGENT ENGINEERING',
    memory: '主推 · 求职主项目 · 后端工程化',
    desc: '基于 LangGraph 的多智能体学习助手后端，规划智能体调度 5 个子智能体协同完成"诊断—规划—出题—资源—复盘"全流程。**强项不在前端，在于工程化交付**——签名、记忆、测试、部署一气呵成。',
    tags: ['Python', 'LangGraph', 'FastAPI', 'RAG', 'DeepSeek', 'JWT', 'TC3-HMAC', '三层记忆'],
    badges: ['主推 · 求职主项目', '后端工程化'],
    highlights: [
      '规划智能体调度 Profile/Quiz/Resource/Review 5 智能体协同',
      '三层记忆：短期上下文 / 长期向量记忆 / 用户画像 JSON',
      '自实现腾讯云短信 TC3-HMAC-SHA256 签名，**零 SDK 依赖**',
      '11/11 端到端账号流程 + 4/4 TC3 签名向量测试',
      '完整 Dockerfile + docker-compose + pytest + .env.example',
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
    desc: '校园互助平台：多智能体流水线处理求助 / 资源 / 失物招领，配合作风评分机制。**最大亮点是多智能体的"工程化"落地**——智能路由、评分反馈、抗滥用，不是 demo 而是能跑。',
    tags: ['Node.js', 'Express', 'node:sqlite', '多智能体', 'SMTP', 'TC3 签名', '原生 SPA'],
    badges: ['多智能体工程化'],
    highlights: [
      '多智能体流水线 + **智能路由** + **评分反馈** + 抗滥用',
      '完整账号体系：手机/邮箱/微信/QQ，**首次扫码强校验**',
      '**原生前端 SPA**：无第三方框架（不引 React/Vue）',
      'Node 单一 runtime，部署 / 学习 / 二次开发都简单',
    ],
    github: 'https://github.com/Dongnb66/campus-mutual-aid',
    demo: 'clone 后 npm i && node server.js 即跑',
    cover: 'campus',
  },
  {
    id: 'travel-rank',
    name: 'travel-rank · 途见',
    sub: 'AI · FUNCTION CALLING · 百度地图',
    memory: 'Function Calling · 真实截图 · 视觉冲击',
    desc: '旅游口碑聚合 + AI 对话式推荐。**最大亮点是 Function Calling 实战**——AI 主动调用百度地图工具查景点 / 路线 / 周边，口碑榜配桌宠猪猪形象交互。**本作品集唯一有真实运行截图的项目**。',
    tags: ['Express', '百度地图 API', 'Function Calling', 'TC3 签名', 'SMTP', '原生 SPA'],
    badges: ['真实运行截图', 'Function Calling'],
    highlights: [
      '**Function Calling** 实战：AI 主动调百度地图查景点 / 路线',
      '多源口碑聚合 + 权重排序算法',
      '**桌宠猪猪 + 私信通知 + 个人中心抽屉**',
      '**真实运行截图 4 张**：登录 / 口碑榜 / 桌宠对话 / 个人中心',
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
    desc: '中国软件杯 A3 赛道独立参赛作品。**与 python-learning-agent 的最大区别在"前端 + 完整交付"**——React + Vite 前端 + Node + Express 后端，附带完整演示视频、PPT、答辩文档。栋的**第一个完整 Agent 项目**。',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'RAG', 'DeepSeek', '多智能体', '软件杯'],
    badges: ['竞赛独立参赛', '完整交付'],
    highlights: [
      '**中国软件杯 A3 赛道**独立参赛（不是合作项目）',
      '**全栈**：React + Vite 前端（与 python-only 后端版互补）',
      '**完整交付**：演示视频 + PPT + 答辩文档 + 部署文档',
      '栋的**第一个 Agent 项目**，从这开始系统化研究多智能体',
      'GitHub 作品集首推，简历链接已挂',
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
    list: ['RAG', '向量检索', 'context 压缩', '引用标注'],
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
    desc: '端到端账号流程 + 签名向量测试，交付前可自动验证',
    list: ['pytest', '端到端测试', '签名向量比对', '11/11 + 4/4'],
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
];