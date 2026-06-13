import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading,  setFading]  = useState(false);

  useEffect(() => {
    // Only show when running as an installed PWA
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true; // iOS Safari
    if (!standalone) return;

    setVisible(true);
    const fadeTimer = setTimeout(() => setFading(true), 1400);
    const hideTimer = setTimeout(() => setVisible(false), 1900);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash-screen${fading ? ' splash-fade' : ''}`}>
      <div className="splash-logo">VibeSync</div>
      <div className="splash-star">✦</div>
    </div>
  );
}
