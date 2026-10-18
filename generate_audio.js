const fs = require('fs');
const path = require('path');
const https = require('https');

// 씬별 나레이션 대본
const scenes = {
    scene2: {
        filename: 'voice2.mp3',
        text: '스마트 냉장고가 소비기한을 체크하고 부족한 재료를 자동 주문합니다',
        // 5초(150f) 기준 자연스러운 호흡 타임스탬프
        captions: [
            { word: '스마트', start: 10, end: 25 },
            { word: '냉장고가', start: 26, end: 44 },
            { word: '소비기한을', start: 45, end: 68 },
            { word: '체크하고', start: 69, end: 88 },
            { word: '부족한', start: 89, end: 102 },
            { word: '재료를', start: 103, end: 118 },
            { word: '자동', start: 119, end: 132 },
            { word: '주문합니다', start: 133, end: 150 }
        ]
    },
    scene3: {
        filename: 'voice3.mp3',
        text: '아이별 학원 시간표와 결제 보안은 학부모 핀 번호로 안전하게 지킵니다',
        // 5초(150f) 기준 자연스러운 호흡 타임스탬프
        captions: [
            { word: '아이별', start: 10, end: 24 },
            { word: '학원', start: 25, end: 38 },
            { word: '시간표와', start: 39, end: 58 },
            { word: '결제', start: 59, end: 72 },
            { word: '보안은', start: 73, end: 88 },
            { word: '학부모', start: 89, end: 104 },
            { word: '핀', start: 105, end: 114 },
            { word: '번호로', start: 115, end: 128 },
            { word: '안전하게', start: 129, end: 142 },
            { word: '지킵니다', start: 143, end: 150 }
        ]
    }
};

// 무료 고품질 한국어 TTS 다운로드 함수
function downloadTTS(text, outputPath) {
    return new Promise((resolve, reject) => {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ko&client=tw-ob`;
        const file = fs.createWriteStream(outputPath);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(outputPath, () => { });
            reject(err);
        });
    });
}

async function run() {
    console.log('🎙️ 씬 2 & 씬 3 AI 음성 생성 및 자막 동기화 시작...');

    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    // 1. 음성 파일 다운로드
    await downloadTTS(scenes.scene2.text, path.join(publicDir, scenes.scene2.filename));
    console.log('✓ public/voice2.mp3 생성 완료 (스마트 냉장고)');

    await downloadTTS(scenes.scene3.text, path.join(publicDir, scenes.scene3.filename));
    console.log('✓ public/voice3.mp3 생성 완료 (학원 시간표 & PIN)');

    // 2. props.json 업데이트
    const propsPath = path.join(__dirname, 'props.json');
    let currentProps = {};
    if (fs.existsSync(propsPath)) {
        try {
            currentProps = JSON.parse(fs.readFileSync(propsPath, 'utf8'));
        } catch (e) { }
    }

    const updatedProps = {
        ...currentProps,
        captions2: scenes.scene2.captions,
        captions3: scenes.scene3.captions,
    };

    fs.writeFileSync(propsPath, JSON.stringify(updatedProps, null, 2), 'utf8');
    console.log('✓ props.json 에 씬2, 씬3 자막 데이터 연동 완료!');
    console.log('🎉 음성 파이프라인 준비가 완료되었습니다.');
}

run();