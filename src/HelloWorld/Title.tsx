import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const Title: React.FC<{
  titleText: string;
  titleColor: string;
  captions?: Array<{ word: string; start: number; end: number }>;
}> = ({ titleText, titleColor, captions }) => {
  const frame = useCurrentFrame();

  // props로 넘어온 자막이 있으면 쓰고, 없으면 기본값 사용
  const activeCaptions = captions || [
    { word: '기획서만', start: 0, end: 18 },
    { word: '넣으면', start: 18, end: 36 },
    { word: '동영상이', start: 36, end: 54 },
    { word: '완성됩니다', start: 54, end: 75 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 140,
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
        fontSize: 54,
        fontWeight: '900',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '0 40px',
      }}
    >
      {activeCaptions.map((item, index) => {
        const isActive = frame >= item.start && frame <= item.end;
        const isPassed = frame > item.end;

        // 말하는 순간 위로 통통 튀는 애니메이션
        const translateY = isActive
          ? interpolate(frame, [item.start, item.start + 4, item.end], [0, -14, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
          : 0;

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              transform: `translateY(${translateY}px) scale(${isActive ? 1.12 : 1})`,
              // 말하는 순간: 눈부신 골드, 지난 단어: 은은한 옐로우, 대기 단어: 깔끔한 화이트
              color: isActive ? '#fbbf24' : isPassed ? '#fef08a' : '#ffffff',
              backgroundColor: isActive ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.35)',
              padding: '6px 18px',
              borderRadius: '16px',
              border: isActive ? '2px solid #fbbf24' : '2px solid transparent',
              textShadow: isActive
                ? '0 0 24px rgba(251, 191, 36, 0.8), 0 2px 8px rgba(0,0,0,0.9)'
                : '0 2px 6px rgba(0,0,0,0.8)',
              transition: 'none',
            }}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
};