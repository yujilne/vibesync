// ─── Pixel art engine — 16×16 virtual grid on 256×256 canvas ────────────────
const BS = 16;
const OL = '#111122';

function p(ctx, col, row, color, S) {
  ctx.fillStyle = color;
  ctx.fillRect(col * BS * S, row * BS * S, BS * S, BS * S);
}

// Shared pixel-group definitions (all cats share this silhouette)
const EAR_L  = [[4,1],[3,2],[4,2],[5,2]];
const EAR_R  = [[10,1],[9,2],[10,2],[11,2]];
const HEAD   = [
  [2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],
  [2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],
  [2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],
  [2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],
  [2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],
];
const BODY   = [
  [3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],
  [3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[11,9],
  [3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],
  [3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],
];
const PAW_L  = [[3,12],[4,12],[3,13],[4,13]];
const PAW_R  = [[9,12],[10,12],[9,13],[10,13]];
const TAIL   = [[12,11],[12,12],[12,13],[11,13]];
const EYE_L  = [[4,5],[5,5]];
const EYE_R  = [[9,5],[10,5]];

const ALL_BLOCKS = [...EAR_L,...EAR_R,...HEAD,...BODY,...PAW_L,...PAW_R,...TAIL];

// c = { body, dark, eyes, nose, inner }
// eyeStyle: null = open, 'half' = half-height, 'closed' = thin line
function drawBaseCat(ctx, S, c, eyeStyle) {
  // 1 — outline (dark neighbors of every body block)
  ctx.fillStyle = OL;
  for (const [col, row] of ALL_BLOCKS) {
    ctx.fillRect((col-1)*BS*S, row*BS*S,     BS*S, BS*S);
    ctx.fillRect((col+1)*BS*S, row*BS*S,     BS*S, BS*S);
    ctx.fillRect(col*BS*S,     (row-1)*BS*S, BS*S, BS*S);
    ctx.fillRect(col*BS*S,     (row+1)*BS*S, BS*S, BS*S);
  }

  // 2 — body fill
  for (const [col, row] of ALL_BLOCKS) p(ctx, col, row, c.body, S);

  // 3 — dark fur stripe
  p(ctx, 5, 10, c.dark, S); p(ctx, 6, 10, c.dark, S);

  // 4 — inner ear highlight
  p(ctx, 4, 2, c.inner, S); p(ctx, 10, 2, c.inner, S);

  // 5 — eyes
  if (eyeStyle === 'closed') {
    ctx.fillStyle = OL;
    ctx.fillRect(4*BS*S, 5*BS*S, 2*BS*S, Math.round(BS*S*0.3));
    ctx.fillRect(9*BS*S, 5*BS*S, 2*BS*S, Math.round(BS*S*0.3));
  } else if (eyeStyle === 'half') {
    ctx.fillStyle = c.eyes;
    ctx.fillRect(4*BS*S, 5*BS*S, 2*BS*S, Math.round(BS*S*0.55));
    ctx.fillRect(9*BS*S, 5*BS*S, 2*BS*S, Math.round(BS*S*0.55));
  } else {
    for (const [col, row] of EYE_L) p(ctx, col, row, c.eyes, S);
    for (const [col, row] of EYE_R) p(ctx, col, row, c.eyes, S);
  }

  // 6 — nose
  p(ctx, 7, 6, c.nose, S);

  // 7 — whiskers
  p(ctx, 1, 6, OL, S); p(ctx, 2, 6, OL, S);
  p(ctx, 12, 6, OL, S); p(ctx, 13, 6, OL, S);
}

// ─── 20 Characters ───────────────────────────────────────────────────────────

export const LOFI_CAT = {
  animation: 'bob', fps: 0.8, frameCount: 2,
  description: "You're studying at 2am with a warm drink and zero stress. Time moves slower here and that's exactly the point.",
  tags: ['☕', '🌙', '📚'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#9999aa', dark:'#7777aa', eyes:'#222233', nose:'#cc6677', inner:'#ddaabb' }, frame===1?'half':null);
    // headphone band across row 2
    for (let c=3;c<=11;c++) p(ctx,c,2,'#6633aa',S);
    // ear cups
    p(ctx,2,4,'#6633aa',S); p(ctx,13,4,'#6633aa',S);
  },
};

export const CYBERPUNK_CAT = {
  animation: 'pulse', fps: 1, frameCount: 2,
  description: "Neon-soaked streets, synth bass, and a city that never sleeps. You've got augmentations and a playlist to match.",
  tags: ['💀', '🔌', '🌃'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    const eyeCol = frame===1 ? '#00ffee' : '#00eeff';
    drawBaseCat(ctx, S, { body:'#222233', dark:'#333355', eyes:eyeCol, nose:'#cc4488', inner:'#445566' }, null);
    // antenna T-shape
    p(ctx,7,0,'#00eeff',S); p(ctx,6,0,'#00eeff',S); p(ctx,8,0,'#00eeff',S);
    p(ctx,7,1,'#00eeff',S);
  },
};

export const COTTAGECORE_CAT = {
  animation: 'float', fps: 1, frameCount: 2,
  description: "Barefoot in a wildflower meadow, baking bread, totally offline. Nature called and you actually answered.",
  tags: ['🌸', '🍄', '🌿'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#dd8844', dark:'#bb6622', eyes:'#222233', nose:'#cc6655', inner:'#ffaaaa' }, null);
    // flower on right ear
    p(ctx,10,0,'#ff88cc',S); p(ctx,12,0,'#ff88cc',S);
    p(ctx,11,0,'#ff88cc',S);
    p(ctx,11,frame===1?2:1,'#ffee44',S); // center shifts down on frame 1
  },
};

export const DARK_ACADEMIA_CAT = {
  animation: 'float', fps: 0.6, frameCount: 2,
  description: "Candlelit libraries, rain on old windows, books you've dog-eared twice. Brooding is an aesthetic, not a mood.",
  tags: ['📖', '🕯️', '🍂'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#8B5E3C', dark:'#6B3E1C', eyes:'#222233', nose:'#cc6655', inner:'#cc9977' }, frame===1?'closed':null);
    // glasses: corner blocks + bridge
    p(ctx,3,5,OL,S); p(ctx,6,5,OL,S);
    p(ctx,8,5,OL,S); p(ctx,11,5,OL,S);
    p(ctx,7,5,OL,S); // bridge
    // book in right paw
    p(ctx,9,12,'#5C3A1E',S); p(ctx,10,12,'#8B4513',S);
    p(ctx,9,13,'#5C3A1E',S); p(ctx,10,13,'#cc8844',S);
  },
};

export const VAPORWAVE_CAT = {
  animation: 'pulse', fps: 1, frameCount: 2,
  description: "Trapped in a 1980s mall that only exists in a dream. The escalator goes nowhere but the vibes are immaculate.",
  tags: ['🌴', '💜', '📼'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#eeeeff', dark:'#ccccee', eyes:'#ff44ff', nose:'#ffaacc', inner:'#ffccff' }, null);
    // star eyes: cross shape overtop each eye
    p(ctx,4,4,'#ff44ff',S); p(ctx,5,4,'#ff44ff',S);
    p(ctx,9,4,'#ff44ff',S); p(ctx,10,4,'#ff44ff',S);
    // blush
    const off = frame===1?1:0;
    p(ctx,3-off,6,'#ffaacc',S); p(ctx,11+off,6,'#ffaacc',S);
  },
};

export const HYPE_FROG = {
  animation: 'bounce-hyper', fps: 2, frameCount: 2,
  description: "Everything is turned up to 200% and you're crying and dancing at the same time. Completely normal, totally fine.",
  tags: ['⚡', '💥', '🎀'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#ffee44', dark:'#ddcc22', eyes:'#222233', nose:'#ff6600', inner:'#ffddaa' }, null);
    // lightning bolt on forehead
    p(ctx,7,3,'#ff6600',S); p(ctx,6,4,'#ff6600',S); p(ctx,8,4,'#ff6600',S);
    // big eyes (frame 1 = extra row)
    const eyeRows = frame===1?3:2;
    for (let r=4;r<4+eyeRows;r++) {
      p(ctx,4,r,'#222233',S); p(ctx,5,r,'#222233',S);
      p(ctx,9,r,'#222233',S); p(ctx,10,r,'#222233',S);
    }
    // grin
    for (let c=5;c<=9;c++) p(ctx,c,7,OL,S);
  },
};

export const METAL_CAT = {
  animation: 'sway', fps: 1, frameCount: 2,
  description: "Horns up, volume at max, the chaos is the point. You headbang in the car and you have zero regrets.",
  tags: ['🤘', '🔥', '💀'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#222233', dark:'#111122', eyes:'#ff2222', nose:'#882222', inner:'#334455' }, null);
    // devil horns
    p(ctx,4,0,'#554455',S); p(ctx,3,1,'#554455',S);
    p(ctx,10,0,'#554455',S); p(ctx,11,1,'#554455',S);
    // narrow angry eyes on frame 1
    if (frame===1) {
      p(ctx,4,5,OL,S); p(ctx,5,5,OL,S);
      p(ctx,9,5,OL,S); p(ctx,10,5,OL,S);
      ctx.fillStyle = '#ff2222';
      ctx.fillRect(4*BS*S, 5*BS*S, 2*BS*S, Math.round(BS*S*0.3));
      ctx.fillRect(9*BS*S, 5*BS*S, 2*BS*S, Math.round(BS*S*0.3));
    }
  },
};

export const CLASSICAL_CAT = {
  animation: 'bob', fps: 0.5, frameCount: 2,
  description: "A Bach prelude at dusk with a glass of something warm. You have taste and you'd like everyone to know it.",
  tags: ['🎻', '🌹', '👑'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#eeeeff', dark:'#ccccdd', eyes:'#334455', nose:'#cc8899', inner:'#ffeeee' }, frame===1?'closed':null);
    // powdered wig
    for (let c=3;c<=11;c++) p(ctx,c,2,'#ffffcc',S);
    p(ctx,4,1,'#ffffcc',S); p(ctx,5,1,'#ffffcc',S);
    p(ctx,9,1,'#ffffcc',S); p(ctx,10,1,'#ffffcc',S);
    // bow tie
    p(ctx,6,8,'#cc3344',S); p(ctx,7,8,'#cc3344',S);
  },
};

export const RNB_CAT = {
  animation: 'sway', fps: 1, frameCount: 2,
  description: "Smooth, warm, and undeniably cool. You glide through the room and the playlist does all the talking.",
  tags: ['🎤', '💛', '🌙'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#cc8855', dark:'#aa6633', eyes:'#222233', nose:'#cc6655', inner:'#eebb99' }, 'half');
    // gold chain
    for (let c=4;c<=10;c++) p(ctx,c,8,'#ffcc44',S);
    // mic in right paw
    const micRow = frame===1?9:10;
    p(ctx,11,micRow,'#aaaaaa',S);
    p(ctx,11,micRow+1,'#888888',S);
    p(ctx,11,micRow+2,'#888888',S);
  },
};

export const INDIE_CAT = {
  animation: 'float', fps: 0.8, frameCount: 2,
  description: "Flannel shirts, a string of lights, guitar chords that hit different at midnight. Real and a little melancholy.",
  tags: ['🎸', '🌾', '🍂'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#ddcc99', dark:'#bb9966', eyes:'#222233', nose:'#cc8877', inner:'#eeddbb' }, null);
    // fringe covers left eye
    const fo = frame===1?1:0;
    p(ctx,4+fo,5,'#bb9966',S); p(ctx,5+fo,5,'#bb9966',S); p(ctx,4+fo,4,'#bb9966',S);
    // guitar leaning left
    p(ctx,1,8,'#cc9944',S); p(ctx,1,9,'#cc9944',S); p(ctx,1,10,'#cc9944',S); // neck
    p(ctx,1,11,'#8B5E3C',S); p(ctx,2,11,'#8B5E3C',S);
    p(ctx,1,12,'#8B5E3C',S); p(ctx,2,12,'#8B5E3C',S);
    p(ctx,1,13,'#8B5E3C',S); p(ctx,2,13,'#8B5E3C',S);
  },
};

export const JAZZ_CAT = {
  animation: 'bob', fps: 1, frameCount: 2,
  description: "Miles Davis at 11pm, a city hum outside the window, and nowhere to be tomorrow. Pure sophisticated cool.",
  tags: ['🎷', '🌆', '🥃'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#ee8833', dark:'#cc6611', eyes:'#222233', nose:'#cc6655', inner:'#ffbbaa' }, 'half');
    // beret tilted left
    const bo = frame===1?1:0;
    p(ctx,3+bo,3,'#333366',S); p(ctx,4+bo,3,'#333366',S); p(ctx,5+bo,3,'#333366',S);
    p(ctx,4+bo,2,'#333366',S);
  },
};

export const KPOP_CAT = {
  animation: 'bounce', fps: 1.2, frameCount: 2,
  description: "Perfectly choreographed, impossibly catchy, and completely addictive. You've already memorized the fanchant.",
  tags: ['✨', '💖', '🌟'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#ffffff', dark:'#ddddee', eyes:'#222233', nose:'#ff88aa', inner:'#ffddee' }, null);
    // colorful hair tuft
    p(ctx,6,2,'#ff88cc',S); p(ctx,7,2,'#ff88cc',S); p(ctx,8,2,'#ff88cc',S);
    p(ctx,7,1,'#ff44aa',S);
    // lightstick in right paw (raised on frame 1)
    const sr = frame===1?9:10;
    p(ctx,11,sr,'#ffff44',S);
    p(ctx,11,sr+1,'#44ff88',S);
    p(ctx,11,sr+2,'#aaaaaa',S);
  },
};

export const DREAM_POP_CAT = {
  animation: 'float', fps: 0.7, frameCount: 2,
  description: "Floating somewhere between sleeping and awake, where sounds are soft and colors are pastel. Hazy and beautiful.",
  tags: ['🌸', '💤', '🎐'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#cc99ee', dark:'#aa77cc', eyes:'#554477', nose:'#ddaacc', inner:'#ffccff' }, frame===1?'half':null);
    // tiny wings
    p(ctx,1,9,'#ffccff',S); p(ctx,1,10,'#ffccff',S);
    p(ctx,13,9,'#ffccff',S); p(ctx,13,10,'#ffccff',S);
  },
};

export const PHONK_CAT = {
  animation: 'pulse', fps: 0.8, frameCount: 2,
  description: "Dark, slow, and menacing in the best way. The cowboy hat is optional but the attitude is not.",
  tags: ['🌑', '🐎', '🔊'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#333344', dark:'#222233', eyes:'#ff4400', nose:'#882200', inner:'#445566' }, null);
    // cowboy hat
    for (let c=2;c<=12;c++) p(ctx,c,2,'#222222',S); // brim
    for (let c=4;c<=10;c++) p(ctx,c,1,'#222222',S); // crown
    // glow around eyes on frame 1
    if (frame===1) {
      p(ctx,3,5,'#ff4400',S); p(ctx,6,5,'#ff4400',S);
      p(ctx,8,5,'#ff4400',S); p(ctx,11,5,'#ff4400',S);
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
    drawBaseCat(ctx, S, { body:'#ff99cc', dark:'#ee77aa', eyes:'#222233', nose:'#ff4477', inner:'#ffddee' }, frame===1?'half':null);
    // star blush
    p(ctx,2,6,'#ff4477',S); p(ctx,12,6,'#ff4477',S);
    // lollipop in left paw
    p(ctx,2,11,'#cc6688',S); p(ctx,2,12,'#cc6688',S); // stick
    p(ctx,1,10,'#ff2288',S); p(ctx,2,10,'#ff2288',S); // candy
  },
};

export const REGGAE_CAT = {
  animation: 'sway', fps: 0.5, frameCount: 2,
  description: "No rush, no worries, just good vibrations on a warm afternoon. The hammock called and you wisely said yes.",
  tags: ['🌊', '🌿', '☀️'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#88aa88', dark:'#668866', eyes:'#222233', nose:'#66aa66', inner:'#aaccaa' }, frame===1?'closed':'half');
    // beanie stripes
    for (let c=3;c<=6;c++) p(ctx,c,2,'#ffdd00',S);
    for (let c=7;c<=9;c++) p(ctx,c,2,'#00aa44',S);
    for (let c=10;c<=11;c++) p(ctx,c,2,'#cc2200',S);
    p(ctx,7,1,'#ffdd00',S); // pom-pom
  },
};

export const COUNTRY_CAT = {
  animation: 'bob', fps: 1, frameCount: 2,
  description: "Dirt roads, open skies, and a song that sounds like home. Honest music for honest feelings.",
  tags: ['🤠', '🌾', '🎸'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx, S, { body:'#ddbb88', dark:'#bb9966', eyes:'#443322', nose:'#cc8855', inner:'#eeccaa' }, null);
    // cowboy hat brown
    for (let c=2;c<=12;c++) p(ctx,c,2,'#8B5E3C',S); // brim
    for (let c=4;c<=10;c++) p(ctx,c,1,'#6B4423',S); // crown
    // freckles
    p(ctx,5,6,'#cc8855',S); p(ctx,8,6,'#cc8855',S);
    // tail wag: extra tail tip on frame 1
    if (frame===1) p(ctx,13,13,'#ddbb88',S);
  },
};

export const AFROBEATS_CAT = {
  animation: 'bob', fps: 1.5, frameCount: 2,
  description: "Joy in motion, rhythm in every step, color in every sound. This music makes your body move before your brain agrees.",
  tags: ['🥁', '🌍', '🎉'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    const ro = frame===1?-1:0;
    drawBaseCat(ctx, S, { body:'#ddaa44', dark:'#bb8822', eyes:'#222233', nose:'#cc6633', inner:'#eecc88' }, null);
    // wide joyful eyes
    p(ctx,3,5+ro,'#222233',S); p(ctx,4,5+ro,'#222233',S); p(ctx,5,5+ro,'#222233',S);
    p(ctx,9,5+ro,'#222233',S); p(ctx,10,5+ro,'#222233',S); p(ctx,11,5+ro,'#222233',S);
    // colorful scarf
    const scarfC = ['#ff6633','#4488ff','#22cc44','#ff6633','#4488ff','#22cc44','#ff6633','#4488ff','#22cc44'];
    for (let i=0;i<9;i++) p(ctx,3+i,8+ro,scarfC[i],S);
  },
};

export const EXPERIMENTAL_CAT = {
  animation: 'jitter', fps: 3, frameCount: 2,
  description: "Genre is a suggestion and rules are for other people. If it sounds like nothing you've heard, that's the whole point.",
  tags: ['🌀', '🔬', '🎲'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    // split body: left warm, right cool
    ctx.save();
    ctx.beginPath(); ctx.rect(0,0,7*BS*S,16*BS*S); ctx.clip();
    drawBaseCat(ctx,S,{body:'#ff6644',dark:'#dd4422',eyes:'#222233',nose:'#ff2200',inner:'#ff9988'},null);
    ctx.restore();
    ctx.save();
    ctx.beginPath(); ctx.rect(7*BS*S,0,9*BS*S,16*BS*S); ctx.clip();
    drawBaseCat(ctx,S,{body:'#4466ff',dark:'#2244cc',eyes:'#222233',nose:'#2200ff',inner:'#aabbff'},null);
    ctx.restore();
    // asymmetric eyes (swap on frame 1)
    if (frame===0) {
      p(ctx,4,5,'#ffff00',S); // L small (1 block)
      p(ctx,9,4,'#ff00ff',S); p(ctx,10,4,'#ff00ff',S); // R big (2×2)
      p(ctx,9,5,'#ff00ff',S); p(ctx,10,5,'#ff00ff',S);
    } else {
      p(ctx,4,4,'#ffff00',S); p(ctx,5,4,'#ffff00',S); // L big (2×2)
      p(ctx,4,5,'#ffff00',S); p(ctx,5,5,'#ffff00',S);
      p(ctx,10,5,'#ff00ff',S); // R small (1 block)
    }
  },
};

export const EDM_CAT = {
  animation: 'pulse', fps: 1, frameCount: 2,
  description: "Eyes closed, bass drop incoming, the whole crowd becomes one thing. For a moment, nothing else exists.",
  tags: ['🎛️', '🔵', '🌊'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    // glow aura (drawn before body so body sits on top)
    const gs = frame===1?2:1;
    ctx.fillStyle = 'rgba(0,180,255,0.18)';
    ctx.fillRect((3-gs)*BS*S,(3-gs)*BS*S,(10+gs*2)*BS*S,(11+gs*2)*BS*S);
    drawBaseCat(ctx,S,{body:'#4488ff',dark:'#2266cc',eyes:'#00ccff',nose:'#0066ff',inner:'#aaccff'},'closed');
    // glow stick in right paw
    p(ctx,11,12,'#44ffcc',S);
    p(ctx,11,13,'#aaaaaa',S);
  },
};

export const DEFAULT_SLEEPER = {
  animation: 'float', fps: 0, frameCount: 1,
  description: "Nothing is playing right now. Connect to Spotify and let the music choose your vibe.",
  tags: ['😴', '🎵', '✨'],
  draw(ctx, frame, size) {
    const S = size / 256;
    ctx.imageSmoothingEnabled = false;
    drawBaseCat(ctx,S,{body:'#888899',dark:'#666677',eyes:'#444455',nose:'#998899',inner:'#aaaaaa'},'closed');
    ctx.fillStyle = 'rgba(200,200,220,0.75)';
    ctx.font = `bold ${Math.round(20*S)}px monospace`;
    ctx.fillText('z', 13*BS*S, 6*BS*S);
    ctx.font = `bold ${Math.round(14*S)}px monospace`;
    ctx.fillText('z', 14*BS*S, 4*BS*S);
    ctx.font = `bold ${Math.round(10*S)}px monospace`;
    ctx.fillText('z', 15*BS*S, 2*BS*S);
  },
};

// ─── Theme → character map ────────────────────────────────────────────────────
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
