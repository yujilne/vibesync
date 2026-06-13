import { useEffect, useRef } from 'react';
import { THEMES } from '../themes/definitions';

function drawChar(canvas, character) {
  if (!canvas || !character?.draw) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 256);
  character.draw(ctx, 0, 256);
}

export default function CompatCard({
  characterA, themeIdA, trackA,
  characterB, themeIdB, trackB,
  score, label, emoji,
  innerRef, onReady,
}) {
  const canvasARef = useRef(null);
  const canvasBRef = useRef(null);
  const themeA = THEMES[themeIdA] ?? THEMES.lofi_chill;
  const themeB = THEMES[themeIdB] ?? THEMES.lofi_chill;

  useEffect(() => {
    drawChar(canvasARef.current, characterA);
    drawChar(canvasBRef.current, characterB);
    onReady?.();
  }, [characterA, characterB, onReady]);

  const colStyle = {
    width: '330px', flexShrink: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '28px',
  };

  return (
    <div
      ref={innerRef}
      style={{
        position: 'fixed', left: '-9999px', top: 0,
        width: '1080px', height: '1080px',
        background: '#0a0a12', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Press Start 2P', monospace", gap: '40px',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at 22% 45%, ${themeA.accent}28 0%, transparent 44%),
          radial-gradient(ellipse at 78% 45%, ${themeB.accent}28 0%, transparent 44%)
        `,
      }} />

      <div style={{
        display: 'flex', alignItems: 'center',
        width: '1080px', position: 'relative', zIndex: 1,
      }}>
        <div style={{ ...colStyle, padding: '0 0 0 52px' }}>
          <canvas ref={canvasARef} width={256} height={256} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '17px', color: themeA.accent, marginBottom: '18px',
              textShadow: `0 0 22px ${themeA.glow}` }}>
              {themeA.name}
            </div>
            <div style={{ fontSize: '15px', color: '#ffffff', marginBottom: '14px',
              maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap', textAlign: 'center' }}>
              {trackA.title}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              {trackA.artist}
            </div>
          </div>
        </div>

        <div style={{ width: '420px', flexShrink: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
          <div style={{ fontSize: '82px', color: '#ffffff', lineHeight: 1,
            textShadow: `0 0 40px ${themeA.glow}, 0 0 40px ${themeB.glow}` }}>
            {score}%
          </div>
          <div style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 1.9 }}>
            {label}
          </div>
          <div style={{ fontSize: '44px', lineHeight: 1 }}>{emoji}</div>
        </div>

        <div style={{ ...colStyle, padding: '0 52px 0 0' }}>
          <canvas ref={canvasBRef} width={256} height={256} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '17px', color: themeB.accent, marginBottom: '18px',
              textShadow: `0 0 22px ${themeB.glow}` }}>
              {themeB.name}
            </div>
            <div style={{ fontSize: '15px', color: '#ffffff', marginBottom: '14px',
              maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap', textAlign: 'center' }}>
              {trackB.title}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              {trackB.artist}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '44px', left: 0, right: 0,
        textAlign: 'center', fontSize: '17px',
        color: 'rgba(255,255,255,0.14)', letterSpacing: '0.25em', zIndex: 1,
      }}>
        VibeSync Compatibility
      </div>
    </div>
  );
}
