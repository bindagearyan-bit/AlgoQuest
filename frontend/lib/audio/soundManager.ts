// Retro 8-bit Sound Manager with Web Audio Synthesizer + HTML5 Audio Fallback

type SoundType = 'card-flip' | 'match-chime' | 'no-match-buzz' | 'victory-fanfare' | 'countdown-beep';

class RetroSoundManager {
  private muted: boolean = false;
  private audioCtx: AudioContext | null = null;
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('algoquest_arcade_muted');
        if (stored !== null) {
          this.muted = stored === 'true';
        }
      } catch {
        // Storage access fallback
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('algoquest_arcade_muted', String(muted));
      } catch {}
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  // Synthesizes authentic retro chiptune tones directly via Web Audio API
  private playSynthesized(type: SoundType): boolean {
    const ctx = this.getAudioContext();
    if (!ctx) return false;

    const now = ctx.currentTime;

    switch (type) {
      case 'card-flip': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.07);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        return true;
      }

      case 'match-chime': {
        // Ascending harmonic chime (E5 -> B5)
        const notes = [
          { freq: 659.25, start: now, dur: 0.16 },
          { freq: 987.77, start: now + 0.14, dur: 0.28 },
        ];
        notes.forEach(({ freq, start, dur }) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.22, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + dur + 0.02);
        });
        return true;
      }

      case 'no-match-buzz': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.setValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.28);
        return true;
      }

      case 'countdown-beep': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
        return true;
      }

      case 'victory-fanfare': {
        const chords = [
          { freq: 523.25, time: now, dur: 0.16 },
          { freq: 659.25, time: now + 0.15, dur: 0.16 },
          { freq: 783.99, time: now + 0.30, dur: 0.16 },
          { freq: 1046.50, time: now + 0.45, dur: 0.45 },
          { freq: 1318.51, time: now + 0.90, dur: 0.65 },
        ];
        chords.forEach(({ freq, time, dur }) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, time);
          gain.gain.setValueAtTime(0.22, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + dur + 0.05);
        });
        return true;
      }
    }

    return false;
  }

  public play(type: SoundType): void {
    if (this.muted || typeof window === 'undefined') return;

    try {
      const synthesized = this.playSynthesized(type);
      if (synthesized) return;
    } catch {
      // Fallback to HTML Audio
    }

    try {
      let audio = this.audioCache.get(type);
      if (!audio) {
        audio = new Audio(`/sounds/${type}.wav`);
        this.audioCache.set(type, audio);
      }
      audio.currentTime = 0;
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch {
      // Silently ignore if blocked
    }
  }
}

export const soundManager = new RetroSoundManager();
