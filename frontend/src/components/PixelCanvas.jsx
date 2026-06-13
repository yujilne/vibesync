import { useRef, useEffect } from 'react';

const CANVAS_SIZE = 256;

export default function PixelCanvas({ character, visible, cssAnimation }) {
  const canvasRef = useRef(null);
  const frameRef  = useRef(0);
  const timerRef  = useRef(null);

  function drawFrame(idx) {
    const canvas = canvasRef.current;
    if (!canvas || !character?.draw) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    character.draw(ctx, idx, CANVAS_SIZE);
  }

  useEffect(() => {
    if (!character) return;
    frameRef.current = 0;
    drawFrame(0);
    clearInterval(timerRef.current);
    if (character.frameCount > 1 && character.fps > 0) {
      timerRef.current = setInterval(() => {
        frameRef.current = (frameRef.current + 1) % character.frameCount;
        drawFrame(frameRef.current);
      }, 1000 / character.fps);
    }
    return () => clearInterval(timerRef.current);
  }, [character]);

  const wrapClass = [
    'character-canvas-wrap',
    !visible     ? 'hidden'               : '',
    cssAnimation ? `${cssAnimation}-anim` : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapClass}>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{ width: '200px', height: '200px', display: 'block' }}
      />
    </div>
  );
}
