import React from 'react';

// 封面图：优先用 playwright 截的真截图（PNG），回退到品牌 SVG 封面
// 命名规范：python.png / campus.png / travel.png / a3.png（与 data.ts cover 字段一致）
// 真截图是 playwright 启动 chromium 真浏览器渲染的 PNG（不是 SVG 装饰）

const FALLBACK_COLORS: Record<string, [string, string]> = {
  python: ['#1a0d08', '#ff4d2e'],
  campus: ['#1a0d08', '#ff8c5a'],
  travel: ['#1a0d08', '#ffb84d'],
  mcp: ['#150b2e', '#8b5cf6'],
  a3: ['#1a0d08', '#ff4d2e'],
  pipeline: ['#1a0d08', '#ff6b3d'],
  java: ['#08131f', '#4da3ff'],
};

// Vite build 时直接 import 静态资源，打包进 dist/assets
import pythonShot from '../assets/screenshots/python.png';
import campusShot from '../assets/screenshots/campus.png';
import travelShot from '../assets/screenshots/travel.png';
import a3Shot from '../assets/screenshots/a3.png';

const SHOTS: Record<string, string> = {
  python: pythonShot,
  campus: campusShot,
  travel: travelShot,
  a3: a3Shot,
};

type CoverKind = 'python' | 'campus' | 'travel' | 'mcp' | 'a3' | 'pipeline' | 'java';

export const ProjectCover: React.FC<{ kind: CoverKind }> = ({ kind }) => {
  const shotUrl = SHOTS[kind];

  if (shotUrl) {
    return (
      <div className="project-cover-shot">
        <img src={shotUrl} alt={`${kind} screenshot`} />
        <div className="project-cover-shot-badge">REAL CAPTURE</div>
      </div>
    );
  }

  return <FallbackCover kind={kind} />;
};

// mcp-toolkit 品牌封面：协议 / stdio / 8 工具的"协议标准"视觉（无真截图，专用设计而非占位图）
const McpCover: React.FC = () => {
  const [w, h] = [1280, 720];
  const tools = ['hotspot', 'tc3', 'sqlite', 'webpage', 'chunk', 'date', 'jwt', 'health'];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="bg-mcp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a0f3d" />
          <stop offset="1" stopColor="#0a0618" />
        </linearGradient>
        <linearGradient id="mcp-word" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="glow-mcp" cx="50%" cy="42%">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid-mcp" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139,92,246,0.14)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="url(#bg-mcp)" />
      <rect width={w} height={h} fill="url(#grid-mcp)" />
      <circle cx={w * 0.5} cy={h * 0.42} r="360" fill="url(#glow-mcp)" />

      {/* 顶部协议标识 */}
      <text x="60" y="78" fill="#a78bfa" fontSize="20" fontFamily="monospace" letterSpacing="4">
        mcp-toolkit · JSON-RPC over stdio
      </text>

      {/* 插头 / 连接 motif：host <-> tool server */}
      <g transform="translate(640,150)">
        <rect x="-300" y="0" width="220" height="64" rx="10" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <text x="-190" y="40" fill="#c4b5fd" fontSize="22" fontFamily="monospace" textAnchor="middle">MCP HOST</text>
        <rect x="80" y="0" width="220" height="64" rx="10" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <text x="190" y="40" fill="#c4b5fd" fontSize="22" fontFamily="monospace" textAnchor="middle">TOOL SERVER</text>
        <line x1="-80" y1="32" x2="80" y2="32" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="8 8" />
        <circle cx="0" cy="32" r="7" fill="#8b5cf6" />
      </g>

      {/* 中央大字 */}
      <text x="640" y="470" fill="url(#mcp-word)" fontSize="210" fontWeight="800" textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="6">
        MCP
      </text>
      <text x="640" y="520" fill="#a78bfa" fontSize="22" fontFamily="monospace" textAnchor="middle" letterSpacing="10">
        MODEL CONTEXT PROTOCOL
      </text>

      {/* 8 工具 chips */}
      {tools.map((t, i) => {
        const cols = 4;
        const cw = 220;
        const ch = 40;
        const gapX = 24;
        const gapY = 14;
        const totalW = cols * cw + (cols - 1) * gapX;
        const x = 640 - totalW / 2 + (i % cols) * (cw + gapX);
        const y = 566 + Math.floor(i / cols) * (ch + gapY);
        return (
          <g key={t}>
            <rect x={x} y={y} width={cw} height={ch} rx="8" fill="rgba(139,92,246,0.12)" stroke="rgba(167,139,250,0.45)" strokeWidth="1" />
            <text x={x + cw / 2} y={y + 26} fill="#c4b5fd" fontSize="17" fontFamily="monospace" textAnchor="middle">{t}</text>
          </g>
        );
      })}

      {/* 底部状态 */}
      <text x="640" y="692" fill="#8b5cf6" fontSize="18" fontFamily="monospace" textAnchor="middle" letterSpacing="3">
        8 TOOLS · 48 VITEST · CI GREEN
      </text>
    </svg>
  );
};

