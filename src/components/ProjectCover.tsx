import React from 'react';

// 封面图：优先用 playwright 截的真截图（PNG），回退到品牌 SVG 封面
// 命名规范：python.png / campus.png / travel.png（与 data.ts cover 字段一致）
// 真截图是 playwright 启动 chromium 真浏览器渲染的 PNG（不是 SVG 装饰）

const FALLBACK_COLORS: Record<string, [string, string]> = {
  python: ['#1a0d08', '#ff4d2e'],
  campus: ['#1a0d08', '#ff8c5a'],
  travel: ['#1a0d08', '#ffb84d'],
  mcp: ['#150b2e', '#8b5cf6'],
  workbench: ['#07131f', '#38bdf8'],
};

// Vite build 时直接 import 静态资源，打包进 dist/assets
import pythonShot from '../assets/screenshots/python.png';
import campusShot from '../assets/screenshots/campus.png';
import travelShot from '../assets/screenshots/travel.png';

const SHOTS: Record<string, string> = {
  python: pythonShot,
  campus: campusShot,
  travel: travelShot,
};

export type CoverKind = 'python' | 'campus' | 'travel' | 'mcp' | 'workbench';

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
        8 TOOLS · 50 VITEST · CI GREEN
      </text>
    </svg>
  );
};

// internship-workbench 品牌封面：四端 → 数据库 RLS 的"隔离"视觉
const WorkbenchCover: React.FC = () => {
  const [w, h] = [1280, 720];
  const clients = ['Web · React 19', '微信小程序', 'Chrome 扩展', '本地抓取器'];
  const rows = [
    '10 张私有表 · USING + WITH CHECK 双写',
    'owner_id DEFAULT auth.uid() · 归属由库生成',
    '公共岗位库只读例外 · 无任何写策略',
  ];
  const chips = ['10 表 RLS 双写', '908 项测试', '契约测试跨端', '扩展 0 网络请求'];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="bg-wb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#07131f" />
          <stop offset="1" stopColor="#040a11" />
        </linearGradient>
        <linearGradient id="wb-word" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bae6fd" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
        <radialGradient id="glow-wb" cx="50%" cy="46%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.30" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid-wb" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56,189,248,0.13)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="url(#bg-wb)" />
      <rect width={w} height={h} fill="url(#grid-wb)" />
      <circle cx={w * 0.5} cy={h * 0.46} r="380" fill="url(#glow-wb)" />

      <text x="60" y="78" fill="#7dd3fc" fontSize="20" fontFamily="monospace" letterSpacing="4">
        internship-workbench · React 19 + 云后端
      </text>

      {/* 四端 */}
      {clients.map((t, i) => {
        const cw = 268, gapX = 22;
        const totalW = clients.length * cw + (clients.length - 1) * gapX;
        const x = 640 - totalW / 2 + i * (cw + gapX);
        return (
          <g key={t}>
            <rect x={x} y={128} width={cw} height={64} rx="12" fill="rgba(56,189,248,0.10)" stroke="rgba(125,211,252,0.55)" strokeWidth="1.4" />
            <text x={x + cw / 2} y={168} fill="#e0f2fe" fontSize="20" textAnchor="middle" fontFamily="Arial, sans-serif">{t}</text>
          </g>
        );
      })}

      {/* 汇聚线 */}
      <g stroke="#38bdf8" strokeWidth="1.6" fill="none" opacity="0.65">
        {clients.map((_, i) => {
          const cw = 268, gapX = 22;
          const totalW = clients.length * cw + (clients.length - 1) * gapX;
          const x = 640 - totalW / 2 + i * (cw + gapX) + cw / 2;
          return <line key={`l${i}`} x1={x} y1={196} x2={640} y2={244} />;
        })}
      </g>

      {/* 数据库 + RLS */}
      <rect x="250" y="250" width="780" height="152" rx="16" fill="rgba(56,189,248,0.07)" stroke="#38bdf8" strokeWidth="1.6" />
      <text x="278" y="286" fill="#bae6fd" fontSize="21" fontWeight="700" fontFamily="monospace">PostgreSQL · RLS 隔离</text>
      {rows.map((t, i) => (
        <text key={t} x="278" y={318 + i * 27} fill="#7dd3fc" fontSize="16" fontFamily="monospace">{t}</text>
      ))}

      {/* 中央大字 */}
      <text x="640" y="546" fill="url(#wb-word)" fontSize="86" fontWeight="800" textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="3">
        MULTI-TENANT
      </text>
      <text x="640" y="582" fill="#7dd3fc" fontSize="20" fontFamily="monospace" textAnchor="middle" letterSpacing="5">
        隔离靠数据库，不靠自觉
      </text>

      {/* chips */}
      {chips.map((t, i) => {
        const cw = 250, gapX = 22;
        const totalW = chips.length * cw + (chips.length - 1) * gapX;
        const x = 640 - totalW / 2 + i * (cw + gapX);
        return (
          <g key={t}>
            <rect x={x} y={618} width={cw} height={48} rx="10" fill="rgba(56,189,248,0.12)" stroke="rgba(125,211,252,0.45)" strokeWidth="1" />
            <text x={x + cw / 2} y={648} fill="#bae6fd" fontSize="17" fontFamily="monospace" textAnchor="middle">{t}</text>
          </g>
        );
      })}
    </svg>
  );
};

// 简易 SVG 占位封面（兜底用）
const FallbackCover: React.FC<{ kind: CoverKind }> = ({ kind }) => {
  if (kind === 'mcp') return <McpCover />;
  if (kind === 'workbench') return <WorkbenchCover />;
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
