import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const Logo: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. 카드가 위로 스르륵 등장하는 애니메이션 (0~20프레임)
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // 2. 영상 시간에 따라 0%에서 100%까지 차오르는 게이지 (15~100프레임)
  const progress = interpolate(frame, [15, 100], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 160,
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        width: 720,
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderRadius: 24,
        padding: '36px 40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        border: '1px solid #1e293b',
        fontFamily: 'sans-serif',
      }}
    >
      {/* 카드 상단 배지 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18,
        }}
      >
        <span
          style={{
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            color: '#818cf8',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 'bold',
            letterSpacing: 1,
          }}
        >
          AI AGENT WORKFLOW
        </span>
        <span
          style={{
            color: '#34d399',
            fontSize: 14,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              backgroundColor: '#34d399',
              borderRadius: '50%',
              display: 'inline-block',
            }}
          />
          실시간 분석 중
        </span>
      </div>

      {/* 카드 타이틀 & 설명 */}
      <h2
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          color: '#f8fafc',
        }}
      >
        고객 요구사항 자동 프로토타이핑
      </h2>
      <p style={{ fontSize: 16, color: '#94a3b8', margin: '0 0 24px 0' }}>
        기획 대본과 UI 컴포넌트가 결합하여 1분 만에 완성형 제품 데모 비디오를 생성합니다.
      </p>

      {/* 프레임 연동 프로그레스 바 */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 13,
            color: '#cbd5e1',
            marginBottom: 8,
            fontWeight: 'bold',
          }}
        >
          <span>렌더링 파이프라인 진행률</span>
          <span style={{ color: '#fbbf24' }}>{Math.round(progress)}%</span>
        </div>
        <div
          style={{
            width: '100%',
            height: 10,
            backgroundColor: '#1e293b',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      {/* 3대 핵심 지표 그리드 */}
      <div style={{ display: 'flex', gap: 14 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: '#1e293b',
            padding: '16px',
            borderRadius: 14,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 12, color: '#94a3b8' }}>처리 속도</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#38bdf8', marginTop: 4 }}>
            240ms
          </div>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#1e293b',
            padding: '16px',
            borderRadius: 14,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 12, color: '#94a3b8' }}>자동 검증률</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#34d399', marginTop: 4 }}>
            99.8%
          </div>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#1e293b',
            padding: '16px',
            borderRadius: 14,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 12, color: '#94a3b8' }}>제작 시간 단축</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#f43f5e', marginTop: 4 }}>
            -85%
          </div>
        </div>
      </div>
    </div>
  );
};