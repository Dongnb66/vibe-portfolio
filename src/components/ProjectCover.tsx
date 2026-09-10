import React from 'react';

// 封面图：优先用 playwright 截的真截图（PNG），回退到 SVG 架构图
// 命名规范：python.png / campus.png / a3.png（与 data.ts cover 字段一致）
// 真截图是 playwright 启动 chromium 真浏览器渲染的 PNG（不是 SVG 装饰）

const FALLBACK_COLORS = {
  python: ['#1a0d08', '#ff4d2e'],
  campus: ['#1a0d08', '#ff8c5a'],
  travel: ['#1a0d08', '#ffb84d'],
  mcp: ['#150b2e', '#8b5cf6'],
  a3: ['#1a0d08', '#ff4d2e'],
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

type CoverKind = 'python' | 'campus' | 'travel' | 'mcp' | 'a3';

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

// 简易 SVG 占位封面（兜底用）
const FallbackCover: React.FC<{ kind: CoverKind }> = ({ kind }) => {
  if (kind === 'mcp') return <McpCover />;
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