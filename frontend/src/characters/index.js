// ─── Pixel art helpers ────────────────────────────────────────────────────────
const BS = 8;
const OL = '#111122';

// Fill one 8×8 pixel block at virtual grid position (col, row)
function p(ctx, col, row, color, S) {
  ctx.fillStyle = color;
  ctx.fillRect(col * BS * S, row * BS * S, BS * S, BS * S);
}

// Draw the base sitting-cat silhouette.
// c = { body, dark, eyes, nose }
// eyeOverride: null = normal filled eyes, 'closed' = thin line, 'half' = half-height
function drawBaseCat(ctx, S, c, eyeOverride) {
  const bodyBlocks = [
    [5,2],[5,3],[6,2],
    [10,2],[10,3],[9,2],
    [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],
    [4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],
    [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],
    [4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],
    [4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],
    [4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],
    [4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[11,9],
    [4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],
    [4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],
    [4,12],[5,12],[6,12],[7,12],[8,12],[9,12],[10,12],[11,12],
    [4,13],[5,13],[6,13],[7,13],[8,13],[9,13],[10,13],[11,13],
    [4,14],[5,14],[6,14],[7,14],[8,14],[9,14],[10,14],[11,14],
    [4,15],[5,15],[6,15],[7,15],[8,15],[9,15],[10,15],[11,15],
    [4,16],[5,16],[6,16],[7,16],[8,16],[9,16],[10,16],[11,16],
    [4,17],[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[11,17],
    [4,18],[5,18],[4,19],[5,19],
    [9,18],[10,18],[9,19],[10,19],
    [11,15],[12,16],[12,17],[11,18],[10,18],
  ];

  // Outline pass
  ctx.fillStyle = OL;
  for (const [c2, r] of bodyBlocks) {
    ctx.fillRect((c2 - 1) * BS * S, r * BS * S, BS * S, BS * S);
    ctx.fillRect((c2 + 1) * BS * S, r * BS * S, BS * S, BS * S);
    ctx.fillRect(c2 * BS * S, (r - 1) * BS * S, BS * S, BS * S);
    ctx.fillRect(c2 * BS * S, (r + 1) * BS * S, BS * S, BS * S);
  }

  // Body fill
  for (const [c2, r] of bodyBlocks) p(ctx, c2, r, c.body, S);

  // Fur stripe
  [[6,11],[7,12],[8,13],[6,14],[7,15]].forEach(([c2,r]) => p(ctx, c2, r, c.dark, S));

  // Eyes
  if (eyeOverride === 'closed') {
    ctx.fillStyle = OL;
    ctx.fillRect(5 * BS * S, 6 * BS * S, 2 * BS * S, Math.round(BS * S * 0.3));
    ctx.fillRect(10 * BS * S, 6 * BS * S, 2 * BS * S, Math.round(BS * S * 0.3));
  } else if (eyeOverride === 'half') {
    ctx.fillStyle = OL;
    ctx.fillRect(5 * BS * S, 6 * BS * S, 2 * BS * S, Math.round(BS * S * 0.55));
    ctx.fillRect(10 * BS * S, 6 * BS * S, 2 * BS * S, Math.round(BS * S * 0.55));
  } else {
    p(ctx, 5, 6, c.eyes, S); p(ctx, 6, 6, c.eyes, S);
    p(ctx, 10, 6, c.eyes, S); p(ctx, 11, 6, c.eyes, S);
  }

  // Nose
  p(ctx, 7, 7, c.nose, S); p(ctx, 8, 7, c.nose, S);

  // Whiskers
  p(ctx, 3, 7, OL, S); p(ctx, 4, 7, OL, S);
  p(ctx, 11, 7, OL, S); p(ctx, 12, 7, OL, S);
}

// ─── Characters ───────────────────────────────────────────────────────────────

export const LOFI_CAT = {
  animation: 'bob', fps: 0.8, frameCount: 2,
  description: "You're studying at 2am with a warm drink and zero stress. Time moves slower here and that's exactly the point.",
  tags: ['☕', '🌙', '📚'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#9999aa', dark: '#7777aa', eyes: '#222233', nose: '#cc6677' }, frame === 1 ? 'half' : null);
    for (let c = 5; c <= 10; c++) p(ctx, c, 2, '#7744cc', S);
    p(ctx, 3, 5, '#7744cc', S); p(ctx, 4, 5, '#7744cc', S);
    p(ctx, 11, 5, '#7744cc', S); p(ctx, 12, 5, '#7744cc', S);
  },
};

export const CYBERPUNK_CAT = {
  animation: 'pulse', fps: 1, frameCount: 2,
  description: "Neon-soaked streets, synth bass, and a city that never sleeps. You've got augmentations and a playlist to match.",
  tags: ['💀', '🔌', '🌃'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    const eyeColor = frame === 1 ? '#00ffee' : '#00bbcc';
    drawBaseCat(ctx, S, { body: '#222233', dark: '#333355', eyes: eyeColor, nose: '#cc4488' }, null);
    p(ctx, 7, 1, '#00eeff', S); p(ctx, 7, 2, '#00eeff', S);
    p(ctx, 6, 0, '#00eeff', S); p(ctx, 8, 0, '#00eeff', S);
    p(ctx, 5, 12, '#0066ff', S); p(ctx, 6, 12, '#0066ff', S); p(ctx, 7, 12, '#0066ff', S);
    p(ctx, 8, 12, '#0066ff', S); p(ctx, 9, 12, '#0066ff', S);
  },
};

export const COTTAGECORE_CAT = {
  animation: 'float', fps: 1, frameCount: 2,
  description: "Barefoot in a wildflower meadow, baking bread, totally offline. Nature called and you actually answered.",
  tags: ['🌸', '🍄', '🌿'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#dd8844', dark: '#bb6622', eyes: '#222233', nose: '#cc6677' }, null);
    p(ctx, 10, 0, '#ff88cc', S); p(ctx, 12, 0, '#ff88cc', S);
    p(ctx, 11, frame === 1 ? 2 : 1, '#ffee44', S);
    p(ctx, 11, frame === 1 ? 1 : 0, '#ff88cc', S);
  },
};

export const DARK_ACADEMIA_CAT = {
  animation: 'float', fps: 0.6, frameCount: 2,
  description: "Candlelit libraries, rain on old windows, books you've dog-eared twice. Brooding is an aesthetic, not a mood.",
  tags: ['📖', '🕯️', '🍂'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#8B5E3C', dark: '#6B3E1C', eyes: '#222233', nose: '#cc6655' }, frame === 1 ? 'closed' : null);
    p(ctx, 4, 6, OL, S); p(ctx, 7, 6, OL, S);
    p(ctx, 9, 6, OL, S); p(ctx, 12, 6, OL, S);
    p(ctx, 5, 5, OL, S); p(ctx, 6, 5, OL, S);
    p(ctx, 10, 5, OL, S); p(ctx, 11, 5, OL, S);
    p(ctx, 5, 7, OL, S); p(ctx, 6, 7, OL, S);
    p(ctx, 10, 7, OL, S); p(ctx, 11, 7, OL, S);
    p(ctx, 8, 6, OL, S);
    p(ctx, 9, 18, '#5C3A1E', S); p(ctx, 10, 18, '#8B4513', S);
    p(ctx, 9, 19, '#5C3A1E', S); p(ctx, 10, 19, '#cc8844', S);
  },
};

export const VAPORWAVE_CAT = {
  animation: 'pulse', fps: 1, frameCount: 2,
  description: "Trapped in a 1980s mall that only exists in a dream. The escalator goes nowhere but the vibes are immaculate.",
  tags: ['🌴', '💜', '📼'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#eeeeff', dark: '#ccccee', eyes: '#ff88ff', nose: '#ffaacc' }, null);
    p(ctx, 5, 5, '#ff88ff', S); p(ctx, 5, 7, '#ff88ff', S);
    p(ctx, 4, 6, '#ff88ff', S); p(ctx, 7, 6, '#ff88ff', S);
    p(ctx, 10, 5, '#ff88ff', S); p(ctx, 10, 7, '#ff88ff', S);
    p(ctx, 9, 6, '#ff88ff', S); p(ctx, 12, 6, '#ff88ff', S);
    const blushOff = frame === 1 ? 1 : 0;
    p(ctx, 3 - blushOff, 7, '#ffaacc', S); p(ctx, 4 - blushOff, 7, '#ffaacc', S);
    p(ctx, 11 + blushOff, 7, '#ffaacc', S); p(ctx, 12 + blushOff, 7, '#ffaacc', S);
  },
};

export const HYPE_FROG = {
  animation: 'bounce-hyper', fps: 2, frameCount: 2,
  description: "Everything is turned up to 200% and you're crying and dancing at the same time. Completely normal, totally fine.",
  tags: ['⚡', '💥', '🎀'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#ffee44', dark: '#ddcc22', eyes: '#222233', nose: '#ff6600' }, null);
    p(ctx, 7, 3, '#ff6600', S); p(ctx, 6, 4, '#ff6600', S); p(ctx, 8, 4, '#ff6600', S);
    const eyeH = frame === 1 ? 3 : 2;
    for (let r = 5; r < 5 + eyeH; r++) {
      p(ctx, 5, r, '#222233', S); p(ctx, 6, r, '#222233', S);
      p(ctx, 9, r, '#222233', S); p(ctx, 10, r, '#222233', S);
    }
    for (let c = 5; c <= 10; c++) p(ctx, c, 8, OL, S);
  },
};

export const METAL_CAT = {
  animation: 'sway', fps: 1, frameCount: 2,
  description: "Horns up, volume at max, the chaos is the point. You headbang in the car and you have zero regrets.",
  tags: ['🤘', '🔥', '💀'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#222233', dark: '#333344', eyes: '#ff2222', nose: '#cc2222' }, null);
    p(ctx, 5, 1, '#555566', S); p(ctx, 4, 2, '#555566', S);
    p(ctx, 10, 1, '#555566', S); p(ctx, 11, 2, '#555566', S);
    if (frame === 1) {
      ctx.fillStyle = '#ff2222';
      ctx.fillRect(5 * BS * S, 6 * BS * S, 2 * BS * S, Math.round(BS * S * 0.4));
      ctx.fillRect(10 * BS * S, 6 * BS * S, 2 * BS * S, Math.round(BS * S * 0.4));
    }
    p(ctx, 6, 11, '#cc1111', S); p(ctx, 7, 11, '#cc1111', S); p(ctx, 8, 11, '#cc1111', S);
  },
};

export const CLASSICAL_CAT = {
  animation: 'bob', fps: 0.5, frameCount: 2,
  description: "A Bach prelude at dusk with a glass of something warm. You have taste and you'd like everyone to know it.",
  tags: ['🎻', '🌹', '👑'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#eeeeff', dark: '#ccccdd', eyes: '#334455', nose: '#cc8899' }, frame === 1 ? 'closed' : null);
    for (let c = 4; c <= 11; c++) p(ctx, c, 2, '#ffffcc', S);
    p(ctx, 5, 1, '#ffffcc', S); p(ctx, 6, 1, '#ffffcc', S);
    p(ctx, 9, 1, '#ffffcc', S); p(ctx, 10, 1, '#ffffcc', S);
    p(ctx, 6, 9, '#cc3344', S); p(ctx, 7, 9, '#cc3344', S); p(ctx, 8, 9, '#cc3344', S);
  },
};

export const RNB_CAT = {
  animation: 'sway', fps: 1, frameCount: 2,
  description: "Smooth, warm, and undeniably cool. You glide through the room and the playlist does all the talking.",
  tags: ['🎤', '💛', '🌙'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#cc8855', dark: '#aa6633', eyes: '#222233', nose: '#cc6655' }, 'half');
    for (let c = 5; c <= 10; c++) p(ctx, c, 9, '#ffcc44', S);
    const micRow = frame === 1 ? 16 : 17;
    p(ctx, 10, micRow, '#aaaaaa', S);
    p(ctx, 10, micRow + 1, '#888888', S);
    p(ctx, 10, micRow + 2, '#888888', S);
  },
};

export const INDIE_CAT = {
  animation: 'float', fps: 0.8, frameCount: 2,
  description: "Flannel shirts, a string of lights, guitar chords that hit different at midnight. Real and a little melancholy.",
  tags: ['🎸', '🌾', '🍂'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#ddcc99', dark: '#bb9966', eyes: '#222233', nose: '#cc8877' }, null);
    const fringeOff = frame === 1 ? 1 : 0;
    p(ctx, 4 + fringeOff, 6, '#bb9966', S);
    p(ctx, 5 + fringeOff, 6, '#bb9966', S);
    p(ctx, 6 + fringeOff, 5, '#bb9966', S);
    p(ctx, 2, 10, '#cc9944', S); p(ctx, 2, 11, '#cc9944', S); p(ctx, 2, 12, '#cc9944', S);
    p(ctx, 2, 13, '#8B5E3C', S); p(ctx, 3, 13, '#8B5E3C', S);
    p(ctx, 2, 14, '#8B5E3C', S); p(ctx, 3, 14, '#8B5E3C', S);
    p(ctx, 2, 15, '#8B5E3C', S); p(ctx, 3, 15, '#8B5E3C', S);
    p(ctx, 2, 16, '#8B5E3C', S); p(ctx, 3, 16, '#8B5E3C', S);
    p(ctx, 2, 17, '#8B5E3C', S); p(ctx, 3, 17, '#8B5E3C', S);
  },
};

export const JAZZ_CAT = {
  animation: 'bob', fps: 1, frameCount: 2,
  description: "Miles Davis at 11pm, a city hum outside the window, and nowhere to be tomorrow. Pure sophisticated cool.",
  tags: ['🎷', '🌆', '🥃'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    const off = frame === 1 ? 1 : 0;
    drawBaseCat(ctx, S, { body: '#ee8833', dark: '#cc6611', eyes: '#222233', nose: '#cc6655' }, 'half');
    p(ctx, 4 + off, 2, '#333355', S); p(ctx, 5 + off, 2, '#333355', S);
    p(ctx, 3 + off, 3, '#333355', S); p(ctx, 4 + off, 3, '#333355', S);
    p(ctx, 5 + off, 3, '#333355', S); p(ctx, 6 + off, 3, '#333355', S);
    p(ctx, 5, 5, OL, S); p(ctx, 6, 5, OL, S);
    p(ctx, 10, 5, OL, S); p(ctx, 11, 5, OL, S);
  },
};

export const KPOP_CAT = {
  animation: 'bounce', fps: 1.2, frameCount: 2,
  description: "Perfectly choreographed, impossibly catchy, and completely addictive. You've already memorized the fanchant.",
  tags: ['✨', '💖', '🌟'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#ffffff', dark: '#ddddee', eyes: '#222233', nose: '#ff88aa' }, null);
    p(ctx, 6, 2, '#ff88cc', S); p(ctx, 7, 2, '#ff88cc', S); p(ctx, 8, 2, '#ff88cc', S);
    p(ctx, 7, 1, '#ff44aa', S);
    const stickRow = frame === 1 ? 16 : 17;
    p(ctx, 10, stickRow, '#ffff44', S);
    p(ctx, 10, stickRow + 1, '#44ff88', S);
    p(ctx, 10, stickRow + 2, '#aaaaaa', S);
  },
};

export const DREAM_POP_CAT = {
  animation: 'float', fps: 0.7, frameCount: 2,
  description: "Floating somewhere between sleeping and awake, where sounds are soft and colors are pastel. Hazy and beautiful.",
  tags: ['🌸', '💤', '🎐'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#cc99ee', dark: '#aa77cc', eyes: '#554477', nose: '#ddaacc' }, frame === 1 ? 'half' : null);
    if (frame !== 1) {
      ctx.fillStyle = '#cc99ee';
      ctx.fillRect(5 * BS * S, 6 * BS * S, 2 * BS * S, Math.round(BS * S * 0.4));
      ctx.fillRect(10 * BS * S, 6 * BS * S, 2 * BS * S, Math.round(BS * S * 0.4));
    }
    p(ctx, 2, 13, '#ffccff', S); p(ctx, 3, 14, '#ffccff', S); p(ctx, 2, 15, '#ffccff', S);
    p(ctx, 13, 13, '#ffccff', S); p(ctx, 12, 14, '#ffccff', S); p(ctx, 13, 15, '#ffccff', S);
  },
};

export const PHONK_CAT = {
  animation: 'pulse', fps: 0.8, frameCount: 2,
  description: "Dark, slow, and menacing in the best way. The cowboy hat is optional but the attitude is not.",
  tags: ['🌑', '🐎', '🔊'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#333344', dark: '#222233', eyes: '#ff4400', nose: '#882200' }, null);
    for (let c = 3; c <= 12; c++) p(ctx, c, 4, '#222222', S);
    for (let c = 5; c <= 10; c++) p(ctx, c, 3, '#222222', S);
    for (let c = 6; c <= 9; c++) p(ctx, c, 2, '#222222', S);
    if (frame === 1) {
      p(ctx, 4, 6, '#ff4400', S); p(ctx, 7, 6, '#ff4400', S);
      p(ctx, 9, 6, '#ff4400', S); p(ctx, 12, 6, '#ff4400', S);
      p(ctx, 5, 5, '#ff4400', S); p(ctx, 6, 5, '#ff4400', S);
      p(ctx, 10, 5, '#ff4400', S); p(ctx, 11, 5, '#ff4400', S);
    }
  },
};

export const BUBBLEGUM_CAT = {
  animation: 'bounce', fps: 1, frameCount: 2,
  description: "Catchy hooks, candy colors, and absolutely zero cynicism. Life is good and this song is proof.",
  tags: ['🍭', '💗', '⭐'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#ff99cc', dark: '#ee77aa', eyes: '#222233', nose: '#ff4477' }, frame === 1 ? 'half' : null);
    p(ctx, 3, 7, '#ff4477', S); p(ctx, 4, 7, '#ff4477', S);
    p(ctx, 12, 7, '#ff4477', S); p(ctx, 13, 7, '#ff4477', S);
    p(ctx, 4, 17, '#cc6688', S); p(ctx, 4, 18, '#cc6688', S);
    p(ctx, 3, 16, '#ff2288', S); p(ctx, 4, 16, '#ff2288', S);
    p(ctx, 3, 15, '#ff88cc', S); p(ctx, 4, 15, '#ff88cc', S);
  },
};

export const REGGAE_CAT = {
  animation: 'sway', fps: 0.5, frameCount: 2,
  description: "No rush, no worries, just good vibrations on a warm afternoon. The hammock called and you wisely said yes.",
  tags: ['🌊', '🌿', '☀️'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#88aa88', dark: '#668866', eyes: '#222233', nose: '#66aa66' }, frame === 1 ? 'closed' : 'half');
    for (let c = 4; c <= 11; c++) p(ctx, c, 2, '#ffdd00', S);
    for (let c = 4; c <= 11; c++) p(ctx, c, 3, '#00aa44', S);
    for (let c = 4; c <= 11; c++) p(ctx, c, 4, '#cc2200', S);
    p(ctx, 7, 1, '#ffdd00', S); p(ctx, 8, 1, '#ffdd00', S);
  },
};

export const COUNTRY_CAT = {
  animation: 'bob', fps: 1, frameCount: 2,
  description: "Dirt roads, open skies, and a song that sounds like home. Honest music for honest feelings.",
  tags: ['🤠', '🌾', '🎸'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#ddbb88', dark: '#bb9966', eyes: '#443322', nose: '#cc8855' }, null);
    for (let c = 3; c <= 12; c++) p(ctx, c, 4, '#8B5E3C', S);
    for (let c = 5; c <= 10; c++) p(ctx, c, 3, '#8B5E3C', S);
    for (let c = 6; c <= 9; c++) p(ctx, c, 2, '#6B4423', S);
    p(ctx, 4, 8, '#cc8855', S); p(ctx, 7, 8, '#cc8855', S);
    p(ctx, 9, 8, '#cc8855', S); p(ctx, 12, 8, '#cc8855', S);
    if (frame === 1) {
      p(ctx, 13, 18, '#ddbb88', S);
    }
  },
};

export const AFROBEATS_CAT = {
  animation: 'bob', fps: 1.5, frameCount: 2,
  description: "Joy in motion, rhythm in every step, color in every sound. This music makes your body move before your brain agrees.",
  tags: ['🥁', '🌍', '🎉'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    const rowOff = frame === 1 ? -1 : 0;
    drawBaseCat(ctx, S, { body: '#ddaa44', dark: '#bb8822', eyes: '#222233', nose: '#cc6633' }, null);
    p(ctx, 4, 6 + rowOff, '#222233', S); p(ctx, 5, 6 + rowOff, '#222233', S);
    p(ctx, 6, 6 + rowOff, '#222233', S);
    p(ctx, 9, 6 + rowOff, '#222233', S); p(ctx, 10, 6 + rowOff, '#222233', S);
    p(ctx, 11, 6 + rowOff, '#222233', S);
    const scarfColors = ['#ff6633','#4488ff','#22cc44','#ff6633','#4488ff','#22cc44','#ff6633','#4488ff'];
    for (let i = 0; i < 8; i++) p(ctx, 4 + i, 9 + rowOff, scarfColors[i], S);
  },
};

export const EXPERIMENTAL_CAT = {
  animation: 'jitter', fps: 3, frameCount: 2,
  description: "Genre is a suggestion and rules are for other people. If it sounds like nothing you've heard, that's the whole point.",
  tags: ['🌀', '🔬', '🎲'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 8 * BS * S, 32 * BS * S);
    ctx.clip();
    drawBaseCat(ctx, S, { body: '#ff6644', dark: '#dd4422', eyes: '#222233', nose: '#ff2200' }, null);
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.rect(8 * BS * S, 0, 24 * BS * S, 32 * BS * S);
    ctx.clip();
    drawBaseCat(ctx, S, { body: '#4466ff', dark: '#2244cc', eyes: '#222233', nose: '#2200ff' }, null);
    ctx.restore();
    if (frame === 0) {
      p(ctx, 5, 6, '#ffff00', S);
      p(ctx, 9, 5, '#ff00ff', S); p(ctx, 10, 5, '#ff00ff', S);
      p(ctx, 9, 6, '#ff00ff', S); p(ctx, 10, 6, '#ff00ff', S);
    } else {
      p(ctx, 5, 5, '#ffff00', S); p(ctx, 6, 5, '#ffff00', S);
      p(ctx, 5, 6, '#ffff00', S); p(ctx, 6, 6, '#ffff00', S);
      p(ctx, 10, 6, '#ff00ff', S);
    }
    p(ctx, 5, 5, OL, S);
    p(ctx, 11, 4, OL, S);
  },
};

export const EDM_CAT = {
  animation: 'pulse', fps: 1, frameCount: 2,
  description: "Eyes closed, bass drop incoming, the whole crowd becomes one thing. For a moment, nothing else exists.",
  tags: ['🎛️', '🔵', '🌊'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    const auraSize = frame === 1 ? 2 : 1;
    ctx.fillStyle = 'rgba(0,200,255,0.15)';
    ctx.fillRect(
      (4 - auraSize) * BS * S, (3 - auraSize) * BS * S,
      (8 + auraSize * 2) * BS * S, (17 + auraSize * 2) * BS * S
    );
    drawBaseCat(ctx, S, { body: '#4488ff', dark: '#2266cc', eyes: '#00ccff', nose: '#0088ff' }, 'closed');
    ctx.fillStyle = '#00ccff';
    ctx.fillRect(5 * BS * S, 6.5 * BS * S, 2 * BS * S, Math.round(BS * S * 0.3));
    ctx.fillRect(10 * BS * S, 6.5 * BS * S, 2 * BS * S, Math.round(BS * S * 0.3));
    p(ctx, 10, 17, '#44ffcc', S); p(ctx, 10, 18, '#44ffcc', S);
    p(ctx, 10, 19, '#aaaaaa', S);
  },
};

export const DEFAULT_SLEEPER = {
  animation: 'float', fps: 0, frameCount: 1,
  description: "Nothing is playing right now. Connect to Spotify and let the music choose your vibe.",
  tags: ['😴', '🎵', '✨'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body: '#888899', dark: '#666677', eyes: '#444455', nose: '#998899' }, 'closed');
    ctx.fillStyle = 'rgba(200,200,220,0.7)';
    ctx.font = `bold ${Math.round(14 * S)}px monospace`;
    ctx.fillText('z', 13 * BS * S, 6 * BS * S);
    ctx.font = `bold ${Math.round(10 * S)}px monospace`;
    ctx.fillText('z', 14 * BS * S, 4 * BS * S);
    ctx.font = `bold ${Math.round(7 * S)}px monospace`;
    ctx.fillText('z', 15 * BS * S, 2 * BS * S);
  },
};

// ─── Theme → character map ─────────────────────────────────────────────────
export const THEME_CHARACTERS = {
  lofi_chill:        LOFI_CAT,
  cyberpunk:         CYBERPUNK_CAT,
  cottagecore:       COTTAGECORE_CAT,
  dark_academia:     DARK_ACADEMIA_CAT,
  vaporwave:         VAPORWAVE_CAT,
  hype_hyperpop:     HYPE_FROG,
  metal_rage:        METAL_CAT,
  classical_baroque: CLASSICAL_CAT,
  rnb_soul:          RNB_CAT,
  indie_folk:        INDIE_CAT,
  lofi_jazz:         JAZZ_CAT,
  kpop:              KPOP_CAT,
  dream_pop:         DREAM_POP_CAT,
  phonk:             PHONK_CAT,
  bubblegum_pop:     BUBBLEGUM_CAT,
  reggae:            REGGAE_CAT,
  country:           COUNTRY_CAT,
  afrobeats:         AFROBEATS_CAT,
  experimental:      EXPERIMENTAL_CAT,
  edm:               EDM_CAT,
};
