import { useState, useEffect, useRef } from 'react';

export default function InstallPrompt() {
  const [show,  setShow]  = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const deferredPrompt = useRef(null);

  useEffect(() => {
    // Don't show if already running as a PWA
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (standalone) return;

    // Don't show if dismissed this session
    if (sessionStorage.getItem('vibesync_install_dismissed')) return;

    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    if (ios) {
      // iOS doesn't fire beforeinstallprompt — show manual instructions after delay
      const t = setTimeout(() => setShow(true), 4000);
      return () => clearTimeout(t);
    }

    function onPrompt(e) {
      e.preventDefault();
      deferredPrompt.current = e;
      setTimeout(() => setShow(true), 2000);
    }
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  function handleInstall() {
    if (!deferredPrompt.current) return;
    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice.finally(() => {
      deferredPrompt.current = null;
      setShow(false);
    });
  }

  function handleDismiss() {
    sessionStorage.setItem('vibesync_install_dismissed', '1');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="install-prompt">
      {isIOS ? (
        <>
          <div className="install-prompt-text">
            Install: tap <span style={{ fontSize: '13px' }}>⎙</span> then "Add to Home Screen"
          </div>
          <button className="modal-close-btn" onClick={handleDismiss}>✕</button>
        </>
      ) : (
        <>
          <div className="install-prompt-text">✦ Install VibeSync — works offline</div>
          <div className="install-prompt-actions">
            <button className="install-btn" onClick={handleInstall}>Install</button>
            <button className="modal-close-btn" onClick={handleDismiss}>Not now</button>
          </div>
        </>
      )}
    </div>
  );
}
