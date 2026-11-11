/**
 * Web Audio API synthesizer for realistic aircraft jet engine flyovers
 * and authentic VHF aeronautical radio chatter effects.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMuted = false;
let currentVolume = 0.6;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setAudioMuted(muted: boolean) {
  isMuted = muted;
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(muted ? 0 : currentVolume, audioCtx.currentTime, 0.05);
  }
}

export function setAudioVolume(vol: number) {
  currentVolume = Math.max(0, Math.min(1, vol));
  if (masterGain && audioCtx && !isMuted) {
    masterGain.gain.setTargetAtTime(currentVolume, audioCtx.currentTime, 0.05);
  }
}

export function getAudioState() {
  return { isMuted, volume: currentVolume };
}

/**
 * Synthesizes a massive jet airliner roar (e.g. A380/777/A350)
 * with low-frequency rumble, high-bypass turbofan whine, and Doppler shift!
 */
export function playJetFlyover(wake: 'Super' | 'Heavy' | 'Medium' = 'Heavy') {
  const ctx = getAudioContext();
  if (!ctx || !masterGain || isMuted) return;

  const now = ctx.currentTime;
  const duration = wake === 'Super' ? 8.5 : wake === 'Heavy' ? 7.0 : 5.5;

  // 1. Noise Generator (Jet core & jet blast exhaust rumble)
  const bufferSize = ctx.sampleRate * duration;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Brown noise integration for thunderous sub-bass rumble
    output[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = output[i];
    output[i] *= 3.5;
  }

  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = noiseBuffer;

  // Lowpass filter for deep engine roar
  const lowFilter = ctx.createBiquadFilter();
  lowFilter.type = 'lowpass';
  lowFilter.frequency.setValueAtTime(wake === 'Super' ? 140 : 180, now);
  // Doppler drop in pitch as aircraft passes overhead (starts higher, drops sharply)
  lowFilter.frequency.exponentialRampToValueAtTime(320, now + duration * 0.45);
  lowFilter.frequency.exponentialRampToValueAtTime(95, now + duration);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.001, now);
  noiseGain.gain.linearRampToValueAtTime(wake === 'Super' ? 0.85 : 0.65, now + duration * 0.45);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noiseNode.connect(lowFilter);
  lowFilter.connect(noiseGain);
  noiseGain.connect(masterGain);

  // 2. High-bypass Turbofan Fan Blade Whine (Resonant peak)
  const fanOsc = ctx.createOscillator();
  fanOsc.type = 'sawtooth';
  const baseFreq = wake === 'Super' ? 380 : wake === 'Heavy' ? 440 : 520;
  fanOsc.frequency.setValueAtTime(baseFreq * 1.15, now);
  fanOsc.frequency.linearRampToValueAtTime(baseFreq * 1.08, now + duration * 0.42);
  // Sharp Doppler transition
  fanOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.78, now + duration * 0.65);
  fanOsc.frequency.linearRampToValueAtTime(baseFreq * 0.65, now + duration);

  const fanFilter = ctx.createBiquadFilter();
  fanFilter.type = 'bandpass';
  fanFilter.Q.setValueAtTime(6.0, now);
  fanFilter.frequency.setValueAtTime(baseFreq * 1.15, now);
  fanFilter.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, now + duration);

  const fanGain = ctx.createGain();
  fanGain.gain.setValueAtTime(0.001, now);
  fanGain.gain.linearRampToValueAtTime(wake === 'Super' ? 0.35 : 0.25, now + duration * 0.42);
  fanGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.95);

  fanOsc.connect(fanFilter);
  fanFilter.connect(fanGain);
  fanGain.connect(masterGain);

  // Start sound
  noiseNode.start(now);
  fanOsc.start(now);

  noiseNode.stop(now + duration);
  fanOsc.stop(now + duration);
}

/**
 * Plays VHF radio squelch static burst (at start/end of ATC transmission)
 */
export function playRadioSquelch() {
  const ctx = getAudioContext();
  if (!ctx || !masterGain || isMuted) return;

  const now = ctx.currentTime;
  const duration = 0.12;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(2200, now);
  bandpass.Q.setValueAtTime(1.5, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

  source.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(masterGain);

  source.start(now);
  source.stop(now + duration);
}

/**
 * Speak authentic ATC phraseology with VHF radio effect
 */
export function playAtcTransmission(phrase: string) {
  if (isMuted) return;
  playRadioSquelch();

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 1.08;
      utterance.pitch = 0.95;
      utterance.lang = 'en-GB';
      utterance.onend = () => {
        playRadioSquelch();
      };
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis fallback
    }
  }
}
