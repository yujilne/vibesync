// Canvas draw-function characters — draw(ctx, frame, size)
// size is always 256; S = size/256 scales all coords

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y);
  ctx.arcTo(x+w, y, x+w, y+r, r);
  ctx.lineTo(x+w, y+h-r);
  ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
  ctx.lineTo(x+r, y+h);
  ctx.arcTo(x, y+h, x, y+h-r, r);
  ctx.lineTo(x, y+r);
  ctx.arcTo(x, y, x+r, y, r);
  ctx.closePath();
}

// ── 1. LOFI CAT ──────────────────────────────────────────────
export const LOFI_CAT = {
  animation: 'bob', fps: 0.8, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Body
    ctx.fillStyle = '#9999bb';
    rr(ctx, 78*S,154*S,100*S,82*S,16*S); ctx.fill();
    // Head
    ctx.fillStyle = '#bbbbdd';
    ctx.beginPath(); ctx.arc(128*S,108*S,68*S,0,Math.PI*2); ctx.fill();
    // Ears
    ctx.fillStyle = '#9999bb';
    ctx.beginPath(); ctx.moveTo(74*S,60*S); ctx.lineTo(55*S,18*S); ctx.lineTo(112*S,56*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(182*S,60*S); ctx.lineTo(201*S,18*S); ctx.lineTo(144*S,56*S); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#dd88aa';
    ctx.beginPath(); ctx.moveTo(78*S,58*S); ctx.lineTo(65*S,28*S); ctx.lineTo(108*S,57*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(178*S,58*S); ctx.lineTo(191*S,28*S); ctx.lineTo(148*S,57*S); ctx.closePath(); ctx.fill();
    // Headphone band
    ctx.strokeStyle = '#5522aa'; ctx.lineWidth = 10*S;
    ctx.beginPath(); ctx.arc(128*S,82*S,62*S,Math.PI,0,true); ctx.stroke();
    ctx.fillStyle = '#5522aa';
    ctx.beginPath(); ctx.arc(66*S,82*S,16*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(190*S,82*S,16*S,0,Math.PI*2); ctx.fill();
    // Eyes
    ctx.fillStyle = '#334466';
    ctx.beginPath(); ctx.arc(105*S,112*S,12*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(151*S,112*S,12*S,0,Math.PI*2); ctx.fill();
    if (frame === 1) {
      ctx.fillStyle = '#bbbbdd';
      ctx.beginPath(); ctx.arc(105*S,112*S,12*S,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(151*S,112*S,12*S,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = '#334466'; ctx.lineWidth = 3*S; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(93*S,112*S); ctx.lineTo(117*S,112*S); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(139*S,112*S); ctx.lineTo(163*S,112*S); ctx.stroke();
    }
    // Nose + whiskers
    ctx.fillStyle = '#dd88aa';
    ctx.beginPath(); ctx.moveTo(128*S,122*S); ctx.lineTo(121*S,131*S); ctx.lineTo(135*S,131*S); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#8888aa'; ctx.lineWidth = 1.5*S; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(94*S,127*S); ctx.lineTo(120*S,129*S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(94*S,134*S); ctx.lineTo(120*S,133*S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(162*S,127*S); ctx.lineTo(136*S,129*S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(162*S,134*S); ctx.lineTo(136*S,133*S); ctx.stroke();
    // Paws
    ctx.fillStyle = '#9999bb';
    ctx.beginPath(); ctx.ellipse(90*S,232*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(166*S,232*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 2. CYBERPUNK ROBOT ───────────────────────────────────────
export const CYBERPUNK_ROBOT = {
  animation: null, fps: 4, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Shoulders
    ctx.fillStyle = '#334466';
    ctx.beginPath(); ctx.ellipse(70*S,176*S,36*S,22*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(186*S,176*S,36*S,22*S,0,0,Math.PI*2); ctx.fill();
    // Body
    ctx.fillStyle = '#445577';
    rr(ctx, 84*S,154*S,88*S,86*S,12*S); ctx.fill();
    // Chest panel
    ctx.fillStyle = '#00ffff';
    rr(ctx, 100*S,168*S,56*S,32*S,6*S); ctx.fill();
    ctx.fillStyle = '#007799';
    ctx.fillRect(100*S,176*S,56*S,4*S);
    ctx.fillRect(100*S,184*S,56*S,4*S);
    // Head
    ctx.fillStyle = '#445577';
    rr(ctx, 72*S,58*S,112*S,98*S,14*S); ctx.fill();
    ctx.fillStyle = '#334466';
    rr(ctx, 60*S,50*S,136*S,12*S,6*S); ctx.fill();
    // Visor
    const visorColor = frame === 0 ? '#00ffff' : '#00bbcc';
    ctx.fillStyle = visorColor;
    rr(ctx, 84*S,82*S,88*S,36*S,8*S); ctx.fill();
    if (frame === 1) {
      ctx.fillStyle = '#007799';
      ctx.fillRect(84*S,90*S,88*S,5*S);
      ctx.fillRect(84*S,103*S,88*S,5*S);
    }
    // Eye dots inside visor
    ctx.fillStyle = '#ff0044';
    ctx.beginPath(); ctx.arc(106*S,100*S,8*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(150*S,100*S,8*S,0,Math.PI*2); ctx.fill();
    // Antenna
    ctx.strokeStyle = '#aaccff'; ctx.lineWidth = 4*S;
    ctx.beginPath(); ctx.moveTo(128*S,58*S); ctx.lineTo(128*S,24*S); ctx.stroke();
    ctx.fillStyle = '#aaccff';
    ctx.beginPath(); ctx.arc(128*S,20*S,8*S,0,Math.PI*2); ctx.fill();
    // Panel lines on body
    ctx.strokeStyle = '#00ffff'; ctx.lineWidth = 1.5*S;
    ctx.beginPath(); ctx.moveTo(90*S,170*S); ctx.lineTo(90*S,230*S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(166*S,170*S); ctx.lineTo(166*S,230*S); ctx.stroke();
    // Feet
    ctx.fillStyle = '#334466';
    ctx.beginPath(); ctx.ellipse(100*S,240*S,22*S,10*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(156*S,240*S,22*S,10*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 3. COTTAGECORE BUNNY ─────────────────────────────────────
export const COTTAGECORE_BUNNY = {
  animation: 'float', fps: 1, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Body
    ctx.fillStyle = '#e8e0d0';
    rr(ctx, 80*S,160*S,96*S,78*S,18*S); ctx.fill();
    // Left ear (tall)
    ctx.fillStyle = '#e8e0d0';
    ctx.beginPath(); ctx.ellipse(100*S,52*S,18*S,62*S,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffaacc';
    ctx.beginPath(); ctx.ellipse(100*S,54*S,10*S,50*S,0,0,Math.PI*2); ctx.fill();
    // Right ear — frame 1: droops slightly
    const rEarTilt = frame === 1 ? 0.22 : 0;
    ctx.fillStyle = '#e8e0d0';
    ctx.beginPath(); ctx.ellipse(156*S,52*S,18*S,62*S,rEarTilt,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffaacc';
    ctx.beginPath(); ctx.ellipse(156*S,54*S,10*S,50*S,rEarTilt,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#f0ede0';
    ctx.beginPath(); ctx.arc(128*S,118*S,66*S,0,Math.PI*2); ctx.fill();
    // Flower crown
    const flowerColors = ['#ff6688','#ffcc44','#ff88aa','#88cc44','#ffaaee'];
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = flowerColors[i];
      ctx.beginPath(); ctx.arc((88+i*18)*S,72*S,9*S,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = '#ffff88';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.arc((88+i*18)*S,72*S,4*S,0,Math.PI*2); ctx.fill();
    }
    // Rosy cheeks
    ctx.fillStyle = 'rgba(255,150,150,0.3)';
    ctx.beginPath(); ctx.ellipse(96*S,128*S,20*S,12*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(160*S,128*S,20*S,12*S,0,0,Math.PI*2); ctx.fill();
    // Eyes
    ctx.fillStyle = '#332211';
    ctx.beginPath(); ctx.arc(108*S,116*S,9*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(148*S,116*S,9*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(111*S,113*S,3*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(151*S,113*S,3*S,0,Math.PI*2); ctx.fill();
    // Nose + smile
    ctx.fillStyle = '#ff88aa';
    ctx.beginPath(); ctx.arc(128*S,130*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#553322'; ctx.lineWidth = 2.5*S; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(128*S,130*S,14*S,0.1,Math.PI-0.1); ctx.stroke();
    // Paws
    ctx.fillStyle = '#e8e0d0';
    ctx.beginPath(); ctx.ellipse(88*S,234*S,20*S,11*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(168*S,234*S,20*S,11*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 4. DARK ACADEMIA OWL ─────────────────────────────────────
export const DARK_ACADEMIA_OWL = {
  animation: 'float', fps: 0.5, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Body (feathered)
    ctx.fillStyle = '#4a2a10';
    ctx.beginPath(); ctx.ellipse(128*S,190*S,62*S,58*S,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#7a5a35';
    ctx.beginPath(); ctx.ellipse(128*S,182*S,42*S,32*S,0,0,Math.PI*2); ctx.fill();
    // Wings
    ctx.fillStyle = '#3a1e08';
    ctx.beginPath();
    ctx.moveTo(66*S,160*S); ctx.bezierCurveTo(30*S,140*S,20*S,200*S,66*S,220*S);
    ctx.bezierCurveTo(80*S,200*S,80*S,170*S,66*S,160*S); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(190*S,160*S); ctx.bezierCurveTo(226*S,140*S,236*S,200*S,190*S,220*S);
    ctx.bezierCurveTo(176*S,200*S,176*S,170*S,190*S,160*S); ctx.fill();
    // Head
    ctx.fillStyle = '#6a4020';
    ctx.beginPath(); ctx.arc(128*S,108*S,70*S,0,Math.PI*2); ctx.fill();
    // Ear tufts
    ctx.fillStyle = '#4a2a10';
    ctx.beginPath(); ctx.moveTo(98*S,52*S); ctx.lineTo(88*S,20*S); ctx.lineTo(116*S,46*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(158*S,52*S); ctx.lineTo(168*S,20*S); ctx.lineTo(140*S,46*S); ctx.closePath(); ctx.fill();
    // Large eyes (owl)
    ctx.fillStyle = '#f5f0e8';
    ctx.beginPath(); ctx.arc(102*S,108*S,26*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(154*S,108*S,26*S,0,Math.PI*2); ctx.fill();
    // Pupils
    if (frame === 0) {
      ctx.fillStyle = '#1a0800';
      ctx.beginPath(); ctx.arc(102*S,108*S,16*S,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(154*S,108*S,16*S,0,Math.PI*2); ctx.fill();
    } else {
      // Sleepy — half closed
      ctx.fillStyle = '#1a0800';
      ctx.beginPath(); ctx.arc(102*S,110*S,14*S,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(154*S,110*S,14*S,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#6a4020';
      ctx.fillRect(76*S,94*S,52*S,18*S);
      ctx.fillRect(128*S,94*S,52*S,18*S);
    }
    // Eye shine dots
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(108*S,102*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(160*S,102*S,5*S,0,Math.PI*2); ctx.fill();
    // Round glasses
    ctx.strokeStyle = '#d4a017'; ctx.lineWidth = 3*S;
    ctx.beginPath(); ctx.arc(102*S,108*S,28*S,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(154*S,108*S,28*S,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(130*S,108*S); ctx.lineTo(126*S,108*S); ctx.stroke();
    // Beak
    ctx.fillStyle = '#c8a020';
    ctx.beginPath(); ctx.moveTo(118*S,128*S); ctx.lineTo(128*S,148*S); ctx.lineTo(138*S,128*S); ctx.closePath(); ctx.fill();
    // Candle (held below)
    ctx.fillStyle = '#c8a020';
    rr(ctx, 122*S,220*S,12*S,28*S,3*S); ctx.fill();
    ctx.fillStyle = '#ffcc44';
    ctx.beginPath(); ctx.ellipse(128*S,220*S,5*S,9*S,-0.15,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ff8833';
    ctx.beginPath(); ctx.ellipse(128*S,218*S,3*S,6*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 5. VAPORWAVE GIRL ────────────────────────────────────────
export const VAPORWAVE_GIRL = {
  animation: null, fps: 4, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Big hair wings
    ctx.fillStyle = '#ff71ce';
    ctx.beginPath();
    ctx.moveTo(70*S,50*S); ctx.bezierCurveTo(20*S,80*S,10*S,160*S,60*S,170*S);
    ctx.bezierCurveTo(76*S,140*S,82*S,100*S,88*S,80*S); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(186*S,50*S); ctx.bezierCurveTo(236*S,80*S,246*S,160*S,196*S,170*S);
    ctx.bezierCurveTo(180*S,140*S,174*S,100*S,168*S,80*S); ctx.closePath(); ctx.fill();
    // Neck + body
    ctx.fillStyle = '#f5dbc8';
    ctx.beginPath(); ctx.ellipse(128*S,200*S,44*S,46*S,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#cc44aa';
    rr(ctx, 86*S,190*S,84*S,56*S,10*S); ctx.fill();
    // Face
    ctx.fillStyle = '#f5dbc8';
    ctx.beginPath(); ctx.arc(128*S,110*S,62*S,0,Math.PI*2); ctx.fill();
    // Hair top
    ctx.fillStyle = '#ff71ce';
    ctx.beginPath(); ctx.arc(128*S,80*S,64*S,Math.PI,0); ctx.fill();
    ctx.fillStyle = '#b967ff';
    ctx.beginPath(); ctx.arc(100*S,76*S,24*S,Math.PI,0); ctx.fill();
    ctx.beginPath(); ctx.arc(156*S,76*S,24*S,Math.PI,0); ctx.fill();
    // Retro shades (glitch offset on frame 1)
    const gOff = frame === 1 ? 4*S : 0;
    ctx.fillStyle = '#01cdfe';
    rr(ctx, (76*S)+gOff,102*S,44*S,22*S,4*S); ctx.fill();
    rr(ctx, (136*S)+gOff,102*S,44*S,22*S,4*S); ctx.fill();
    ctx.fillStyle = '#0077aa';
    ctx.fillRect((118*S)+gOff,110*S,20*S,6*S);
    // Star eyes (visible inside shades as glints)
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc((98*S)+gOff,113*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc((158*S)+gOff,113*S,5*S,0,Math.PI*2); ctx.fill();
    // Rosy cheeks
    ctx.fillStyle = 'rgba(255,120,180,0.25)';
    ctx.beginPath(); ctx.ellipse(96*S,130*S,18*S,10*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(160*S,130*S,18*S,10*S,0,0,Math.PI*2); ctx.fill();
    // Small mouth
    ctx.strokeStyle = '#cc6688'; ctx.lineWidth = 2.5*S; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(128*S,138*S,10*S,0.2,Math.PI-0.2); ctx.stroke();
    // Star accessories
    ctx.fillStyle = '#ffe4fb';
    ctx.beginPath(); ctx.arc(52*S,110*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(204*S,110*S,5*S,0,Math.PI*2); ctx.fill();
  },
};

// ── 6. HYPE FROG ─────────────────────────────────────────────
export const HYPE_FROG = {
  animation: 'bounce-hyper', fps: 3, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Body
    ctx.fillStyle = '#228833';
    rr(ctx, 76*S,160*S,104*S,76*S,20*S); ctx.fill();
    // Arms up
    ctx.strokeStyle = '#33cc44'; ctx.lineWidth = 18*S; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(82*S,176*S); ctx.lineTo(42*S,134*S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(174*S,176*S); ctx.lineTo(214*S,134*S); ctx.stroke();
    ctx.fillStyle = '#44cc55';
    ctx.beginPath(); ctx.arc(38*S,130*S,16*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(218*S,130*S,16*S,0,Math.PI*2); ctx.fill();
    // Lightning bolt on chest
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.moveTo(122*S,168*S); ctx.lineTo(112*S,192*S); ctx.lineTo(126*S,192*S);
    ctx.lineTo(116*S,218*S); ctx.lineTo(138*S,188*S); ctx.lineTo(124*S,188*S);
    ctx.lineTo(134*S,168*S); ctx.closePath(); ctx.fill();
    // Wide head
    ctx.fillStyle = '#33cc44';
    ctx.beginPath(); ctx.ellipse(128*S,112*S,82*S,62*S,0,0,Math.PI*2); ctx.fill();
    // Eye bumps on top
    ctx.fillStyle = '#44dd55';
    ctx.beginPath(); ctx.arc(90*S,82*S,22*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(166*S,82*S,22*S,0,Math.PI*2); ctx.fill();
    // Eyes
    ctx.fillStyle = '#111111';
    ctx.beginPath(); ctx.arc(90*S,80*S,14*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(166*S,80*S,14*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(95*S,75*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(171*S,75*S,5*S,0,Math.PI*2); ctx.fill();
    // Big grin
    ctx.fillStyle = '#ff6688';
    const mouthW = frame === 1 ? 70*S : 56*S;
    ctx.beginPath(); ctx.ellipse(128*S,132*S,mouthW,18*S,0,0,Math.PI); ctx.fill();
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect((100+i*18)*S,130*S,12*S,14*S);
    }
    // Feet
    ctx.fillStyle = '#228833';
    ctx.beginPath(); ctx.ellipse(96*S,234*S,28*S,14*S,-0.3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(160*S,234*S,28*S,14*S,0.3,0,Math.PI*2); ctx.fill();
  },
};

// ── 7. METAL SKULL ───────────────────────────────────────────
export const METAL_SKULL = {
  animation: null, fps: 4, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Horns
    ctx.fillStyle = '#1a0000';
    ctx.beginPath(); ctx.moveTo(82*S,54*S); ctx.lineTo(62*S,8*S); ctx.lineTo(108*S,42*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(174*S,54*S); ctx.lineTo(194*S,8*S); ctx.lineTo(148*S,42*S); ctx.closePath(); ctx.fill();
    // Skull cranium
    ctx.fillStyle = '#d8cfc0';
    ctx.beginPath(); ctx.arc(128*S,100*S,78*S,0,Math.PI*2); ctx.fill();
    // Cheekbones
    ctx.beginPath(); ctx.ellipse(128*S,148*S,64*S,38*S,0,0,Math.PI*2); ctx.fill();
    // Eye sockets
    ctx.fillStyle = '#111111';
    ctx.beginPath(); ctx.ellipse(98*S,104*S,26*S,28*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(158*S,104*S,26*S,28*S,0,0,Math.PI*2); ctx.fill();
    // Red glow in sockets
    ctx.fillStyle = '#440000';
    ctx.beginPath(); ctx.arc(98*S,104*S,14*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(158*S,104*S,14*S,0,Math.PI*2); ctx.fill();
    // Nasal cavity
    ctx.fillStyle = '#111111';
    ctx.beginPath(); ctx.moveTo(128*S,136*S); ctx.lineTo(118*S,154*S); ctx.lineTo(138*S,154*S); ctx.closePath(); ctx.fill();
    // Teeth (bone color rects with black gaps)
    ctx.fillStyle = '#d8cfc0';
    for (let i = 0; i < 6; i++) ctx.fillRect((96+i*14)*S,160*S,10*S,20*S);
    ctx.fillStyle = '#111111';
    for (let i = 0; i < 5; i++) ctx.fillRect((106+i*14)*S,160*S,4*S,20*S);
    // Flames
    const c1 = frame === 0 ? '#ff8800' : '#ff2200';
    const c2 = frame === 0 ? '#ffcc00' : '#ff6600';
    ctx.fillStyle = c1;
    ctx.beginPath();
    ctx.moveTo(84*S,250*S);
    ctx.quadraticCurveTo(96*S,210*S,110*S,228*S);
    ctx.quadraticCurveTo(128*S,202*S,146*S,228*S);
    ctx.quadraticCurveTo(160*S,210*S,172*S,250*S);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = c2;
    ctx.beginPath();
    ctx.moveTo(100*S,250*S);
    ctx.quadraticCurveTo(112*S,222*S,120*S,236*S);
    ctx.quadraticCurveTo(128*S,218*S,136*S,236*S);
    ctx.quadraticCurveTo(144*S,222*S,156*S,250*S);
    ctx.closePath(); ctx.fill();
  },
};

// ── 8. CLASSICAL CAT ─────────────────────────────────────────
export const CLASSICAL_CAT = {
  animation: 'sway', fps: 0.5, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    const tilt = frame === 1 ? 0.08 : 0;
    ctx.save();
    ctx.translate(128*S, 140*S);
    ctx.rotate(tilt);
    ctx.translate(-128*S, -140*S);
    // Powdered wig (large blob)
    ctx.fillStyle = '#f8f4ec';
    ctx.beginPath(); ctx.arc(128*S,60*S,68*S,0,Math.PI*2); ctx.fill();
    // Wig curls on sides
    ctx.beginPath(); ctx.arc(68*S,76*S,30*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(188*S,76*S,30*S,0,Math.PI*2); ctx.fill();
    // Wig shading
    ctx.fillStyle = '#e0dcc8';
    ctx.beginPath(); ctx.arc(104*S,52*S,20*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(152*S,52*S,20*S,0,Math.PI*2); ctx.fill();
    // Cat ears peeking through wig
    ctx.fillStyle = '#aaaacc';
    ctx.beginPath(); ctx.moveTo(96*S,38*S); ctx.lineTo(80*S,8*S); ctx.lineTo(116*S,32*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(160*S,38*S); ctx.lineTo(176*S,8*S); ctx.lineTo(140*S,32*S); ctx.closePath(); ctx.fill();
    // Cat face
    ctx.fillStyle = '#ccccee';
    ctx.beginPath(); ctx.arc(128*S,116*S,62*S,0,Math.PI*2); ctx.fill();
    // Ruff collar (fancy bumps)
    ctx.fillStyle = '#f8f4ec';
    for (let i = 0; i < 7; i++) {
      ctx.beginPath(); ctx.arc((78+i*17)*S,172*S,14*S,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = '#e0dcc8';
    for (let i = 0; i < 6; i++) {
      ctx.beginPath(); ctx.arc((86+i*17)*S,178*S,10*S,0,Math.PI*2); ctx.fill();
    }
    // Eyes (elegant)
    ctx.fillStyle = '#334455';
    ctx.beginPath(); ctx.arc(106*S,114*S,10*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(150*S,114*S,10*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(109*S,111*S,3*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(153*S,111*S,3*S,0,Math.PI*2); ctx.fill();
    // Nose + small smile
    ctx.fillStyle = '#ff88aa';
    ctx.beginPath(); ctx.arc(128*S,126*S,4*S,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#334455'; ctx.lineWidth = 2*S; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(128*S,126*S,10*S,0.2,Math.PI-0.2); ctx.stroke();
    // Gold accent bow
    ctx.fillStyle = '#c8a020';
    ctx.beginPath(); ctx.moveTo(116*S,190*S); ctx.lineTo(128*S,198*S); ctx.lineTo(140*S,190*S); ctx.lineTo(128*S,182*S); ctx.closePath(); ctx.fill();
    ctx.restore();
  },
};

// ── 9. RNB BEAR ──────────────────────────────────────────────
export const RNB_BEAR = {
  animation: 'sway', fps: 2, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Body
    ctx.fillStyle = '#885533';
    rr(ctx, 80*S,156*S,96*S,80*S,18*S); ctx.fill();
    // Arms
    ctx.fillStyle = '#885533';
    ctx.beginPath(); ctx.ellipse(64*S,180*S,22*S,36*S,-0.3,0,Math.PI*2); ctx.fill();
    // Mic arm (right)
    const micY = frame === 1 ? 140*S : 162*S;
    ctx.beginPath(); ctx.ellipse(192*S,(frame===1?162:176)*S,22*S,36*S,0.3,0,Math.PI*2); ctx.fill();
    // Microphone
    ctx.fillStyle = '#aaaaaa';
    rr(ctx, 200*S,micY-16*S,14*S,28*S,6*S); ctx.fill();
    ctx.fillStyle = '#888888';
    ctx.beginPath(); ctx.arc(207*S,micY-20*S,12*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#444444';
    ctx.beginPath(); ctx.arc(207*S,micY-20*S,8*S,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#9a6644';
    ctx.beginPath(); ctx.arc(128*S,106*S,70*S,0,Math.PI*2); ctx.fill();
    // Ears
    ctx.fillStyle = '#885533';
    ctx.beginPath(); ctx.arc(74*S,58*S,26*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(182*S,58*S,26*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#cc8866';
    ctx.beginPath(); ctx.arc(74*S,58*S,16*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(182*S,58*S,16*S,0,Math.PI*2); ctx.fill();
    // Muzzle
    ctx.fillStyle = '#bb8866';
    ctx.beginPath(); ctx.ellipse(128*S,128*S,32*S,24*S,0,0,Math.PI*2); ctx.fill();
    // Cool shades
    ctx.fillStyle = '#111111';
    rr(ctx, 86*S,102*S,42*S,20*S,5*S); ctx.fill();
    rr(ctx, 134*S,102*S,42*S,20*S,5*S); ctx.fill();
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2.5*S;
    ctx.beginPath(); ctx.moveTo(128*S,112*S); ctx.lineTo(134*S,112*S); ctx.stroke();
    // Nose
    ctx.fillStyle = '#221100';
    ctx.beginPath(); ctx.ellipse(128*S,124*S,10*S,7*S,0,0,Math.PI*2); ctx.fill();
    // Sparkle dots
    ctx.fillStyle = '#ffdd88';
    ctx.beginPath(); ctx.arc(52*S,140*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(58*S,120*S,4*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(42*S,160*S,3*S,0,Math.PI*2); ctx.fill();
    // Feet
    ctx.fillStyle = '#885533';
    ctx.beginPath(); ctx.ellipse(96*S,234*S,24*S,12*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(160*S,234*S,24*S,12*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 10. INDIE DOG ────────────────────────────────────────────
export const INDIE_DOG = {
  animation: 'float', fps: 2, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Guitar body
    ctx.fillStyle = '#885533';
    ctx.beginPath(); ctx.ellipse(200*S,176*S,28*S,36*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(200*S,210*S,22*S,28*S,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#cc8844';
    ctx.beginPath(); ctx.ellipse(200*S,176*S,18*S,26*S,0,0,Math.PI*2); ctx.fill();
    // Guitar neck
    ctx.fillStyle = '#664422';
    ctx.fillRect(194*S,110*S,12*S,66*S);
    // Guitar strings
    ctx.strokeStyle = '#aaaaaa'; ctx.lineWidth = 1*S;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo((196+i*4)*S,110*S); ctx.lineTo((196+i*4)*S,176*S); ctx.stroke();
    }
    // Body
    ctx.fillStyle = '#cc9944';
    rr(ctx, 76*S,158*S,102*S,78*S,18*S); ctx.fill();
    // Strumming arm
    const armAng = frame === 1 ? -0.3 : 0.1;
    ctx.save();
    ctx.translate(178*S, 170*S);
    ctx.rotate(armAng);
    ctx.fillStyle = '#cc9944';
    ctx.beginPath(); ctx.ellipse(0,0,14*S,38*S,0,0,Math.PI*2); ctx.fill();
    ctx.restore();
    // Left arm
    ctx.fillStyle = '#cc9944';
    ctx.beginPath(); ctx.ellipse(62*S,188*S,18*S,34*S,-0.2,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#ddaa55';
    ctx.beginPath(); ctx.arc(128*S,108*S,68*S,0,Math.PI*2); ctx.fill();
    // Floppy ears
    ctx.fillStyle = '#cc9944';
    ctx.beginPath();
    ctx.moveTo(68*S,80*S);
    ctx.bezierCurveTo(40*S,90*S,28*S,150*S,56*S,168*S);
    ctx.bezierCurveTo(72*S,152*S,76*S,120*S,78*S,96*S);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(188*S,80*S);
    ctx.bezierCurveTo(216*S,90*S,228*S,150*S,200*S,168*S);
    ctx.bezierCurveTo(184*S,152*S,180*S,120*S,178*S,96*S);
    ctx.closePath(); ctx.fill();
    // Ear inner
    ctx.fillStyle = '#bb8833';
    ctx.beginPath();
    ctx.moveTo(70*S,86*S);
    ctx.bezierCurveTo(50*S,96*S,44*S,144*S,64*S,158*S);
    ctx.bezierCurveTo(72*S,144*S,74*S,118*S,76*S,100*S);
    ctx.closePath(); ctx.fill();
    // Messy fur on head
    ctx.fillStyle = '#cc9944';
    ctx.beginPath(); ctx.ellipse(108*S,52*S,16*S,24*S,-0.3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(128*S,46*S,14*S,22*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(148*S,52*S,16*S,24*S,0.3,0,Math.PI*2); ctx.fill();
    // Eyes
    ctx.fillStyle = '#332211';
    ctx.beginPath(); ctx.arc(106*S,110*S,10*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(150*S,110*S,10*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(109*S,107*S,3*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(153*S,107*S,3*S,0,Math.PI*2); ctx.fill();
    // Nose + tongue
    ctx.fillStyle = '#442211';
    ctx.beginPath(); ctx.ellipse(128*S,124*S,10*S,7*S,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ff6688';
    ctx.beginPath(); ctx.ellipse(128*S,134*S,8*S,6*S,0,0,Math.PI); ctx.fill();
    // Feet
    ctx.fillStyle = '#cc9944';
    ctx.beginPath(); ctx.ellipse(94*S,234*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(148*S,234*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 11. LOFI JAZZ FOX ────────────────────────────────────────
export const LOFI_JAZZ_FOX = {
  animation: 'bob', fps: 0.5, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Body
    ctx.fillStyle = '#cc6622';
    rr(ctx, 80*S,158*S,96*S,78*S,16*S); ctx.fill();
    // Shirt detail
    ctx.fillStyle = '#994411';
    rr(ctx, 92*S,172*S,72*S,44*S,10*S); ctx.fill();
    ctx.fillStyle = '#cc6622';
    ctx.beginPath(); ctx.ellipse(128*S,172*S,18*S,28*S,0,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#ee8833';
    ctx.beginPath(); ctx.arc(128*S,106*S,70*S,0,Math.PI*2); ctx.fill();
    // Fox ears
    ctx.fillStyle = '#cc5511';
    ctx.beginPath(); ctx.moveTo(80*S,60*S); ctx.lineTo(62*S,12*S); ctx.lineTo(112*S,52*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(176*S,60*S); ctx.lineTo(194*S,12*S); ctx.lineTo(144*S,52*S); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ff9955';
    ctx.beginPath(); ctx.moveTo(83*S,58*S); ctx.lineTo(70*S,22*S); ctx.lineTo(109*S,53*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(173*S,58*S); ctx.lineTo(186*S,22*S); ctx.lineTo(147*S,53*S); ctx.closePath(); ctx.fill();
    // White muzzle
    ctx.fillStyle = '#f5e6d0';
    ctx.beginPath(); ctx.ellipse(128*S,126*S,28*S,24*S,0,0,Math.PI*2); ctx.fill();
    // Beret (side, slightly tilted)
    ctx.fillStyle = '#2244aa';
    ctx.save();
    ctx.translate(172*S,68*S); ctx.rotate(-0.4);
    ctx.beginPath(); ctx.ellipse(0,0,32*S,16*S,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1133aa';
    ctx.beginPath(); ctx.arc(10*S,-4*S,8*S,0,Math.PI*2); ctx.fill();
    ctx.restore();
    // Eyes
    ctx.fillStyle = '#221100';
    ctx.beginPath(); ctx.arc(104*S,108*S,10*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(148*S,108*S,10*S,0,Math.PI*2); ctx.fill();
    if (frame === 1) {
      // Closed while playing
      ctx.fillStyle = '#ee8833';
      ctx.beginPath(); ctx.arc(104*S,108*S,10*S,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(148*S,108*S,10*S,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = '#221100'; ctx.lineWidth = 3*S; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(93*S,108*S); ctx.lineTo(115*S,108*S); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(137*S,108*S); ctx.lineTo(159*S,108*S); ctx.stroke();
      // Puffed cheeks
      ctx.fillStyle = 'rgba(255,170,100,0.5)';
      ctx.beginPath(); ctx.arc(94*S,128*S,16*S,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(162*S,128*S,16*S,0,Math.PI*2); ctx.fill();
    }
    // Nose
    ctx.fillStyle = '#221100';
    ctx.beginPath(); ctx.ellipse(128*S,122*S,8*S,6*S,0,0,Math.PI*2); ctx.fill();
    // Trumpet (side)
    ctx.fillStyle = '#d4a843';
    ctx.save();
    ctx.translate(50*S, 136*S);
    // Bell
    ctx.beginPath(); ctx.ellipse(0,0,20*S,14*S,0,0,Math.PI*2); ctx.fill();
    // Tubing
    ctx.strokeStyle = '#d4a843'; ctx.lineWidth = 8*S;
    ctx.beginPath(); ctx.moveTo(20*S,0); ctx.lineTo(60*S,0); ctx.stroke();
    ctx.beginPath(); ctx.arc(60*S,-10*S,10*S,0.5*Math.PI,1.5*Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(60*S,-20*S); ctx.lineTo(80*S,-20*S); ctx.stroke();
    ctx.restore();
    // Paws
    ctx.fillStyle = '#cc6622';
    ctx.beginPath(); ctx.ellipse(90*S,232*S,20*S,11*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(166*S,232*S,20*S,11*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 12. KPOP PANDA ───────────────────────────────────────────
export const KPOP_PANDA = {
  animation: 'bob', fps: 3, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Body
    ctx.fillStyle = '#e8e8e8';
    rr(ctx, 80*S,158*S,96*S,78*S,16*S); ctx.fill();
    // Outfit (idol costume)
    ctx.fillStyle = '#cc44aa';
    rr(ctx, 86*S,168*S,84*S,58*S,12*S); ctx.fill();
    ctx.fillStyle = '#ff88dd';
    ctx.fillRect(114*S,168*S,28*S,58*S);
    // Lightstick arm
    const stickY = frame === 1 ? 110*S : 140*S;
    ctx.fillStyle = '#e8e8e8';
    ctx.beginPath(); ctx.ellipse(192*S,(frame===1?154:168)*S,16*S,34*S,0.25,0,Math.PI*2); ctx.fill();
    // Lightstick
    ctx.fillStyle = '#00ccff';
    rr(ctx, 200*S,stickY,10*S,32*S,4*S); ctx.fill();
    ctx.fillStyle = '#ffee00';
    ctx.beginPath(); ctx.arc(205*S,stickY-4*S,12*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#00ccff';
    ctx.beginPath(); ctx.arc(205*S,stickY-4*S,8*S,0,Math.PI*2); ctx.fill();
    // Left arm
    ctx.fillStyle = '#e8e8e8';
    ctx.beginPath(); ctx.ellipse(64*S,180*S,16*S,34*S,-0.25,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath(); ctx.arc(128*S,108*S,70*S,0,Math.PI*2); ctx.fill();
    // Panda ears
    ctx.fillStyle = '#111111';
    ctx.beginPath(); ctx.arc(74*S,56*S,26*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(182*S,56*S,26*S,0,Math.PI*2); ctx.fill();
    // Stylish bangs (pink hair block)
    ctx.fillStyle = '#ff88cc';
    ctx.beginPath();
    ctx.moveTo(62*S,84*S);
    ctx.bezierCurveTo(68*S,46*S,100*S,38*S,128*S,40*S);
    ctx.bezierCurveTo(156*S,38*S,188*S,46*S,192*S,88*S);
    ctx.bezierCurveTo(178*S,72*S,100*S,68*S,62*S,84*S);
    ctx.fill();
    // Panda eye patches
    ctx.fillStyle = '#111111';
    ctx.beginPath(); ctx.ellipse(100*S,110*S,24*S,22*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(156*S,110*S,24*S,22*S,0,0,Math.PI*2); ctx.fill();
    // Eyes
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath(); ctx.arc(100*S,110*S,12*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(156*S,110*S,12*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#111111';
    ctx.beginPath(); ctx.arc(100*S,110*S,7*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(156*S,110*S,7*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(103*S,107*S,3*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(159*S,107*S,3*S,0,Math.PI*2); ctx.fill();
    // Nose + mouth
    ctx.fillStyle = '#444444';
    ctx.beginPath(); ctx.ellipse(128*S,128*S,8*S,6*S,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#444444'; ctx.lineWidth = 2*S; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(128*S,130*S,10*S,0.2,Math.PI-0.2); ctx.stroke();
    // Feet
    ctx.fillStyle = '#e8e8e8';
    ctx.beginPath(); ctx.ellipse(96*S,234*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(160*S,234*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 13. DREAM BUTTERFLY ──────────────────────────────────────
export const DREAM_BUTTERFLY = {
  animation: 'float', fps: 2, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    const spread = frame === 0 ? 1 : 0.78;
    // Upper wings
    ctx.fillStyle = '#c9b1ff';
    ctx.beginPath();
    ctx.moveTo(128*S,106*S);
    ctx.bezierCurveTo((128-80*spread)*S,60*S,(128-120*spread)*S,10*S,(128-60*spread)*S,50*S);
    ctx.bezierCurveTo((128-20*spread)*S,80*S,128*S,90*S,128*S,106*S);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(128*S,106*S);
    ctx.bezierCurveTo((128+80*spread)*S,60*S,(128+120*spread)*S,10*S,(128+60*spread)*S,50*S);
    ctx.bezierCurveTo((128+20*spread)*S,80*S,128*S,90*S,128*S,106*S);
    ctx.fill();
    // Lower wings
    ctx.fillStyle = '#ffaadd';
    ctx.beginPath();
    ctx.moveTo(128*S,126*S);
    ctx.bezierCurveTo((128-70*spread)*S,150*S,(128-100*spread)*S,210*S,(128-40*spread)*S,200*S);
    ctx.bezierCurveTo((128-10*spread)*S,180*S,128*S,150*S,128*S,126*S);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(128*S,126*S);
    ctx.bezierCurveTo((128+70*spread)*S,150*S,(128+100*spread)*S,210*S,(128+40*spread)*S,200*S);
    ctx.bezierCurveTo((128+10*spread)*S,180*S,128*S,150*S,128*S,126*S);
    ctx.fill();
    // Wing patterns
    ctx.fillStyle = 'rgba(255,220,255,0.5)';
    ctx.beginPath(); ctx.arc((128-50*spread)*S,64*S,14*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc((128+50*spread)*S,64*S,14*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(255,200,240,0.4)';
    ctx.beginPath(); ctx.arc((128-40*spread)*S,170*S,10*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc((128+40*spread)*S,170*S,10*S,0,Math.PI*2); ctx.fill();
    // Body
    ctx.fillStyle = '#aa88ee';
    ctx.beginPath(); ctx.ellipse(128*S,118*S,14*S,40*S,0,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#ccbbff';
    ctx.beginPath(); ctx.arc(128*S,84*S,28*S,0,Math.PI*2); ctx.fill();
    // Antennae
    ctx.strokeStyle = '#9977ee'; ctx.lineWidth = 3*S;
    ctx.beginPath(); ctx.moveTo(116*S,62*S); ctx.bezierCurveTo(96*S,40*S,82*S,28*S,88*S,18*S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(140*S,62*S); ctx.bezierCurveTo(160*S,40*S,174*S,28*S,168*S,18*S); ctx.stroke();
    ctx.fillStyle = '#9977ee';
    ctx.beginPath(); ctx.arc(88*S,16*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(168*S,16*S,5*S,0,Math.PI*2); ctx.fill();
    // Eyes
    ctx.fillStyle = '#442266';
    ctx.beginPath(); ctx.arc(120*S,82*S,6*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(136*S,82*S,6*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(122*S,80*S,2*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(138*S,80*S,2*S,0,Math.PI*2); ctx.fill();
  },
};

// ── 14. PHONK WOLF ───────────────────────────────────────────
export const PHONK_WOLF = {
  animation: 'pulse', fps: 2, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    const eyeGlow = frame === 1 ? '#ff2200' : '#aa1100';
    // Cowboy hat brim
    ctx.fillStyle = '#222222';
    rr(ctx, 48*S,72*S,160*S,14*S,5*S); ctx.fill();
    // Cowboy hat crown
    ctx.fillStyle = '#333333';
    rr(ctx, 78*S,18*S,100*S,56*S,10*S); ctx.fill();
    // Hat band
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(78*S,58*S,100*S,8*S);
    // Body
    ctx.fillStyle = '#555555';
    rr(ctx, 80*S,158*S,96*S,78*S,16*S); ctx.fill();
    ctx.fillStyle = '#444444';
    rr(ctx, 92*S,170*S,72*S,52*S,10*S); ctx.fill();
    // Arms
    ctx.fillStyle = '#555555';
    ctx.beginPath(); ctx.ellipse(62*S,186*S,18*S,34*S,-0.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(194*S,186*S,18*S,34*S,0.2,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#666666';
    ctx.beginPath(); ctx.arc(128*S,112*S,68*S,0,Math.PI*2); ctx.fill();
    // Wolf ears (pointed)
    ctx.fillStyle = '#555555';
    ctx.beginPath(); ctx.moveTo(82*S,72*S); ctx.lineTo(66*S,32*S); ctx.lineTo(108*S,68*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(174*S,72*S); ctx.lineTo(190*S,32*S); ctx.lineTo(148*S,68*S); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#888888';
    ctx.beginPath(); ctx.moveTo(86*S,70*S); ctx.lineTo(74*S,40*S); ctx.lineTo(106*S,68*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(170*S,70*S); ctx.lineTo(182*S,40*S); ctx.lineTo(150*S,68*S); ctx.closePath(); ctx.fill();
    // Snout
    ctx.fillStyle = '#888888';
    ctx.beginPath(); ctx.ellipse(128*S,130*S,30*S,22*S,0,0,Math.PI*2); ctx.fill();
    // Glowing eyes
    if (frame === 1) {
      ctx.fillStyle = 'rgba(255,34,0,0.3)';
      ctx.beginPath(); ctx.arc(103*S,108*S,22*S,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(153*S,108*S,22*S,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = eyeGlow;
    ctx.beginPath(); ctx.arc(103*S,108*S,12*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(153*S,108*S,12*S,0,Math.PI*2); ctx.fill();
    // Slit pupils
    ctx.fillStyle = '#000000';
    ctx.fillRect(101*S,102*S,4*S,12*S);
    ctx.fillRect(151*S,102*S,4*S,12*S);
    // Nose + sharp teeth
    ctx.fillStyle = '#333333';
    ctx.beginPath(); ctx.ellipse(128*S,126*S,10*S,7*S,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.moveTo(114*S,136*S); ctx.lineTo(118*S,148*S); ctx.lineTo(122*S,136*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(134*S,136*S); ctx.lineTo(138*S,148*S); ctx.lineTo(142*S,136*S); ctx.closePath(); ctx.fill();
    // Clawed feet
    ctx.fillStyle = '#555555';
    ctx.beginPath(); ctx.ellipse(98*S,234*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(158*S,234*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 15. BUBBLEGUM UNICORN ────────────────────────────────────
export const BUBBLEGUM_UNICORN = {
  animation: 'bounce', fps: 3, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Lollipop stick
    ctx.strokeStyle = '#aaaaaa'; ctx.lineWidth = 5*S;
    ctx.beginPath(); ctx.moveTo(200*S,200*S); ctx.lineTo(200*S,140*S); ctx.stroke();
    // Lollipop candy
    ctx.fillStyle = '#ff44aa';
    ctx.beginPath(); ctx.arc(200*S,128*S,24*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(200*S,118*S,10*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ff88cc';
    ctx.beginPath(); ctx.arc(200*S,138*S,8*S,0,Math.PI*2); ctx.fill();
    // Body
    ctx.fillStyle = '#fff0ff';
    rr(ctx, 80*S,156*S,96*S,80*S,18*S); ctx.fill();
    // Rainbow body stripe
    const rainbowColors = ['#ff6688','#ffaa44','#ffee44','#88ee44','#44ccff','#cc88ff'];
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = rainbowColors[i];
      ctx.fillRect(80*S,(176+i*6)*S,96*S,6*S);
    }
    // Arms
    ctx.fillStyle = '#fff0ff';
    ctx.beginPath(); ctx.ellipse(66*S,182*S,16*S,32*S,-0.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(190*S,176*S,16*S,32*S,0.2,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#fff0ff';
    ctx.beginPath(); ctx.arc(128*S,108*S,68*S,0,Math.PI*2); ctx.fill();
    // Rainbow horn
    ctx.beginPath();
    const hColors = ['#ff6688','#ffaa44','#ffee44','#88ee44','#44ccff','#cc88ff'];
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = hColors[i];
      ctx.fillRect((118+i*2)*S,(38-i*4)*S,8*S,(62-i*4)*S);
    }
    ctx.fillStyle = '#ff6688';
    ctx.beginPath(); ctx.moveTo(118*S,38*S); ctx.lineTo(128*S,10*S); ctx.lineTo(138*S,38*S); ctx.closePath(); ctx.fill();
    // Pink mane
    ctx.fillStyle = '#ff88cc';
    ctx.beginPath(); ctx.arc(80*S,90*S,22*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(96*S,72*S,18*S,0,Math.PI*2); ctx.fill();
    // Eyes (big sparkle)
    ctx.fillStyle = '#442266';
    ctx.beginPath(); ctx.arc(108*S,114*S,13*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(152*S,114*S,13*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(112*S,110*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(156*S,110*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffaaee';
    ctx.beginPath(); ctx.arc(104*S,118*S,3*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(148*S,118*S,3*S,0,Math.PI*2); ctx.fill();
    // Nose (heart-ish)
    ctx.fillStyle = '#ff88cc';
    ctx.beginPath(); ctx.arc(123*S,128*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(133*S,128*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(118*S,128*S); ctx.lineTo(128*S,136*S); ctx.lineTo(138*S,128*S); ctx.closePath(); ctx.fill();
    // Sparkles (frame 1 only)
    if (frame === 1) {
      ctx.fillStyle = '#ffeeaa';
      const sp = [[50,80],[42,120],[220,90],[230,140],[60,160],[44,200]];
      sp.forEach(([x,y]) => {
        ctx.beginPath(); ctx.arc(x*S,y*S,4*S,0,Math.PI*2); ctx.fill();
        ctx.fillRect((x-1)*S,(y-6)*S,2*S,12*S);
        ctx.fillRect((x-6)*S,(y-1)*S,12*S,2*S);
      });
    }
    // Feet
    ctx.fillStyle = '#fff0ff';
    ctx.beginPath(); ctx.ellipse(94*S,234*S,20*S,11*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(162*S,234*S,20*S,11*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 16. REGGAE FROG ──────────────────────────────────────────
export const REGGAE_FROG = {
  animation: 'sway', fps: 1, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Hammock ropes
    ctx.strokeStyle = '#884400'; ctx.lineWidth = 4*S;
    const lean = frame === 1 ? 6 : 0;
    ctx.beginPath(); ctx.moveTo((22+lean)*S,100*S); ctx.lineTo((22+lean)*S,200*S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo((234+lean)*S,100*S); ctx.lineTo((234+lean)*S,200*S); ctx.stroke();
    // Hammock body
    ctx.fillStyle = '#884400';
    ctx.beginPath();
    ctx.moveTo((22+lean)*S,150*S);
    ctx.bezierCurveTo((22+lean)*S,220*S,(234+lean)*S,220*S,(234+lean)*S,150*S);
    ctx.lineTo((234+lean)*S,140*S);
    ctx.bezierCurveTo((234+lean)*S,200*S,(22+lean)*S,200*S,(22+lean)*S,140*S);
    ctx.closePath(); ctx.fill();
    // Hammock stripes
    ctx.fillStyle = '#ffd700';
    ctx.fillRect((22+lean)*S,150*S,212*S,6*S);
    ctx.fillStyle = '#cc2200';
    ctx.fillRect((22+lean)*S,162*S,212*S,6*S);
    ctx.fillStyle = '#009933';
    ctx.fillRect((22+lean)*S,174*S,212*S,6*S);
    // Frog body in hammock
    ctx.fillStyle = '#33aa33';
    ctx.beginPath(); ctx.ellipse((128+lean*0.3)*S,152*S,52*S,30*S,0,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#44bb44';
    ctx.beginPath(); ctx.ellipse((128+lean*0.2)*S,106*S,66*S,58*S,0,0,Math.PI*2); ctx.fill();
    // Big sunglasses
    ctx.fillStyle = '#111111';
    rr(ctx, (86+lean*0.2)*S,96*S,42*S,24*S,8*S); ctx.fill();
    rr(ctx, (134+lean*0.2)*S,96*S,42*S,24*S,8*S); ctx.fill();
    // Tinted lenses
    ctx.fillStyle = 'rgba(255,200,0,0.25)';
    rr(ctx, (88+lean*0.2)*S,98*S,38*S,20*S,6*S); ctx.fill();
    rr(ctx, (136+lean*0.2)*S,98*S,38*S,20*S,6*S); ctx.fill();
    // Shades frame
    ctx.strokeStyle = '#111111'; ctx.lineWidth = 3*S;
    ctx.beginPath(); ctx.moveTo((128+lean*0.2)*S,108*S); ctx.lineTo((134+lean*0.2)*S,108*S); ctx.stroke();
    ctx.fillStyle = '#111111';
    rr(ctx, (76+lean*0.2)*S,100*S,14*S,8*S,4*S); ctx.fill();
    rr(ctx, (176+lean*0.2)*S,100*S,14*S,8*S,4*S); ctx.fill();
    // Wide grin
    ctx.fillStyle = '#ff6644';
    ctx.beginPath(); ctx.ellipse((128+lean*0.2)*S,130*S,40*S,16*S,0,0,Math.PI); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.ellipse((128+lean*0.2)*S,128*S,32*S,8*S,0,0,Math.PI); ctx.fill();
    // Legs hanging
    ctx.fillStyle = '#33aa33';
    ctx.beginPath(); ctx.ellipse((90+lean*0.3)*S,180*S,14*S,28*S,0.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse((166+lean*0.3)*S,180*S,14*S,28*S,-0.2,0,Math.PI*2); ctx.fill();
    // Feet
    ctx.beginPath(); ctx.ellipse((84+lean*0.3)*S,210*S,20*S,10*S,-0.3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse((172+lean*0.3)*S,210*S,20*S,10*S,0.3,0,Math.PI*2); ctx.fill();
  },
};

// ── 17. COUNTRY ARMADILLO ────────────────────────────────────
export const COUNTRY_ARMADILLO = {
  animation: null, fps: 1, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Cowboy hat brim
    ctx.fillStyle = '#553300';
    rr(ctx, 52*S,82*S,152*S,14*S,5*S); ctx.fill();
    // Hat crown
    ctx.fillStyle = '#663300';
    rr(ctx, 80*S,22*S,96*S,62*S,10*S); ctx.fill();
    // Hat band
    ctx.fillStyle = '#e8a020';
    ctx.fillRect(80*S,76*S,96*S,8*S);
    // Hat feather
    ctx.fillStyle = '#cc4400';
    ctx.beginPath(); ctx.moveTo(172*S,30*S); ctx.bezierCurveTo(196*S,10*S,210*S,40*S,176*S,60*S); ctx.bezierCurveTo(182*S,50*S,186*S,30*S,172*S,30*S); ctx.fill();
    // Body (armored)
    ctx.fillStyle = '#cc9966';
    ctx.beginPath(); ctx.ellipse(128*S,192*S,64*S,52*S,0,0,Math.PI*2); ctx.fill();
    // Armor bands
    ctx.fillStyle = '#aa7744';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath(); ctx.ellipse(128*S,(162+i*14)*S,64-i*4,(8)*S,0,Math.PI,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = '#bb8855';
    for (let i = 0; i < 4; i++) {
      rr(ctx, 70*S,(158+i*14)*S,116*S,10*S,4*S); ctx.fill();
    }
    // Arms
    ctx.fillStyle = '#cc9966';
    ctx.beginPath(); ctx.ellipse(66*S,186*S,16*S,30*S,-0.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(190*S,186*S,16*S,30*S,0.2,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#ddbb88';
    ctx.beginPath(); ctx.arc(128*S,116*S,58*S,0,Math.PI*2); ctx.fill();
    // Snout
    ctx.fillStyle = '#ccaa77';
    ctx.beginPath(); ctx.ellipse(128*S,134*S,28*S,18*S,0,0,Math.PI*2); ctx.fill();
    // Eyes
    ctx.fillStyle = '#332211';
    ctx.beginPath(); ctx.arc(106*S,110*S,9*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(150*S,110*S,9*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(109*S,107*S,3*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(153*S,107*S,3*S,0,Math.PI*2); ctx.fill();
    // Nose
    ctx.fillStyle = '#553322';
    ctx.beginPath(); ctx.ellipse(128*S,130*S,8*S,6*S,0,0,Math.PI*2); ctx.fill();
    // Boots
    ctx.fillStyle = '#774422';
    const bootOffset = frame === 1 ? -10 : 0;
    rr(ctx, 86*S,(234+bootOffset)*S,28*S,18*S,5*S); ctx.fill();
    rr(ctx, 142*S,234*S,28*S,18*S,5*S); ctx.fill();
    ctx.fillStyle = '#553300';
    ctx.fillRect(86*S,(234+bootOffset)*S,28*S,6*S);
    ctx.fillRect(142*S,234*S,28*S,6*S);
  },
};

// ── 18. AFROBEATS LION ───────────────────────────────────────
export const AFROBEATS_LION = {
  animation: 'bob', fps: 3, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Mane (large thick circle)
    ctx.fillStyle = '#aa6622';
    ctx.beginPath(); ctx.arc(128*S,104*S,84*S,0,Math.PI*2); ctx.fill();
    // Mane texture dots
    ctx.fillStyle = '#884411';
    for (let i = 0; i < 12; i++) {
      const a = (i/12)*Math.PI*2;
      ctx.beginPath(); ctx.arc((128+72*Math.cos(a))*S,(104+72*Math.sin(a))*S,8*S,0,Math.PI*2); ctx.fill();
    }
    // Dashiki body
    ctx.fillStyle = '#dd4400';
    rr(ctx, 80*S,160*S,96*S,76*S,14*S); ctx.fill();
    ctx.fillStyle = '#ffcc00';
    rr(ctx, 100*S,168*S,56*S,16*S,4*S); ctx.fill();
    ctx.fillStyle = '#009933';
    ctx.fillRect(80*S,188*S,96*S,6*S);
    ctx.fillRect(80*S,200*S,96*S,6*S);
    // Arms
    ctx.fillStyle = '#cc8833';
    const armRaised = frame === 1;
    ctx.beginPath(); ctx.ellipse(66*S,(armRaised?160:184)*S,16*S,32*S,armRaised?-0.5:-0.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(190*S,184*S,16*S,32*S,0.2,0,Math.PI*2); ctx.fill();
    // Drum
    ctx.fillStyle = '#884422';
    rr(ctx, 160*S,196*S,54*S,42*S,8*S); ctx.fill();
    ctx.fillStyle = '#aa6633';
    ctx.beginPath(); ctx.ellipse(187*S,196*S,27*S,10*S,0,0,Math.PI*2); ctx.fill();
    // Drum pattern
    const drumColors = ['#ffcc00','#cc2200','#009933','#ffcc00'];
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = drumColors[i];
      ctx.fillRect((162+i*12)*S,202*S,10*S,28*S);
    }
    // Face
    ctx.fillStyle = '#cc8833';
    ctx.beginPath(); ctx.arc(128*S,104*S,60*S,0,Math.PI*2); ctx.fill();
    // Muzzle
    ctx.fillStyle = '#ddaa55';
    ctx.beginPath(); ctx.ellipse(128*S,120*S,28*S,22*S,0,0,Math.PI*2); ctx.fill();
    // Eyes
    ctx.fillStyle = '#221100';
    ctx.beginPath(); ctx.arc(104*S,98*S,11*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(152*S,98*S,11*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(107*S,95*S,4*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(155*S,95*S,4*S,0,Math.PI*2); ctx.fill();
    // Nose
    ctx.fillStyle = '#221100';
    ctx.beginPath(); ctx.ellipse(128*S,116*S,10*S,7*S,0,0,Math.PI*2); ctx.fill();
    // Proud grin
    ctx.strokeStyle = '#221100'; ctx.lineWidth = 3*S; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(128*S,120*S,14*S,0.2,Math.PI-0.2); ctx.stroke();
    // Feet
    ctx.fillStyle = '#cc8833';
    ctx.beginPath(); ctx.ellipse(96*S,234*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(160*S,234*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
  },
};

// ── 19. GLITCH OCTOPUS ───────────────────────────────────────
export const GLITCH_OCTOPUS = {
  animation: 'float', fps: 4, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Tentacles (8, alternating curl direction per frame)
    const tentacleCPs = [
      [40,0.5],[65,0.3],[90,0.15],[115,0.05],[141,0.05],[166,0.15],[191,0.3],[216,0.5]
    ];
    tentacleCPs.forEach(([tx, _], i) => {
      const curl = frame === 0 ? (i%2===0 ? 1 : -1) : (i%2===0 ? -1 : 1);
      const tipX = tx + curl * 20;
      const tipY = 240;
      ctx.fillStyle = i%2===0 ? '#9944ff' : '#7722cc';
      ctx.beginPath();
      ctx.moveTo(tx*S, 170*S);
      ctx.bezierCurveTo(
        (tx+curl*10)*S, 195*S,
        (tipX+curl*10)*S, 218*S,
        tipX*S, tipY*S
      );
      ctx.lineWidth = 10*S;
      ctx.strokeStyle = i%2===0 ? '#9944ff' : '#7722cc';
      ctx.lineCap = 'round';
      ctx.stroke();
      // Sucker dots at tip
      ctx.fillStyle = '#cc88ff';
      ctx.beginPath(); ctx.arc(tipX*S,(tipY-4)*S,4*S,0,Math.PI*2); ctx.fill();
    });
    // Body dome
    ctx.fillStyle = '#7722cc';
    ctx.beginPath(); ctx.arc(128*S,120*S,70*S,0,Math.PI*2); ctx.fill();
    // Glitch scan lines
    if (frame === 1) {
      ctx.fillStyle = 'rgba(0,255,136,0.15)';
      for (let y = 60; y < 180; y += 12) {
        ctx.fillRect(58*S,y*S,140*S,4*S);
      }
    }
    // Head highlight
    ctx.fillStyle = '#9944ff';
    ctx.beginPath(); ctx.arc(128*S,110*S,52*S,0,Math.PI*2); ctx.fill();
    // Big eyes
    ctx.fillStyle = '#00ff88';
    ctx.beginPath(); ctx.arc(102*S,112*S,22*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(154*S,112*S,22*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#002211';
    ctx.beginPath(); ctx.arc(102*S,112*S,14*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(154*S,112*S,14*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#00ff88';
    ctx.beginPath(); ctx.arc(107*S,107*S,5*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(159*S,107*S,5*S,0,Math.PI*2); ctx.fill();
    // Cute mouth
    ctx.strokeStyle = '#cc88ff'; ctx.lineWidth = 3*S; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(128*S,134*S,12*S,0.2,Math.PI-0.2); ctx.stroke();
    // Pixel glitch dots
    const glitchDots = frame === 0
      ? [[50,90],[200,80],[214,140],[48,160]]
      : [[46,86],[206,84],[218,136],[44,164]];
    glitchDots.forEach(([x,y]) => {
      ctx.fillStyle = '#ff0044';
      ctx.fillRect(x*S,y*S,6*S,6*S);
    });
  },
};

// ── 20. EDM DRAGON ───────────────────────────────────────────
export const EDM_DRAGON = {
  animation: 'pulse', fps: 4, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    const wingsUp = frame === 1;
    const eyeCol = frame === 1 ? '#00ffff' : '#00bbdd';
    // Wings
    ctx.fillStyle = '#1155aa';
    if (wingsUp) {
      ctx.beginPath();
      ctx.moveTo(96*S,130*S); ctx.bezierCurveTo(40*S,80*S,14*S,30*S,60*S,10*S);
      ctx.bezierCurveTo(80*S,40*S,88*S,90*S,96*S,130*S); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(160*S,130*S); ctx.bezierCurveTo(216*S,80*S,242*S,30*S,196*S,10*S);
      ctx.bezierCurveTo(176*S,40*S,168*S,90*S,160*S,130*S); ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(90*S,140*S); ctx.bezierCurveTo(30*S,120*S,10*S,80*S,50*S,60*S);
      ctx.bezierCurveTo(70*S,90*S,80*S,120*S,90*S,140*S); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(166*S,140*S); ctx.bezierCurveTo(226*S,120*S,246*S,80*S,206*S,60*S);
      ctx.bezierCurveTo(186*S,90*S,176*S,120*S,166*S,140*S); ctx.fill();
    }
    // Wing glow edges
    ctx.strokeStyle = '#00d4ff'; ctx.lineWidth = 3*S;
    if (wingsUp) {
      ctx.beginPath(); ctx.moveTo(96*S,130*S); ctx.bezierCurveTo(40*S,80*S,14*S,30*S,60*S,10*S); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(160*S,130*S); ctx.bezierCurveTo(216*S,80*S,242*S,30*S,196*S,10*S); ctx.stroke();
    }
    // Body
    ctx.fillStyle = '#112244';
    rr(ctx, 82*S,154*S,92*S,80*S,16*S); ctx.fill();
    // Body scales
    ctx.fillStyle = '#1a3366';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.ellipse(128*S,(170+i*20)*S,36*S,8*S,0,0,Math.PI*2); ctx.fill();
    }
    // Glow sticks
    ctx.fillStyle = '#ff0088';
    rr(ctx, 52*S,170*S,12*S,48*S,5*S); ctx.fill();
    ctx.fillStyle = '#ff44aa';
    ctx.beginPath(); ctx.arc(58*S,168*S,10*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#00ff88';
    rr(ctx, 192*S,170*S,12*S,48*S,5*S); ctx.fill();
    ctx.fillStyle = '#44ffaa';
    ctx.beginPath(); ctx.arc(198*S,168*S,10*S,0,Math.PI*2); ctx.fill();
    // Arms holding sticks
    ctx.fillStyle = '#1a3366';
    ctx.beginPath(); ctx.ellipse(68*S,190*S,18*S,30*S,-0.4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(188*S,190*S,18*S,30*S,0.4,0,Math.PI*2); ctx.fill();
    // Head
    ctx.fillStyle = '#1a3366';
    ctx.beginPath(); ctx.arc(128*S,108*S,66*S,0,Math.PI*2); ctx.fill();
    // Horns
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath(); ctx.moveTo(94*S,60*S); ctx.lineTo(76*S,16*S); ctx.lineTo(112*S,50*S); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(162*S,60*S); ctx.lineTo(180*S,16*S); ctx.lineTo(144*S,50*S); ctx.closePath(); ctx.fill();
    // Horn glow
    ctx.strokeStyle = '#00ffff'; ctx.lineWidth = 2*S;
    ctx.beginPath(); ctx.moveTo(76*S,16*S); ctx.lineTo(94*S,60*S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(180*S,16*S); ctx.lineTo(162*S,60*S); ctx.stroke();
    // Glowing eyes
    if (frame === 1) {
      ctx.fillStyle = 'rgba(0,212,255,0.3)';
      ctx.beginPath(); ctx.arc(102*S,108*S,22*S,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(154*S,108*S,22*S,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = eyeCol;
    ctx.beginPath(); ctx.arc(102*S,108*S,13*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(154*S,108*S,13*S,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#003344';
    ctx.beginPath(); ctx.arc(102*S,108*S,6*S,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(154*S,108*S,6*S,0,Math.PI*2); ctx.fill();
    // Nostrils
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath(); ctx.ellipse(118*S,128*S,5*S,4*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(138*S,128*S,5*S,4*S,0,0,Math.PI*2); ctx.fill();
    // Feet
    ctx.fillStyle = '#1a3366';
    ctx.beginPath(); ctx.ellipse(96*S,232*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(160*S,232*S,22*S,12*S,0,0,Math.PI*2); ctx.fill();
    // Claws
    ctx.fillStyle = '#00d4ff';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo((84+i*8)*S,240*S); ctx.lineTo((86+i*8)*S,252*S); ctx.lineTo((88+i*8)*S,240*S); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo((148+i*8)*S,240*S); ctx.lineTo((150+i*8)*S,252*S); ctx.lineTo((152+i*8)*S,240*S); ctx.closePath(); ctx.fill();
    }
  },
};

// ── DEFAULT SLEEPER ───────────────────────────────────────────
export const DEFAULT_SLEEPER = {
  animation: 'float', fps: 1, frameCount: 2,
  draw(ctx, frame, size) {
    const S = size / 256;
    // Ghost body
    ctx.fillStyle = '#8888aa';
    ctx.beginPath(); ctx.arc(128*S,110*S,68*S,Math.PI,0); ctx.fill();
    ctx.fillRect(60*S,110*S,136*S,82*S);
    // Wavy bottom
    ctx.fillStyle = '#0a0a12';
    ctx.beginPath();
    ctx.moveTo(60*S,192*S);
    ctx.quadraticCurveTo(76*S,210*S,94*S,192*S);
    ctx.quadraticCurveTo(111*S,174*S,128*S,192*S);
    ctx.quadraticCurveTo(145*S,210*S,162*S,192*S);
    ctx.quadraticCurveTo(179*S,174*S,196*S,192*S);
    ctx.lineTo(196*S,250*S); ctx.lineTo(60*S,250*S); ctx.closePath(); ctx.fill();
    // Face (closed eyes / sleeping)
    ctx.strokeStyle = '#334466'; ctx.lineWidth = 4*S; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(100*S,108*S); ctx.lineTo(120*S,108*S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(136*S,108*S); ctx.lineTo(156*S,108*S); ctx.stroke();
    // Tiny smile
    ctx.strokeStyle = '#334466'; ctx.lineWidth = 2.5*S;
    ctx.beginPath(); ctx.arc(128*S,120*S,8*S,0.1,Math.PI-0.1); ctx.stroke();
    // Zzz letters
    const zOff = frame === 0 ? 0 : 6;
    ctx.fillStyle = '#aabbcc';
    ctx.font = `bold ${18*S}px sans-serif`;
    ctx.fillText('Z', (162+zOff)*S, (68-zOff)*S);
    ctx.font = `bold ${13*S}px sans-serif`;
    ctx.fillText('z', (180+zOff)*S, (46-zOff)*S);
    ctx.font = `bold ${9*S}px sans-serif`;
    ctx.fillText('z', (192+zOff)*S, (30-zOff)*S);
    // Subtle glow
    ctx.fillStyle = 'rgba(136,136,170,0.15)';
    ctx.beginPath(); ctx.arc(128*S,110*S,80*S,0,Math.PI*2); ctx.fill();
  },
};

// ── Theme → Character map ─────────────────────────────────────
export const THEME_CHARACTERS = {
  lofi_chill:        LOFI_CAT,
  cyberpunk:         CYBERPUNK_ROBOT,
  cottagecore:       COTTAGECORE_BUNNY,
  dark_academia:     DARK_ACADEMIA_OWL,
  vaporwave:         VAPORWAVE_GIRL,
  hype_hyperpop:     HYPE_FROG,
  metal_rage:        METAL_SKULL,
  classical_baroque: CLASSICAL_CAT,
  rnb_soul:          RNB_BEAR,
  indie_folk:        INDIE_DOG,
  lofi_jazz:         LOFI_JAZZ_FOX,
  kpop:              KPOP_PANDA,
  dream_pop:         DREAM_BUTTERFLY,
  phonk:             PHONK_WOLF,
  bubblegum_pop:     BUBBLEGUM_UNICORN,
  reggae:            REGGAE_FROG,
  country:           COUNTRY_ARMADILLO,
  afrobeats:         AFROBEATS_LION,
  experimental:      GLITCH_OCTOPUS,
  edm:               EDM_DRAGON,
};
