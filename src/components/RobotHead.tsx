import React from 'react';

// 大型机甲机器人 SVG — Hero 主视觉
// 暗底 + 橙红眼睛发光 + 头部细节
export const RobotHead: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="rh-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1610" />
          <stop offset="0.5" stopColor="#1a0d08" />
          <stop offset="1" stopColor="#0a0506" />
        </linearGradient>
        <linearGradient id="rh-helmet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a1d10" />
          <stop offset="1" stopColor="#0a0506" />
        </linearGradient>
        <radialGradient id="rh-eye" cx="50%" cy="50%">
          <stop offset="0" stopColor="#ffd1a8" />
          <stop offset="0.4" stopColor="#ff8c5a" />
          <stop offset="0.8" stopColor="#ff4d2e" />
          <stop offset="1" stopColor="#ff4d2e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rh-glow" cx="50%" cy="50%">
          <stop offset="0" stopColor="#ff4d2e" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff4d2e" stopOpacity="0" />
        </radialGradient>
        <filter id="rh-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* 整体光晕 */}
      <circle cx="300" cy="300" r="280" fill="url(#rh-glow)" />

      {/* 颈部 */}
      <rect x="240" y="380" width="120" height="60" rx="10" fill="url(#rh-head)" stroke="#3a1d10" strokeWidth="1" />
      <rect x="260" y="395" width="20" height="30" rx="3" fill="#0a0506" />
      <rect x="285" y="395" width="20" height="30" rx="3" fill="#0a0506" />
      <rect x="310" y="395" width="20" height="30" rx="3" fill="#0a0506" />

      {/* 头盔主体 — 圆角方形 */}
      <g>
        {/* 头盔底层 */}
        <path
          d="M 140 230 Q 140 130 300 130 Q 460 130 460 230 L 460 360 Q 460 400 420 400 L 180 400 Q 140 400 140 360 Z"
          fill="url(#rh-helmet)"
          stroke="#3a1d10"
          strokeWidth="2"
        />
        {/* 头盔高光 */}
        <path
          d="M 180 160 Q 220 140 300 140 Q 380 140 420 165"
          fill="none"
          stroke="rgba(255,140,90,0.18)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 顶部天线 */}
        <line x1="300" y1="130" x2="300" y2="100" stroke="#3a1d10" strokeWidth="3" strokeLinecap="round" />
        <circle cx="300" cy="96" r="6" fill="#ff4d2e" />
        <circle cx="300" cy="96" r="14" fill="#ff4d2e" opacity="0.4" filter="url(#rh-blur)" />

        {/* 面罩分割线 */}
        <line x1="140" y1="270" x2="460" y2="270" stroke="#0a0506" strokeWidth="2" />

        {/* 眼部区域 — 暗色凹陷 */}
        <path
          d="M 170 215 Q 170 200 195 200 L 405 200 Q 430 200 430 215 L 430 255 Q 430 270 405 270 L 195 270 Q 170 270 170 255 Z"
          fill="#0a0506"
        />

        {/* 左眼 — 大型发光 */}
        <g className="rh-eye-left">
          <circle cx="240" cy="235" r="48" fill="url(#rh-eye)" />
          <circle cx="240" cy="235" r="28" fill="#fff5e6" opacity="0.85" />
          <circle cx="232" cy="228" r="8" fill="#fff" />
        </g>

        {/* 右眼 — 略小 */}
        <g className="rh-eye-right">
          <circle cx="360" cy="235" r="36" fill="url(#rh-eye)" />
          <circle cx="360" cy="235" r="20" fill="#fff5e6" opacity="0.85" />
          <circle cx="354" cy="230" r="6" fill="#fff" />
        </g>

        {/* 嘴部格栅 */}
        <g opacity="0.7">
          <rect x="220" y="310" width="160" height="4" rx="2" fill="#3a1d10" />
          <rect x="220" y="322" width="160" height="4" rx="2" fill="#3a1d10" />
          <rect x="220" y="334" width="120" height="4" rx="2" fill="#3a1d10" />
          <rect x="220" y="346" width="80" height="4" rx="2" fill="#3a1d10" />
        </g>

        {/* 侧脸散热条 */}
        <line x1="160" y1="240" x2="160" y2="320" stroke="#3a1d10" strokeWidth="1.5" />
        <line x1="170" y1="240" x2="170" y2="320" stroke="#3a1d10" strokeWidth="1.5" />
        <line x1="430" y1="240" x2="430" y2="320" stroke="#3a1d10" strokeWidth="1.5" />
        <line x1="440" y1="240" x2="440" y2="320" stroke="#3a1d10" strokeWidth="1.5" />

        {/* 太阳穴小灯 */}
        <circle cx="170" cy="200" r="3" fill="#ff8c5a" />
        <circle cx="430" cy="200" r="3" fill="#ff8c5a" />

        {/* 嘴角两侧螺丝 */}
        <circle cx="200" cy="370" r="6" fill="#0a0506" stroke="#3a1d10" strokeWidth="1.5" />
        <circle cx="200" cy="370" r="2" fill="#3a1d10" />
        <circle cx="400" cy="370" r="6" fill="#0a0506" stroke="#3a1d10" strokeWidth="1.5" />
        <circle cx="400" cy="370" r="2" fill="#3a1d10" />
      </g>

      {/* 耳朵 / 通讯模块 */}
      <g>
        <rect x="115" y="220" width="30" height="80" rx="6" fill="url(#rh-head)" stroke="#3a1d10" strokeWidth="1.5" />
        <circle cx="130" cy="245" r="4" fill="#ff4d2e" />
        <circle cx="130" cy="245" r="10" fill="#ff4d2e" opacity="0.5" filter="url(#rh-blur)" />
        <circle cx="130" cy="275" r="3" fill="#ffb84d" />

        <rect x="455" y="220" width="30" height="80" rx="6" fill="url(#rh-head)" stroke="#3a1d10" strokeWidth="1.5" />
        <circle cx="470" cy="245" r="4" fill="#ff4d2e" />
        <circle cx="470" cy="245" r="10" fill="#ff4d2e" opacity="0.5" filter="url(#rh-blur)" />
        <circle cx="470" cy="275" r="3" fill="#ffb84d" />
      </g>

      {/* 散落的电路纹理 */}
      <g opacity="0.3" stroke="#ff8c5a" strokeWidth="0.5" fill="none">
        <path d="M 280 110 L 280 100 L 320 100 L 320 110" />
        <path d="M 260 95 L 340 95" />
      </g>
    </svg>
  );
};