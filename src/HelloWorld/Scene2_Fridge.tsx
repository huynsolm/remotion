import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Title } from "./Title";
import { CaptionItem } from "../HelloWorld";

export const Scene2_Fridge: React.FC<{ captions?: CaptionItem[] }> = ({
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
                <Audio src={staticFile("voice2.mp3")} volume={1.0} />
            </Sequence>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span
                        style={{
                            padding: "6px 14px",
                            borderRadius: "8px",
                            background: "rgba(16, 185, 129, 0.2)",
                            color: "#6ee7b7",
                            fontSize: "14px",
                            fontWeight: 700,
                            border: "1px solid rgba(16, 185, 129, 0.4)",
                        }}
                    >
                        SMART FRIDGE IoT
                    </span>
                    <span style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff" }}>
                        스마트 냉장고 재고 및 소비기한 자동 알림
                    </span>
                </div>
                <div style={{ fontSize: "15px", color: "#94a3b8" }}>냉장실 3°C · 냉동실 -19°C</div>
            </div>

            {/* 식재료 소비기한 카드 목록 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", margin: "auto 0" }}>
                <div style={{ background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(239, 68, 68, 0.4)", borderRadius: "18px", padding: "20px" }}>
                    <span style={{ fontSize: "12px", padding: "4px 8px", borderRadius: "6px", background: "rgba(239, 68, 68, 0.2)", color: "#fca5a5", fontWeight: 700 }}>
                        D-1 임박
                    </span>
                    <div style={{ fontSize: "18px", fontWeight: 700, margin: "14px 0 6px" }}>저지방 우유 1L</div>
                    <div style={{ fontSize: "13px", color: "#94a3b8" }}>남은 수량: 1팩</div>
                </div>

                <div style={{ background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(245, 158, 11, 0.4)", borderRadius: "18px", padding: "20px" }}>
                    <span style={{ fontSize: "12px", padding: "4px 8px", borderRadius: "6px", background: "rgba(245, 158, 11, 0.2)", color: "#fde68a", fontWeight: 700 }}>
                        D-2 주의
                    </span>
                    <div style={{ fontSize: "18px", fontWeight: 700, margin: "14px 0 6px" }}>국산 찌개용 두부</div>
                    <div style={{ fontSize: "13px", color: "#94a3b8" }}>남은 수량: 1모</div>
                </div>

                <div style={{ background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "18px", padding: "20px" }}>
                    <span style={{ fontSize: "12px", padding: "4px 8px", borderRadius: "6px", background: "rgba(16, 185, 129, 0.2)", color: "#86efac", fontWeight: 700 }}>
                        D-4 신선
                    </span>
                    <div style={{ fontSize: "18px", fontWeight: 700, margin: "14px 0 6px" }}>어린잎 샐러드팩</div>
                    <div style={{ fontSize: "13px", color: "#94a3b8" }}>남은 수량: 2팩</div>
                </div>

                <div style={{ background: "rgba(15, 23, 42, 0.75)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "18px", padding: "20px" }}>
                    <span style={{ fontSize: "12px", padding: "4px 8px", borderRadius: "6px", background: "rgba(59, 130, 246, 0.2)", color: "#93c5fd", fontWeight: 700 }}>
                        D-7 여유
                    </span>
                    <div style={{ fontSize: "18px", fontWeight: 700, margin: "14px 0 6px" }}>무항생제 신선란</div>
                    <div style={{ fontSize: "13px", color: "#94a3b8" }}>남은 수량: 10구</div>
                </div>
            </div>

            <Title captions={captions} currentFrame={contentFrame} />
        </AbsoluteFill>
    );
};