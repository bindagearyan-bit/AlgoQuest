const fs = require('fs');
const path = require('path');

const soundsDir = path.resolve(__dirname, '../frontend/public/sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

function writeWav(filename, sampleRate, samples) {
  const byteRate = sampleRate * 2; // 16-bit mono
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // audioFormat 1 (PCM)
  buffer.writeUInt16LE(1, 22);  // numChannels 1 (mono)
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(2, 32);  // blockAlign
  buffer.writeUInt16LE(16, 34); // bitsPerSample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // samples
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intVal = s < 0 ? s * 0x8000 : s * 0x7fff;
    buffer.writeInt16LE(Math.floor(intVal), 44 + i * 2);
  }

  const filePath = path.join(soundsDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated: ${filePath}`);
}

const sampleRate = 22050;

// 1. card-flip.wav (short click / frequency flick, 0.08s)
{
  const duration = 0.08;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const freq = 400 + (1 - t / duration) * 800; // pitch drops fast
    const env = Math.exp(-t * 60);
    const wave = Math.sin(2 * Math.PI * freq * t) > 0 ? 0.4 : -0.4;
    samples[i] = wave * env;
  }
  writeWav('card-flip.wav', sampleRate, samples);
}

// 2. match-chime.wav (pleasant 8-bit chime, 0.45s)
{
  const duration = 0.45;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  // Two ascending chimes: E5 (659Hz) and B5 (987Hz)
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let freq = 659.25;
    let env = 0;
    if (t < 0.18) {
      env = Math.exp(-t * 12);
      freq = 659.25;
    } else {
      const t2 = t - 0.18;
      env = Math.exp(-t2 * 10);
      freq = 987.77;
    }
    const wave = (Math.sin(2 * Math.PI * freq * t) > 0 ? 0.35 : -0.35) +
                 (Math.sin(2 * Math.PI * (freq * 2) * t) * 0.15);
    samples[i] = wave * env;
  }
  writeWav('match-chime.wav', sampleRate, samples);
}

// 3. no-match-buzz.wav (soft 8-bit error buzz, 0.28s)
{
  const duration = 0.28;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const freq = t < 0.14 ? 160 : 120;
    const env = Math.exp(-t * 8);
    // Sawtooth / harsh square wave
    const wave = ((t * freq) % 1) > 0.5 ? 0.35 : -0.35;
    samples[i] = wave * env;
  }
  writeWav('no-match-buzz.wav', sampleRate, samples);
}

// 4. countdown-beep.wav (sharp 8-bit arcade pip, 0.12s)
{
  const duration = 0.12;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const freq = 880; // A5
    const env = Math.exp(-t * 25);
    const wave = Math.sin(2 * Math.PI * freq * t) > 0 ? 0.4 : -0.4;
    samples[i] = wave * env;
  }
  writeWav('countdown-beep.wav', sampleRate, samples);
}

// 5. victory-fanfare.wav (celebratory 8-bit fanfare arpeggio, 1.8s)
{
  const duration = 1.8;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  // Notes: C5 (523), E5 (659), G5 (784), C6 (1046)
  const notes = [
    { start: 0.0, dur: 0.18, freq: 523.25 },
    { start: 0.18, dur: 0.18, freq: 659.25 },
    { start: 0.36, dur: 0.18, freq: 783.99 },
    { start: 0.54, dur: 0.45, freq: 1046.50 },
    { start: 1.02, dur: 0.65, freq: 1318.51 }, // E6 finish!
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;
    for (const note of notes) {
      if (t >= note.start && t < note.start + note.dur) {
        const localT = t - note.start;
        const env = Math.exp(-localT * (1.8 / note.dur));
        const sq = Math.sin(2 * Math.PI * note.freq * t) > 0 ? 0.35 : -0.35;
        sample += sq * env;
      }
    }
    samples[i] = sample;
  }
  writeWav('victory-fanfare.wav', sampleRate, samples);
}

console.log('All 5 arcade audio WAV files generated successfully.');

