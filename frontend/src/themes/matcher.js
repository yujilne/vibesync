import { THEMES, THEME_IDS } from './definitions';

function clamp(v) { return Math.max(0, Math.min(1, v)); }

function genreScore(genres, keywords) {
  if (!genres || genres.length === 0) return 0;
  const lower = genres.map(g => g.toLowerCase());
  let hits = 0;
  for (const kw of keywords) {
    if (lower.some(g => g.includes(kw.toLowerCase()))) hits++;
  }
  return clamp(hits / Math.min(keywords.length, 4));
}

function audioScore(f, id) {
  if (!f) return 0;
  const { energy, tempo, valence, danceability, acousticness, instrumentalness } = f;
  const tempoN = clamp(tempo / 200);

  switch (id) {
    case 'lofi_chill':
      return (1 - energy) * 0.35 + (1 - tempoN) * 0.30 + acousticness * 0.20 + (1 - valence) * 0.15;
    case 'cyberpunk':
      return energy * 0.40 + (1 - acousticness) * 0.30 + danceability * 0.20 + tempoN * 0.10;
    case 'cottagecore':
      return valence * 0.35 + acousticness * 0.35 + (1 - energy) * 0.20 + (1 - danceability) * 0.10;
    case 'dark_academia':
      return instrumentalness * 0.40 + (1 - valence) * 0.30 + (1 - energy) * 0.20 + acousticness * 0.10;
    case 'vaporwave':
      return (1 - Math.abs(energy - 0.5) * 2) * 0.30 + danceability * 0.30 + (1 - acousticness) * 0.25 + valence * 0.15;
    case 'hype_hyperpop':
      return energy * 0.35 + tempoN * 0.30 + danceability * 0.25 + valence * 0.10;
    case 'metal_rage':
      return energy * 0.40 + (1 - valence) * 0.35 + (1 - acousticness) * 0.15 + (1 - danceability) * 0.10;
    case 'classical_baroque':
      return instrumentalness * 0.50 + acousticness * 0.25 + (1 - energy) * 0.15 + (1 - danceability) * 0.10;
    case 'rnb_soul':
      return danceability * 0.35
        + (valence > 0.3 && valence < 0.75 ? 1 : 0.2) * 0.30
        + (1 - instrumentalness) * 0.20
        + (1 - Math.abs(energy - 0.55)) * 0.15;
    case 'indie_folk':
      return acousticness * 0.35 + (1 - energy) * 0.30 + (1 - instrumentalness) * 0.20 + valence * 0.15;
    case 'lofi_jazz':
      return (1 - energy) * 0.30 + acousticness * 0.30 + (1 - tempoN) * 0.25 + (1 - instrumentalness) * 0.15;
    case 'kpop':
      return energy * 0.30 + danceability * 0.30 + valence * 0.25 + (1 - acousticness) * 0.15;
    case 'dream_pop':
      return (1 - energy) * 0.30 + acousticness * 0.25 + (1 - Math.abs(valence - 0.5) * 2) * 0.25 + (1 - danceability) * 0.20;
    case 'phonk':
      return energy * 0.35 + (1 - valence) * 0.30 + danceability * 0.20 + (1 - acousticness) * 0.15;
    case 'bubblegum_pop':
      return valence * 0.35 + danceability * 0.30 + energy * 0.25 + (1 - acousticness) * 0.10;
    case 'reggae':
      return valence * 0.30 + (1 - tempoN) * 0.25 + (1 - Math.abs(energy - 0.55) * 2) * 0.25 + acousticness * 0.20;
    case 'country':
      return acousticness * 0.35 + (1 - Math.abs(valence - 0.65) * 2) * 0.25 + (1 - energy) * 0.25 + (1 - instrumentalness) * 0.15;
    case 'afrobeats':
      return danceability * 0.35 + energy * 0.30 + valence * 0.25 + (1 - acousticness) * 0.10;
    case 'experimental':
      return instrumentalness * 0.35 + (1 - danceability) * 0.30 + energy * 0.20 + (1 - valence) * 0.15;
    case 'edm':
      return energy * 0.35 + danceability * 0.30 + tempoN * 0.25 + (1 - acousticness) * 0.10;
    default:
      return 0;
  }
}

function nameScore(track, keywords) {
  if (!track) return 0;
  const hay = `${track.title ?? ''} ${track.artist ?? ''} ${track.albumName ?? ''}`.toLowerCase();
  let hits = 0;
  for (const kw of keywords) {
    if (hay.includes(kw.toLowerCase())) hits++;
  }
  return clamp(hits / Math.min(keywords.length, 3));
}

export function matchTheme(audioFeatures, genres, track) {
  let best = 'lofi_chill', bestScore = -1;
  const hasAudio = audioFeatures != null;

  for (const id of THEME_IDS) {
    const keywords = THEMES[id].keywords;
    const gs = genreScore(genres, keywords);
    const ns = nameScore(track, keywords);
    const as = hasAudio ? audioScore(audioFeatures, id) : 0;

    // When audio features are available: genre+name 55%, audio 45%
    // When not available: genre 65%, name 35% (pure text matching)
    const textScore = Math.max(gs, ns * 0.8);
    const total = hasAudio
      ? textScore * 0.55 + as * 0.45
      : textScore;

    if (total > bestScore) { bestScore = total; best = id; }
  }

  // If nothing matched at all, pick based on a hash of the track id so
  // different songs at least get different cats instead of always lofi.
  if (bestScore === 0 && track?.id) {
    const hash = [...track.id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    best = THEME_IDS[hash % THEME_IDS.length];
  }

  return best;
}
