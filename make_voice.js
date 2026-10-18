const fs = require('fs');
const https = require('https');

const text = encodeURIComponent('기획서만 넣으면 동영상이 완성됩니다');
const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=ko&client=tw-ob`;

const file = fs.createWriteStream('public/voice.mp3');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    res.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('✅ 한국어 음성 파일 생성 완료: public/voice.mp3');
    });
}).on('error', (err) => {
    console.error('다운로드 에러:', err.message);
});