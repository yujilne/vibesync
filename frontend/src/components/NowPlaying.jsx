export default function NowPlaying({ track, visible }) {
  if (!track) return null;

  return (
    <div className={`now-playing${visible ? '' : ' hidden'}`}>
      {track.albumArt ? (
        <img
          src={track.albumArt}
          alt="album art"
          className="album-art"
          crossOrigin="anonymous"
        />
      ) : (
        <div className="album-art-placeholder">♪</div>
      )}
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{track.artist}</div>
      </div>
      <div className="playing-dot" />
    </div>
  );
}
