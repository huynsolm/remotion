const fs = require('fs');
const path = require('path');
const https = require('https');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// 안정적인 로열티 프리 경쾌한 Lo-Fi / Tech 데모 BGM 다운로드
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

// 부드러운 사인파 비프음(WAV/MP3 버퍼) 생성 함수 (PIN 번호 입력용)
function createBeepSound(filename, freq = 880, durationMs = 80) {
    const sampleRate = 44100;
    const numSamples = Math.floor(sampleRate * (durationMs / 1000));
    const dataSize = numSamples * 2;
    const buffer = Buffer.alloc(44 + dataSize);

    // WAV 헤더 작성
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + dataSize, 4);
    buffer.write('WAVE', 8);
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16);
    buffer.writeUInt16LE(1, 20); // PCM
    buffer.writeUInt16LE(1, 22); // Mono
    buffer.writeUInt32LE(sampleRate, 24);
    buffer.writeUInt32LE(sampleRate * 2, 28);
    buffer.writeUInt16LE(2, 32);
    buffer.writeUInt16LE(16, 34);
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataSize, 40);

    // 사인파 생성 + Fade out
    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const fade = 1 - (i / numSamples); // 끝부분 볼륨 감소
        const sample = Math.sin(2 * Math.PI * freq * t) * 0.4 * fade;
        buffer.writeInt16LE(Math.floor(sample * 32767), 44 + i * 2);
    }

    fs.writeFileSync(path.join(publicDir, filename), buffer);
}

async function run() {
    console.log('🎵 BGM 및 사운드 효과음 에셋 준비 중...');

    // 1. PIN 입력 틱 사운드 생성 (880Hz 경쾌한 키패드 소리)
    createBeepSound('pin_tick.wav', 1046, 70); // 높은 도(C6)
    createBeepSound('pin_success.wav', 1318, 160); // 미(E6) 성공음
    console.log('✓ public/pin_tick.wav & pin_success.wav 생성 완료!');

    // 2. 가볍고 세련된 BGM 다운로드 (Wikimedia 공용 Tech 앰비언스 오디오)
    const bgmUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/21/Ambient_daydream.ogg';
    const bgmPath = path.join(publicDir, 'bgm.ogg');
    try {
        await downloadFile(bgmUrl, bgmPath);
        console.log('✓ public/bgm.ogg 다운로드 완료!');
    } catch (e) {
        console.log('BGM 다운로드 건너뜀 (효과음 우선 적용)');
    }

    console.log('🎉 사운드 에셋 생성이 완료되었습니다.');
}

run();