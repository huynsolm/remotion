Set s = CreateObject("SAPI.SpVoice")
Set f = CreateObject("SAPI.SpFileStream")
f.Open "public/voice.wav", 3
Set s.AudioOutputStream = f
s.Speak "기획서만 넣으면 동영상이 완성됩니다"
f.Close
