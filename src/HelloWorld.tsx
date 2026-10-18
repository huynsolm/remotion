import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene1_TV } from "./HelloWorld/Scene1_TV";
import { Scene2_Fridge } from "./HelloWorld/Scene2_Fridge";
import { Scene3_Timetable } from "./HelloWorld/Scene3_Timetable";

export interface CaptionItem {
  word: string;
  start: number;
  end: number;
}

export interface HelloWorldProps {
  titleText?: string;
  captions?: CaptionItem[];
  captions2?: CaptionItem[];
  captions3?: CaptionItem[];
}

const DEFAULT_C1: CaptionItem[] = [
  { word: "거실", start: 0, end: 18 },
  { word: "TV", start: 19, end: 35 },
  { word: "대시보드로", start: 36, end: 65 },
  { word: "우리집", start: 66, end: 90 },
  { word: "오늘", start: 91, end: 110 },
  { word: "일정을", start: 111, end: 135 },
  { word: "한눈에", start: 136, end: 155 },
  { word: "확인하세요", start: 156, end: 175 },
];

const DEFAULT_C2: CaptionItem[] = [
  { word: "스마트", start: 0, end: 20 },
  { word: "냉장고가", start: 21, end: 45 },
  { word: "소비기한을", start: 46, end: 75 },
  { word: "체크하고", start: 76, end: 105 },
  { word: "부족한", start: 106, end: 125 },
  { word: "식재료를", start: 126, end: 145 },
  { word: "주문합니다", start: 146, end: 175 },
];

const DEFAULT_C3: CaptionItem[] = [
  { word: "아이별", start: 0, end: 20 },
  { word: "학원", start: 21, end: 40 },
  { word: "시간표와", start: 41, end: 65 },
  { word: "결제", start: 66, end: 85 },
  { word: "보안은", start: 86, end: 105 },
  { word: "학부모", start: 106, end: 125 },
  { word: "핀", start: 126, end: 140 },
  { word: "번호로", start: 141, end: 155 },
  { word: "안전하게", start: 156, end: 170 },
  { word: "지킵니다", start: 171, end: 180 },
];

export const HelloWorld: React.FC<HelloWorldProps> = ({
  titleText = "우리집 가족 전용 스마트 TV 대시보드 앱",
  captions = [],
  captions2 = [],
  captions3 = [],
}) => {
  const c1 = captions.length > 0 ? captions : DEFAULT_C1;
  const c2 = captions2.length > 0 ? captions2 : DEFAULT_C2;
  const c3 = captions3.length > 0 ? captions3 : DEFAULT_C3;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070a12",
        color: "#ffffff",
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      {/* 🎵 전체 배경음악 */}
      <Audio src={staticFile("bgm.wav")} volume={0.15} loop />

      {/* 씬 1: 거실 월패드/TV 대시보드 (0 ~ 180f) */}
      <Sequence from={0} durationInFrames={180}>
        <Scene1_TV titleText={titleText} captions={c1} />
      </Sequence>

      {/* 씬 2: 스마트 냉장고 (180 ~ 360f) */}
      <Sequence from={180} durationInFrames={180}>
        <Scene2_Fridge captions={c2} />
      </Sequence>

      {/* 씬 3: 아이별 학원 시간표 & 부모 안심 PIN (360 ~ 540f) */}
      <Sequence from={360} durationInFrames={180}>
        <Scene3_Timetable captions={c3} />
      </Sequence>
    </AbsoluteFill>
  );
};