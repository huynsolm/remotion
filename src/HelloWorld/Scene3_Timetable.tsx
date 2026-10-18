import React from "react";
import {
    AbsoluteFill,
    Audio,
    interpolate,
    Sequence,
    spring,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { Title } from "./Title";
import { CaptionItem } from "../HelloWorld";

export const Scene3_Timetable: React.FC<{ captions?: CaptionItem[] }> = ({
    captions = [],
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const audioDelay = 15;
    const contentFrame = Math.max(0, frame - audioDelay);

    // 모달 애니메이션
    const modalSpring = spring({
        frame: Math.max(0, frame - 58),
        fps,
        config: { damping: 14, stiffness: 120 },
    });

    const modalOpacity = interpolate(frame, [58, 65], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const pin1 = frame >= 75;
    const pin2 = frame >= 90;
    const pin3 = frame >= 105;
    const pin4 = frame >= 120;
    const isSuccess = frame >= 126;

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(135deg, #090d16 0%, #0d1527 50%, #171638 100%)",
                padding: "48px 64px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
            }}
        >
            {/* 🎙️ 음성 및 효과음 */}
            <Sequence from={audioDelay}>
                <Audio src={staticFile("voice3.mp3")} volume={1.0} />
            </Sequence>
            <Sequence from={75} durationInFrames={15}>
                <Audio src={staticFile("pin_tick.wav")} volume={0.5} />
            </Sequence>
            <Sequence from={90} durationInFrames={15}>
                <Audio src={staticFile("pin_tick.wav")} volume={0.5} />
            </Sequence>
            <Sequence from={105} durationInFrames={15}>
                <Audio src={staticFile("pin_tick.wav")} volume={0.5} />
            </Sequence>
            <Sequence from={120} durationInFrames={15}>
                <Audio src={staticFile("pin_tick.wav")} volume={0.5} />
            </Sequence>
            <Sequence from={126} durationInFrames={40}>
                <Audio src={staticFile("pin_success.wav")} volume={0.7} />
            </Sequence>

            {/* 상단 헤더 */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span
                        style={{
                            padding: "6px 14px",
                            borderRadius: "8px",
                            background: "rgba(99, 102, 241, 0.2)",
                            color: "#a5b4fc",
                            fontSize: "14px",
                            fontWeight: 700,
                            border: "1px solid rgba(99, 102, 241, 0.4)",
                        }}
                    >
                        우리집 안심 케어
                    </span>
                    <span style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff" }}>
                        아이별 맞춤 학원 시간표 & 부모 안심 권한
                    </span>
                </div>
                <div
                    style={{
                        padding: "6px 14px",
                        borderRadius: "9999px",
                        background: "rgba(30, 41, 59, 0.8)",
                        border: "1px solid rgba(71, 85, 105, 0.6)",
                        fontSize: "13px",
                        color: "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34d399" }}></span>
                    실시간 연동 중
                </div>
            </div>

            {/* 중앙 민우 & 수아 시간표 2열 카드 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "32px",
                    margin: "auto 0",
                    position: "relative",
                }}
            >
                {/* 민우 카드 */}
                <div
                    style={{
                        background: "rgba(15, 23, 42, 0.75)",
                        border: "1px solid rgba(59, 130, 246, 0.35)",
                        borderRadius: "20px",
                        padding: "28px",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <span style={{ fontSize: "22px", fontWeight: 700, color: "#60a5fa" }}>민우 (초4)</span>
                        <span style={{ fontSize: "13px", padding: "4px 10px", borderRadius: "6px", background: "rgba(59, 130, 246, 0.2)", color: "#93c5fd" }}>
                            수학 심화반
                        </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(30, 41, 59, 0.7)", display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                            <span>15:30 영어 리딩 클럽</span>
                            <span style={{ color: "#34d399", fontWeight: 600 }}>출석 완료</span>
                        </div>
                        <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(30, 58, 138, 0.4)", border: "1px solid rgba(59, 130, 246, 0.4)", display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                            <span>17:00 수학 심화 (셔틀 탑승)</span>
                            <span style={{ color: "#fcd34d", fontWeight: 600 }}>진행 중</span>
                        </div>
                    </div>
                </div>

                {/* 수아 카드 */}
                <div
                    style={{
                        background: "rgba(15, 23, 42, 0.75)",
                        border: "1px solid rgba(168, 85, 247, 0.35)",
                        borderRadius: "20px",
                        padding: "28px",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <span style={{ fontSize: "22px", fontWeight: 700, color: "#c084fc" }}>수아 (초1)</span>
                        <span style={{ fontSize: "13px", padding: "4px 10px", borderRadius: "6px", background: "rgba(168, 85, 247, 0.2)", color: "#e9d5ff" }}>
                            발레·피아노
                        </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(30, 41, 59, 0.7)", display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                            <span>14:00 클래식 발레 기초</span>
                            <span style={{ color: "#34d399", fontWeight: 600 }}>출석 완료</span>
                        </div>
                        <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(88, 28, 135, 0.4)", border: "1px solid rgba(168, 85, 247, 0.4)", display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                            <span>16:30 피아노 콩쿠르 연습</span>
                            <span style={{ color: "#d8b4fe", fontWeight: 600 }}>하원 준비</span>
                        </div>
                    </div>
                </div>

                {/* 🔐 중앙 부모 안심 PIN 인증 모달 (58f 이후 등장) */}
                {frame >= 58 && (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: `translate(-50%, -50%) scale(${0.85 + modalSpring * 0.15})`,
                            opacity: modalOpacity,
                            width: "480px",
                            borderRadius: "24px",
                            background: "rgba(11, 15, 25, 0.96)",
                            border: "2px solid rgba(129, 140, 248, 0.8)",
                            boxShadow: "0 0 50px rgba(99, 102, 241, 0.45)",
                            backdropFilter: "blur(20px)",
                            padding: "32px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "20px",
                            zIndex: 30,
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "12px", fontWeight: 700, color: "#818cf8", letterSpacing: "1px", marginBottom: "6px" }}>
                                PARENT SECURITY ACCESS
                            </div>
                            <div style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>
                                결제 및 일정 수정 PIN 인증
                            </div>
                        </div>

                        {/* 4자리 원형 도트 */}
                        <div style={{ display: "flex", gap: "20px", margin: "8px 0" }}>
                            {[pin1, pin2, pin3, pin4].map((active, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "50%",
                                        border: active ? "2px solid #a5b4fc" : "2px solid #475569",
                                        background: active ? "#6366f1" : "rgba(30, 41, 59, 0.6)",
                                        boxShadow: active ? "0 0 16px #818cf8" : "none",
                                        transform: active ? "scale(1.15)" : "scale(1)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {active && (
                                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffffff" }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* 인증 결과 */}
                        {isSuccess ? (
                            <div
                                style={{
                                    padding: "8px 18px",
                                    borderRadius: "12px",
                                    background: "rgba(16, 185, 129, 0.2)",
                                    color: "#6ee7b7",
                                    border: "1px solid rgba(16, 185, 129, 0.5)",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                }}
                            >
                                ✓ 보호자 인증 완료 · 일정 수정 권한 해제됨
                            </div>
                        ) : (
                            <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                                4자리 보안 비밀번호를 입력해 주세요
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 하단 단어별 노래방 자막 */}
            <Title captions={captions} currentFrame={contentFrame} />
        </AbsoluteFill>
    );
};