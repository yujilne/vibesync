require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
app.use(cors({
  origin: (origin, cb) => cb(null, !origin || allowedOrigins.includes(origin)),
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}));

app.use(express.json());
app.use((req, _res, next) => { console.log(`${req.method} ${req.path}`); next(); });

const authRouter = require('./routes/auth');

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/auth', authRouter);
app.use(authRouter);          // also exposes /callback at root for Spotify redirect
app.use('/api', require('./routes/spotify'));

app.listen(PORT, () => console.log(`VibeSync backend on port ${PORT}`));