// offer-pipeline 品牌封面：求职闭环流水线的"阶段流动"视觉
const PipelineCover: React.FC = () => {
  const [w, h] = [1280, 720];
  const steps = ['画像', '能力推断', '方向', 'JD 分析', '打招呼', '台账', '分线', '备战'];
  const chips = ['单文件前端', '129 node --test', '130 题 QBANK', '快照同步'];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="bg-pl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1c0d07" />
          <stop offset="1" stopColor="#0a0506" />
        </linearGradient>
        <linearGradient id="pl-word" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd0b8" />
          <stop offset="1" stopColor="#ff4d2e" />
        </linearGradient>
        <radialGradient id="glow-pl" cx="50%" cy="45%">
          <stop offset="0" stopColor="#ff6b3d" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ff6b3d" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid-pl" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,107,61,0.13)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="url(#bg-pl)" />
      <rect width={w} height={h} fill="url(#grid-pl)" />
      <circle cx={w * 0.5} cy={h * 0.46} r="380" fill="url(#glow-pl)" />

      <text x="60" y="78" fill="#ff8c5a" fontSize="20" fontFamily="monospace" letterSpacing="4">
        offer-pipeline · 求职流水线助手 · 前端
      </text>

      {/* 流水线 8 阶段，两行 */}
      {steps.map((t, i) => {
        const cols = 4;
        const cw = 260;
        const ch = 72;
        const gapX = 26;
        const gapY = 26;
        const totalW = cols * cw + (cols - 1) * gapX;
        const x = 640 - totalW / 2 + (i % cols) * (cw + gapX);
        const y = 210 + Math.floor(i / cols) * (ch + gapY);
        return (
          <g key={t}>
            <rect x={x} y={y} width={cw} height={ch} rx="12" fill="rgba(255,107,61,0.10)" stroke="rgba(255,140,90,0.55)" strokeWidth="1.5" />
            <text x={x + 26} y={y + 44} fill="#ffd0b8" fontSize="22" fontFamily="monospace">{String(i + 1).padStart(2, '0')}</text>
            <text x={x + cw / 2 + 18} y={y + 44} fill="#ffe6db" fontSize="24" fontWeight="700" textAnchor="middle" fontFamily="Arial, sans-serif">{t}</text>
          </g>
        );
      })}
      {/* 阶段间箭头 */}
      <g stroke="#ff6b3d" strokeWidth="2" fill="none">
        {[0, 1, 2, 4, 5, 6].map((i) => {
          const cols = 4;
          const cw = 260;
          const gapX = 26;
          const totalW = cols * cw + (cols - 1) * gapX;
          const x = 640 - totalW / 2 + (i % cols) * (cw + gapX) + cw;
          const y = 210 + Math.floor(i / cols) * 98 + 36;
          return <line key={`a${i}`} x1={x + 3} y1={y} x2={x + gapX - 6} y2={y} />;
        })}
      </g>

      {/* 中央大字 */}
      <text x="640" y="530" fill="url(#pl-word)" fontSize="96" fontWeight="800" textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="4">
        OFFER PIPELINE
      </text>
      <text x="640" y="566" fill="#ff8c5a" fontSize="20" fontFamily="monospace" textAnchor="middle" letterSpacing="6">
        我是作者，也是唯一用户
      </text>

      {/* 能力 chips */}
      {chips.map((t, i) => {
        const cw = 250;
        const gapX = 22;
        const totalW = chips.length * cw + (chips.length - 1) * gapX;
        const x = 640 - totalW / 2 + i * (cw + gapX);
        return (
          <g key={t}>
            <rect x={x} y={612} width={cw} height={48} rx="10" fill="rgba(255,107,61,0.12)" stroke="rgba(255,140,90,0.45)" strokeWidth="1" />
            <text x={x + cw / 2} y={642} fill="#ffd0b8" fontSize="18" fontFamily="monospace" textAnchor="middle">{t}</text>
          </g>
        );
      })}
    </svg>
  );
};

