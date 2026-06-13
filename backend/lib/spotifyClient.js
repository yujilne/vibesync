async function spotifyFetch(url, accessToken) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 204 || res.status === 202) return null;
  if (!res.ok) {
    const err = await res.text().catch(() => '');
    const e = new Error(`Spotify API ${res.status}: ${err}`);
    e.status = res.status;
    throw e;
  }
  return res.json();
}

async function refreshAccessToken(clientId, clientSecret, refreshToken) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) throw new Error('Token refresh failed');
  return res.json();
}

async function spotifyPost(url, accessToken, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (res.status === 204) return null;
  if (!res.ok) {
    const err = new Error(`Spotify API ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

module.exports = { spotifyFetch, spotifyPost, refreshAccessToken };
