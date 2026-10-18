const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const topic = process.argv[2] || '우리집 가족 앱';

console.log('====================================================');
console.log(`🚀 [FDE Video Pipeline] 주제: "${topic}" 영상 자동 생성 시작`);
console.log('====================================================\n');

try {
    // 1. 사운드 및 효과음 에셋 확인/생성
    console.log('Step 1/3. 🎵 BGM 및 PIN 효과음 에셋 확인 중...');
    if (!fs.existsSync(path.join(__dirname, 'public', 'bgm.wav'))) {
        execSync('node generate_bgm.js', { stdio: 'inherit' });
    }
    if (!fs.existsSync(path.join(__dirname, 'public', 'pin_tick.wav'))) {
        execSync('node generate_sfx.js', { stdio: 'inherit' });
    }

    // 2. AI 음성 및 자막 타임스탬프 동기화
    console.log('\nStep 2/3. 🎙️ 씬별 음성 및 자막 타임스탬프 생성 중...');
    execSync(`node generate_audio.js "${topic}"`, { stdio: 'inherit' });

    // 3. Remotion + FFmpeg 헤드리스 MP4 렌더링
    console.log('\nStep 3/3. 🎬 Headless Chromium & FFmpeg 렌더링 진행 중...');
    const outDir = path.join(__dirname, 'out');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const outputFile = path.join(outDir, 'family_app_final_18s.mp4');
    execSync(`npx remotion render HelloWorld "${outputFile}"`, { stdio: 'inherit' });

    console.log('\n====================================================');
    console.log(`🎉 [렌더링 완료!] 최종 동영상 파일: ${outputFile}`);
    console.log('====================================================');
} catch (error) {
    console.error('\n❌ 파이프라인 실행 중 오류가 발생했습니다:', error.message);
    process.exit(1);
}