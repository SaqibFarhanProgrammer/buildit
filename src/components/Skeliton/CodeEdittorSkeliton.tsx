import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CodeEditorSkeleton() {
  const editorLines = Array.from({ length: 25 }, (_, i) => i);

  // Realistic code line widths
  const lineWidths = [
    180, 320, 240, 400, 160, 350, 280, 200, 380, 260,
    150, 340, 220, 390, 170, 310, 250, 360, 190, 330,
    210, 370, 230, 300, 270
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] overflow-hidden">
      {/* ===== TOP NAVBAR ===== */}
      <div className="flex items-center justify-between px-4 h-[52px] border-b border-white/[0.06] bg-[#0A0A0A] shrink-0">
        {/* Left: Icon + Title */}
        <div className="flex items-center gap-3">
          <Skeleton width={20} height={20} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={3} />
          <Skeleton width={140} height={16} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={3} />
        </div>

        {/* Center: Language + Explain + Font Size */}
        <div className="flex items-center gap-3">
          <Skeleton width={70} height={28} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={6} />
          <Skeleton width={80} height={28} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={6} />
          <div className="flex items-center gap-2 ml-2">
            <Skeleton width={24} height={24} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={4} />
            <Skeleton width={24} height={18} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={3} />
            <Skeleton width={24} height={24} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={4} />
          </div>
        </div>

        {/* Right: Settings + Save + Terminal + Run */}
        <div className="flex items-center gap-3">
          <Skeleton width={24} height={24} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={4} />
          <Skeleton width={24} height={24} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={4} />
          <Skeleton width={90} height={32} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={6} />
          <Skeleton width={80} height={32} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={6} />
        </div>
      </div>

      {/* ===== EDITOR AREA ===== */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-hidden">
          {editorLines.map((_, i) => (
            <div
              key={i}
              className="flex items-center  px-4 h-[24px] hover:bg-white/[0.02]"
            >
              {/* Line Number */}
              <Skeleton
                width={28}
                height={12}
                baseColor="#141414"
                highlightColor="#222222"
                borderRadius={2}
              />
              {/* Code Line */}
              <Skeleton
                width={lineWidths[i]}
                height={12}
                baseColor="#1a1a1a"
                highlightColor="#2a2a2a"
                borderRadius={2}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===== TERMINAL ===== */}
      <div className="border-t border-white/[0.06] bg-[#0A0A0A] shrink-0">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 h-[40px] border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <Skeleton width={14} height={14} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={2} />
            <Skeleton width={70} height={12} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={2} />
          </div>
          <Skeleton width={20} height={20} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={4} />
        </div>

        {/* Terminal Content */}
        <div className="px-4 py-3 flex flex-col items-center justify-center gap-3 min-h-[120px] relative">
          <Skeleton width={280} height={12} baseColor="#141414" highlightColor="#222222" borderRadius={2} />
          
          {/* Bottom Left Icon */}
          <div className="absolute bottom-4 left-4">
            <Skeleton width={36} height={36} baseColor="#1a1a1a" highlightColor="#2a2a2a" borderRadius={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditorSkeleton;