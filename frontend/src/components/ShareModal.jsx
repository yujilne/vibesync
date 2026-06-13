import { useState } from 'react';

export default function ShareModal({ previewUrl, onDownload, onCopyLink, onClose }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Share My Vibe</div>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="vibe card preview"
            className="modal-preview"
          />
        )}

        <div className="modal-actions">
          <button className="modal-btn modal-btn-primary" onClick={onDownload}>
            ↓ Download PNG
          </button>
          {onCopyLink && (
            <button
              className={`modal-btn modal-btn-secondary${copied ? ' copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? '✓ Copied!' : '⎘ Copy Link'}
            </button>
          )}
        </div>

        <button className="modal-close-btn" onClick={onClose}>✕ Close</button>
      </div>
    </div>
  );
}
