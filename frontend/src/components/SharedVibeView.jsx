import { useEffect, useRef } from 'react';
import { THEMES } from '../themes/definitions';
import { THEME_CHARACTERS, DEFAULT_SLEEPER } from '../characters/index';

export default function SharedVibeView({ vibe }) {
  const { t: themeId, n: title, a: artist, art: albumArt } = vibe;
  const theme     = THEMES[themeId] ?? THEMES.lofi_chill;
  const character = THEME_CHARACTERS[themeId] ?? DEFAULT_SLEEPER;
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg',     theme.bg);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--glow',   theme.glow);
  }, [theme]);

  useEffect(() => {
    if (!canvasRef.current || !character?.draw) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 256, 256);
    character.draw(ctx, 0, 256);
  }, [character]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="topbar">
        <span className="topbar-logo">VibeSync</span>
        <a href="/auth/login" className="connect-btn">Connect Spotify</a>
      </header>

      <main className="stage">
        <div style={{ fontSize: '7px', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
          someone shared their vibe
        </div>

        <div className="character-wrap">
          <div className="character-glow" />
          <canvas ref={canvasRef} width={256} height={256}
            style={{ width: '200px', height: '200px', display: 'block' }} />
        </div>

        <div className="theme-label">{theme.name}</div>

        <div className="now-playing">
          {albumArt ? (
            <img src={albumArt} className="album-art" alt="album" crossOrigin="anonymous" />
          ) : (
            <div className="album-art-placeholder">♪</div>
          )}
          <div className="track-info">
            <div className="track-title">{title}</div>
            <div className="track-artist">{artist}</div>
          </div>
        </div>

        <div style={{ fontSize: '7px', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 2.2, marginTop: '8px' }}>
          sync your own music<br />to pixel art vibes
        </div>

        <a href="/auth/login" className="login-btn">Try VibeSync</a>
      </main>
    </div>
  );
}
