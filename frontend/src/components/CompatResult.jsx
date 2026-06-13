import { useEffect, useRef } from 'react';
import { THEMES } from '../themes/definitions';
import { THEME_CHARACTERS, DEFAULT_SLEEPER } from '../characters/index';

function CharDisplay({ themeId }) {
  const canvasRef = useRef(null);
  const character = THEME_CHARACTERS[themeId] ?? DEFAULT_SLEEPER;

  useEffect(() => {
    if (!canvasRef.current || !character?.draw) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 256, 256);
    character.draw(ctx, 0, 256);
  }, [character]);

  return (
    <canvas ref={canvasRef} width={256} height={256}
      style={{ width: '96px', height: '96px', display: 'block' }} />
  );
}

export default function CompatResult({
  compatData, myThemeId, myTrack,
  score, label, emoji, desc,
  onBack, onExport, captureState,
}) {
  const friendTheme = THEMES[compatData.t] ?? THEMES.lofi_chill;
  const myTheme     = THEMES[myThemeId]    ?? THEMES.lofi_chill;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg',     myTheme.bg);
    root.style.setProperty('--accent', myTheme.accent);
    root.style.setProperty('--glow',   myTheme.glow);
  }, [myTheme]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `linear-gradient(135deg, ${friendTheme.accent}12 0%, transparent 45%, ${myTheme.accent}12 100%)`,
      }} />

      <header className="topbar" style={{ position: 'relative', zIndex: 10 }}>
        <span className="topbar-logo">VibeSync</span>
        <button className="modal-close-btn" onClick={onBack} style={{ fontSize: '8px' }}>
          ← Back
        </button>
      </header>

      <main className="compat-stage">
        <div className="compat-duo">
          <div className="compat-char">
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: -16, borderRadius: '50%',
                background: `radial-gradient(circle, ${friendTheme.glow} 0%, transparent 70%)`,
              }} />
              <CharDisplay themeId={compatData.t} />
            </div>
            <div className="compat-char-label">
              <div style={{ color: friendTheme.accent }}>{friendTheme.name}</div>
              <div style={{ marginTop: '4px' }}>{compatData.n}</div>
              <div style={{ opacity: 0.6 }}>{compatData.a}</div>
            </div>
          </div>

          <div className="compat-center">
            <div className="compat-score">{score}%</div>
            <div className="compat-label">{label}</div>
            <div style={{ fontSize: '26px', lineHeight: 1 }}>{emoji}</div>
          </div>

          <div className="compat-char">
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: -16, borderRadius: '50%',
                background: `radial-gradient(circle, ${myTheme.glow} 0%, transparent 70%)`,
              }} />
              <CharDisplay themeId={myThemeId} />
            </div>
            <div className="compat-char-label">
              <div style={{ color: myTheme.accent }}>{myTheme.name}</div>
              <div style={{ marginTop: '4px' }}>{myTrack.title}</div>
              <div style={{ opacity: 0.6 }}>{myTrack.artist}</div>
            </div>
          </div>
        </div>

        <div className="compat-desc">{desc}</div>

        <div className="compat-actions">
          <button
            className="share-btn"
            onClick={onExport}
            disabled={captureState === 'rendering'}
          >
            {captureState === 'rendering' ? 'Generating...' : '✦ Share Result PNG'}
          </button>
        </div>
      </main>
    </div>
  );
}
