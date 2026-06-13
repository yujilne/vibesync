import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SplashScreen  from './components/SplashScreen';
import InstallPrompt from './components/InstallPrompt';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <SplashScreen />
    <App />
    <InstallPrompt />
  </>
);

// Register service worker in production only
// (avoids interfering with Vite's dev-server HMR in development)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch(err => console.warn('SW registration failed:', err));
  });
}
