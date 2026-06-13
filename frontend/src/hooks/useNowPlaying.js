import { useState, useEffect, useRef } from 'react';

const POLL_MS = 5000;

export default function useNowPlaying(enabled, onUnauth) {
  const [data, setData] = useState(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    if (!enabled) { setData(null); return; }

    cancelRef.current = false;

    async function poll() {
      try {
        const res = await fetch('/api/now-playing', { credentials: 'include' });
        if (cancelRef.current) return;

        if (res.status === 401) {
          onUnauth?.();
          return;
        }
        if (!res.ok) return;

        const d = await res.json();
        setData(d);
      } catch {
        // network error — silently skip this tick
      }
    }

    poll();
    const id = setInterval(poll, POLL_MS);

    return () => {
      cancelRef.current = true;
      clearInterval(id);
    };
  }, [enabled]);

  return data;
}
