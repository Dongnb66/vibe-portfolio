import React from 'react';

// 动态桌宠猪猪 — 纯 CSS + SVG 动画
// 呼吸 + 眨眼 + 摇尾巴 + 偶尔跳一下
export const PetPig: React.FC<{ size?: number; className?: string }> = ({ size = 200, className }) => {
  return (
    <div className={`pet-pig ${className || ''}`} style={{ width: size, height: size }}>
      <style>{`
        .pet-pig {
          position: relative;
          display: inline-block;
        }
        .pet-pig-body { animation: pigBreathe 2.4s ease-in-out infinite; transform-origin: center bottom; }
        .pet-pig-tail { animation: pigWag 0.6s ease-in-out infinite; transform-origin: 0% 50%; }
        .pet-pig-eye-l { animation: pigBlink 3.2s ease-in-out infinite; transform-origin: 50% 50%; }
        .pet-pig-eye-r { animation: pigBlink 3.2s 0.1s ease-in-out infinite; transform-origin: 50% 50%; }
        .pet-pig-shadow { animation: pigShadow 2.4s ease-in-out infinite; transform-origin: center; }
        .pet-pig-ear-l { animation: pigEarL 2.4s ease-in-out infinite; transform-origin: 100% 0%; }
        .pet-pig-ear-r { animation: pigEarR 2.4s ease-in-out infinite; transform-origin: 0% 0%; }
        .pet-pig-snore { animation: pigSnore 4s ease-in-out infinite; }

        @keyframes pigBreathe {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.04) translateY(-2px); }
        }
        @keyframes pigShadow {
          0%, 100% { transform: scaleX(1); opacity: 0.4; }
          50% { transform: scaleX(0.9); opacity: 0.55; }
        }
        @keyframes pigWag {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes pigBlink {
          0%, 92%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes pigEarL {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-4deg); }
        }
        @keyframes pigEarR {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes pigSnore {
          0%, 80%, 100% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          85% { opacity: 0.8; transform: translate(8px, -6px) scale(1); }
          95% { opacity: 0; transform: translate(20px, -16px) scale(0.6); }
        }
      `}</style>

      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pp-body" cx="50%" cy="40%">
            <stop offset="0" stopColor="#ffd1a8" />
            <stop offset="0.6" stopColor="#ff8c5a" />
            <stop offset="1" stopColor="#ff4d2e" />
          </radialGradient>
          <radialGradient id="pp-cheek" cx="50%" cy="50%">
            <stop offset="0" stopColor="#ff3366" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff3366" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pp-shadow" cx="50%" cy="50%">
            <stop offset="0" stopColor="#000" stopOpacity="0.5" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 地面阴影 */}
        <ellipse className="pet-pig-shadow" cx="100" cy="186" rx="60" ry="8" fill="url(#pp-shadow)" />

        {/* 尾巴（摇） */}
        <g className="pet-pig-tail" style={{ transformOrigin: '40px 110px' }}>
          <path
            d="M 40 110 Q 28 100 32 86 Q 36 76 30 70"
            fill="none"
            stroke="#ff4d2e"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>

        <g className="pet-pig-body">
          {/* 后腿 */}
          <ellipse cx="68" cy="160" rx="14" ry="16" fill="url(#pp-body)" />
          <ellipse cx="132" cy="160" rx="14" ry="16" fill="url(#pp-body)" />

          {/* 身体 */}
          <ellipse cx="100" cy="120" rx="56" ry="48" fill="url(#pp-body)" />

          {/* 头部 */}
          <ellipse cx="100" cy="78" rx="50" ry="44" fill="url(#pp-body)" />

          {/* 耳朵 */}
          <g className="pet-pig-ear-l" style={{ transformOrigin: '140px 38px' }}>
            <path d="M 130 50 L 144 28 L 156 50 Z" fill="#ff4d2e" />
            <path d="M 134 47 L 144 36 L 152 47 Z" fill="#ff8c5a" />
          </g>
          <g className="pet-pig-ear-r" style={{ transformOrigin: '60px 38px' }}>
            <path d="M 70 50 L 56 28 L 44 50 Z" fill="#ff4d2e" />
            <path d="M 66 47 L 56 36 L 48 47 Z" fill="#ff8c5a" />
          </g>

          {/* 腮红 */}
          <ellipse cx="68" cy="92" rx="11" ry="7" fill="url(#pp-cheek)" />
          <ellipse cx="132" cy="92" rx="11" ry="7" fill="url(#pp-cheek)" />

          {/* 眼睛 */}
          <g className="pet-pig-eye-l" style={{ transformOrigin: '84px 72px' }}>
            <ellipse cx="84" cy="72" rx="6" ry="8" fill="#0a0506" />
            <circle cx="86" cy="69" r="2" fill="#fff" />
          </g>
          <g className="pet-pig-eye-r" style={{ transformOrigin: '116px 72px' }}>
            <ellipse cx="116" cy="72" rx="6" ry="8" fill="#0a0506" />
            <circle cx="118" cy="69" r="2" fill="#fff" />
          </g>

          {/* 鼻子（猪鼻） */}
          <ellipse cx="100" cy="92" rx="14" ry="10" fill="#ff8c5a" />
          <ellipse cx="100" cy="92" rx="14" ry="10" fill="none" stroke="#ff4d2e" strokeWidth="1.5" />
          <ellipse cx="94" cy="92" rx="2" ry="3" fill="#0a0506" />
          <ellipse cx="106" cy="92" rx="2" ry="3" fill="#0a0506" />

          {/* 嘴 */}
          <path d="M 100 102 L 100 108 M 100 108 Q 92 114 86 110 M 100 108 Q 108 114 114 110" stroke="#0a0506" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* 小脚 */}
          <ellipse cx="68" cy="172" rx="10" ry="5" fill="#0a0506" opacity="0.4" />
          <ellipse cx="132" cy="172" rx="10" ry="5" fill="#0a0506" opacity="0.4" />

          {/* 高光 */}
          <ellipse cx="84" cy="60" rx="12" ry="6" fill="#fff" opacity="0.4" />
        </g>

        {/* ZZZ 睡眠符号 */}
        <text className="pet-pig-snore" x="146" y="38" fill="#ff8c5a" fontSize="14" fontWeight="bold" opacity="0">
          z
        </text>
      </svg>
    </div>
  );
};