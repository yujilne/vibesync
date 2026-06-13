const router = require('express').Router();
const crypto = require('crypto');

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI, FRONTEND_URL, SESSION_SECRET } = process.env;

const SCOPES = 'user-read-currently-playing user-read-playback-state playlist-modify-public playlist-modify-private';

// One-time token store: tempToken → { accessToken, refreshToken, expiresAt }
const tempTokenStore = new Map();

router.get('/login', (req, res) => {
  // Stateless HMAC state — no session write needed
  const nonce = crypto.randomBytes(16).toString('hex');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(nonce).digest('hex');
  const state = `${nonce}.${sig}`;

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    state,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

router.get('/callback', async (req, res) => {
  const { code, state, error } = req.query;

  if (error || !code) return res.redirect(`${FRONTEND_URL}?error=access_denied`);

  // Verify HMAC state (no session required)
  const dot = (state || '').lastIndexOf('.');
  const nonce = state.slice(0, dot);
  const sig   = state.slice(dot + 1);
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(nonce).digest('hex');
  const sigBuf  = Buffer.from(sig,      'hex');
  const expBuf  = Buffer.from(expected, 'hex');
  const valid   = sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
  if (!valid) return res.redirect(`${FRONTEND_URL}?error=state_mismatch`);

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!tokenRes.ok) throw new Error(`Token exchange failed: ${await tokenRes.text()}`);
    const data = await tokenRes.json();

    // Store tokens under a one-time random token
    const tempToken = crypto.randomBytes(32).toString('hex');
    tempTokenStore.set(tempToken, {
      accessToken:  data.access_token,
      refreshToken: data.refresh_token,
      expiresAt:    Date.now() + data.expires_in * 1000,
    });
    setTimeout(() => tempTokenStore.delete(tempToken), 120_000); // expire after 2 min

    res.redirect(`${FRONTEND_URL}/?token=${tempToken}`);
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.redirect(`${FRONTEND_URL}?error=token_error`);
  }
});

// Frontend calls this (through Vite proxy) to swap temp token for a session cookie
router.get('/exchange', (req, res) => {
  const data = tempTokenStore.get(req.query.token);
  if (!data) return res.status(400).json({ error: 'Invalid or expired token' });

  tempTokenStore.delete(req.query.token);
  req.session.accessToken  = data.accessToken;
  req.session.refreshToken = data.refreshToken;
  req.session.expiresAt    = data.expiresAt;
  res.json({ ok: true });
});

router.get('/status', (req, res) => {
  res.json({ authed: !!req.session.accessToken });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect(FRONTEND_URL));
});

module.exports = router;
