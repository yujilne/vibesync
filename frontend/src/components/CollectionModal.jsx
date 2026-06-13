import { useEffect, useRef } from 'react';
import { THEME_IDS, THEMES } from '../themes/definitions';
import { THEME_CHARACTERS } from '../characters/index';

function CharCard({ themeId, collection }) {
  const canvasRef = useRef(null);
  const entry     = collection[themeId];
  const unlocked  = !!entry;
  const character = THEME_CHARACTERS[themeId];
  const theme     = THEMES[themeId];

  useEffect(() => {
    if (!canvasRef.current || !character?.draw) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 256, 256);
    character.draw(ctx, 0, 256);
  }, [character]);

  return (
    <div className={`char-card${unlocked ? '' : ' locked'}`}>
      <div className="char-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={256} height={256}
          style={{ width: '96px', height: '96px', display: 'block' }}
        />
        {!unlocked && <div className="char-lock-overlay">???</div>}
      </div>
      <div className="char-name">{unlocked ? theme?.name : '???'}</div>
      {unlocked && <div className="char-count">×{entry.count} played</div>}
    </div>
  );
}

export default function CollectionModal({ collection, onClose }) {
  const discovered = Object.keys(collection).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box collection-box" onClick={e => e.stopPropagation()}>
        <div className="collection-header">
          <div className="modal-title">Collection</div>
          <div className="collection-progress">✦ {discovered} / {THEME_IDS.length} discovered ✦</div>
          <button className="modal-close-btn" onClick={onClose}>✕ Close</button>
        </div>
        <div className="collection-grid">
          {THEME_IDS.map(id => (
            <CharCard key={id} themeId={id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  );
}
