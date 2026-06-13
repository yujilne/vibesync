import { useEffect, useRef } from 'react';
import { THEMES } from '../themes/definitions';

export default function ShareCard({ character, themeId, track, innerRef, onReady }) {
  const canvasRef = useRef(null);
  const theme = THEMES[themeId] ?? THEMES.lofi_chill;

  useEffect(() => {
    if (!canvasRef.current || !character?.draw) { onReady?.(); return; }
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 256, 256);
    character.draw(ctx, 0, 256);
    onReady?.();
  }, [character, onReady]);

  return (
    <div
      ref={innerRef}
      style={{
        position: 'fixed', left: '-9999px', top: 0,
        width: '1080px', height: '1080px',
        background: theme.bg, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 50% 42%, ${theme.accent}2e 0%, transparent 62%)`,
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at 0% 0%,   ${theme.accent}16 0%, transparent 38%),
          radial-gradient(ellipse at 100% 100%, ${theme.accent}16 0%, transparent 38%)
        `,
      }} />

      <canvas
        ref={canvasRef}
        width={256} height={256}
        style={{ position: 'relative', zIndex: 1 }}
      />

      <div style={{
        marginTop: '60px', fontSize: '38px', color: theme.accent,
        textShadow: `0 0 40px ${theme.glow}, 0 0 80px ${theme.glow}`,
        letterSpacing: '0.08em', textAlign: 'center', position: 'relative', zIndex: 1,
      }}>
        ✦ {theme.name} ✦
      </div>

      {track && (
        <div style={{
          marginTop: '50px', textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 100px', width: '100%',
        }}>
          <div style={{ fontSize: '26px', color: '#ffffff', marginBottom: '22px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {track.title}
          </div>
          <div style={{ fontSize: '19px', color: 'rgba(255,255,255,0.5)' }}>{track.artist}</div>
        </div>
      )}

      {track?.albumArt && (
        <img
          src={track.albumArt} crossOrigin="anonymous" alt=""
          width={128} height={128}
          style={{
            position: 'absolute', bottom: '88px', left: '80px',
            borderRadius: '10px', objectFit: 'cover',
            border: `2px solid ${theme.accent}44`,
          }}
        />
      )}

      <div style={{
        position: 'absolute', bottom: '42px', left: 0, right: 0,
        textAlign: 'center', fontSize: '19px',
        color: 'rgba(255,255,255,0.18)', letterSpacing: '0.22em', zIndex: 1,
      }}>
        VibeSync
      </div>
    </div>
  );
}
