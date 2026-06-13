export const VIBE_COORDS = {
  lofi_chill:        { energy: 0.2,  acoustic: 0.75, dark: 0.25, dance: 0.3  },
  lofi_jazz:         { energy: 0.3,  acoustic: 0.80, dark: 0.2,  dance: 0.4  },
  dream_pop:         { energy: 0.3,  acoustic: 0.55, dark: 0.2,  dance: 0.3  },
  cyberpunk:         { energy: 0.85, acoustic: 0.1,  dark: 0.75, dance: 0.7  },
  cottagecore:       { energy: 0.4,  acoustic: 0.85, dark: 0.1,  dance: 0.4  },
  dark_academia:     { energy: 0.3,  acoustic: 0.75, dark: 0.85, dance: 0.2  },
  vaporwave:         { energy: 0.5,  acoustic: 0.2,  dark: 0.45, dance: 0.65 },
  hype_hyperpop:     { energy: 0.9,  acoustic: 0.1,  dark: 0.3,  dance: 0.9  },
  metal_rage:        { energy: 0.95, acoustic: 0.1,  dark: 0.95, dance: 0.3  },
  classical_baroque: { energy: 0.3,  acoustic: 0.9,  dark: 0.5,  dance: 0.2  },
  rnb_soul:          { energy: 0.5,  acoustic: 0.5,  dark: 0.3,  dance: 0.7  },
  indie_folk:        { energy: 0.4,  acoustic: 0.72, dark: 0.3,  dance: 0.4  },
  kpop:              { energy: 0.8,  acoustic: 0.2,  dark: 0.2,  dance: 0.9  },
  phonk:             { energy: 0.8,  acoustic: 0.1,  dark: 0.85, dance: 0.7  },
  bubblegum_pop:     { energy: 0.7,  acoustic: 0.2,  dark: 0.1,  dance: 0.85 },
  reggae:            { energy: 0.5,  acoustic: 0.5,  dark: 0.2,  dance: 0.6  },
  country:           { energy: 0.45, acoustic: 0.8,  dark: 0.2,  dance: 0.5  },
  afrobeats:         { energy: 0.75, acoustic: 0.3,  dark: 0.2,  dance: 0.9  },
  experimental:      { energy: 0.6,  acoustic: 0.4,  dark: 0.65, dance: 0.3  },
  edm:               { energy: 0.9,  acoustic: 0.1,  dark: 0.4,  dance: 0.95 },
};

const DIMS = ['energy', 'acoustic', 'dark', 'dance'];

export function computeCompatScore(themeA, themeB) {
  const a = VIBE_COORDS[themeA] ?? VIBE_COORDS.lofi_chill;
  const b = VIBE_COORDS[themeB] ?? VIBE_COORDS.lofi_chill;
  const dist = Math.sqrt(DIMS.reduce((sum, d) => sum + (a[d] - b[d]) ** 2, 0));
  return Math.round((1 - dist / Math.sqrt(4)) * 100);
}

export function getCompatLabel(score) {
  if (score >= 88) return { label: 'Vibe Twins',          emoji: '💕', desc: "You two are practically the same soul. Your playlists could merge into one — and honestly, that sounds amazing." };
  if (score >= 74) return { label: 'Perfectly Balanced',  emoji: '🌿', desc: "Different songs, same feeling. You bring out the best in each other's tastes." };
  if (score >= 60) return { label: 'Cosmic Connection',   emoji: '✨', desc: "A little different, a little similar — just enough contrast to keep things interesting." };
  if (score >= 46) return { label: 'Interesting Duo',     emoji: '🎵', desc: "Your vibes complement each other in unexpected ways. A collab playlist would be wild." };
  if (score >= 32) return { label: 'Opposites Attract',   emoji: '⚡', desc: "On paper you shouldn't work. In practice, you absolutely do." };
  return               { label: 'Beautifully Chaotic', emoji: '🌀', desc: "Two completely different worlds. Together you'd make the most unexpected, unforgettable playlist." };
}
