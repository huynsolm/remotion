const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const sampleRate = 22050; // 경량 22kHz 16-bit Mono
const durationSec = 18;
const numSamples = sampleRate * durationSec;
const dataSize = numSamples * 2;
const buffer = Buffer.alloc(44 + dataSize);

// 표준 WAV 헤더
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

// 세련된 테크 데모 감성 코드 진행 (Cmaj7 -> Am7 -> Fmaj7 -> G)
const chords = [
    [261.63, 329.63, 392.00, 523.25], // Cmaj7
    [220.00, 261.63, 329.63, 440.00], // Am7
    [174.61, 220.00, 261.63, 349.23], // Fmaj7
    [196.00, 246.94, 293.66, 392.00], // G
];

for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const chordIdx = Math.floor(t / 4.5) % chords.length;
    const chord = chords[chordIdx];
    const chordTime = t % 4.5;
    const env = Math.min(chordTime * 2, 1) * Math.max(0, 1 - chordTime / 4.6);

    let val = 0;
    for (let f of chord) {
        val += Math.sin(2 * Math.PI * f * t) * 0.12;
    }
    // 은은한 하이 차임 벨 (1.5초 주기)
    const bellTime = t % 1.5;
    const bellEnv = Math.exp(-bellTime * 4);
    val += Math.sin(2 * Math.PI * 1046.5 * t) * 0.08 * bellEnv;

    val *= env;
    val = Math.max(-1, Math.min(1, val));
    buffer.writeInt16LE(Math.floor(val * 32767), 44 + i * 2);
}

fs.writeFileSync(path.join(publicDir, 'bgm.wav'), buffer);
console.log('✓ public/bgm.wav 생성 완료! (18초 테크 앰비언스 BGM)');