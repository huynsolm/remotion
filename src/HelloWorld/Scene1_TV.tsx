import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Title } from "./Title";
import { CaptionItem } from "../HelloWorld";

export const Scene1_TV: React.FC<{ titleText?: string; captions?: CaptionItem[] }> = ({
    titleText = "우리집 가족 전용 스마트 TV 대시보드 앱",
    captions = [],
}) => {
    const frame = useCurrentFrame();
    const audioDelay = 15;
    const contentFrame = Math.max(0, frame - audioDelay);

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
            <Sequence from={audioDelay}>
                <Audio src={staticFile("voice.mp3")} volume={1.0} />
            </Sequence>

            {/* 상단 TV 대시보드 헤더 */}
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
                        LIVING ROOM TV
                    </span>
                    <span style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff" }}>
                        {titleText}
                    </span>
                </div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#cbd5e1", letterSpacing: "1px" }}>
                    19:30 <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 400 }}>· 맑음 21°C</span>
                </div>
            </div>

            {/* 대시보드 3분할 위젯 카드 */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "24px", margin: "auto 0" }}>
                <div style={{ background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "24px" }}>
                    <div style={{ color: "#818cf8", fontWeight: 700, marginBottom: "16px", fontSize: "16px" }}>오늘 가족 일정</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px" }}>
                        <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(30, 41, 59, 0.6)" }}>민우: 17:00 수학 심화 셔틀</div>
                        <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(30, 41, 59, 0.6)" }}>수아: 16:30 피아노 콩쿠르 연습</div>
                        <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(30, 41, 59, 0.6)" }}>가족: 20:00 저녁 식사 및 TV 시청</div>
                    </div>
                </div>

                <div style={{ background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "24px" }}>
                    <div style={{ color: "#34d399", fontWeight: 700, marginBottom: "16px", fontSize: "16px" }}>오늘의 가사 분담</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "rgba(30, 41, 59, 0.6)" }}>
                            <span>분리수거</span><span style={{ color: "#34d399" }}>아빠 완료 ✓</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "rgba(30, 41, 59, 0.6)" }}>
                            <span>식기세척기 정리</span><span style={{ color: "#fcd34d" }}>민우 담당</span>
                        </div>
                    </div>
                </div>

                <div style={{ background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "24px" }}>
                    <div style={{ color: "#f472b6", fontWeight: 700, marginBottom: "16px", fontSize: "16px" }}>가족 공지 핀보드</div>
                    <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(244, 114, 182, 0.15)", border: "1px solid rgba(244, 114, 182, 0.3)", fontSize: "14px", lineHeight: "1.6" }}>
                        📌 이번 주말 민우 생일 파티 준비!<br />선물 리스트는 냉장고 앱 메모 확인
                    </div>
                </div>
            </div>

            <Title captions={captions} currentFrame={contentFrame} />
        </AbsoluteFill>
    );
};