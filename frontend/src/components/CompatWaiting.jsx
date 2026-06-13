import { useEffect, useRef } from 'react';
import { THEMES } from '../themes/definitions';
import { THEME_CHARACTERS, DEFAULT_SLEEPER } from '../characters/index';

export default function CompatWaiting({ compatData, authed, loading }) {
  const { t: friendThemeId, n: title, a: artist } = compatData;
  const friendTheme = THEMES[friendThemeId] ?? THEMES.lofi_chill;
  const character   = THEME_CHARACTERS[friendThemeId] ?? DEFAULT_SLEEPER;
  const canvasRef   = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg',     friendTheme.bg);
    root.style.setProperty('--accent', friendTheme.accent);
    root.style.setProperty('--glow',   friendTheme.glow);
  }, [friendTheme]);

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
      </header>

      <main className="stage">
        <div style={{ fontSize: '7px', color: 'var(--text-dim)', letterSpacing: '0.08em', textAlign: 'center', lineHeight: 2 }}>
          your friend wants to check<br />vibe compatibility with you
        </div>

        <div className="character-wrap">
          <div className="character-glow" />
          <canvas ref={canvasRef} width={256} height={256}
            style={{ width: '200px', height: '200px', display: 'block' }} />
        </div>

        <div className="theme-label">{friendTheme.name}</div>

        <div style={{ fontSize: '7px', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 2.2 }}>
          {title}<br />
          <span style={{ opacity: 0.6 }}>{artist}</span>
        </div>

        {loading ? (
          <div style={{ fontSize: '7px', color: 'var(--text-dim)' }}>loading...</div>
        ) : !authed ? (
          <a href="/auth/login" className="login-btn">Connect Spotify</a>
        ) : (
          <div style={{ fontSize: '7px', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 2.2 }}>
            play a song on Spotify<br />to reveal your compatibility ♪
          </div>
        )}
      </main>
    </div>
  );
}
