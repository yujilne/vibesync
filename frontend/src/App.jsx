import { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { THEMES, THEME_EMOJI } from './themes/definitions';
import { matchTheme } from './themes/matcher';
import { THEME_CHARACTERS, DEFAULT_SLEEPER } from './characters/index';

import PixelCanvas     from './components/PixelCanvas';
import NowPlaying      from './components/NowPlaying';
import ThemeLabel      from './components/ThemeLabel';
import ConnectButton   from './components/ConnectButton';
import ShareCard       from './components/ShareCard';
import ShareModal      from './components/ShareModal';
import SharedVibeView  from './components/SharedVibeView';
import CollectionModal from './components/CollectionModal';
import CompatWaiting   from './components/CompatWaiting';
import CompatResult    from './components/CompatResult';
import CompatCard      from './components/CompatCard';

import useNowPlaying   from './hooks/useNowPlaying';
import { useCollection } from './hooks/useCollection';
import { computeCompatScore, getCompatLabel, VIBE_COORDS } from './compat/score';

const CSS_ANIMATIONS = {
  float: 'float', bounce: 'bounce', sway: 'sway',
  bob: 'bob', 'bounce-hyper': 'bounce-hyper', pulse: 'pulse',
};

function encodeVibe(themeId, track) {
  return btoa(unescape(encodeURIComponent(JSON.stringify({
    t: themeId, n: track.title, a: track.artist, art: track.albumArt ?? '',
  }))));
}

function decodeVibe(str) {
  try { return JSON.parse(decodeURIComponent(escape(atob(str)))); } catch { return null; }
}

export default function App() {
  const [authed,       setAuthed]       = useState(false);
  const [authLoading,  setAuthLoading]  = useState(true);
  const [themeId,      setThemeId]      = useState('lofi_chill');
  const [visible,      setVisible]      = useState(true);
  const [track,        setTrack]        = useState(null);
  const [sharedVibe,   setSharedVibe]   = useState(null);
  const [compatData,   setCompatData]   = useState(null);
  // shareState: 'idle' | 'rendering' | 'preview'
  const [shareState,     setShareState]     = useState('idle');
  const [previewUrl,     setPreviewUrl]     = useState(null);
  const [showCollection, setShowCollection] = useState(false);
  const [compatCopied,   setCompatCopied]   = useState(false);
  const [compatCapture,  setCompatCapture]  = useState('idle');
  const [compatUrl,      setCompatUrl]      = useState(null);
  const [playlistState,  setPlaylistState]  = useState('idle'); // 'idle'|'generating'|'success'|'error'
  const [playlistResult, setPlaylistResult] = useState(null);
  const [playlistError,  setPlaylistError]  = useState(null);

  const lastTrackId   = useRef(null);
  const cardRef       = useRef(null);
  const compatCardRef = useRef(null);

  const { collection, unlock, newUnlock, clearNewUnlock } = useCollection();

  // ── Mount: detect ?vibe= / ?compat= / ?token= ─────────────────────────────
  useEffect(() => {
    const params      = new URLSearchParams(window.location.search);
    const token       = params.get('token');
    const vibeParam   = params.get('vibe');
    const compatParam = params.get('compat');

    if (token || params.get('authed') || params.get('error') || vibeParam || compatParam) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    // Shared vibe — no auth needed
    if (vibeParam) {
      const decoded = decodeVibe(vibeParam);
      if (decoded) { setSharedVibe(decoded); setAuthLoading(false); return; }
    }

    // Compat link — persist to sessionStorage to survive OAuth redirect
    if (compatParam) {
      const decoded = decodeVibe(compatParam); // same encoding format
      if (decoded) {
        setCompatData(decoded);
        sessionStorage.setItem('vibesync_compat', JSON.stringify(decoded));
      }
    } else {
      // Returning from OAuth? Restore compat data
      const stored = sessionStorage.getItem('vibesync_compat');
      if (stored) {
        try { setCompatData(JSON.parse(stored)); } catch {}
      }
    }

    async function init() {
      if (token) {
        await fetch(`/auth/exchange?token=${token}`, { credentials: 'include' }).catch(() => {});
      }
      fetch('/auth/status', { credentials: 'include' })
        .then(r => r.json())
        .then(d => { setAuthed(d.authed); setAuthLoading(false); })
        .catch(() => setAuthLoading(false));
    }
    init();
  }, []);

  // ── Polling ───────────────────────────────────────────────────────────────
  const pollData = useNowPlaying(authed, () => setAuthed(false));

  // ── React to new track data ───────────────────────────────────────────────
  useEffect(() => {
    if (!pollData) return;
    if (!pollData.isPlaying) { setTrack(null); return; }
    setTrack(pollData.track);
    if (pollData.track.id === lastTrackId.current) return;
    lastTrackId.current = pollData.track.id;
    const newTheme = matchTheme(pollData.audioFeatures, pollData.genres);
    unlock(newTheme);
    if (newTheme === themeId) return;
    setVisible(false);
    setTimeout(() => { setThemeId(newTheme); setVisible(true); }, 380);
  }, [pollData]);

  // ── Apply theme CSS vars ──────────────────────────────────────────────────
  useEffect(() => {
    const theme = THEMES[themeId];
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty('--bg',     theme.bg);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--glow',   theme.glow);
  }, [themeId]);

  // ── Share card capture ────────────────────────────────────────────────────
  const handleCardReady = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      await document.fonts.load("38px 'Press Start 2P'");
      await document.fonts.load("19px 'Press Start 2P'");
    } catch {}
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true, allowTaint: false, scale: 1,
        width: 1080, height: 1080, backgroundColor: null,
      });
      setPreviewUrl(canvas.toDataURL('image/png'));
      setShareState('preview');
    } catch (err) {
      console.error('Share card capture failed:', err);
      setShareState('idle');
    }
  }, []);

  function handleShareClick() { setShareState('rendering'); }
  function handleModalClose() { setShareState('idle'); setPreviewUrl(null); }

  function handleDownload() {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = 'vibesync-vibe.png';
    a.click();
  }

  async function handleCopyLink() {
    if (!track) return;
    const url = `${window.location.origin}/?vibe=${encodeVibe(themeId, track)}`;
    try { await navigator.clipboard.writeText(url); }
    catch {
      const el = document.createElement('textarea');
      el.value = url; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
  }

  // ── Compat: copy link ─────────────────────────────────────────────────────
  async function handleCompatCopy() {
    if (!track) return;
    const url = `${window.location.origin}/?compat=${encodeVibe(themeId, track)}`;
    try { await navigator.clipboard.writeText(url); }
    catch {
      const el = document.createElement('textarea');
      el.value = url; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
    setCompatCopied(true);
    setTimeout(() => setCompatCopied(false), 2500);
  }

  // ── Compat card capture ───────────────────────────────────────────────────
  const handleCompatCardReady = useCallback(async () => {
    if (!compatCardRef.current) return;
    try {
      await document.fonts.load("38px 'Press Start 2P'");
      await document.fonts.load("19px 'Press Start 2P'");
    } catch {}
    try {
      const canvas = await html2canvas(compatCardRef.current, {
        useCORS: true, allowTaint: false, scale: 1,
        width: 1080, height: 1080, backgroundColor: null,
      });
      setCompatUrl(canvas.toDataURL('image/png'));
      setCompatCapture('preview');
    } catch (err) {
      console.error('Compat card capture failed:', err);
      setCompatCapture('idle');
    }
  }, []);

  function handleCompatDownload() {
    if (!compatUrl) return;
    const a = document.createElement('a');
    a.href = compatUrl;
    a.download = 'vibesync-compatibility.png';
    a.click();
  }

  function handleCompatModalClose() { setCompatCapture('idle'); setCompatUrl(null); }

  // ── Playlist generator ────────────────────────────────────────────────────
  async function handleBuildPlaylist() {
    if (!track || !themeId) return;
    setPlaylistState('generating');
    const coords  = VIBE_COORDS[themeId] ?? VIBE_COORDS.lofi_chill;
    const theme   = THEMES[themeId];
    const emoji   = THEME_EMOJI[themeId] ?? '✦';
    try {
      const res = await fetch('/api/playlist', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          themeName:          theme.name,
          themeEmoji:         emoji,
          seedTrackId:        track.id,
          targetEnergy:       coords.energy,
          targetValence:      1 - coords.dark,
          targetDanceability: coords.dance,
          targetAcousticness: coords.acoustic,
          keywords:           theme.keywords ?? [],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPlaylistError({ needsReauth: !!data.needsReauth });
        setPlaylistState('error');
      } else {
        setPlaylistResult({ url: data.playlistUrl, name: data.name });
        setPlaylistState('success');
      }
    } catch {
      setPlaylistError({ needsReauth: false });
      setPlaylistState('error');
    }
  }

  function handleCompatBack() {
    setCompatData(null);
    sessionStorage.removeItem('vibesync_compat');
    setCompatCapture('idle');
    setCompatUrl(null);
  }

  // ── Derived values ────────────────────────────────────────────────────────
  const character = authed && track ? THEME_CHARACTERS[themeId] : DEFAULT_SLEEPER;
  const cssAnim   = CSS_ANIMATIONS[character?.animation] ?? null;
  const isPlaying = !!(authed && track);

  // ── Shared vibe page ──────────────────────────────────────────────────────
  if (sharedVibe) return <SharedVibeView vibe={sharedVibe} />;

  // ── Compat flow ───────────────────────────────────────────────────────────
  if (compatData) {
    if (!authed) {
      return <CompatWaiting compatData={compatData} authed={false} loading={authLoading} />;
    }
    if (!track) {
      return <CompatWaiting compatData={compatData} authed={true} loading={false} />;
    }

    const score = computeCompatScore(compatData.t, themeId);
    const { label, emoji, desc } = getCompatLabel(score);
    const friendChar  = THEME_CHARACTERS[compatData.t] ?? DEFAULT_SLEEPER;
    const friendTrack = { title: compatData.n, artist: compatData.a, albumArt: compatData.art };

    return (
      <>
        <CompatResult
          compatData={compatData}
          myThemeId={themeId}
          myTrack={track}
          score={score}
          label={label}
          emoji={emoji}
          desc={desc}
          onBack={handleCompatBack}
          onExport={() => setCompatCapture('rendering')}
          captureState={compatCapture}
        />

        {compatCapture === 'rendering' && (
          <CompatCard
            characterA={friendChar}
            themeIdA={compatData.t}
            trackA={friendTrack}
            characterB={character}
            themeIdB={themeId}
            trackB={track}
            score={score}
            label={label}
            emoji={emoji}
            innerRef={compatCardRef}
            onReady={handleCompatCardReady}
          />
        )}

        {compatCapture === 'preview' && (
          <ShareModal
            previewUrl={compatUrl}
            onDownload={handleCompatDownload}
            onClose={handleCompatModalClose}
          />
        )}
      </>
    );
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authLoading && !authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header className="topbar">
          <span className="topbar-logo">VibeSync</span>
          <ConnectButton authed={false} loading={false} />
        </header>
        <main className="login-screen">
          <div className="login-title">VibeSync</div>
          <div className="login-subtitle">
            Connect your Spotify account<br />
            and watch your music<br />
            come to life as pixel art
          </div>
          <a href="/auth/login" className="login-btn">Connect Spotify</a>
        </main>
      </div>
    );
  }

  // ── Main screen ───────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="topbar">
        <span className="topbar-logo">VibeSync</span>
        <div className="topbar-right">
          {authed && (
            <button className="collection-btn" onClick={() => setShowCollection(true)}>
              Collection
            </button>
          )}
          <ConnectButton authed={authed} loading={authLoading} />
        </div>
      </header>

      <main className="stage">
        <div className="character-wrap">
          <div className="character-glow" />
          <PixelCanvas character={character} visible={visible} cssAnimation={cssAnim} />
        </div>

        {isPlaying ? (
          <ThemeLabel themeId={themeId} visible={visible} />
        ) : (
          <div className="nothing-playing">{authed ? 'Nothing playing...' : ''}</div>
        )}

        {isPlaying && <NowPlaying track={track} visible={visible} />}

        {isPlaying && (
          <div className="share-actions">
            <button
              className="share-btn"
              onClick={handleShareClick}
              disabled={shareState === 'rendering'}
            >
              {shareState === 'rendering' ? 'Generating...' : '✦ Share My Vibe'}
            </button>
            <button
              className="compat-btn"
              onClick={handleCompatCopy}
              disabled={compatCopied}
            >
              {compatCopied ? '✦ Link Copied!' : '♡ Vibe Compat'}
            </button>
            <button
              className="playlist-btn"
              onClick={handleBuildPlaylist}
              disabled={playlistState === 'generating'}
            >
              {playlistState === 'generating' ? 'Building...' : '♫ Build Playlist'}
            </button>
          </div>
        )}

        {playlistState === 'success' && playlistResult && (
          <div className="playlist-banner playlist-banner--success">
            <div className="playlist-banner-title">✦ Playlist Created!</div>
            <div className="playlist-banner-name">{playlistResult.name}</div>
            <div className="playlist-banner-actions">
              <a
                href={playlistResult.url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn modal-btn-primary"
              >
                Open in Spotify ↗
              </a>
              <button
                className="modal-close-btn"
                onClick={() => { setPlaylistState('idle'); setPlaylistResult(null); }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {playlistState === 'error' && (
          <div className="playlist-banner playlist-banner--error">
            {playlistError?.needsReauth ? (
              <>
                <div className="playlist-banner-title">Grant playlist access first</div>
                <a href="/auth/login" className="modal-btn modal-btn-secondary">
                  Reconnect Spotify ↗
                </a>
              </>
            ) : (
              <>
                <div className="playlist-banner-title">Couldn't create playlist</div>
                <button
                  className="modal-close-btn"
                  onClick={() => { setPlaylistState('idle'); setPlaylistError(null); }}
                >
                  ✕ Dismiss
                </button>
              </>
            )}
          </div>
        )}
      </main>

      {shareState === 'rendering' && (
        <ShareCard
          character={character}
          themeId={themeId}
          track={track}
          innerRef={cardRef}
          onReady={handleCardReady}
        />
      )}

      {shareState === 'preview' && (
        <ShareModal
          previewUrl={previewUrl}
          onDownload={handleDownload}
          onCopyLink={handleCopyLink}
          onClose={handleModalClose}
        />
      )}

      {showCollection && (
        <CollectionModal
          collection={collection}
          onClose={() => setShowCollection(false)}
        />
      )}

      {newUnlock && (
        <div className="unlock-flash" onAnimationEnd={clearNewUnlock}>
          <span>✦ New character unlocked! ✦</span>
        </div>
      )}
    </div>
  );
}
