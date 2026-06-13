import { useState, useEffect } from 'react';

const STORAGE_KEY = 'vibesync_collection';

export function useCollection() {
  const [collection, setCollection] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}; }
    catch { return {}; }
  });
  const [newUnlock, setNewUnlock] = useState(null); // themeId of first-time unlock

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  }, [collection]);

  function unlock(themeId) {
    if (!themeId) return;
    setCollection(prev => {
      const entry = prev[themeId];
      if (!entry) setNewUnlock(themeId); // first time — trigger flash
      return {
        ...prev,
        [themeId]: {
          count:   (entry?.count ?? 0) + 1,
          firstAt: entry?.firstAt ?? Date.now(),
        },
      };
    });
  }

  function clearNewUnlock() { setNewUnlock(null); }

  return { collection, unlock, newUnlock, clearNewUnlock };
}
