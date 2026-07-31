"use client";

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private droneGain: GainNode | null = null;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const unlockAudio = () => {
        this.init();
        if (this.ctx && this.ctx.state === "suspended") {
          this.ctx.resume();
        }
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };
      window.addEventListener("pointerdown", unlockAudio);
      window.addEventListener("keydown", unlockAudio);
    }
  }

  public init() {
    if (this.initialized && this.ctx) return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.initialized = true;
    } catch {
      console.warn("Web Audio API not supported");
    }
  }

  public toggleSound(): boolean {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbientDrone();
      this.playClickSound(880, 0.08);
    } else {
      this.stopAmbientDrone();
    }

    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public startAmbientDrone() {
    // Ambient drone disabled per user request
  }

  public stopAmbientDrone() {
    // Ambient drone disabled per user request
  }

  public updateScrollPitch(progress: number) {
    if (this.isMuted || !this.ctx || !this.droneFilter) return;
    try {
      // Modulate filter cutoff frequency with scroll position (400Hz -> 1200Hz)
      const freq = 400 + progress * 800;
      this.droneFilter.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.1);
    } catch {
      // Ignore
    }
  }

  public playHoverSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const play = () => {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + 0.02;

        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.04);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
      } catch {
        // Ignore
      }
    };

    if (this.ctx.state === "suspended") {
      this.ctx.resume().then(play).catch(() => {});
    } else {
      play();
    }
  }

  public playClickSound(freq = 960, duration = 0.08) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const play = () => {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + 0.02;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq / 2.5, now + duration);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.05);
      } catch {
        // Ignore
      }
    };

    if (this.ctx.state === "suspended") {
      this.ctx.resume().then(play).catch(() => {});
    } else {
      play();
    }
  }

  public playModalSound() {
    this.playClickSound(1200, 0.12);
  }
}

export const audioEngine = new SoundManager();