// agent-platform-java 品牌封面：Spring Boot 后端 + core/壳分层的"架构"视觉
const JavaCover: React.FC = () => {
  const [w, h] = [1280, 720];
  const core = ['LLM 抽象', 'Agent 循环', '混合检索', '计划流水线'];
  const chips = ['BM25 + 语义 RRF', '工具轮数上限', 'Plan → 确认门', '事件 Tracing', '35 JUnit'];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="bg-jv" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#07131f" />
          <stop offset="1" stopColor="#040a11" />
        </linearGradient>
        <linearGradient id="jv-word" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bcd9ff" />
          <stop offset="1" stopColor="#4da3ff" />
        </linearGradient>
        <radialGradient id="glow-jv" cx="50%" cy="44%">
          <stop offset="0" stopColor="#4da3ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#4da3ff" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid-jv" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(77,163,255,0.13)" strokeWidth="1" />
        </pattern>
        <marker id="arr-jv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#4da3ff" strokeWidth="1.6" strokeLinecap="round" />
        </marker>
      </defs>
      <rect width={w} height={h} fill="url(#bg-jv)" />
      <rect width={w} height={h} fill="url(#grid-jv)" />
      <circle cx={w * 0.5} cy={h * 0.44} r="360" fill="url(#glow-jv)" />

      <text x="60" y="78" fill="#7cb8ff" fontSize="20" fontFamily="monospace" letterSpacing="4">
        agent-platform-java · Spring Boot 3 + Java 21
      </text>

      {/* web 壳 */}
      <rect x="340" y="126" width="600" height="86" rx="14" fill="rgba(77,163,255,0.10)" stroke="#4da3ff" strokeWidth="1.6" />
      <text x="640" y="162" fill="#bcd9ff" fontSize="26" fontWeight="700" textAnchor="middle" fontFamily="Arial, sans-serif">web · 薄壳（Spring 生态）</text>
      <text x="640" y="192" fill="#7cb8ff" fontSize="17" fontFamily="monospace" textAnchor="middle">REST API · JPA(H2/MySQL) · Swagger · 统一异常处理</text>

      {/* 分层线 */}
      <line x1="640" y1="212" x2="640" y2="268" stroke="#4da3ff" strokeWidth="1.6" strokeDasharray="7 7" markerEnd="url(#arr-jv)" />
      <text x="660" y="246" fill="#7cb8ff" fontSize="15" fontFamily="monospace">纯 Java 调用，不经过容器</text>

      {/* core 层 */}
      <rect x="200" y="282" width="880" height="182" rx="16" fill="rgba(77,163,255,0.06)" stroke="rgba(124,184,255,0.55)" strokeWidth="1.4" strokeDasharray="5 5" />
      <text x="222" y="312" fill="#bcd9ff" fontSize="20" fontWeight="700" fontFamily="monospace">core · 零 Spring 依赖</text>
      {core.map((t, i) => {
        const cw = 198;
        const gapX = 20;
        const x = 224 + i * (cw + gapX);
        return (
          <g key={t}>
            <rect x={x} y={336} width={cw} height={64} rx="10" fill="rgba(77,163,255,0.14)" stroke="#4da3ff" strokeWidth="1.2" />
            <text x={x + cw / 2} y={376} fill="#dcecff" fontSize="20" textAnchor="middle" fontFamily="Arial, sans-serif">{t}</text>
          </g>
        );
      })}
      <text x="640" y="436" fill="#7cb8ff" fontSize="16" fontFamily="monospace" textAnchor="middle">
        AgentLoop · ToolRegistry · Bm25Searcher · VectorIndex · HybridRetriever · PlanPipeline
      </text>

      {/* 中央大字 */}
      <text x="640" y="562" fill="url(#jv-word)" fontSize="82" fontWeight="800" textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="3">
        JAVA BACKEND
      </text>

      {/* 能力 chips */}
      {chips.map((t, i) => {
        const cw = 218;
        const gapX = 18;
        const totalW = chips.length * cw + (chips.length - 1) * gapX;
        const x = 640 - totalW / 2 + i * (cw + gapX);
        return (
          <g key={t}>
            <rect x={x} y={612} width={cw} height={48} rx="10" fill="rgba(77,163,255,0.12)" stroke="rgba(124,184,255,0.45)" strokeWidth="1" />
            <text x={x + cw / 2} y={642} fill="#bcd9ff" fontSize="16" fontFamily="monospace" textAnchor="middle">{t}</text>
          </g>
        );
      })}
    </svg>
  );
};

// 简易 SVG 占位封面（兜底用）
const FallbackCover: React.FC<{ kind: CoverKind }> = ({ kind }) => {
  if (kind === 'mcp') return <McpCover />;
  if (kind === 'pipeline') return <PipelineCover />;
  if (kind === 'java') return <JavaCover />;
  const [w, h] = [1280, 720];
  const [c1, c2] = FALLBACK_COLORS[kind];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`bg-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor="#0a0506" />
        </linearGradient>
        <radialGradient id={`glow-${kind}`} cx="50%" cy="50%">
          <stop offset="0" stopColor={c2} stopOpacity="0.4" />
          <stop offset="1" stopColor={c2} stopOpacity="0" />
        </radialGradient>
        <pattern id={`grid-${kind}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,77,46,0.12)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill={`url(#bg-${kind})`} />
      <rect width={w} height={h} fill={`url(#grid-${kind})`} />
      <circle cx={w * 0.5} cy={h * 0.5} r="380" fill={`url(#glow-${kind})`} />
      <text x="60" y="80" fill="#fff" fontSize="32" fontWeight="800">
        {kind}.png
      </text>
      <text x="60" y="115" fill={c2} fontSize="16" fontFamily="monospace">
        Screenshot will appear here once captured
      </text>
    </svg>
  );
};
