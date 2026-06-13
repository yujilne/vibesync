// Generates public/icons/icon-192.png and public/icons/icon-512.png
// Pure Node.js — no npm packages needed. Run with: node scripts/gen-icons.js

const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

// ── CRC-32 (required by PNG format) ───────────────────────────
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// ── PNG chunk builder ──────────────────────────────────────────
function makeChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len = Buffer.allocUnsafe(4); len.writeUInt32BE(data.length, 0);
  const crc = Buffer.allocUnsafe(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 0);
  return Buffer.concat([len, typeBytes, data, crc]);
}

// ── Minimal RGB PNG encoder ────────────────────────────────────
function makePNG(size, pixels) {
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr.writeUInt8(8, 8);  // bit depth 8
  ihdr.writeUInt8(2, 9);  // color type: RGB
  ihdr.writeUInt8(0, 10); ihdr.writeUInt8(0, 11); ihdr.writeUInt8(0, 12);

  // Scanlines: 1 filter byte (0 = None) + width*3 RGB bytes per row
  const raw = Buffer.allocUnsafe(size * (1 + size * 3));
  for (let y = 0; y < size; y++) {
    raw[y * (1 + size * 3)] = 0;
    for (let x = 0; x < size; x++) {
      const si = y * (1 + size * 3) + 1 + x * 3;
      const pi = (y * size + x) * 3;
      raw[si] = pixels[pi]; raw[si+1] = pixels[pi+1]; raw[si+2] = pixels[pi+2];
    }
  }

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', zlib.deflateSync(raw)),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── 16×16 pixel art cat with headphones ───────────────────────
// Each row must be exactly 16 characters
const PALETTE = {
  '.': [0x0a, 0x0a, 0x12], // dark bg
  'G': [0xbb, 0xbb, 0xdd], // gray cat
  'E': [0xdd, 0x88, 0xaa], // pink ear / nose
  'P': [0x55, 0x22, 0xaa], // purple headphones
  'K': [0x33, 0x44, 0x66], // dark eye
};

const GRID = [
  '....EE....EE....',  //  0 ear tips
  '....EE....EE....',  //  1 ears
  '....GG....GG....',  //  2 ear base
  '..PPGGGGGGGGPP..',  //  3 headphone band
  '.P..GGGGGGGG..P.',  //  4 headphone cups
  '.P..GGGGGGGG..P.',  //  5 headphone cups
  '..GGGGGGGGGGGG..',  //  6 head top
  '..GG.KK..KK.GG..',  //  7 eyes
  '..GGGGGGGGGGGG..',  //  8 head mid
  '..GGGG.EE.GGGG..',  //  9 nose
  '..GGGGGGGGGGGG..',  // 10 head
  '...GGGGGGGGGG...',  // 11 chin
  '....GGGGGGGG....',  // 12 lower face
  '.....GGGGGG.....',  // 13 body
  '................',  // 14 bg
  '................',  // 15 bg
];

function generateIcon(size) {
  const G = GRID.length;          // 16
  const cell = size / G;          // pixels per grid cell (12 for 192, 32 for 512)
  const pixels = new Uint8Array(size * size * 3);

  for (let gy = 0; gy < G; gy++) {
    for (let gx = 0; gx < G; gx++) {
      const col = PALETTE[GRID[gy][gx]] ?? PALETTE['.'];
      const y0 = Math.round(gy * cell), y1 = Math.round((gy + 1) * cell);
      const x0 = Math.round(gx * cell), x1 = Math.round((gx + 1) * cell);
      for (let py = y0; py < y1; py++) {
        for (let px = x0; px < x1; px++) {
          const i = (py * size + px) * 3;
          pixels[i] = col[0]; pixels[i+1] = col[1]; pixels[i+2] = col[2];
        }
      }
    }
  }
  return makePNG(size, pixels);
}

const out = path.join(__dirname, '..', 'public', 'icons');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'icon-192.png'), generateIcon(192));
fs.writeFileSync(path.join(out, 'icon-512.png'), generateIcon(512));
console.log('✓ public/icons/icon-192.png');
console.log('✓ public/icons/icon-512.png');
