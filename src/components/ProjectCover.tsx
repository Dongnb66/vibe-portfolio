import React from 'react';

// 封面图：优先用 playwright 截的真截图（PNG），回退到 SVG 架构图
// 命名规范：python.png / campus.png / a3.png（与 data.ts cover 字段一致）
// 真截图是 playwright 启动 chromium 真浏览器渲染的 PNG（不是 SVG 装饰）

const FALLBACK_COLORS = {
  python: ['#1a0d08', '#ff4d2e'],
  campus: ['#1a0d08', '#ff8c5a'],
  travel: ['#1a0d08', '#ffb84d'],
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

export const ProjectCover: React.FC<{ kind: 'python' | 'campus' | 'travel' | 'a3' }> = ({ kind }) => {
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

// 简易 SVG 占位封面（兜底用）
const FallbackCover: React.FC<{ kind: 'python' | 'campus' | 'travel' | 'a3' }> = ({ kind }) => {
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